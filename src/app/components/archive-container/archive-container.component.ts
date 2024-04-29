import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { NoteObj } from 'src/assets/types';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent implements OnInit {
  archvieNotesList: NoteObj[] = []
  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(res => {
      //console.log(res.data);
      this.archvieNotesList = res.data.filter((note: NoteObj)=> note.isArchive===true)
      //this.notesList = [...res.data]
    },
    (err) => {
      console.log(err);
    }
    )
  }

  updateNotesList($event: {action: string, data: NoteObj}) {
    
     if ($event.action === "unarchive" || $event.action == "trash") {
      this.archvieNotesList = this.archvieNotesList.filter(note => note.noteId != $event.data.noteId)
    }
  }

}
