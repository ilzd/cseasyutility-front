import { I18n, Position } from './common.model';

enum Utility {
  FLASHBANG,
  HE,
  MOLOTOV,
  INCENDIARY,
  SMOKE,
}

interface Lineup {
  _id?: string;
  title: I18n;
  description: I18n;
  map: string;
  origin: Position;
  destination: Position;
  utility: Utility;
  videoURL: string;
}

export { Lineup, Utility };
