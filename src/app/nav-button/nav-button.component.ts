import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ColorsService } from '../shared/colors.service';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css',
})
export class NavButtonComponent
{
  @Input({required:true})title!:string;
  @Input()submenuTitles?:string[];
  @Input({required:true})visible!:boolean;
  @Input({required:true})sectionName!:string;
  @ViewChild('button') button!:ElementRef<HTMLButtonElement>;

  showSubmenu = false;
  randomColor:string = "";
  colorsService:ColorsService = inject(ColorsService);

  constructor()
  {
    this.randomColor = this.colorsService.getRandomColor();
  }

  get link():string
  {
    return "#" + this.sectionName;
  }

  onMouseEnterButton():void
  {
    this.button.nativeElement.style.backgroundColor = this.randomColor;
    this.button.nativeElement.style.color = 'white';
  }

  onMouseLeaveButton():void
  {
    this.button.nativeElement.style.backgroundColor = 'white';
    this.button.nativeElement.style.color = '#333';    
  }

  showMenu():void
  {
    if (this.submenuTitles)
    {
      this.showSubmenu = true;
    }
  }

  hideMenu():void
  {
    this.showSubmenu = false;
  }
}
