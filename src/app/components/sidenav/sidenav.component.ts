import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { NOTE_ICON,REMINDER_ICON,EDIT_ICON,ARCHIVE_ICON,TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  host:{
    class:"app-sidenav-cnt"
  }
})
export class SidenavComponent implements OnInit, OnDestroy {
   drawerState:boolean=false
  subscription!: Subscription
  display:string="flex";
  constructor(private dataService:DataService,private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry) {
    matIconRegistry.addSvgIconLiteral("note-icon", domSanitizer.bypassSecurityTrustHtml(NOTE_ICON)),
    matIconRegistry.addSvgIconLiteral("reminder-icon", domSanitizer.bypassSecurityTrustHtml(REMINDER_ICON)),
    matIconRegistry.addSvgIconLiteral("edit-icon", domSanitizer.bypassSecurityTrustHtml(EDIT_ICON)),
    matIconRegistry.addSvgIconLiteral("archive-icon", domSanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)),
    matIconRegistry.addSvgIconLiteral("trash-icon", domSanitizer.bypassSecurityTrustHtml(TRASH_ICON))
   }

  ngOnInit(): void {
    this.subscription = this.dataService.currDrawerState.subscribe(state =>{
      this.drawerState =state
      this.drawerState ? this.display="none" : this.display="flex" 
    } )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
