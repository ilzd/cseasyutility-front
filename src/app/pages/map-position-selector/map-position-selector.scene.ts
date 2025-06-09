import { Observable, Subject } from 'rxjs';
import { Position } from '../../models/common.model';
import { Map } from '../../models/map.model';
import { MapArea } from '../../models/mapArea.model';
import {
  MapPositionSelectorSceneData,
  MapPositionSelectorSceneMode,
} from '../../models/selector-scene.model';

export default class MapPositionSelectorScene extends Phaser.Scene {
  selectedPosition?: Position;
  map: Map;
  mapAreas: MapArea[];
  mode: MapPositionSelectorSceneMode;
  position?: Position;
  areaPolygons: Phaser.GameObjects.Polygon[] = [];
  positionIndicator?: Phaser.GameObjects.Ellipse;
  _onPositionUpdated: Subject<Position> = new Subject<Position>();

  constructor({ map, mapAreas, mode, position }: MapPositionSelectorSceneData) {
    super({ key: 'MapPositionSelectorScene' });
    this.map = map;
    this.mapAreas = mapAreas;
    this.mode = mode;
    this.position = position;
  }

  preload(): void {
    this.load.image('map', this.map.mapImage);
  }

  create(): void {
    this.buildMap();

    if (this.mode === MapPositionSelectorSceneMode.SELECT) {
      this.initSelectMode();
    } else if (this.mode === MapPositionSelectorSceneMode.VIEW) {
      this.initViewMode();
    }
  }

  buildMap() {
    this.add.image(0, 0, 'map').setOrigin(0);
  }

  initSelectMode() {
    this.mapAreas.forEach((area) =>
      this.areaPolygons.push(this.createMapArea(area))
    );

    if (this.position) this.updatePosition(this.position);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const polygon = this.areaPolygons.find((area) =>
        area.getBounds().contains(pointer.x, pointer.y)
      );

      const area: MapArea | undefined = polygon?.getData('area');
      const areaId = area?._id;

      const position: Position = {
        area: areaId,
        coordinate: { x: pointer.x, y: pointer.y },
      };
      this.updatePosition(position);
    });
  }

  initViewMode() {
    if (this.position) {
      this.updatePosition(this.position);
    }
  }

  createMapArea(area: MapArea) {
    const areaPolygon = this.add
      .polygon(0, 0, area.region, 0x00ff00, 0.1)
      .setData('area', area)
      .setOrigin(0);

    areaPolygon.setInteractive(
      new Phaser.Geom.Polygon(area.region),
      Phaser.Geom.Polygon.Contains
    );

    areaPolygon
      .on('pointerover', () => {
        areaPolygon.setFillStyle(0x00ff00, 0.25);
      })
      .on('pointerout', () => {
        areaPolygon.setFillStyle(0x00ff00, 0.1);
      });

    return areaPolygon;
  }

  updatePosition(position: Position): void {
    this.selectedPosition = position;
    this._onPositionUpdated.next(position);

    if (!this.positionIndicator) {
      this.positionIndicator = this.add.ellipse(
        position.coordinate.x,
        position.coordinate.y,
        10,
        10,
        0xff0000,
        0.8
      );
      return;
    }

    this.positionIndicator.setPosition(
      position.coordinate.x,
      position.coordinate.y
    );

    this._onPositionUpdated.next(position);
  }

  $onPositionUpdated(): Observable<Position> {
    return this._onPositionUpdated.asObservable();
  }
}
