import featuresHandler from './features';
import peopleHandler from './people';
import booksHandler from './books-handler';

export const handlers = [...featuresHandler, ...peopleHandler, ...booksHandler];
