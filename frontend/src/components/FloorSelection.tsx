import type { Dispatch, SetStateAction } from "react";

type FloorSelectionProps = {
  floor: number;
  setFloor: Dispatch<SetStateAction<number>>;
};

const FloorSelection: React.FC<FloorSelectionProps> = ({ floor, setFloor }) => {
  return (
    <div className=" flex h-screen w-80 flex-col items-center bg-base-300  ">
      <h1 className="w-full  p-8 text-center text-3xl font-bold">
        Floor {floor}
      </h1>
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        {[1, 2, 3].map((floor) => (
          <button
            key={floor}
            className="bg-blue-600 btn w-40 "
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
