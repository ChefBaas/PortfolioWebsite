import { AfterViewInit, Component, ElementRef, inject, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WorkDescriptionComponent } from "./work-description/work-description.component";
import { JobSelectorComponent } from "./job-selector/job-selector.component";
import { WorkExperienceService } from './work-experience.service';
import { SelectButtonComponent } from "../shared/select-button/select-button.component";

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [WorkDescriptionComponent, JobSelectorComponent, SelectButtonComponent],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent
{
  workExperieneSerivce:WorkExperienceService = inject(WorkExperienceService);

  onUpdateWorkDescription(index:number)
  {
    this.workExperieneSerivce.setActiveJobDescriptionIndex(index);
  }
}
