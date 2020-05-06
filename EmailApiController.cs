using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Email;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/email")]
    public class EmailApiController : BaseApiController
    {
        private IAuthenticationService<int> _authService = null;
        private IEmailService _emailService = null;
        private IOrganizationService _organizationService = null;
        private IPaymentAccountsService _paymentAccountService = null;

        public EmailApiController(
            IAuthenticationService<int> authService,
            IEmailService emailService,
            IOrganizationService organizationService,
            IPaymentAccountsService paymentAccountService,
            ILogger<EmailApiController> logger) : base(logger)
        {
            _authService = authService;
            _emailService = emailService;
            _organizationService = organizationService;
            _paymentAccountService = paymentAccountService;
            
        }

        [HttpPost("send")]
        public async Task<ActionResult<SuccessResponse>> ExecuteAsync(EmailAddRequest model)
        {
            BaseResponse result;
            int statusCode = 200;

            try
            {
                await _emailService.Execute(model);
                result = new SuccessResponse();
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message);
                statusCode = 500;
            }
            return StatusCode(statusCode, result);
        }

        [HttpPost("register")]
        public async Task<ActionResult<SuccessResponse>> RegisterConfirm(string email, string token) 
        {
            BaseResponse result;
            int sCode = 200;

            try
            {
                await _emailService.RegisterConfirm(email, token);
                result = new SuccessResponse();
            }
            catch (Exception ex) 
            {
                base.Logger.LogError(ex.ToString());
                result = new ErrorResponse(ex.Message);
                sCode = 500;
            }
            return StatusCode(sCode, result);
        }

        [HttpPost("lostinfo")]
        public async Task<ActionResult<SuccessResponse>> LostInfoEmail(EmailLostInfoSenderRequest model) 
        {
            BaseResponse response = null;
            int sCode = 200;
            int userId = _authService.GetCurrentUserId();
            string orgEmail = null;

            try
            {
                List<UserOrganization> userOrgs = _organizationService.GetForStolenInfo(userId, model.AccountNumber);

                if (userOrgs == null && !model.IsActive)
                {
                    sCode = 404;
                    response = new ErrorResponse("Payment account already deactivated");
                }
                else if (userOrgs == null && model.IsActive) 
                {
                    _paymentAccountService.UpdateActiveStatus(userId, model.AccountNumber, model.PaymentTypeId);
                    response = new SuccessResponse();
                }
                else
                {
                    foreach (var userOrg in userOrgs)
                    {
                        int indexOfSiteStart = userOrg.SiteUrl.IndexOf("w.");
                        string orgSite = userOrg.SiteUrl.Substring(indexOfSiteStart + 2);
                        //orgEmail = $"support@{orgSite}";
                        orgEmail = "v2q2h8z7w6j0y6o1@sabionation.slack.com";

                        if (userOrg.PaymentAccountIsActive && model.IsActive && model.AccountNumber == userOrg.AccountNumber && model.PaymentTypeId == userOrg.PaymentTypeId)
                        {
                            _paymentAccountService.UpdateActiveStatus(userId, model.AccountNumber, model.PaymentTypeId);
                            await _emailService.LostInfoEmail(model, orgEmail);
                            response = new SuccessResponse();
                        }
                        else
                        {
                            sCode = 404;
                            response = new ErrorResponse("Payment account already deactivated or Not linked to organization");
                        };
                    }
                }
            }
            catch(Exception ex) 
            {
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                sCode = 500;
            };
            return StatusCode(sCode, response);
        }


    }

}
