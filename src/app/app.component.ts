import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'table-reorder-columns';
}

export interface DataTransferDrag {
  title: string;
  index: number;
  target: any;
}
