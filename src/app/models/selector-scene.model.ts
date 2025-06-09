import { Position } from './common.model';
import { Map } from './map.model';
import { MapArea } from './mapArea.model';

enum MapPositionSelectorSceneMode {
  SELECT = 'SELECT',
  VIEW = 'VIEW',
}

interface MapPositionSelectorSceneData {
  map: Map;
  mapAreas: MapArea[];
  mode: MapPositionSelectorSceneMode;
  position?: Position;
}

export { MapPositionSelectorSceneMode, MapPositionSelectorSceneData };
