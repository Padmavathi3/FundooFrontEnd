import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { NoteObj } from 'src/assets/types';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notesList: NoteObj[] = []
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(res => {
      console.log(res.data);
      this.notesList = res.data.filter((note:NoteObj) => !note.isArchive && !note.isTrash)
      //this.notesList = [...res.data]
    }
    )
  }
  

  updateNotesList($event: {action: string, data: NoteObj}) {
    if($event.action === 'create') {
      this.notesList = [$event.data, ...this.notesList]
    } else if ($event.action === "archive" || $event.action == "trash") {
      this.notesList = this.notesList.filter(note => note.noteId != $event.data.noteId)
    }
    else
    {
      this.notesList = this.notesList.map(note => 
        {if (note.noteId === $event.data.noteId)
          {
            return $event.data
          }
          return note
        })
    }
  }
}
