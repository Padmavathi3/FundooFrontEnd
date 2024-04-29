import { Component, OnInit } from '@angular/core';
import { MENU_ICON,SEARCH_ICON,REFRESH_ICON,SETTING_ICON,LIST_VIEW_ICON} from '../../../assets/svg-icons';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-fundoo-header',
  templateUrl: './fundoo-header.component.html',
  styleUrls: ['./fundoo-header.component.scss']
})
export class FundooHeaderComponent implements OnInit {
  drawerState:boolean=false
  subscription!:Subscription
  searchString:string=''

  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dataService:DataService) { 
    matIconRegistry.addSvgIconLiteral("menu-icon", domSanitizer.bypassSecurityTrustHtml(MENU_ICON)),
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("refresh-icon", domSanitizer.bypassSecurityTrustHtml(REFRESH_ICON)),
    matIconRegistry.addSvgIconLiteral("setting-icon", domSanitizer.bypassSecurityTrustHtml(SETTING_ICON)),
    matIconRegistry.addSvgIconLiteral("listView-icon", domSanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
   }

  ngOnInit(): void {
    this.subscription = this.dataService.currDrawerState.subscribe(state => this.drawerState =state)
  }

  handleDrawerClick(){
    this.dataService.changeDrawerState(!this.drawerState)
  }

  handleSearchString(){
     this.dataService.updateSearchString(this.searchString)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
