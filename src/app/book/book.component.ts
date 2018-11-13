import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {BooksService} from '../shared/books.service';

import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',

})
export class BookComponent implements OnInit {

  form: FormGroup;
  public country;
  public city;
  public formate;
  public company;
  public selectedCountry;
  public selectedCity;
  public selectedCompany;
  public selectedFormates;
  public booksList;
  public book;
  public newUrl;



  constructor(
    private bookService: BooksService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.formGroup();
    this.getCities();
    this.getCountries();
    this.getFormats();
    this.getCompanies();
    this.getBooks();
    this.newUrl = this.route.params['value'].id;
    if(this.newUrl) {
    this.getBooksById(this.newUrl);
    }

  }
  onCreate(book) {
    console.log(this.form);
    console.log(book);
    this.bookService.createNewBook(book);
    this.form.reset('');
  }

  getCountries() {
    console.log(this.form);
    this.bookService.getCountries().subscribe(res => {
      console.log(res);
      this.country = res;
      this.selectedCountry = null;
      console.log(this.country);
    });
  }
  getCities() {
    this.bookService.getCity().subscribe(res => {
      this.city = res;
      this.selectedCity = null;
      console.log(this.city);
    });
  }
  getFormats() {
    this.bookService.getFormate().subscribe(res => {
      this.formate = res;
      this.selectedFormates = null;
      console.log(this.formate);
    });
  }
  getCompanies() {
    this.bookService.getCompany().subscribe(res => {
      this.company = res;
      this.selectedCompany = null;
      console.log(this.company);
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe(res => {
      this.booksList = res;
      console.log(res);
      console.log(this.booksList);
    });
  }
    getBooksById(id) {
    this.bookService.getBooksId(id).subscribe(res => {
      this.book = res;
      console.log(res);
    });
  }

  formGroup(book?) {
    this.form = this.fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      pages: ['', Validators.required],
      formatId: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      companyId: ['', Validators.required],
    });

  }
}
