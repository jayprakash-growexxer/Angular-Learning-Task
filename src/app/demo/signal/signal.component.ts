import { Component, OnInit, signal, effect, WritableSignal, computed, Signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements OnInit {

  constructor() {
    //  consumers : is reading the signal value
    effect(()=> {
      console.log("Count value changed to: ", this.count());
      // untracked() lets you read a signal without making Angular “watch” it.
      untracked(() => console.log("Double Count value is: ", this.num()));
      // console.log("Count value changed to: ", this.num);
    })
   }

  //  producers : signals that hold and manage state
  count : WritableSignal<number>  = signal(0);
  private _count : Signal<number> = this.count.asReadonly(); // private signal variable for read only access
  doubleCount: Signal<number> = computed(()=> this._count() * 2);
  num:WritableSignal<number> = signal(0);
  computedNum: Signal<number> = computed(()=> this.count() * this.num());

  ngOnInit(): void {
  }

  updateCount(value: number) {
    // this.count.set(this.count() + value);
    // this._count.set(this.count() + value);  // Error: Cannot set value of a readonly signal
    this.count.update((current)=> current + value);
    // this.num += value;
  }

}
