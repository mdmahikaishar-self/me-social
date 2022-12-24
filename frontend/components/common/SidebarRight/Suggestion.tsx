import React from "react";
import { IUser } from "@Types/";
import { SidebarRightItem } from ".";

export default function Suggestion() {
  const friends: IUser[] = [
    { id: "1", name: "Lidsery Davidvos", img: "/images/01.jpg" },
    { id: "2", name: "Lena Feazier", img: "/images/02.jpg" },
  ];

  return (
    <SidebarRightItem name="Suggestion For You">
      {friends.map((friend) => (
        <SugeestionItem user={friend} key={friend.id} />
      ))}
    </SidebarRightItem>
  );
}

function SugeestionItem({ user }: { user: IUser }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-none w-8 aspect-square grid rounded-full overflow-hidden">
        <img src={user.img} alt={user.name} />
      </div>
      <h3 className="w-full font-bold text-sm text-gray-700">{user.name}</h3>
      <div className="flex-none flex items-center gap-2">
        <button className="px-2 py-1 font-semibold text-xs bg-blue-500 text-white rounded-md">
          Follow
        </button>
        <button className="px-2 py-1 font-semibold text-xs bg-red-500 text-white rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}
