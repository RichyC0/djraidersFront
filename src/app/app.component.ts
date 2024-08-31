import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)
export class AppComponent implements AfterContentChecked {
  protected title: string;

  constructor(private cdref: ChangeDetectorRef) {
    this.title = 'Dj Raiders';
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

}
