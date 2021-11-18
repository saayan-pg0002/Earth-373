import axios, { AxiosResponse, Method } from "axios";

export enum http {
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  delete = "DELETE",
}

export const sendViewsRequests = async (
  url: string,
  method: string,
  body: any
): Promise<AxiosResponse<never> | any> => {
  let data: AxiosResponse<never> | any;
  await axios({
    method: method as Method,
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    data: body,
    responseType: "json",
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      data = error;
    });
  return data;
};

export const errorHandler = (
  error: unknown,
  scope: string,
  block: any
): object => {
  if (error instanceof Error) {
    return {
      error: {
        CLASS: `${error.name}`, // the error type
        SCOPE: scope, // the function it occurred in
        BLOCK: block, // the section within the SCOPE
        STACK: `${error.stack}`, // full detail
      },
    };
  } else {
    return { ERROR: "An unidentified error has occurred" };
  }
};
