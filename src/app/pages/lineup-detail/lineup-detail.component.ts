import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LineupService } from '../../services/lineup/lineup.service';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lineup-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lineup-detail.component.html',
})
export class LineupDetailComponent implements OnInit {
  lineup: any = null;
  sanitizedVideoUrl: any = null;

  constructor(
    private route: ActivatedRoute,
    private service: LineupService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getById(id).subscribe((data) => {
        this.lineup = data;
        this.sanitizedVideoUrl = this.getSafeVideoUrl(data.videoURL);
      });
    }
  }

  getUtilityName(utility: number) {
    return (
      ['Flashbang', 'HE', 'Molotov', 'Incendiary', 'Smoke'][utility] ??
      'Desconhecida'
    );
  }

  getSafeVideoUrl(url: string) {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return null;

    const videoId = url.includes('youtube.com')
      ? new URL(url).searchParams.get('v')
      : url.split('/').pop();

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
