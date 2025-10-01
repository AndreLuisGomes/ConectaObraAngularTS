import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarSuporteComponent } from './adicionar-suporte.component';

describe('AdicionarSuporteComponent', () => {
  let component: AdicionarSuporteComponent;
  let fixture: ComponentFixture<AdicionarSuporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarSuporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarSuporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
