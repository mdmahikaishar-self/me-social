"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import services from "@services";
import { ILoginBody } from "@Types/services";
import jsCookie from "js-cookie";
import { useAuthContext } from "context/Auth";
// import styles from "@styles/components/home/styles.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const authContext = useAuthContext();
  const [input, setInput] = useState<ILoginBody>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleOnInputChange = (e: any) => {
    setInput((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const response = await services.login(input);

      if (response.status !== 200) {
        return setError("Something went wrong.");
      }

      // set token
      jsCookie.set("accessToken", response.data.accessToken);
      authContext.loadUser();
      router.push("/");
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    await handleLogin();
  };

  return (
    <div className="w-screen h-screen grid place-items-center bg-blue-400">
      <div className="w-[700px] flex bg-white rounded-md overflow-hidden">
        <div
          className="w-1/2 px-10 py-12 text-white flex flex-col justify-center gap-4"
          style={{
            background: `linear-gradient(rgba(255, 0, 0, 0.4), rgba(0, 0, 255, 0.4)), url("/images/01.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="font-bold text-6xl">Hello World.</h1>
          <p className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic omnis
            rem unde odit dicta, quis iure enim error aspernatur.
          </p>

          <Link href={"/auth/signup"}>Don't have an account?</Link>

          <Link
            className="px-12 py-2 text-center font-semibold text-blue-400 bg-white shadow-lg"
            href={"/auth/signup"}
          >
            Signup
          </Link>
        </div>

        <div className="w-1/2 px-10 py-12 text-gray-900 flex flex-col justify-center gap-8">
          <h2 className="font-bold text-4xl">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <input
              type="email"
              className="px-2 py-2 border-b-2 border-b-gray-500 outline-none"
              placeholder="Email"
              name="email"
              onChange={handleOnInputChange}
            />
            <input
              type="password"
              className="px-2 py-2 border-b-2 border-b-gray-500 outline-none"
              placeholder="Password"
              name="password"
              onChange={handleOnInputChange}
            />

            {error && (
              <p className="text-sm font-semibold text-red-500">{error}</p>
            )}

            <button className="px-12 py-2 block font-semibold text-white bg-blue-400 shadow-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
