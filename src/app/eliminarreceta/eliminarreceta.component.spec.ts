import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarrecetaComponent } from './eliminarreceta.component';

describe('EliminarrecetaComponent', () => {
  let component: EliminarrecetaComponent;
  let fixture: ComponentFixture<EliminarrecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarrecetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
