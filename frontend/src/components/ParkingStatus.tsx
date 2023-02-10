type ParkingStatusProps = {
  carParkingRemain: number;
  carRunning: number;
};

const ParkingStatus: React.FC<ParkingStatusProps> = ({
  carParkingRemain,
  carRunning,
}) => {
  return (
    <footer className="footer p-5 bg-neutral text-neutral-content">
      <div className="flex w-full flex-row justify-evenly p-5 ">
        <h1 className="text-5xl"> ที่จอดรถว่าง <span className="text-red-500">{carParkingRemain}</span>  คัน </h1>
        <h1 className="text-5xl "> รถขับวนอยู่ <span className="text-red-500">{carRunning}</span> คัน </h1>
      </div>
    </footer>

  );
};

export default ParkingStatus;
