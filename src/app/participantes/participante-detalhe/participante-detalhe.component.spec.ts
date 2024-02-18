import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteDetalheComponent } from './participante-detalhe.component';

describe('ParticipanteDetalheComponent', () => {
  let component: ParticipanteDetalheComponent;
  let fixture: ComponentFixture<ParticipanteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipanteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
