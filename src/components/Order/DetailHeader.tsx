import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

const DetailHeader = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 right-0 w-full px-3 pt-3 pb-4 flex-between">
      <div className="flex items-center space-x-3">
        <button onClick={() => router.back()}>
          <BiArrowBack size={20} />
        </button>
        <h2 className="font-semibold">메뉴 상세</h2>
      </div>
    </div>
  );
};

export default DetailHeader;
