import { auth } from "@/auth";

export const fetchClient = async (url, options) => {

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });
};