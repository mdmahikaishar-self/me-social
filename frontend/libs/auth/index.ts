import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./context";

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider };
