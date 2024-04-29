import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TICK_ICON,BRUSH_ICON,IMG_ICON,REMINDER_ICON,COLLABRATOR_ICON,COLOR_PALATTE_ICON,ARCHIVE_ICON,MORE_ICON,PIN_ICON,UNDO_ICON,REDO_ICON} from 'src/assets/svg-icons';
import { NoteObj } from 'src/assets/types';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  host:{
    class:"app-create-note-cnt"
  }
})
export class CreateNoteComponent implements OnInit {
  @Output() handleUpdateList = new EventEmitter<{action: string, data: NoteObj}>()

  title: string = ""
  description: string = ""
  showMsg: boolean= true
  constructor(private noteService: NoteService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral("tick-icon", sanitizer.bypassSecurityTrustHtml(TICK_ICON)),
    iconRegistry.addSvgIconLiteral("brush-icon", sanitizer.bypassSecurityTrustHtml(BRUSH_ICON)),
    iconRegistry.addSvgIconLiteral("image-icon", sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON)),
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON)),
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON)),
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON)),
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)),
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON)),
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON)),
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(REDO_ICON))    
    
   }

  ngOnInit(): void {
  }

  handleCreateNote(action: string){
    this.showMsg = !this.showMsg

    if(action === 'open' || this.title==="" || this.description==="") return

    this.noteService.addNoteCall({title: this.title, description: this.description}).subscribe(res => {
      console.log(res.data)
      this.handleUpdateList.emit({action: "create", data: res.data})
      })
  }
}
