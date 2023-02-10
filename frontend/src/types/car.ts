export type Parking = {
  id: string;
  floor: string;
  status: boolean;
};

export type ParkingArray = Array<Parking | undefined>;

export type CountData = {
  floor: string;
  running_count: number;
  remaining_parking: number;
};
