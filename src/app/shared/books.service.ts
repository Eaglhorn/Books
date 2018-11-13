import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BooksService {
  constructor ( private http: HttpClient) {
  }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'
  });
  url = 'http://localhost:3004/';
  options = {headers: this.headers};

  @Output() onBooks = new EventEmitter();

getBooks() {
   return this.http.get(this.url + 'books', this.options).map( res => {
      return res;
    });
}
  getBooksId(id) {
    return this.http.get(this.url + 'books/' + id, this.options).map( res => {
      return res;
    });
  }

createNewBook(book) {
  return this.http.post(this.url + 'books', book,  this.options)
    .subscribe(() => {
      this.onBooks.emit(book);
    });
}

getCountries() {
  return this.http.get(this.url + 'countries',  this.options).map(res => res);
}
  getCity() {
    return this.http.get(this.url + 'cities',  this.options).map(res => res);
  }
  getCompany() {
    return this.http.get(this.url + 'companies',  this.options).map(res => res);
  }
  getFormate() {
    return this.http.get(this.url + 'formats',  this.options).map(res => res);
  }
}
