import Image from "next/image";
import type { Parking } from "../types/car";

type ParkingLotProps = {
  item: Parking;
  variant: "parking" | "empty";
  rotate?: boolean;
};

const ParkingLot: React.FC<ParkingLotProps> = ({ item, variant, rotate }) => {
  return (
    <div
      style={{
        boxShadow: `0px 0px 100px 0px ${
          variant === "parking" ? "rgba(255, 76, 48,1)" : "rgba(178,222,39,1)"
        } inset`,
        borderRadius: "10%",
      }}
      className=" flex h-full w-full items-center justify-center text-5xl "
      key={item.id + ":" + item.floor}
    >
      <Image
        alt="car"
        width={500}
        height={200}
        src="/car.png"
        className={
          "w-[90%]" +
          " " +
          (variant === "empty" ? "opacity-0" : "") +
          " " +
          (rotate ? "rotate-180" : "")
        }
      />
    </div>
  );
};

export default ParkingLot;
