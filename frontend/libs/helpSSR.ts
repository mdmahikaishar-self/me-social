import services from "@services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function helpSSR<T = any>(
  callback: (token?: string) => Promise<T | any>
) {
  const token = cookies().get("accessToken")?.value;

  try {
    const request = await services.authUser(token);
    if (request.status !== 200) {
      redirect("/auth/login");
    }
  } catch {
    redirect("/auth/login");
  }

  return (await callback(token)) as T;
}
