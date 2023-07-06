import Image from 'next/image';

const Loading = () => {
  return (
    <div className="pt-[40%] ">
      <div className="relative w-1/2 mx-auto aspect-square">
        <Image
          style={{ objectFit: 'contain' }}
          src="https://banapresso.com/mo/static/media/img_map_loading.c5d15d46f6c2396432fa.gif"
          alt="loading"
          sizes="100%"
          priority
          layout="fill"
        />
      </div>
    </div>
  );
};

export default Loading;
