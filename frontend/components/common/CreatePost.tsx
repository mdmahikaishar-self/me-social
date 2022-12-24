"use client";
import React, { useRef, useState } from "react";
import services from "@services";
import { ICreatePostBody } from "@Types/services";
import jsCookie from "js-cookie";
import { IconType } from "react-icons";
import { FaImage, FaLocationArrow, FaTag } from "react-icons/fa";
import { useAuthContext } from "context/Auth";

interface ICreatePostProps {
  setPosts: (values: any) => void;
}

export default function CreatePost({ setPosts }: ICreatePostProps) {
  const authContext = useAuthContext();
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState<any>(null);
  const refImgFile = useRef({} as HTMLInputElement);

  const handleUploadImg = async (e: any) => {
    const imgFile = e.target.files[0];
    if (!imgFile) return;

    // form data
    const formData = new FormData();
    formData.append("file", imgFile);

    // request
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.uploadImg(formData, token);
      if (response.status !== 200) return;

      // set img url
      setImg(response.data.file);
      setImgFile(imgFile);
    } catch {
      console.log("failed to upload an image.");
    }
  };

  const hanldeCreatePost = async (body: ICreatePostBody) => {
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.createPost(body, token);
      if (response.status !== 200) return;

      // clear inputs
      setText("");
      setImg("");
      setImgFile(null);

      // get all posts
      const allPosts = await services.getAllPosts(token);
      if (allPosts.status !== 200) return;

      setPosts(allPosts.data.posts);
    } catch {
      console.log("failed to create a post.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;

    // then create post
    const data = { img, text };
    await hanldeCreatePost(data);
  };

  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-md shadow-sm select-none">
      <div className="flex items-center gap-4">
        <div className="w-8 aspect-square grid rounded-full overflow-hidden">
          <img
            src={authContext.user?.img || "/images/06.jpg"}
            alt={authContext.user?.name}
          />
        </div>
        <input
          type="text"
          className="bg-transparent outline-none"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
      </div>

      {imgFile && (
        <div className="flex items-center">
          <div className="h-20 aspect-video grid rounded-md overflow-hidden">
            <img src={URL.createObjectURL(imgFile)} alt="" />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <CreatePostButton
            text={"Add Images"}
            Icon={FaImage}
            onClick={() => refImgFile.current.click()}
          />
          <CreatePostButton text={"Add Place"} Icon={FaLocationArrow} />
          <CreatePostButton text={"Tag Friends"} Icon={FaTag} />

          {/* file input */}
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleUploadImg}
            ref={refImgFile}
          />
        </div>

        <button
          className="px-6 py-2 text-sm flex-items-center gap-2 text-white bg-blue-500 rounded-sm shadow-sm"
          onClick={handleSubmit}
        >
          Share
        </button>
      </div>
    </div>
  );
}

function CreatePostButton({
  text,
  Icon,
  onClick,
}: {
  Icon: IconType;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="px-4 py-2 flex items-center gap-2 border border-gray-200 rounded-sm shadow-sm"
      onClick={onClick}
    >
      <Icon />
      <span>{text}</span>
    </button>
  );
}
