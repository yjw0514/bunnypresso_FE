import { updateProfile } from '@/lib/api/auth';
import Image from 'next/image';
import React, {
  ButtonHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
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

  const profileHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    profileRef.current?.click();
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="relative mb-6 border border-gray-100 rounded-full shadow-sm w-36 h-36">
        {profile ? (
          <img
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-full"
            src={profile}
            alt="profile"
            onClick={profileHandler}
          />
        ) : (
          <img
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-full"
            src="https://source.boringavatars.com/beam/?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
            alt="defatulProfile"
            onClick={profileHandler}
          />
        )}
        <input
          type="file"
          src={profile}
          ref={profileRef}
          className="absolute top-0 left-0 w-0 h-0"
          accept="image/*"
          onChange={fileHandler}
        />
      </div>
      <div className="relative">
        {editMode ? (
          <input
            type="text"
            value={newName}
            maxLength={10}
            onChange={editNameHandler}
            size={12}
            className="w-full p-2 border rounded-md border-primary focus:outline-none"
          />
        ) : (
          <span className="text-lg font-bold">{originName}</span>
        )}
        {editMode ? (
          <div className="absolute -translate-y-1/2 top-1/2 -right-16 ">
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
          <button
            onClick={() => setEditMode(true)}
            className="absolute p-1 text-sm text-white -translate-y-1/2 rounded-lg top-1/2 -right-10 flex-center bg-primary"
          >
            <AiOutlineEdit size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
