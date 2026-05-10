"use server";
import { cookies } from "next/headers";

export const fetchReq = async (url: string, attachToken = true) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  if (attachToken && !token) {
    return { data: null, error: "JWT token not present" };
  }
  let res: Response;

  const finalUrl = url.includes("://") ? url : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  try {
    res = await fetch(finalUrl, {
      method: "GET",
      credentials: "include",
      headers: attachToken && token ? { Cookie: `token=${token}` } : undefined,
    });
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
    // CRITICAL: We DO NOT set 'Content-Type' for FormData.
    // Node's native fetch will automatically set 'multipart/form-data' with the correct boundary!
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
