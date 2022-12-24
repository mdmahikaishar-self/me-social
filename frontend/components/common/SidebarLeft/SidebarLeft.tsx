import Link from "next/link";
import React from "react";

export default function SidebarLeft() {
  return (
    <div className="mainH px-6 py-6 flex flex-col gap-4 bg-white scrollY">
      <div className="flex flex-col gap-4">
        <SidebarUserItem />
        <SidebarItem name={"Friends"} img={"/images/01.jpg"} />
        <SidebarItem name={"Groups"} img={"/images/01.jpg"} />
        <SidebarItem name={"Marketplace"} img={"/images/01.jpg"} />
        <SidebarItem name={"Watch"} img={"/images/01.jpg"} />
        <SidebarItem name={"Memories"} img={"/images/01.jpg"} />
        <SidebarItem name={"Memory"} img={"/images/01.jpg"} />
      </div>

      <hr className="w-11/12 mx-auto mt-2 bg-gray-300" />

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-sm text-gray-500">Your shortcuts</h3>
        <SidebarItem name={"Events"} img={"/images/01.jpg"} />
        <SidebarItem name={"Gamming"} img={"/images/01.jpg"} />
        <SidebarItem name={"Gallery"} img={"/images/01.jpg"} />
        <SidebarItem name={"Videos"} img={"/images/01.jpg"} />
        <SidebarItem name={"Messages"} img={"/images/01.jpg"} />
      </div>

      <hr className="w-11/12 mx-auto mt-2 bg-gray-300" />

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-sm text-gray-500">Others</h3>
        <SidebarItem name={"Fundation"} img={"/images/01.jpg"} />
        <SidebarItem name={"Tutorials"} img={"/images/01.jpg"} />
        <SidebarItem name={"Courses"} img={"/images/01.jpg"} />
      </div>
    </div>
  );
}
function SidebarUserItem() {
  return (
    <Link href={"/"} className="flex items-center gap-3">
      <div className="w-8 aspect-square grid rounded-full overflow-hidden">
        <img src="/images/01.jpg" alt="" />
      </div>
      <h3 className="font-semibold text-gray-500">Jone Doe</h3>
    </Link>
  );
}

function SidebarItem({ img, name }: { img: string; name: string }) {
  return (
    <Link href={"/"} className="flex items-center gap-3">
      <div className="w-8 aspect-square grid place-items-center">
        <img src={img} alt={name} />
      </div>
      <h3 className="font-semibold text-gray-500">{name}</h3>
    </Link>
  );
}
