import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private collapsed: boolean;
  private signalSource: BehaviorSubject<boolean>;

  public signal$: Observable<boolean>;

  constructor() {
    this.collapsed = false;
    this.signalSource = new BehaviorSubject(this.collapsed);
    this.signal$ = this.signalSource.asObservable();
   }

   public updateSignal(value: boolean): void {
    this.collapsed = value;
    this.signalSource.next(this.collapsed);
   }

   public getCollapsed(): boolean {
    return this.collapsed;
   }
}
