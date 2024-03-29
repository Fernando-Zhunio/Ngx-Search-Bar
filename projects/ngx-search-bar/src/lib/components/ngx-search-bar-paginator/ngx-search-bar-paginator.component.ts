import { Component, Inject, Input, OnInit } from "@angular/core"
// import { NgxSearchBarComponent } from "../ngx-search-bar/ngx-search-bar.component"
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from "../../utils/DATA_FOR_SEARCH_BAR";
import { NgxSearchBarService } from "../../ngx-search-bar.service";

@Component({
  selector: "ngx-search-bar-paginator",
  templateUrl: "./ngx-search-bar-paginator.component.html",
  styleUrls: ["./ngx-search-bar-paginator.component.scss"],
})
export class NgxSearchBarPaginatorComponent implements OnInit {
  @Input() pageAttr = "page";
  @Input() pageSizeAttr = "pageSize";
  @Input() lengthAttr = "length";
  @Input() pageSizeOptions = [10, 15, 25, 50];
  @Input() page = 0;
  @Input() pageSize = 50;
  @Input() length = 0;
  @Input() backZIndex = '1000';
  @Input() align: 'start' | 'center' | 'end' = 'end';
  @Input() getLength: ((arg:any) => number) | string = "";

  private id!: Symbol;
  arrows: {
    next: boolean
    previous: boolean
    start: boolean
    end: boolean
  } = {
    next: false,
    previous: false,
    start: false,
    end: false,
  }

  offset = {
    start: 0,
    end: 0,
  }

  constructor(@Inject(NGX_SEARCH_BAR_DATA) private dataProvider: NgxSearchBarProvider, private service: NgxSearchBarService) {
    if (!this.getLength && this.dataProvider.OPTIONS_PAGINATE?.fnGetLength) {
      this.getLength = this.dataProvider.OPTIONS_PAGINATE?.fnGetLength;
    }
  }

  ngOnInit() {

  }

  setId(id: Symbol) {
    this.id = id
  }

  getPaginator() {
    return {
      page: {value: this.page + 1, field: this.pageAttr},
      pageSize: {value:this.pageSize, field: this.pageSizeAttr},
    }
  }

  setLength(res: any) {
    if (typeof this.getLength === "function") {
      this.length = this.getLength(res)
    } else {
      this.length = res[this.getLength]
    }
    this.arrows = {
      next: !this.isLastPage(),
      previous: !this.isFirstPage(),
      start: !this.isFirstPage(),
      end: !this.isLastPage(),
    }

    const aux = this.page * this.pageSize
    const end = aux + this.pageSize
    this.offset = {
      start: this.length < 1 ? 0 : aux + 1,
      end: end > this.length ? this.length : end,
    }
  }

  goStart() {
    if (this.isFirstPage()) {
      return
    }
    this.page = 0
    this.search()
  }

  search() {
    this.service.setParamsPaginate(this.id, this.getPaginator())
    this.service.searchApply(this.id);
  }

  goPrevious() {
    if (this.isFirstPage()) {
      return
    }
    this.page--
    this.search()
  }

  goNext() {
    if (this.isLastPage()) {
      return
    }
    this.page++
    this.search()
  }

  goEnd() {
    if (this.isLastPage()) {
      return
    }
    this.page = Math.ceil(this.length / this.pageSize) - 1
    this.search()
  }

  isFirstPage() {
    return this.page < 1
  }

  isLastPage() {
    return this.page * this.pageSize + this.pageSize >= this.length
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.isOpenOption = false;
    this.search()
  }

  isOpenOption = false;
  toggleSelect(a?: boolean) {
    if (a != undefined) {
      this.isOpenOption = a
    }
    this.isOpenOption = !this.isOpenOption
  }

  loadPaginator() {
    if (this.service.queryParams?.paginate) {
      this.page = (this.service.queryParams?.paginate?.page.value || 1) - 1
      this.pageSize = this.service.queryParams.paginate?.pageSize.value || 10
    }
    this.service.setParamsPaginate(this.id, this.getPaginator())
  }
}
