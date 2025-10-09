import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarGuiaComponent } from './adicionar-guia.component';

describe('AdicionarGuiaComponent', () => {
  let component: AdicionarGuiaComponent;
  let fixture: ComponentFixture<AdicionarGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarGuiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
