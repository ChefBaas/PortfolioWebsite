import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { BackgroundComponent } from "./background/background.component";
import { WorkExperienceComponent } from "./work-experience/work-experience.component";
import { ProjectsSectionComponent } from "./projects-section/projects-section.component";
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BackgroundComponent, WorkExperienceComponent, ProjectsSectionComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
