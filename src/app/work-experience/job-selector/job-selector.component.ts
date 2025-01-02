import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { WorkExperienceService } from '../work-experience.service';

@Component({
  selector: 'app-job-selector',
  standalone: true,
  imports: [],
  templateUrl: './job-selector.component.html',
  styleUrl: './job-selector.component.css'
})
export class JobSelectorComponent
{
  workExperienceService:WorkExperienceService = inject(WorkExperienceService);
  @Output() circleClicked:EventEmitter<number> = new EventEmitter<number>;

  onClickCircle(index:number):void
  {
    this.circleClicked.emit(index);
  }
}
