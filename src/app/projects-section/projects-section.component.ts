import { Component } from '@angular/core';
import { FilterComponent } from "./filter/filter.component";
import { ScrollableGalleryComponent } from "../shared/scrollable-gallery/scrollable-gallery.component";
import { ProjectButtonComponent } from "./project-button/project-button.component";
import { ProjectDescription } from './projects.model';
import { title } from 'process';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [FilterComponent, ScrollableGalleryComponent, ProjectButtonComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent 
{
  projectDescriptions:ProjectDescription[] = [
    {
      title:'Website',
      description:'Notes on how I built this portfolio website',
      imageURL:'project_logo.jpg'
    },
    {
      title:'Origami Simulator',
      description:'An application that lets you fold a piece of paper however you like',
      imageURL:'origami_dragon.jpg'
    },
    {
      title:'Geometry playground',
      description:'Play with various shapes and do cool things with them',
      imageURL:'geometry.jpg'
    },
    {
      title:'My own board game',
      description:'Dive into Renaissance Florence as a group of art thieves',
      imageURL:'art_heist.jpg'
    },
    {
      title:'Classic games',
      description:'Play some classic games here, such as asteroids and space invaders',
      imageURL:'classic_games.jpg'
    }
  ]
}
