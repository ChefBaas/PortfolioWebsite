import { AfterViewInit, Component, ElementRef, inject, Input, Output, ViewChild } from '@angular/core';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-select-button, button[selectbutton]',
  standalone: true,
  imports: [],
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.css'
})
export class SelectButtonComponent implements AfterViewInit
{
  @Input({required:true}) backgroundColor!:string;
  @ViewChild('selectbutton') button!:ElementRef<HTMLButtonElement>;

  colorsService:ColorsService = inject(ColorsService);
  color:string;
  active:boolean = false;

  constructor()
  {
    this.color = this.colorsService.getRandomColor();
  }

  ngAfterViewInit(): void 
  {
    this.button.nativeElement.style.color = this.color;
    this.button.nativeElement.style.backgroundColor = this.backgroundColor;
  }

  onMouseOver():void
  {
    this.button.nativeElement.style.color = 'white';
    this.button.nativeElement.style.backgroundColor = this.color;
  }
  
  onMouseLeave():void
  {
    if (!this.active)
    {
      this.button.nativeElement.style.color = this.color;
      this.button.nativeElement.style.backgroundColor = this.backgroundColor;
    }
  }

  onClick():void
  {
    this.active = !this.active;
  }

  activate():void
  {
    this.active = true;
  }

  deactivate():void
  {
    this.active = false;
  }
}
