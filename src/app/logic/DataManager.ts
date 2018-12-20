import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class DataManager {
  dataUpdated: EventEmitter<any>;
  idUpdated: EventEmitter<any>;

  constructor() {
    this.dataUpdated = new EventEmitter<any>();
    this.idUpdated = new EventEmitter<any>()
  }

  getItems() {
    let items = [];
    let len = localStorage.length;
    for (let itemsCou = 0; itemsCou < len; itemsCou++) {
      let key = localStorage.key(itemsCou);
      let item = localStorage.getItem(key);
      if (!key.includes('_')) {
        items.push({item: item, id:key})
      }
    }

    return items;

  }


  addItem(item: string) {
    if(item) {
      let date = new Date();
      let time = date.getTime().toString();
      localStorage.setItem(time, item);
    }
    // notify about changes
    this.dataUpdated.emit('items');
  }

  removeItemAndComments (id) {
    // also remove comments for item
    localStorage.removeItem(id);
    this.deleteCommentsForItem(id);
    this.dataUpdated.emit('items')

  }
  sendItemId(id) {
    this.idUpdated.emit({type: 'currentItemId', id: id});
  }

  deleteCommentsForItem(itemId){
    let len = localStorage.length;
    for (let commentsCou = len-1; commentsCou >= 0; commentsCou--) {
      let key = localStorage.key(commentsCou);
      let res = key.split('_')
      if (res.length == 2 && res[0] == itemId) {
        localStorage.removeItem(key)
      }
    }
    this.dataUpdated.emit('comments')
  }

  getCommentsByItemId(itemId) {
    let comments = [];
    let len = localStorage.length;
    for (let commentsCou = 0; commentsCou < len; commentsCou++) {
      let key = localStorage.key(commentsCou);
      let res = key.split('_')
      if (res.length == 2 && res[0] == itemId) {
        let comment = localStorage.getItem(key);
        comments.push({comment: comment, id: key})
      }
      comments.sort()
    }
    return comments;
  }

  addComment(itemId, comment) {
    if(comment) {
      let date = new Date();
      let time = date.getTime().toString();
      localStorage.setItem(itemId + '_' + time, comment);
    }
    // notify about changes
    this.dataUpdated.emit('comments');
  }


}
