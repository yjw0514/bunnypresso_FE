import React from 'react';

export default function Tooltip() {
  return (
    <div className="after:content-[''] animate-bounce after:border-t-8 after:border-b-transparent after:border-r-transparent after:border-l-transparent after:border-black/50 after:top-10 after:left-1/2 after:absolute after:border after:border-b-4 after:border-l-8 after:border-r-8 after:translate-x-[-50%] text-white rounded-sm px-3 py-2 bg-black/50  w-max">
      You can order here!
    </div>
  );
}
// border-top: 2px solid transparent;
// border-left: 6px solid transparent;
// border-right: 6px solid transparent;
// /* border-bottom: 10px solid #25282a; */
// border-bottom: 10px solid rgba(0, 0, 0, 0.8);
// position: absolute;
// top: -10px;
