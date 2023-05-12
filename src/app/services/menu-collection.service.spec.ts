import { TestBed } from '@angular/core/testing';

import { MenuCollectionService } from './menu-collection.service';

describe('MenuCollectionService', () => {
  let service: MenuCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
