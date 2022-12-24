"use client";
import React from "react";

export default function CardButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="self-center px-6 py-2 font-semibold text-sm bg-blue-500 text-white rounded-sm shadow-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
