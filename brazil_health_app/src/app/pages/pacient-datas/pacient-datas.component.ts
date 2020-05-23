import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { currentUser } from '../../selectors/auth.selectors';

@Component({
  selector: 'app-pacient-datas',
  templateUrl: './pacient-datas.component.html',
  styleUrls: ['./pacient-datas.component.scss'],
})
export class PacientDatasComponent implements OnInit {

  user$: any;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.loadMyData();
  }

  async loadMyData() {
    this.user$ = await this.store.pipe(select(currentUser));
  }

}
