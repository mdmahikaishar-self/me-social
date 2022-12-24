"use client";
import Link from "next/link";
import React from "react";
import {
  FaEllipsisH,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

export default function SocialMedias() {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* socail medias */}
      <div className="flex-none flex items-center">
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaFacebook />
        </Link>
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaInstagram />
        </Link>
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaTwitter />
        </Link>
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaLinkedin />
        </Link>
        <Link className="w-8 aspect-square grid place-items-center" href={"/"}>
          <FaPinterest />
        </Link>
      </div>

      {/* others */}
      <div className="flex-none flex items-center">
        <div className="w-8 aspect-square grid place-items-center">
          <FaMailBulk />
        </div>
        <div className="relative">
          <div className="w-8 aspect-square grid place-items-center">
            <FaEllipsisH />
          </div>
        </div>
      </div>
    </div>
  );
}
