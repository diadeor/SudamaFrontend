import axios from "axios";

export const clientPost = (url: string, method: "post" | "put" = "post") => {
  const req = async (body: Object) => {
    try {
      const options = {
        withCredentials: true,
        validateStatus: () => true,
      };
      const { data } = await axios({ method, url, data: body, ...options });
      console.log(data);
      return data.success ? { data, error: null } : { data: null, error: data.message };
    } catch (err) {
      return { data: null, error: "There has been an error" };
    }
  };
  return req;
};

export const clientGet = async (url: string, method: "get" | "delete" = "get") => {
  try {
    const options = {
      withCredentials: true,
      validateStatus: () => true,
    };
    const { data } = await axios({ method, url, ...options });
    return data.success ? { data, error: null } : { data: null, error: data.message };
  } catch (err) {
    return { data: null, error: "There has been an error" };
  }
};
