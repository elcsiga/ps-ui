import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular-boost';

interface DemoData {
  test: any;
}

@Component({
  selector: 'app-demo',
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="errors">
      Error :(
    </div>
    <div *ngIf="data">
      {{ data | json }}
    </div>
  `,
})
export class DemoComponent implements OnInit {
  data: DemoData;
  loading: boolean;
  errors: any[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<DemoData>({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }
}
