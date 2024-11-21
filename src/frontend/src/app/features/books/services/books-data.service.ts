import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class BooksDataService {
  #client = inject(HttpClient);
}
