import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DataManager} from "../logic/DataManager";

@Component({
  selector: 'items',
  templateUrl: "./items-list.component.html",
  styleUrls: ['./items-list.component.css']

})
export class ItemsListComponent implements OnInit{
  listItems = [];
  itemInput;
  currentItemId;

  constructor (private dataManager: DataManager){
    this.dataManager.dataUpdated.subscribe((data: any) =>{
        if (data == 'items' || data == 'comments') {
          this.showItems()
        }
    })
  }

  ngOnInit () {
    this.showItems();
  }

  showItems() {
    this.listItems = this.dataManager.getItems()
    this.listItems.forEach(x => x.numberOfComments = this.dataManager.getCommentsByItemId(x.id).length)

  }

  addTodo(item: string) {
    this.dataManager.addItem(item);
    this.itemInput = '';


  }

  removeItem (id){
    this.dataManager.removeItemAndComments(id)
    if(this.currentItemId == id) {
      this.currentItemId = undefined;
      this.dataManager.sendItemId(this.currentItemId);
    }
  }

  chooseItemToComment(id){
    this.currentItemId = id;
    this.dataManager.sendItemId(id)
  }

}
