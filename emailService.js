import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/email/`;

export const sendEmail = payload => {
    const config = {
        method: "POST",
        url: endpoint + `send`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    }
    return axios(config)
        .then(serviceHelpers.onGlobalSuccess)
        .catch(serviceHelpers.onGlobalError);
};

export const sendLostInfoEmail = payload => {
    const config = {
        method: "POST",
        url: endpoint + `lostinfo`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config)
        .then(serviceHelpers.onGlobalSuccess)
        .catch(serviceHelpers.onGlobalError);
};
