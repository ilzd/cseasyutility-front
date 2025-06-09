import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LineupService } from '../../services/lineup/lineup.service';
import { RouterModule } from '@angular/router';
import { MapService } from '../../services/map/map.service';
import { MapAreaService } from '../../services/maparea/maparea.service';
import { Map } from '../../models/map.model';
import { MapArea } from '../../models/mapArea.model';
import { Coordinate, Position } from '../../models/common.model';
import { MapPositionSelectorComponent } from '../map-position-selector/map-position-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MapPositionSelectorSceneMode } from '../../models/selector-scene.model';

@Component({
  selector: 'app-lineup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lineup-form.component.html',
})
export class LineupFormComponent implements OnInit {
  form!: FormGroup;
  maps: Map[] = [];
  selectedMap?: Map;
  originArea?: MapArea;
  originCoordinate?: Coordinate;
  destinationArea?: MapArea;
  destinationCoordinate?: Coordinate;
  areas: MapArea[] = [];

  constructor(
    private fb: FormBuilder,
    private lineupService: LineupService,
    private mapService: MapService,
    private mapAreaService: MapAreaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      map: ['', Validators.required],
      originArea: ['', Validators.required],
      originX: [0, Validators.required],
      originY: [0, Validators.required],
      destinationArea: ['', Validators.required],
      destinationX: [0, Validators.required],
      destinationY: [0, Validators.required],
      utility: [4, Validators.required],
      videoURL: ['', Validators.required],
    });

    this.loadMaps();
  }

  loadMaps() {
    this.mapService.getAll().subscribe((maps) => {
      this.maps = maps;
    });
  }

  selectOrigin() {
    if (!this.selectedMap) return;
    const initPosition: Position = {
      area: this.originArea?._id,
      coordinate: this.originCoordinate || { x: 0, y: 0 },
    };
    this.selectPosition(initPosition).subscribe((position: Position) => {
      if (position) {
        this.originArea = this.areas.find((area) => area._id === position.area);
        this.originCoordinate = position.coordinate;
      }
    });
  }

  selectDestination() {
    if (!this.selectedMap) return;
    const initPosition: Position = {
      area: this.destinationArea?._id,
      coordinate: this.destinationCoordinate || { x: 0, y: 0 },
    };
    this.selectPosition(initPosition).subscribe((position: Position) => {
      if (position) {
        this.destinationArea = this.areas.find(
          (area) => area._id === position.area
        );
        this.destinationCoordinate = position.coordinate;
      }
    });
  }

  selectPosition(initPosition?: Position) {
    const _position = new Subject<Position>();
    const dialogRef = this.dialog.open(MapPositionSelectorComponent, {
      width: '900px',
      data: {
        map: this.selectedMap,
        mapAreas: this.areas,
        position: initPosition,
        mode: MapPositionSelectorSceneMode.SELECT
      },
    });

    dialogRef.afterClosed().subscribe((position) => {
      _position.next(position);
    });

    return _position.asObservable();
  }

  onMapChange() {
    const mapId = this.form.value.map;
    if (!mapId) return;
    this.selectedMap = this.maps.find((m) => m._id === mapId);
    this.mapAreaService.getByMap(mapId).subscribe((data) => {
      this.areas = data;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    const payload = {
      title: { pt: value.title },
      description: { pt: value.description },
      map: value.map,
      origin: {
        area: value.originArea,
        coordinate: { x: value.originX, y: value.originY },
      },
      destination: {
        area: value.destinationArea,
        coordinate: { x: value.destinationX, y: value.destinationY },
      },
      utility: value.utility,
      videoURL: value.videoURL,
    };

    this.lineupService.create(payload).subscribe({
      next: () => alert('Lineup criada com sucesso!'),
      error: () => alert('Erro ao criar lineup'),
    });
  }
}
