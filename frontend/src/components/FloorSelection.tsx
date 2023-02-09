import { useState } from "react";

const FloorSelection = () => {
  const [floor, setFloor] = useState(1);
  return (
    <div className=" flex h-screen w-80 flex-col items-center border-2 border-black ">
      <h1 className="w-full  p-8 text-center text-3xl font-bold">
        Floor {floor}
      </h1>
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        {[1, 2, 3].map((floor) => (
          <button
            key={floor}
            className="btn-primary btn w-40 "
            onClick={() => {
              setFloor(floor);
            }}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelection;