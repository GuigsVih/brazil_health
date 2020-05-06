import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { currentUser } from '../../selectors/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private store: Store) { }

  user$: any;

  ngOnInit() {
    this.user$ = this.store.pipe(select(currentUser));    
  }

}
