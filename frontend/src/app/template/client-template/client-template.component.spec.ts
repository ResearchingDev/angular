import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTemplateComponent } from './client-template.component';

describe('ClientTemplateComponent', () => {
  let component: ClientTemplateComponent;
  let fixture: ComponentFixture<ClientTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
