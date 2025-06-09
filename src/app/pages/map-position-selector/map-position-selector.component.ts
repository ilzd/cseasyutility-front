// map-position-selector.component.ts
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import MapPositionSelectorScene from './map-position-selector.scene';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Position } from '../../models/common.model';
import { Subject, takeUntil } from 'rxjs';
import { MapPositionSelectorSceneData } from '../../models/selector-scene.model';

@Component({
  selector: 'app-map-position-selector',
  templateUrl: './map-position-selector.component.html',
  styleUrls: ['./map-position-selector.component.scss'],
})
export class MapPositionSelectorComponent implements OnInit, OnDestroy {
  game?: Phaser.Game;
  selectedPosition?: Position;
  _componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<MapPositionSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MapPositionSelectorSceneData
  ) {}

  ngOnInit(): void {
    this.initPhaser();
  }

  ngOnDestroy(): void {
    this.game?.destroy(true);
    this._componentDestroyed.next();
    this._componentDestroyed.complete();
  }

  initPhaser(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-container',
    };
    this.game = new Phaser.Game(config);

    const scene = new MapPositionSelectorScene(this.data);
    this.game.scene.add('MapPositionSelectorScene', scene, true);

    scene._onPositionUpdated
      .pipe(takeUntil(this._componentDestroyed))
      .subscribe((position: Position) => {
        this.selectedPosition = position;
      });
  }

  confirm(): void {
    this.dialogRef.close(this.selectedPosition);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
