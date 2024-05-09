import axios from "axios";

const basePath = "api/v1";
const localPort = 5000;

export const getUrl = () => {
  const { protocol, hostname, origin } = window.location;
  if (hostname.includes("localhost")) {
    return `${protocol}//${hostname}:${localPort}/${basePath}`;
  }
  return `${origin}/${basePath}`;
};

const Instance = axios.create({
  baseURL: getUrl(),
});

export const fetchQuestionAndOptions = async () => await Instance.get("/data");
