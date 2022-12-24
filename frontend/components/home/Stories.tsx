import { IStory } from "@Types/";
import React from "react";
import { FaPlus } from "react-icons/fa";

export default function Stories() {
  const createStory: IStory = {
    id: "createSotry",
    img: "/images/06.jpg",
    createdAt: new Date().toDateString(),
    user: {
      id: "currentUser",
      img: "/images/06.jpg",
      name: "currentUser",
    },
  };
  const stories: IStory[] = [
    {
      id: "01",
      img: "/images/01.jpg",
      createdAt: "",
      user: { id: "001", name: "mahi", img: "/image/01.jpg" },
    },
    {
      id: "02",
      img: "/images/02.jpg",
      createdAt: "",
      user: { id: "001", name: "mahi", img: "/image/01.jpg" },
    },
    {
      id: "03",
      img: "/images/03.jpg",
      createdAt: "",
      user: { id: "001", name: "mahi", img: "/image/01.jpg" },
    },
    {
      id: "04",
      img: "/images/04.jpg",
      createdAt: "",
      user: { id: "001", name: "mahi", img: "/image/01.jpg" },
    },
  ];

  return (
    <div className="flex gap-4 scrollX">
      <StoryItem story={createStory} add={true} key={createStory.id} />

      {stories.map((story) => (
        <StoryItem story={story} key={story.id} />
      ))}
    </div>
  );
}

function StoryItem({ add, story }: { add?: boolean; story: IStory }) {
  return (
    <div className="w-28 h-40 relative grid rounded-md overflow-hidden shadow-sm">
      <img src={story.img} alt="" />

      <div className="px-2 py-2 absolute left-0 bottom-0">
        {!add ? (
          <h3 className="font-semibold text-sm text-white">
            {story.user.name}
          </h3>
        ) : (
          <button className="w-8 h-8 grid place-items-center text-xs text-white bg-blue-500 rounded-full">
            <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
}
