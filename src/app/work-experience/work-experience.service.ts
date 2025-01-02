import { EventEmitter, Injectable, Output } from "@angular/core";
import { ExperienceData } from "./experience.model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Injectable({
    providedIn:'root'
})
export class WorkExperienceService
{
    activeJobDescription:number = 0;
    jobDescriptionData:ExperienceData[] = 
    [
      {
        videoURL:"https://www.youtube.com/embed/mgSmIFA_IsM",
        safeVideoURL:"",
        title: "Game Programmer for Springlab (2018 - 2022)",
        description: "For Springlab I developed embodied learning games: games with educative content where players are physically very active. Here I learnt a lot of new C# and Unity skills, as well as got into the habit of thinking from the perspective of the player. I see the latter as the most valuable skill.",
        responsibilities:
        [
          "Create 2D games with motion capture input independently",
          "Contribute to the platform behind the games; for example communication between PC, tablet and beamer",
          "Contribute to the games' design in an early stage and discuss ideas with partners",
          "Supervise a game development intern"
        ],
        websiteURL: "https://www.springlab.nl",
        year: "2018",
        shortTitle: "Game Programmer",
        id:0
      },
      {
        videoURL:"https://www.youtube.com/embed/hwa-PFa6By8",
        safeVideoURL:"",
        title: "HBO Teacher for Saxion CMGT (2022 - 2023)",
        description: "At Saxion I taught at CMGT, a broad study that applies game technology in various fields. Within this context, CMGT teaches the fundamentals of art, design, and software development. I developed a lot of teaching skills during my year at Saxion.",
        responsibilities:
        [
          "Teach 1st and 2nd year game programming courses, mostly focused on C#",
          "Supervise 1st and 2nd year student projects",
          "Guide 2nd year personal portfolio assignments",
          "Supervise 3rd year internships"
        ],
        websiteURL: "https://www.saxion.edu/programmes/bachelor/creative-media-and-game-technologies",
        year: "2022",
        shortTitle: "HBO Teacher",
        id:1
      },
      {
        videoURL:"https://www.youtube.com/embed/loLH7T3IJHk",
        safeVideoURL:"",
        title: "Application Manager for the Dutch Police (2023 - 2024)",
        description: "I was involved in a huge IT project where an application used by tens of thousands of police officers was being built. I had a lot of freedom to decide my own work and learnt to deal with that freedom, as well as gain experience in a large-scale IT project.",
        responsibilities:
        [
          "Refine large feature requests into bite-sized stories for development teams",
          "Develop an e-learning for an important module in the application",
          "Develop an on-boarding program for new colleagues",
          "Provide secondary support to colleagues that worked with systems tied to our application"
        ],
        websiteURL: "https://www.politie.nl/",
        year: "2023",
        shortTitle: "Application Manager",
        id:2
      },
      {
        videoURL:"https://www.youtube.com/embed/dT4hLudO-is",
        safeVideoURL:"",
        title:"New colleague for your company? (2025 - ~2065?)",
        description:"I am looking for a job. I love working as a programmer on visual applications, though I'd prefer not to do that exclusively. My biggest motivation is being able to talk to the people I'm building software for and asking them: what do you need from us?",
        responsibilities:
        [
          "Develop applications using C# or a similar language, Angular, TypeScript, CSS and/or HTML",
          "Contribute to the application's UX design",
          "Communicate with users; what do they need from the application, as well as teaching/assisting them in how to use it",
          "Organise fun activities for colleagues",
          "Contribute to a social and open working atmosphere"
        ],
        websiteURL:"[this website]",
        year: "2025",
        shortTitle: "Yours?",
        id:3
      }
    ];
    sanitizer:DomSanitizer;
    safeURLs:SafeResourceUrl[] = [];

    @Output() onActiveJobChanged:EventEmitter<void> = new EventEmitter<void>;

    constructor(sanitizer:DomSanitizer)
    {
        this.sanitizer = sanitizer;
        for (let i:number = 0; i < this.jobDescriptionData.length; i++)
        {
            this.jobDescriptionData[i].safeVideoURL = sanitizer.bypassSecurityTrustResourceUrl(this.jobDescriptionData[i].videoURL);
        }
    }

    getActiveJob():ExperienceData
    {
        return this.jobDescriptionData[this.activeJobDescription];
    }

    setActiveJobDescriptionIndex(index:number)
    {
        this.activeJobDescription = index;
        this.onActiveJobChanged.emit();
    }
}