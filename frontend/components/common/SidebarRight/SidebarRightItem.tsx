import React, { ReactNode } from "react";

export default function SidebarRightItem({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="px-4 py-3 bg-white rounded-sm">
      <h3 className="font-bold text-sm text-gray-500">{name}</h3>

      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}
