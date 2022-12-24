import React from "react";
import { Activites, Friends, Suggestion } from ".";

export default function SidebarRight() {
  return (
    <div className="mainH px-2 py-2 flex flex-col gap-4 scrollY">
      <Suggestion />
      <Activites />
      <Friends />
    </div>
  );
}
