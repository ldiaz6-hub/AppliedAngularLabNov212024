import { HttpResponse, http } from 'msw';
import books from './books';

const handlers = [
  http.get('/api/books', () => {
    return HttpResponse.json({ data: books });
  }),
];

export default handlers;
