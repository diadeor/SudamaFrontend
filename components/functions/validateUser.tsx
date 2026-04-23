"use server";
import { cookies } from "next/headers";
import { fetchReq } from "./request";

const validateUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) console.error("JWT token not present");

  const checkUrl = "http://localhost:5000/api/users/me";
  const { data, error } = await fetchReq(checkUrl, true);

  if (data.success) {
    const { user } = data;
    return user;
  } else {
    return null;
  }
};

export default validateUser;
