import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjeListComponent } from './proje-list.component';

describe('ProjeListComponent', () => {
  let component: ProjeListComponent;
  let fixture: ComponentFixture<ProjeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjeListComponent]
    });
    fixture = TestBed.createComponent(ProjeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
