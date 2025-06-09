interface I18n {
  pt: string;
}

interface Coordinate {
  x: number;
  y: number;
}

interface Position {
  area?: string;
  coordinate: Coordinate;
}

export {
    I18n,
    Coordinate,
    Position
}