import { fillCarMap } from "../services/carMapServices";
import type { ParkingArray } from "../types/car";
import ParkingLot from "./ParkingLot";


type ParkingMapProps = {
  carParkings: ParkingArray;
};

const ParkingMap: React.FC<ParkingMapProps> = ({ carParkings }) => {
  const data = fillCarMap(carParkings);

  return (
    <>
      <div className="flex h-full w-full flex-row flex-wrap justify-between gap-y-2 p-2 ">
        {data.map((item, index) => {
          if (!item) {
            const turnRight =[7]
            const turnLeft = [10]
            const pillars = [0, 5];
            if(turnRight.includes(index)){
              return (<div className=" w-[16%] overflow-hidden flex items-center justify-center" key={index}>
              <div style={
                {
                transform: "rotate(225deg)"
                
                }
              } className="arrow90" >
                    <span></span>
                    <span></span>
              </div>
          </div>);

            }
            if(turnLeft.includes(index)){
              return (<div className=" w-[16%] overflow-hidden flex items-center justify-center" key={index}>
              <div style={
                {
                transform: "rotate(-45deg)"
                  
                  }
                } className="arrow90" >
                    <span></span>
                    <span></span>
              </div>
          </div>);
            }
            if(index>7&&index<10){
              return (<div className=" w-[16%] overflow-hidden flex items-center justify-center" key={index}>
              <div style={
                {
                transform: "rotate(-90deg)"
                
                }
              } className="arrow" >
                    <span></span>
                    <span></span>
              </div>
          </div>);
            } 
            if(!pillars.includes(index)){
              if(index%6===1){
                return (<div className=" w-[16%] overflow-hidden flex items-center justify-center" key={index}>
                <div style={
                  {
                  transform: "rotate(180deg)"
                  
                  }
                } className="arrow" >
                      <span></span>
                      <span></span>
                </div>
                </div>);
              }
              if(index%6===4){
                return (<div className=" w-[16%] overflow-hidden flex items-center justify-center" key={index}>
                <div style={
                  {
                  transform: "rotate(0deg)"
                  
                  }
                } className="arrow" >
                      <span></span>
                      <span></span>
                </div>
                </div>);
              }
            }
            return <div className="h-20 w-[16%]" key={index}></div>
          } else if (index > 5 && (index % 6 === 2 || index % 6 === 5)) {
            return (
              <div className=" w-[16%] overflow-hidden" key={item.id}>
                {item.status ? (
                  <ParkingLot item={item} variant="parking" rotate={true} />
                ) : (
                  <ParkingLot item={item} variant="empty" />
                )}
              </div>
            );
          }
          return (
            <div className=" w-[16%] overflow-hidden" key={item.id}>
              {item.status ? (
                <ParkingLot item={item} variant="parking" />
              ) : (
                <ParkingLot item={item} variant="empty" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ParkingMap;
