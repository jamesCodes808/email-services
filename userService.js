import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/users`;

let registerUser = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let login = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/login`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let getCurrentSessionId = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/session`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let logout = (sessionId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/logout?sessionId=${sessionId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/current`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};
let getUserDetail = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/settings`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};
let updateEmail = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/email`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let updatePw = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/password`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let updatePrimary = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/primary`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};
let getById = (Id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${Id}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let getAllUsersPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/getAllPaginated?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let confirmUser = (payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${endpoint}/confirm`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

export default {
  registerUser,
  login,
  logout,
  getCurrentUser,
  getUserDetail,
  updateEmail,
  updatePw,
  updatePrimary,
  getById,
  getAllUsersPaginated,
  getCurrentSessionId,
  confirmUser,
};
