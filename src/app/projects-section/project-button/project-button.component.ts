import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ColorsService } from '../../shared/colors.service';
import { ProjectDescription } from '../projects.model';

@Component({
  selector: 'app-project-button',
  standalone: true,
  imports: [],
  templateUrl: './project-button.component.html',
  styleUrl: './project-button.component.css'
})
export class ProjectButtonComponent implements AfterViewInit
{
  @Input({required:true}) description!:ProjectDescription

  showOverlay:boolean = false;
  @ViewChild('overlay') overlay!:ElementRef<HTMLDivElement>;
  @ViewChild('buttonContainer') container!:ElementRef<HTMLDivElement>;
  colorsService:ColorsService = inject(ColorsService);

  get imageURL():string
  {
    return '/images/' + this.description.imageURL;
  }

  ngAfterViewInit(): void 
  {
    this.overlay.nativeElement.style.backgroundColor = this.colorsService.getRandomColor();
  }

  onMouseEnterButton():void
  {
    this.showOverlay = true;
  }
  
  onMouseExitButton():void
  {
    this.showOverlay = false;
  }
}