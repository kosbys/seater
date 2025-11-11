export type Station = {
  id: number;
  name: string;
  computer: boolean;
  monitor: boolean;
};

export type Section = {
  id: number;
  name: string;
  stations: Station[];
};
