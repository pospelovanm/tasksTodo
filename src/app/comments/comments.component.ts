import {Component, OnInit} from '@angular/core';
import {DataManager} from "../logic/DataManager";

@Component({
  selector: 'comments',
  templateUrl: "./comments.component.html",
  styleUrls: ['./comments.component.css']

})
export class CommentsComponent {
  commentInput;
  listComments = [];
  itemId;
  constructor (private dataManager: DataManager){
    this.dataManager.dataUpdated.subscribe((data: any) =>{
      if (data == 'comments') {
        this.listComments = this.dataManager.getCommentsByItemId(this.itemId);

        console.log(this.listComments)
      }
    });
    this.dataManager.idUpdated.subscribe((data: any) =>{
      if (data.type == 'currentItemId') {
        this.itemId = data.id;
        this.listComments = this.dataManager.getCommentsByItemId(this.itemId);

      }
    })
  }


  addComment(event, commentInput){
    if (event.ctrlKey && event.keyCode === 13) {
      this.dataManager.addComment(this.itemId, commentInput)
      this.commentInput = '';
    }

  }



}
