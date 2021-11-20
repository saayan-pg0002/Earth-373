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
  method: http,
  body: any | undefined
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

export const errorHandler = (error: unknown): object => {
  if (error instanceof Error) {
    return {
      TYPE: `${error.name}`,
      DESCRIPTION: `${error.stack}`,
    };
  } else {
    return { DESCRIPTION: "An unidentified error has occurred" };
  }
};
