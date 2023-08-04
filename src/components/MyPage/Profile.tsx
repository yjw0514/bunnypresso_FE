import { updateProfile } from '@/lib/api/auth';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCameraFill, BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

export default function Profile() {
  const [originName, setOriginName] = useState<string>('');
  const [newName, setNewName] = useState('');
  const [changedName, setChangedName] = useState(false);
  const [profile, setProfile] = useState('');
  const [editMode, setEditMode] = useState(false);
  const profileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOriginName(localStorage.getItem('name') ?? '');
  }, []);

  useEffect(() => {
    setNewName(originName);
  }, [originName]);

  const profileHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    profileRef.current?.click();
  };

  const fileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files && e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const previewImgUrl = reader.result;
        if (previewImgUrl) {
          typeof previewImgUrl !== 'string'
            ? previewImgUrl.toString()
            : setProfile(previewImgUrl);
        }
      };
      formData.append('file', file);
      try {
        await updateProfile(formData);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const editNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== originName) setChangedName(true);
    setNewName(value);
  };

  const saveChangeName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setOriginName(newName);
    setEditMode(false);
    setChangedName(false);
    try {
      await updateProfile({ name: newName });
      localStorage.setItem('name', newName);
    } catch (err) {
      console.log(err);
    }
  };
  const cancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEditMode(false);
    setChangedName(false);
    setNewName(originName);
  };
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex flex-col justify-between mb-3 h-[170px]">
        <div className="relative border border-gray-100 rounded-full shadow-sm w-36 h-36">
          <input
            type="file"
            src={profile}
            ref={profileRef}
            className="absolute top-0 left-0 w-0 h-0"
            hidden
            accept="image/*"
            onChange={fileHandler}
            name="file"
          />
          <button type="button" onClick={profileHandler}>
            <div className="absolute z-20 p-2 bg-gray-400 border-2 border-white rounded-full bottom-1 right-1">
              <BsCameraFill fill="white" />
            </div>
            {profile ? (
              <img
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-full"
                src={profile}
                alt="profile"
              />
            ) : (
              <img
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-full"
                src="https://source.boringavatars.com/beam/?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
                alt="defatulProfile"
              />
            )}
          </button>
        </div>
        {profile ? (
          <button
            className="p-1 text-sm text-center text-gray-500"
            onClick={() => setProfile('')}
          >
            프로필 사진 삭제
          </button>
        ) : null}
      </div>

      <div className="flex justify-between w-full max-w-md px-3 py-4 bg-white border border-gray-200 rounded-lg shadow max-h-1/2 max-h-max">
        <p className="p-2 font-bold text-md">닉네임</p>
        {editMode ? (
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newName}
              maxLength={10}
              onChange={editNameHandler}
              size={12}
              className="w-full p-1 border rounded-md border-primary focus:outline-none"
            />
            <div className="flex items-center space-x-2 ">
              <button
                onClick={cancelEdit}
                className="p-1 text-sm rounded-lg flex-center bg-primary"
              >
                <IoMdClose size={18} color="white" />
              </button>
              <button
                onClick={saveChangeName}
                disabled={!changedName}
                className="p-1 text-sm rounded-lg disabled:bg-gray-300 flex-center bg-primary"
              >
                <BsCheckLg size={18} color="white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="p-1 font-medium text-md">{originName}</span>
            <button
              onClick={() => setEditMode(true)}
              className="p-1 text-sm text-white rounded-lg flex-center bg-primary"
            >
              <AiOutlineEdit size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
