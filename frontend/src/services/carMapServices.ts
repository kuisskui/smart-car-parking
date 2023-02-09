import type { ParkingArray } from "../types/car";

export const fillCarMap = (carMap: ParkingArray) => {
  carMap = [...carMap];
  carMap.splice(0, 0, undefined);
  carMap.splice(5, 0, undefined);
  carMap.splice(7, 0, undefined, undefined, undefined, undefined);
  carMap.splice(13, 0, undefined);
  carMap.splice(16, 0, undefined);
  carMap.splice(19, 0, undefined);
  carMap.splice(22, 0, undefined);
  carMap.splice(25, 0, undefined);
  carMap.splice(28, 0, undefined);
  carMap.splice(31, 0, undefined);
  carMap.splice(34, 0, undefined);

  return carMap;
};
