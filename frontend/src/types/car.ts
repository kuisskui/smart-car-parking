export type Parking = {
  id: string;
  floor: string;
  status: boolean;
};

export type ParkingArray = Array<Parking | undefined>;
