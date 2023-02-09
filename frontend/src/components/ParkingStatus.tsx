type ParkingStatusProps = {
  carParkingRemain: number;
  carRunning: number;
};

const ParkingStatus: React.FC<ParkingStatusProps> = ({
  carParkingRemain,
  carRunning,
}) => {
  return (
    <div className="flex w-full flex-row justify-evenly p-5">
      <h1 className="text-5xl text-green-600"> ที่จอดรถว่าง <span className="text-red-500">{carParkingRemain}</span>  คัน </h1>
      <h1 className="text-5xl text-yellow-600"> รถขับวนอยู่ <span className="text-red-500">{carRunning}</span> คัน </h1>
    </div>
  );
};

export default ParkingStatus;
