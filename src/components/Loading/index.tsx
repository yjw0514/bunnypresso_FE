import Image from 'next/image';

const Loading = () => {
  return (
    <div className="pt-[40%] ">
      <div className="relative w-1/2 mx-auto aspect-square">
        <Image
          src="https://banapresso.com/mo/static/media/img_map_loading.c5d15d46f6c2396432fa.gif"
          alt="loading"
          style={{ objectFit: 'contain' }}
          priority
          layout="fill"
          sizes="100%"
        />
      </div>
    </div>
  );
};

export default Loading;
