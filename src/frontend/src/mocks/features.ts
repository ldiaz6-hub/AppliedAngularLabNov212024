import { http, HttpResponse } from 'msw';

const dev_features = ['gift-giving', 'home-page', 'atm'];

const handlers = [
  http.get('http://api.company.com/features/api/features', () => {
    return HttpResponse.json(dev_features);
  }),
];

export default handlers;
