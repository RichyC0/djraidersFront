import { Component, OnInit } from '@angular/core';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  protected collapsed: boolean;

  constructor(protected signalService: SignalService) {
    this.collapsed = this.signalService.getCollapsed();
  }

  ngOnInit(): void {
  }

  protected changeSignal(): void {
    this.collapsed = !this.signalService.getCollapsed()
    this.signalService.updateSignal(this.collapsed);
  }

}
