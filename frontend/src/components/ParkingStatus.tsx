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
      <h1 className="text-5xl"> ที่จอดรถว่าง {carParkingRemain} คัน </h1>
      <h1 className="text-5xl"> รถขับวนอยู่ {carRunning} คัน </h1>
    </div>
  );
};

export default ParkingStatus;
