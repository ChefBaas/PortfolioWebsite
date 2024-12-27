import { Component } from '@angular/core';
import { NavButtonComponent } from "../nav-button/nav-button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navBarItems:{title:string, sectionName:string, submenuTitles?:string[]}[] = [
    {title:'HOME', sectionName:'home'},
    {title:'EXPERIENCE', sectionName:'experience'},
    {title:'PROJECTS', sectionName:'projects', submenuTitles: ['COMP GEO', 'MUSIC']},
    {title:'CONTACT', sectionName:'contact'}
  ]
}
