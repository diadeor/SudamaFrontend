"use server";
import { cookies } from "next/headers";
import { cache } from "react";

export const fetchReq = async (
  url: string,
  attachToken = true,
  revalidate?: number,
  tag?: string,
) => {
  let res: Response;
  const finalUrl = url.includes("://") ? url : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  try {
    const fetchOptions: RequestInit = { method: "GET" };
    if (revalidate !== undefined) {
      if (!tag) return { data: null, error: "Tag is required to revalidate" };
      if (attachToken) return { data: null, error: "Don't cache token bearing requests" };
      fetchOptions.next = { revalidate, tags: [tag] };
    }
    if (attachToken) {
      const cookieStorage = await cookies();
      const token = cookieStorage.get("token")?.value;
      if (!token) return { data: null, error: "JWT token not present" };
      fetchOptions.headers = { Cookie: `token=${token}` };
    }
    res = await fetch(finalUrl, fetchOptions);
  } catch (error) {
    console.log(error);
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

export const postReq = async (url: string, body: any, isPut = false, attachToken = true) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;

  if (attachToken && !token) {
    return { data: null, error: "JWT token not present" };
  }

  const finalUrl = url.includes("://") ? url : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  // Check if the incoming body is a FormData object
  const isFormData = body instanceof FormData;

  // Prepare headers
  const headers: HeadersInit = {
    Cookie: `token=${token}`,
  };

  let finalBody: BodyInit;

  if (isFormData) {
    // 3. IF IT IS A FILE UPLOAD:
    // We create a brand new, clean FormData object to strip out Next.js bugs.
    finalBody = new FormData();

    for (const [key, value] of body.entries()) {
      // This regex magically removes the '1_', '2_', or '$ACTION_' prefixes Next.js adds!
      const cleanKey = key.replace(/^[0-9]+_/, "").replace(/^\$ACTION_[0-9]+_/, "");
      finalBody.append(cleanKey, value);
    }
  } else {
    // 4. IF IT IS A NORMAL TEXT REQUEST:
    headers["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }

  let res: Response;

  try {
    res = await fetch(finalUrl, {
      method: isPut ? "PUT" : "POST",
      headers: headers,
      body: finalBody,
      credentials: "include",
    });
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw new Error("Unable to connect to the server.");
  }

  let data;
  try {
    data = await res.json();
  } catch (parseError) {
    return { data: null, error: "Received an invalid response from the server." };
  }
  if (!res.ok) {
    return { data: null, error: data.message };
  }

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    const newToken = setCookie.split(";")[0].slice(6);
    cookieStorage.set("token", newToken, {
      maxAge: 1000 * 24 * 60 * 60,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }

  return { data, error: null };
};

export const validateUser = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    console.error("JWT token not present");
    return null;
  }

  const checkUrl = "/api/users/me";
  const { data, error } = await fetchReq(checkUrl, true);

  if (error || !data) {
    console.error(error);
    return null;
  }

  if (data.success) return data.user;
  return null;
});
