import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  params: string;
  companies: any;
  hasKeys: boolean;
  services: any;

  constructor(
    private service: SearchService
  ) { }

  ngOnInit() {
    this.initalEnterprises();
  }

  initalEnterprises() {
    this.service.loadSomeEnterprises()
      .subscribe((res : any) => {
        this.hasKeys = res.length > 0;        
        this.companies = res;
      })
  }
  loadItems(event) {    
    this.service.search(event.target.value)
      .subscribe(res => {
        this.hasKeys = res['companies'].length > 0 || res['services'].length > 0;
        this.companies = res['companies'];
        this.services = res['services'];      
      })
  }

}
