import { Component, OnInit } from "@angular/core";
import { SignalService } from "../services/signal.service";

@Component(
  {
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
  }
)
export class ContainerComponent implements OnInit {
  protected width: string = '250px';
  constructor(protected signalService: SignalService) {

  }

  ngOnInit(): void {
    this.subscribeSignal();
  }

  private subscribeSignal(): void {
    this.signalService.signal$.subscribe((collapse: boolean) => {
      if(collapse) {
        this.width = '65px';
      } else {
        this.width = '250px';
      }
      document.documentElement.style.setProperty('--sidebar-width', this.width);
    });
  }

}
