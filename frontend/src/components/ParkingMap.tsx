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

type Parking = {
  id: string;
  floor: string;
  status: boolean;
};

// const checkMarkEmpty = (row: number, col: number) => {
//   if (
//     empty.filter((item) => {
//       return item[0] === row && item[1] === col;
//     }).length > 0
//   ) {
//     return true;
//   }
//   return false;
// };

const genMockData = () => {
  const mockData: Array<Parking | undefined> = [];

  for (let i = 1; i <= 22; i++) {
    mockData.push({
      id: i.toString(),
      floor: "1",
      status: Math.random() >= 0.5,
    });
  }

  return mockData;
};

const ParkingMap = () => {
  const data = genMockData();

  data.splice(0, 0, undefined);
  data.splice(5, 0, undefined);
  data.splice(7, 0, undefined, undefined, undefined, undefined);
  data.splice(13, 0, undefined);
  data.splice(16, 0, undefined);
  data.splice(19, 0, undefined);
  data.splice(22, 0, undefined);
  data.splice(25, 0, undefined);
  data.splice(28, 0, undefined);
  data.splice(31, 0, undefined);
  data.splice(34, 0, undefined);
  console.log(data);
  return (
    <>
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">mock data</div>
        <div className="collapse-content overflow-scroll">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>

      <div className="flex h-full w-full flex-row flex-wrap justify-between ">
        {data.map((item, index) => {
          if (!item) {
            return <div className="h-20 w-[16%]" key={index}></div>;
          }
          return (
            <div
              className="h-20 w-[16%] overflow-hidden border-2 border-red-500"
              key={item.id}
            >
              {item.status ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-green-500"></div>
                  <div className="text-xs">{item.id}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-red-500"></div>
                  <div className="text-xs">{item.id}</div>
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
