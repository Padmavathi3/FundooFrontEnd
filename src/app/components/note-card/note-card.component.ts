import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { NoteService } from 'src/app/services/note-service/note.service';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, EDIT_ICON, IMG_ICON, MORE_ICON, NOTE_ICON, REMINDER_ICON, TRASH_ICON,PIN_ICON,UNARCHIVE_ICON,DELETE_FOREVER_ICON,RESTORE_ICON} from 'src/assets/svg-icons';
import { NoteObj } from 'src/assets/types';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() noteObjList !: NoteObj[]
  @Input() container!: string
  @Output() handleUpdateList = new EventEmitter<{action: string, data: NoteObj}>()
  searchString:string=''
  subscription!:Subscription
  
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private noteService:NoteService,private dataService:DataService) {
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON)),
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON)),
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON)),
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)),
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON)),
    iconRegistry.addSvgIconLiteral('pin-icon', sanitizer.bypassSecurityTrustHtml(PIN_ICON)),
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON)),
    iconRegistry.addSvgIconLiteral('delete-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON)),
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON))    
  }

  ngOnInit(): void {
    console.log(this.noteObjList); 
    this.subscription=this.dataService.currSearchString.subscribe(res=>this.searchString=res)
  }

  handleNoteIconsClick(action: string, data: NoteObj) {
    //api call
    if (action === "archive" || action === "unarchive") {
      this.noteService.archiveCall(data.noteId || 0).subscribe(() => {
        this.handleUpdateList.emit({action: action, data: data})
      }, (err: any) => console.log(err));
    }
    else if(action === "trash"){
      this.noteService.trashCall(data.noteId || 0).subscribe(() => {
        this.handleUpdateList.emit({action: action, data: data})
      }, (err: any) => console.log(err));
    }
    else if(action==="delete"){
      this.noteService.deleteCall(data.noteId||0).subscribe(()=>{
        this.handleUpdateList.emit({action: action, data: data})
      }, (err: any) => console.log(err));     
    }
    else{
      this.noteService.colourCall(data.noteId,action).subscribe(res=>this.handleUpdateList.emit({action:"colour",data:{...data, isColour:action}})

      )
    }
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
