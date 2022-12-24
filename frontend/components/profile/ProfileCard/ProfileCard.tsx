"use client";
import React from "react";
import { useAuthContext } from "context/Auth";
import { CardButton, ShortInfo, SocialMedias } from ".";
import { EditInfoModal } from "..";
import jsCookie from "js-cookie";
import services from "@services";
import { useProfileContext } from "context/profile";

export default function ProfileCard() {
  const authContext = useAuthContext();
  const profileContext = useProfileContext();

  const handleUnfollow = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const request = await services.deleteFollow(
        profileContext.user.id,
        token
      );
      if (request.status !== 200) return;
      profileContext.setFollowing(false);
    } catch {
      console.log("failed to unfollow.");
    }
  };
  const handleFollow = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const request = await services.createFollow(
        profileContext.user.id,
        token
      );
      if (request.status !== 200) return;
      profileContext.setFollowing(true);
    } catch {
      console.log("failed to follow.");
    }
  };

  return (
    <>
      {/* cover */}
      <div className="aspect-video grid rounded-md overflow-hidden shadow-sm">
        <img
          src={profileContext.user.cover || "/images/01.jpg"}
          alt="cover image"
        />
      </div>

      {/* info */}
      <div className="mt-4 px-6 pt-12 pb-4 flex flex-col gap-4 relative bg-white text-gray-600 rounded-md shadow-sm">
        {/* profile image */}
        <div className="w-32 aspect-square absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 grid rounded-full overflow-hidden shadow-sm">
          <img
            src={profileContext.user.img || "/images/01.jpg"}
            alt="profile image"
          />
        </div>

        <h2 className="self-center font-semibold text-3xl text-gray-900">
          {profileContext.user.name}
        </h2>

        <ShortInfo user={profileContext.user} />
        <SocialMedias />

        {/* follow or edit */}
        {authContext.user?.id === profileContext.user.id ? (
          <CardButton
            text={"Edit Info"}
            onClick={() => profileContext.setShowEditModal(true)}
          />
        ) : profileContext.following ? (
          <CardButton text={"Following"} onClick={handleUnfollow} />
        ) : (
          <CardButton text={"Follow"} onClick={handleFollow} />
        )}
      </div>

      {authContext.user?.id === profileContext.user.id && <EditInfoModal />}
    </>
  );
}
