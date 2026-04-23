"use server";
import { cookies } from "next/headers";

export const fetchReq = async (url: string, attachToken: boolean = true) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  let res: Response;

  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Cookie: attachToken ? `token=${token}` : "" },
    });
  } catch (error) {
    throw new Error("Unable to connect to the server.");
  }
  if (attachToken && !token) throw new Error("JWT token not present");
  const data = await res.json();

  if (!res.ok) {
    if (!data.success) throw new Error(data.message);
    return { data: data ?? "", error: data.message };
  } else {
    return { data, error: null };
  }
};

export const postReq = async (url: string, body: Object) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `token=${token}` },
      body: JSON.stringify(body),
      credentials: "include",
      // next:{revalidate:}
    });
  } catch (error) {
    throw new Error("Unable to connect to the server.");
  }
  const data = await res.json();
  if (!res.ok) {
    return { data, error: data.message };
  } else {
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
  }
};
