import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  date:Date | undefined;

  constructor() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit(): void {
  }

}
