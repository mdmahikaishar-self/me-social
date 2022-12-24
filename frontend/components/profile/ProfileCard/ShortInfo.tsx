"use client";
import { IUserLong } from "@Types/";
import Link from "next/link";
import React from "react";
import { FaChrome, FaLocationArrow } from "react-icons/fa";

export default function ShortInfo({ user }: { user: IUserLong }) {
  return (
    <div className="w-full flex items-center justify-center gap-8">
      {user.city && (
        <Link className="flex items-center gap-2" href={""}>
          <FaLocationArrow /> {user.city}
        </Link>
      )}
      {user.website && (
        <Link className="flex items-center gap-2" href={"/"}>
          <FaChrome /> {user.website}
        </Link>
      )}
    </div>
  );
}
