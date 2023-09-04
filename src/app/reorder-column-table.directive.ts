import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { DataTransferDrag } from './app.component';

@Directive({
  selector: '[appReorderColumnTable]',
})
export class ReorderColumnTableDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setDraggable();
  }

  setDraggable() {
    const table = this.el.nativeElement;
    const theaders = table.getElementsByTagName('th');
    for (const header of theaders) {
      header.setAttribute('draggable', true);
    }
  }

  @HostListener('dragstart', ['$event'])
  dragstart(event: any) {
    console.log('dragstart');
    const objTransfer = JSON.stringify({
      title: event.target.innerHTML,
      index: event.srcElement.cellIndex,
    });

    event.dataTransfer.setData('text', objTransfer);
  }

  buildTableOneThead(cellIndex: number) {
    const ul = document.createElement('ul');
    const table = this.el.nativeElement;

    const rows = table.getElementsByTagName('tr');

    const max = rows.length <= 10 ? rows.length : 10;
    for (let i = 0; i < max; i++) {
      const li = document.createElement('li');
      li.innerHTML = rows?.[i].cells[cellIndex];
      ul.appendChild(li);
    }
    return ul;
  }

  @HostListener('drop', ['$event'])
  drop(event: any) {
    event.preventDefault();

    const newIndex = event.srcElement.cellIndex;

    var data = event.dataTransfer.getData('text');
    const dataTransfer = JSON.parse(data) as DataTransferDrag;

    const table = this.el.nativeElement;
    const theaders = table.getElementsByTagName('th');
    const rows = table.getElementsByTagName('tr');

    const headersTitle = [];
    const newIndexes = [];

    for (let index = 0; index < theaders.length; index += 1) {
      if (index === newIndex) {
        headersTitle.push(theaders[dataTransfer.index].innerHTML);
        newIndexes.push(dataTransfer.index);
      }

      if (index !== dataTransfer.index) {
        headersTitle.push(theaders[index].innerHTML);
        newIndexes.push(index);
      }
    }

    for (let n = 0; n < rows?.length; ++n) {
      const _celss: string[] = [];
      for (const a of rows?.[n].cells) {
        _celss.push(a.innerHTML);
      }

      for (let i = 0; i < rows?.[n].cells.length; i += 1) {
        rows[n].cells[i].innerHTML = _celss[newIndexes[i]];
      }
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(evt: any) {
    evt.preventDefault();
  }
}
