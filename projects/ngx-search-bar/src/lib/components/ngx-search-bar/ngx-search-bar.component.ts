import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { auditTime, Subject, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';

type Filter = { [key: string]: Array<any> | boolean | string | number | null | undefined | Filter };

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, OnDestroy {

  constructor(private searchBarService: NgxSearchBarService) { }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  @Input() placeholder: string = 'Search here';
  @Input() formFilter: FormGroup | Filter | null = null;
  @Input() title: string = 'Search';
  @Input() activeFilter: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() path: string = 'posts';
  formSearch = new FormControl('');
  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.formSearch.valueChanges
      .pipe(
        auditTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        console.log(value);
        this.search();
      });
  }

  search() {
    this.isLoading = true;
    const queryParamns = { [this.nameInputSearch]: this.formSearch.value, ...this.getQueryParams() };
    console.log({ queryParamns });
    this.searchBarService.search(this.path, queryParamns).subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          console.log(res);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      }
    );
  }

  getQueryParams(): Filter {
    if (this.formFilter instanceof FormGroup) {
      return this.formFilter.value;
    }
    return this.formFilter || {};
  }

}
