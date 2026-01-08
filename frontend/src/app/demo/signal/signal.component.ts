import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements OnInit {

  constructor() {
    effect(()=> {
      console.log("Count value changed to: ", this.count());
      // console.log("Count value changed to: ", this.num);
    })
   }
  count = signal(0);
  num = 0;

  ngOnInit(): void {
  }

  updateCount(value: number) {
    this.count.set(this.count() + value);
    // this.num += value;
  }

}
