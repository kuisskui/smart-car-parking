type ParkingStatusProps = {
  carParkingRemain: number;
  carRunning: number;
};

const ParkingStatus: React.FC<ParkingStatusProps> = ({
  carParkingRemain,
  carRunning,
}) => {
  return (
    <footer className="flex h-[300px] items-center justify-center bg-neutral text-neutral-content  sm:h-[128px]">
      <div className="flex w-full flex-col  justify-evenly sm:flex-row  ">
        <h1 className="text-5xl">
          ที่จอดรถว่าง
          <span className="px-4 text-error">{carParkingRemain}</span>คัน
        </h1>
        <h1 className="text-5xl ">
          รถขับวนอยู่<span className="px-4 text-error">{carRunning}</span>คัน
        </h1>
      </div>
    </footer>
  );
};

export default ParkingStatus;
