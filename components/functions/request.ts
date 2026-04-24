"use server";
import { cookies } from "next/headers";

export const fetchReq = async (url: string, attachToken: boolean = true) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  if (attachToken && !token) {
    return { data: null, error: "JWT token not present" };
  }
  let res: Response;

  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: attachToken && token ? { Cookie: `token=${token}` } : undefined,
    });
  } catch (error) {
    return { data: null, error: "Unable to connect to the server." };
  }
  let data;
  try {
    data = await res.json();
  } catch (parseError) {
    return { data: null, error: "Received an invalid response from the server." };
  }
  if (!res.ok) {
    const errMessage = data?.message || `Server Error: ${res.status}`;
    return { data: null, error: errMessage };
  }
  return { data, error: null };
};

export const postReq = async (url: string, body: Object, attachToken = true) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  if (attachToken && !token) return { data: null, error: "JWT token not present" };
  let res: Response;

  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `token=${token}` },
      body: JSON.stringify(body),
      credentials: "include",
      // next:{revalidate:}Invalid
    });
  } catch (error) {
    throw new Error("Unable to connect to the server.");
  }
  let data;
  try {
    data = await res.json();
  } catch (parseError) {
    return { data: null, error: "Received an invalid error from the server." };
  }

  if (!res.ok) {
    return { data: null, error: data.message };
  }

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    const token = setCookie.split(";")[0].slice(6);
    cookieStorage.set("token", token, {
      maxAge: 1000 * 24 * 60 * 60,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
  return { data, error: null };
};
