import {Component, OnInit} from '@angular/core';
import {BooksService} from '../shared/books.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit  {
  form: FormGroup;
  public formate;
  public formateData;
  public selectedFormates;
  public format;
  public title = '';
  public auth = '';
  public isbn = '';
  public titleSearch;
  public search;
  public isSerch = false;

  public searchStringTitle;
  public searchStringIsbn;
  public searchStringAuth;
  public searchStringFormate;
  public searchStringPageMin;
  public searchStringPageMax;
  public searchStringPriceMin;
  public searchStringPriceMax;
  public parseString;
  public page_min;
  public page_max;
  public price_min;
  public price_max;

  constructor(
    private bookService: BooksService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router

    ) {
    this.titleSearch = [];
    this.backPageParams();
  }

  ngOnInit() {
    this.formGroup();
    this.getFormats();
    this.bookService.getBooks().subscribe(res => {
      this.formateData = res;
    });

  }

  backPageParams() {
    this.parseString = this.router.parseUrl(this.router.url);
    this.searchStringTitle = this.parseString.queryParams['title'];
    this.searchStringAuth = this.parseString.queryParams['auth'];
    this.searchStringFormate = this.parseString.queryParams['format'];
    this.searchStringIsbn = this.parseString.queryParams['isbn'];
    this.searchStringPageMin = this.parseString.queryParams['page_min'];
    this.searchStringPageMax = this.parseString.queryParams['page_max'];
    this.searchStringPriceMin = this.parseString.queryParams['price_min'];
    this.searchStringPriceMax = this.parseString.queryParams['price_max'];
    this.title = this.searchStringTitle;
    this.auth = this.searchStringAuth;
    this.format = this.searchStringFormate;
    this.isbn = this.searchStringIsbn;
    this.page_min = this.searchStringPageMin;
    this.page_max = this.searchStringPageMax;
    this.price_min = this.searchStringPriceMin;
    this.price_max = this.searchStringPriceMax;
  }
   changeQueryParamsTitle() {
     const queryParams = Object.assign({}, this.route.snapshot.queryParams);
     this.title === '' ? (this.title = null, queryParams['title'] = this.title) : queryParams['title'] = this.title;
     this.router.navigate(['search'], { queryParams: queryParams });
  }
  changeQueryParamsFormate() {
    const LLL = this.route.snapshot.queryParams;
    console.log(LLL);
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.format === 'undefined' ? (this.format = null, queryParams['format'] = this.format) : queryParams['format'] = this.format;
    this.router.navigate(['search'], { queryParams: queryParams });

  }
  changeQueryParamsAuth() {
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.auth === '' ? (this.auth = null, queryParams['auth'] = this.auth) : queryParams['auth'] = this.auth;
    this.router.navigate(['search'], { queryParams: queryParams });

  }
  changeQueryParamsISBN() {
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.isbn === '' ? (this.isbn = null, queryParams['isbn'] = this.isbn) : queryParams['isbn'] = this.isbn;
    this.router.navigate(['search'], { queryParams: queryParams });
  }

  changeQueryParamsPages() {
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.page_min === '' ? (this.page_min = null, queryParams['page_min'] = this.page_min) : queryParams['page_min'] = this.page_min;
    this.page_max === '' ? (this.page_max = null, queryParams['page_max'] = this.page_max) : queryParams['page_max'] = this.page_max;
    this.router.navigate(['search'], { queryParams: queryParams });
  }
  changeQueryParamsPrices() {
    const queryParams = Object.assign({}, this.route.snapshot.queryParams);
    this.price_min === '' ? (this.price_min = null, queryParams['price_min'] = this.price_min) : queryParams['price_min'] = this.price_min;
    this.price_max === '' ? (this.price_max = null, queryParams['price_max'] = this.price_max) : queryParams['price_max'] = this.price_max;
    this.router.navigate(['search'], { queryParams: queryParams });
  }


  getFormats() {
    this.bookService.getFormate().subscribe(res => {
      this.formate = res;
      this.selectedFormates = null;
      console.log(this.formate);
    });
  }

  onSearchTitle(title) {
    this.changeQueryParamsTitle();
    this.isSerch = true;
    console.log(title);
    this.search = this.formateData.filter( item => item.title === title);
  }
  onSearchAuthor(author) {
    this.changeQueryParamsAuth();
    this.isSerch = true;
    console.log(author);
    this.search = this.formateData.filter( item => item.author === author);
  }
  onSearchFormate(event) {
    this.format = event.target.value;
    this.changeQueryParamsFormate();
    this.isSerch = true;
    console.log(this.format);
    console.log(this.formate);
    this.search = this.formateData.filter( item => item.formatId == this.format);
  }
  onSearchISBN(isbn) {
    this.changeQueryParamsISBN();
    this.isSerch = true;
    console.log(isbn);
    this.search = this.formateData.filter( item => item.isbn === isbn);
  }

  onSearchPage(min,max) {
    this.changeQueryParamsPages();
    this.isSerch = true;
    this.search = this.formateData.filter( item => min < item.pages && item.pages < max );
  }
  onSearchPrice(min,max) {
    this.changeQueryParamsPrices();
    this.isSerch = true;
    this.search = this.formateData.filter( item => min < item.price && item.price < max );
  }


  formGroup(book?) {
    this.form = this.fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      formatId: ['', Validators.required],
      price_min: ['', Validators.required],
      price_max: ['', Validators.required],
      page_min: ['', Validators.required],
      page_max: ['', Validators.required],

    });

  }


}
