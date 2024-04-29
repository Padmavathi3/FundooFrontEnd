import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { NoteObj } from 'src/assets/types';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent implements OnInit {
  trashNotesList: NoteObj[] = []
  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(res => {
      //console.log(res.data);
      this.trashNotesList = res.data.filter((note: NoteObj)=> note.isTrash===true)
      //this.notesList = [...res.data]
    },
    (err) => {
      console.log(err);
    }
    )
  }

  updateNotesList($event: {action: string, data: NoteObj}) {
    
     if ($event.action == "trash" || $event.action ==="delete") {
      this.trashNotesList = this.trashNotesList.filter(note => note.noteId != $event.data.noteId)
    }
  }

}
