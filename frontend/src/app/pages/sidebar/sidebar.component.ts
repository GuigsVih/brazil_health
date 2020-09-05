import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Logout } from '../../actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(
    private service: AuthService,
    private store: Store,
    ) { }

  ngOnInit() {}

  logout() {
    this.service.logout()
      .subscribe(res => {          
          this.store.dispatch(new Logout());
        }
      );
  }

}
