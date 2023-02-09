import Image from "next/image";
import { fillCarMap } from "../services/carMapServices";
import type { ParkingArray } from "../types/car";

type ParkingMapProps = {
  carParkings: ParkingArray;
};

const ParkingMap: React.FC<ParkingMapProps> = ({ carParkings }) => {
  const data = fillCarMap(carParkings);

  return (
    <>
      <div className="flex h-full w-full flex-row flex-wrap justify-between gap-y-2 p-2">
        {data.map((item, index) => {
          if (!item) {
            return <div className="h-20 w-[16%]" key={index}></div>;
          }
          else if(index>5 && (index %6 ===2|| index %6 ===5)){
            return(<div className=" w-[16%] overflow-hidden" key={item.id}>
            {item.status ? (
              <div
                style={{
                  boxShadow: "0px 0px 100px 0px rgba(255, 76, 48,1) inset",
                  borderRadius: "10%",
                }}
                className=" flex h-full w-full items-center justify-center text-5xl "
                key={item.id}
              >
                <Image
                  alt="car"
                  width={500}
                  height={200}
                  src="/car.png"
                  className={`rotate-180 w-[90%]`}
                />
              </div>
            ) : (
              <div
                style={{
                  boxShadow: "0px 0px 100px 0px rgba(178,222,39,1) inset",
                  borderRadius: "10%",
                  
                }}
                className=" flex h-full  w-full items-center justify-center text-5xl "
                key={item.id}
              >
                <Image
                  alt="car"
                  width={500}
                  height={200}
                  src="/car.png"
                  className="w-[90%] opacity-0 "
                />
              </div>
            )}
          </div>);
          }
          return (
            <div className=" w-[16%] overflow-hidden" key={item.id}>
              {item.status ? (
                <div
                  style={{
                    boxShadow: "0px 0px 100px 0px rgba(255, 76, 48,1) inset",
                    borderRadius: "10%",
                  }}
                  className=" flex h-full w-full items-center justify-center text-5xl "
                  key={item.id}
                >
                  <Image
                    alt="car"
                    width={500}
                    height={200}
                    src="/car.png"
                    className={`rotate-0 w-[90%]`}
                  />
                </div>
              ) : (
                <div
                  style={{
                    boxShadow: "0px 0px 100px 0px rgba(178,222,39,1) inset",
                    borderRadius: "10%",
                  }}
                  className=" flex h-full  w-full items-center justify-center text-5xl "
                  key={item.id}
                >
                  <Image
                    alt="car"
                    width={500}
                    height={200}
                    src="/car.png"
                    className="w-[90%] opacity-0 "
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ParkingMap;
