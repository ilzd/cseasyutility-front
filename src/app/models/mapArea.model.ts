import { I18n, Coordinate } from './common.model';

interface MapArea {
  _id?: string;
  map: string;
  name: I18n;
  region: Coordinate[];
}

export { MapArea };
