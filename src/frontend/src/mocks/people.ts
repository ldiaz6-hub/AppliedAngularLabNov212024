import { http, HttpResponse, delay } from 'msw';
const fakeDelay = 2000;
const testPeople = [
  {
    id: '99',
    name: 'Beth Marvel',
    isLocal: false,
  },
  {
    id: '201',
    name: 'Greg Simmons',
    isLocal: false,
  },
  {
    id: '42',
    name: 'Keith Jeans',
    isLocal: true,
  },
];

const handlers = [
  http.get('/api/user/gifts', async () => {
    await delay(fakeDelay);
    return HttpResponse.json({
      people: testPeople,
    });
  }),
  http.get('/api/users/people/:id', async ({ params }) => {
    const person = testPeople.filter((p) => p.id === params['id'])[0];
    return HttpResponse.json(person);
  }),

  http.post('/api/user/people', async ({ request }) => {
    await delay(8000);
    const body = (await request.json()) as unknown as {
      name: string;
      isLocal: boolean;
    };
    const entity = { id: crypto.randomUUID(), ...body };
    testPeople.unshift(entity);
    return HttpResponse.json(entity);
  }),
];
export default handlers;
