using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;
using Sabio.Models.Requests.Email;
using Sabio.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Configuration;
using System.IO;
using System.Net.Mail;
using Sabio.Models.Requests;
using System.Net;

namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private SendGridConfig _config;

        public EmailService(IOptions<SendGridConfig> config) 
        {
           _config = config.Value; 
        }
        public async Task Execute(EmailAddRequest model)
        {
         
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(model.FromEmail, model.FromName),
                Subject = model.Subject,
                PlainTextContent = model.Content,
                HtmlContent = $"<strong>{model.Content}</strong>"
            };
            msg.AddTo(new EmailAddress("v2q2h8z7w6j0y6o1@sabionation.slack.com", "Test User"));
            await SendEmail(msg);
        }

        public async Task RegisterConfirm(string email, string token)
        {
            string templateLocation = "EmailTemplates\\RegisterConfirm.html";
            string currDir = Directory.GetCurrentDirectory();
            string path = Path.Combine(currDir, templateLocation);
            string htmlContent = System.IO.File.ReadAllText(path);
            htmlContent = htmlContent.Replace("{@Token}", token);
       

            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = "Welcome!",
                HtmlContent = htmlContent
            };

            msg.AddTo(new EmailAddress(email));
            await SendEmail(msg);
        }
        public async Task PasswordChange(string email, string token)
        {
            string templateLocation = "EmailTemplates\\UpdatePassword.html";
            string currDir = Directory.GetCurrentDirectory();
            string path = Path.Combine(currDir, templateLocation);
            string htmlContent = System.IO.File.ReadAllText(path);
            htmlContent = htmlContent.Replace("{@Token}", token);

            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_config.Email, _config.Sender),
                Subject = "Update Password",
                HtmlContent = htmlContent
            };

            msg.AddTo(new EmailAddress(email));
            await SendEmail(msg);
        }
    
        public async Task LostInfoEmail(EmailLostInfoSenderRequest model, string toEmail) 
        {
            string accountNumber = model.AccountNumber;
            string accountLastFour = null;
            if (model.AccountNumber.Length == 16)
            {
                accountLastFour = model.AccountNumber.Substring(12);
            }
            else if (model.AccountNumber.Length == 15)
            {
                accountLastFour = model.AccountNumber.Substring(11);
            }
            else if (model.AccountNumber.Length == 14) 
            {
                accountLastFour = model.AccountNumber.Substring(10);
            }
            else if (model.AccountNumber.Length == 12)
            {
                accountLastFour = model.AccountNumber.Substring(8);
            }

            string templateLocation = "EmailTemplates\\LostInformation.html";
            string currDir = Directory.GetCurrentDirectory();
            string path = Path.Combine(currDir, templateLocation);
            string htmlContent = System.IO.File.ReadAllText(path);
            htmlContent = htmlContent.Replace("{@SenderFirstName}", model.SenderFirstName);
            htmlContent = htmlContent.Replace("{@SenderLastName}", model.SenderLastName);
            htmlContent = htmlContent.Replace("{@AccountLastFour}", accountLastFour);
            htmlContent = htmlContent.Replace("{@CardType}", model.CardType);
            htmlContent = htmlContent.Replace("{@PhoneNumber}", model.PhoneNumber);
            htmlContent = htmlContent.Replace("{@Email}", model.FromEmail);


            var msg = new SendGridMessage()
            {
                From = new EmailAddress(model.FromEmail, model.SenderFirstName),
                Subject = "Request for new information",
                HtmlContent = htmlContent
            };
            msg.AddTo(new EmailAddress(toEmail));
            await SendEmail(msg);
        }

       
        private async Task SendEmail(SendGridMessage msg) 
        {
            var apiKey = _config.SendGridApiKey;
            var client = new SendGridClient(apiKey);
            await client.SendEmailAsync(msg);          
        }

        

    }
}
