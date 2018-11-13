import {Component, OnInit} from '@angular/core';
import {BooksService} from '../shared/books.service';



@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent implements OnInit {
  public booksList;
  constructor(private bookService: BooksService,
              ) {
    this.getBooks();
  }

   ngOnInit() {
  }

  getBooks() {
  this.bookService.getBooks().subscribe( res => {
  this.booksList = res;
});
  }


}
