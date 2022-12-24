import React from "react";
import { IUser } from "@Types/";
import { SidebarRightItem } from ".";

export default function Activites() {
  return (
    <SidebarRightItem name="Latest Activites">
      <ActiviteItem
        user={{ id: "1", name: "Lidsery Davidvos", img: "/images/01.jpg" }}
        what={"changed their cover picture"}
      />
      <ActiviteItem
        user={{ id: "2", name: "Lena Feazier", img: "/images/02.jpg" }}
        what={"changed their cover picture"}
      />
    </SidebarRightItem>
  );
}

function ActiviteItem({ user, what }: { user: IUser; what: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex-none w-8 aspect-square grid rounded-full overflow-hidden">
        <img src={user.img} alt={user.name} />
      </div>
      <p className="w-full text-gray-600">
        <span className="font-bold  text-gray-700">{user.name}</span> {what}
      </p>
      <span className="flex-none text-gray-500">1 min ago</span>
    </div>
  );
}
