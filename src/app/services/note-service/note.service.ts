import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { NoteObj } from 'src/assets/types';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService) { }

  getAllNotesCall() {
    return this.httpService.getAllNotesApi("/Note/GetAllNotes")
  }

  addNoteCall(noteObj: NoteObj) {
    return this.httpService.addNoteApi("/Note/AddNote", noteObj)
  }
  
  archiveCall(NoteId: number){
    return this.httpService.archiveApi(`/Note/ArchiveNote/${NoteId}`)
    
  }

  trashCall(NoteId: number){
    return this.httpService.trashApi(`/Note/TrashNote/${NoteId}`)
  }

  deleteCall(NoteId: number){
    return this.httpService.deleteApi(`/Note/DeleteNote/${NoteId}`)
  }

  colourCall(NoteId: number=0,Colour:string="#ffffff"){
    return this.httpService.colourApi(`/Note/UpdateColour/${NoteId}/${encodeURIComponent(Colour)}`)
  }



}
