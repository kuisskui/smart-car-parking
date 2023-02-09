const empty = [
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [7, 5],
  [1, 1],
  [1, 6],
];

const checkMarkEmpty = (row: number, col: number) => {
  if (
    empty.filter((item) => {
      return item[0] === row && item[1] === col;
    }).length > 0
  ) {
    return true;
  }
  return false;
};

const ParkingMap = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between p-10">
      {[1, 2, 3, 4, 5, 6].map((row) => {
        return (
          <div className="flex flex-row justify-between gap-2" key={row}>
            {[1, 2, 3, 4, 5, 6].map((col) => {
              if (checkMarkEmpty(row, col)) {
                return <div className="w-[17%]" key={col}></div>;
              }
              return (
                <div className=" btn w-[17%] text-5xl" key={col}>
                  🚗
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ParkingMap;
