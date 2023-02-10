import type { Dispatch, SetStateAction } from "react";

type FloorSelectionProps = {
  floor: number;
  setFloor: Dispatch<SetStateAction<number>>;
};

const FloorSelection: React.FC<FloorSelectionProps> = ({ floor, setFloor }) => {
  return (
    <div className=" flex h-screen w-80 flex-col items-center bg-base-300  ">
      <h1 className="w-full  pt-5 text-center text-3xl font-bold ">
        Floor <span className="text-5xl text-primary">{floor}</span>
      </h1>
      <div className="divider" />
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        {[1, 2, 3].map((f) => (
          <button
            key={f}
            className={
              "btn w-40 " +
              (f === floor ? "btn-primary " : "btn-ghost bg-base-100")
            }
            onClick={() => {
              setFloor(f);
            }}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelection;
