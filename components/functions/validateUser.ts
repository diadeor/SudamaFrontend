"use server";
import { cookies } from "next/headers";
import { fetchReq } from "./request";

const validateUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return console.error("JWT token not present");

  const checkUrl = "/api/users/me";
  const { data, error } = await fetchReq(checkUrl, true);

  if (error || !data) return console.error(error);

  if (data.success) return data.user;
  return null;
};

export default validateUser;
