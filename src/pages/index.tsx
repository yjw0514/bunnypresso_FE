import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="container h-screen">
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg flex-center bg-[#dbdbdb]">
            <BsFillPersonFill size="34" color="#F3F3F3" />
          </div>
          <div className="font-semibold text-black text-md">
            <div>
              0000님, <br />
              안녕하세요!
            </div>
          </div>
        </div>
      )}

      <button className="fixed px-2 py-1 text-sm font-semibold border rounded-md top-4 right-4 text-primary border-primary">
        {isLoggedIn ? 'Logout' : 'SignIn'}
      </button>

      <div className="bg-clip-text bg-gradient-to-r from-pink-200 to-primary text-3xl mt-[8rem] font-bold text-transparent text-center ">
        Welcome to <br />
        BananaPresso
      </div>
    </div>
  );
}
