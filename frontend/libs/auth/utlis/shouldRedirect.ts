import { TShouldRedirectReturn } from "../types";

export default function shouldRedirect(
  pathname: string
): TShouldRedirectReturn {
  const authPaths = ["/auth", "/signup", "/login"];

  // check it is a auth path
  if (authPaths.some((path) => pathname.includes(path))) {
    return { should: false, path: "/" };
  }
  return { should: true, path: "/auth/login" };
}
