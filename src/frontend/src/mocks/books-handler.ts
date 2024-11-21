import { HttpResponse, http, delay } from 'msw';
import books from './books';

const handlers = [
  http.get('/api/books', async () => {
    await delay(5000);
    return HttpResponse.json({ data: books });
  }),
];

export default handlers;
