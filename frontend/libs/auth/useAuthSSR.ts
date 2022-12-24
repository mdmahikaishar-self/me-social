import services from "@services";
import { cookies } from "next/headers";
import { redirect, usePathname } from "next/navigation";
import { IUser, TUseAuthSSRReturn } from "./types";
import shouldRedirect from "./utlis/shouldRedirect";

export default async function useAuthSSR(): Promise<TUseAuthSSRReturn> {
  const pathname = usePathname() || "";
  const needRedirect = shouldRedirect(pathname);
  const token = cookies().get("accessToken")?.value;

  // don't have a token
  if (!token) {
    if (needRedirect.should) {
      redirect(needRedirect.path);
    }
    return { user: null, status: "unauthorized" };
  }

  // have a token
  try {
    const request = await services.authUser(token);

    // an unauthorized user
    if (request.status !== 200) {
      if (needRedirect.should) {
        redirect(needRedirect.path);
      }
      return { user: null, status: "unauthorized" };
    }

    // if user is authorized
    const user = request.data.user as unknown as IUser;
    return { user, status: "authorized" };
  } catch {
    if (needRedirect.should) {
      redirect(needRedirect.path);
    }
    return { user: null, status: "unauthorized" };
  }
}
