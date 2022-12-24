import React from "react";
import { IUser } from "@Types/";
import { SidebarRightItem } from ".";

export default function Friends() {
  const friends: IUser[] = [
    { id: "1", name: "Lidsery Davidvos", img: "/images/01.jpg" },
    { id: "2", name: "Lena Feazier", img: "/images/02.jpg" },
  ];

  return (
    <SidebarRightItem name="Online Friends">
      {friends.map((friend) => (
        <FriendItem user={friend} key={friend.id} />
      ))}
    </SidebarRightItem>
  );
}

function FriendItem({ user }: { user: IUser }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`flex-none w-8 aspect-square grid relative  ${`after:contents-[""] after:w-2 after:h-2 after:absolute after:top-0 after:right-0 after:bg-green-500 after:rounded-full`}`}
      >
        <img className={"rounded-full"} src={user.img} alt={user.name} />
      </div>
      <h3 className="w-full font-bold text-sm text-gray-700">{user.name}</h3>
    </div>
  );
}
