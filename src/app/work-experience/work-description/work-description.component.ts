import { Component, inject } from '@angular/core';
import { type ExperienceData } from '../experience.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { WorkExperienceService } from '../work-experience.service';

@Component({
  selector: 'app-work-description',
  standalone: true,
  imports: [],
  templateUrl: './work-description.component.html',
  styleUrl: './work-description.component.css'
})
export class WorkDescriptionComponent
{
  jobExperienceService:WorkExperienceService = inject(WorkExperienceService);
  activeJobDescription!:ExperienceData;

  constructor()
  {
    this.updateJobExperience();
    this.jobExperienceService.onActiveJobChanged.subscribe(() => this.updateJobExperience());
  }

  get videoURL():SafeResourceUrl
  {
    return this.activeJobDescription.safeVideoURL;
  }
  get title():string
  {
    return this.activeJobDescription.title;
  }
  get description():string
  {
    return this.activeJobDescription.description;
  }
  get responsibilities():string[]
  {
    return this.activeJobDescription.responsibilities;
  }
  get websiteURL():string
  {
    return this.activeJobDescription.websiteURL;
  }

  updateJobExperience():void
  {
    this.activeJobDescription = this.jobExperienceService.getActiveJob();
  }
}
