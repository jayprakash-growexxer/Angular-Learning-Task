import { Component, OnInit, signal, effect, WritableSignal, computed, Signal, untracked, isSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface person {
  name: string,
  age: number
}
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
      // console.log("Count value changed to: ", this.count());
      console.log("Name value changed to: ", this.person());
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

  person : WritableSignal<person[]> = signal<person[]>([], {
    equal: (prev, curr)=> {
      console.log('EQUAL CHECK');
      console.log('Prev:', prev);
      console.log('Curr:', curr);

      if (prev.length !== curr.length) {
        console.log('Length changed → update');
        return false;
      }

      const isSame = prev.every((p, i) =>
        p.name === curr[i].name && p.age === curr[i].age
      );
      console.log(isSame ? 'No real change' : 'Real change detected');
      return isSame;

      // return JSON.stringify(prev) === JSON.stringify(curr)
    }
  });
  name: string = '';
  age: number = 0;

  ngOnInit(): void {
  }

  updateCount(value: number) {
    // this.count.set(this.count() + value);
    // this._count.set(this.count() + value);  // Error: Cannot set value of a readonly signal
    this.count.update((current)=> current + value);
    // this.num += value;
  }

  updateNames(){
    const current = this.person();
    const newPerson = { name: this.name, age: this.age };

    const exists = current.some((p)=> p.name === newPerson.name && p.age === newPerson.age);
    console.log("Exists: ", exists);
    if (!exists) {
      this.person.set([...current, newPerson])
    }
    console.log("Current Persons: ", this.person());
    console.log("isSignal: ", isSignal(this.name));
    // if (!current.includes(this.name)) {
    //   this.person.set([...current, this.name]);
    //   this.name = '';
    // }
  }

}
