"use client";
import { Modal } from "@components/common";
import { IUpdateUserBody } from "@Types/services";
import { InputHTMLAttributes, useRef, useState } from "react";
import services from "@services";
import jsCookie from "js-cookie";
import { useProfileContext } from "context/profile";
import { IUserLong } from "@Types/";

export default function EditInfoModal() {
  const profileContext = useProfileContext();
  const [input, setInput] = useState<IUpdateUserBody>({
    name: profileContext.user.name,
    city: profileContext.user.city,
    website: profileContext.user.website,
    img: profileContext.user.img,
    cover: profileContext.user.cover,
  });
  const [imgFile, setImgFile] = useState<any>(undefined);
  const [coverFile, setCoverFile] = useState<any>(undefined);
  const [error, setError] = useState("");
  const refCoverInput = useRef({} as HTMLInputElement);
  const refImgInput = useRef({} as HTMLInputElement);

  const handleOnInputChange = (e: any) => {
    setInput((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleUploadCover = async (e: any) => {
    const coverFile = e.target.files[0];
    if (!coverFile) return;

    // form data
    const formData = new FormData();
    formData.append("file", coverFile);

    // request
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.uploadImg(formData, token);
      if (response.status !== 200) return;

      // set cover url
      setInput((pre) => ({ ...pre, cover: response.data.file }));
      setCoverFile(coverFile);
    } catch {
      console.log("failed to upload an image.");
    }
  };
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
      setInput((pre) => ({ ...pre, img: response.data.file }));
      setImgFile(imgFile);
    } catch {
      console.log("failed to upload an image.");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.updateUser(input, token);
      if (response.status !== 200) {
        return setError("Something went wrong.");
      }
      profileContext.setUser({ ...profileContext.user, ...input });
      profileContext.setShowEditModal(false);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    await handleUpdateUser();
  };

  return (
    <Modal
      className="w-[350px] px-10 py-12 text-gray-900 flex flex-col justify-center gap-8 bg-white rounded-md shadow-md"
      state={profileContext.showEditModal}
      onClose={() => profileContext.setShowEditModal(false)}
    >
      <h2 className="font-bold text-4xl">Edit Info</h2>

      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        {/* COVER */}
        <div
          className={`aspect-video relative grid bg-gray-400 rounded-md overflow-hidden ${"after:contents-[''] after:w-full after:h-full after:absolute after:left-0 after:top-0 hover:after:bg-gray-700 hover:after:opacity-50"} transition-all`}
          onClick={() => refCoverInput.current.click()}
        >
          {(input.cover || coverFile) && (
            <img src={input.cover || URL.createObjectURL(coverFile)} alt="" />
          )}
        </div>
        {/* PHOTO */}
        <div
          className={`-mt-20 w-32 aspect-square relative self-center grid bg-gray-500 rounded-full overflow-hidden ${"after:contents-[''] after:w-full after:h-full after:absolute after:left-0 after:top-0 hover:after:bg-gray-700 hover:after:opacity-50"} transition-all`}
          onClick={() => refImgInput.current.click()}
        >
          {(input.img || imgFile) && (
            <img src={input.img || URL.createObjectURL(imgFile)} alt="" />
          )}
        </div>

        {/* file upload input */}
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleUploadCover}
          ref={refCoverInput}
        />
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleUploadImg}
          ref={refImgInput}
        />

        {/* form input */}
        <Input
          type={"text"}
          text={"Username"}
          name={"name"}
          value={input.name}
          onChange={handleOnInputChange}
        />
        <Input
          type={"text"}
          text={"City"}
          name={"city"}
          value={input.city}
          onChange={handleOnInputChange}
        />
        <Input
          type={"text"}
          text={"Websit"}
          name={"website"}
          value={input.website}
          onChange={handleOnInputChange}
        />

        {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

        <button
          className="px-12 py-2 block font-semibold text-white bg-blue-400 shadow-lg"
          type="submit"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

function Input({ type = "text", text, name, ...restProps }: IInput) {
  return (
    <div className="flex flex-col">
      <label className="px-1 text-sm font-semibold" htmlFor={name}>
        {text}
      </label>
      <input
        type={type}
        className="px-1 py-1 border-b-2 border-b-gray-500 outline-none"
        placeholder={text}
        name={name}
        {...restProps}
      />
    </div>
  );
}
