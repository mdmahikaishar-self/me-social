"use client";
import React from "react";
import {
  FaBoxes,
  FaHome,
  FaLock,
  FaMailBulk,
  FaRegBell,
  FaRegMoon,
  FaSearch,
  FaUserFriends,
} from "react-icons/fa";
import Link from "next/link";
import { useAuthContext } from "context/Auth";
import services from "@services";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const authContext = useAuthContext();

  const handleLogOut = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const request = await services.logout(token);
    } catch {
      console.log("logged out");
    }
    jsCookie.set("accessToken", "");
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 h-14 px-6 flex items-center gap-4 bg-white border-b border-b-gray-300 z-10">
      <Link href={"/"} className={"font-bold text-2xl text-blue-700"}>
        lamasocial
      </Link>

      <div className="flex-none flex items-center gap-2">
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaHome className="" />
        </Link>
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaRegMoon className="" />
        </Link>
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaBoxes className="" />
        </Link>
      </div>

      <div className="w-full flex items-center gap-4">
        <div className="max-w-[300px] h-8 px-1 flex items-center border border-gray-300 rounded-sm">
          <button className="w-8 aspect-square text-sm grid place-items-center">
            <FaSearch />
          </button>
          <input
            className="bg-transparent outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex-none flex items-center gap-2">
        <button className="w-8 aspect-square grid place-items-center">
          <FaUserFriends />
        </button>
        <button className="w-8 aspect-square grid place-items-center">
          <FaMailBulk />
        </button>
        <button className="w-8 aspect-square grid place-items-center">
          <FaRegBell />
        </button>
        <button
          className="flex-none w-8 aspect-square grid place-items-center"
          onClick={handleLogOut}
        >
          <FaLock />
        </button>
      </div>

      {/* user */}
      <Link
        href={`/${authContext.user?.id}`}
        className={
          "flex-none h-8 px-1  flex items-center border border-gray-300 rounded-full hover:border-gray-400"
        }
      >
        <div className="w-6 aspect-square grid rounded-full overflow-hidden">
          <img
            src={authContext.user?.img || "/images/01.jpg"}
            alt={authContext.user?.name}
          />
        </div>
        <h3 className="px-1">{authContext.user?.name}</h3>
      </Link>
    </header>
  );
}
