import { TestBed } from '@angular/core/testing';

import { MapareaService } from './maparea.service';

describe('MapareaService', () => {
  let service: MapareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
