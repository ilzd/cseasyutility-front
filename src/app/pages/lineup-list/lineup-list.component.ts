import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineupService } from '../../services/lineup/lineup.service';
import { RouterModule } from '@angular/router';
import { Lineup } from '../../models/lineup.model';

@Component({
  selector: 'app-lineup-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lineup-list.component.html'
})
export class LineupListComponent implements OnInit {
  lineups: Lineup[] = [];

  constructor(private lineupService: LineupService) {}

  ngOnInit() {
    this.lineupService.getAll().subscribe((data) => {
      this.lineups = data;
    });
  }
}
