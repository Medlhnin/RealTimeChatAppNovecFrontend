import { TestBed } from '@angular/core/testing';

import { SharedRoomService } from './shared-room.service';

describe('SharedRoomService', () => {
  let service: SharedRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
