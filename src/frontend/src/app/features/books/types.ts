export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

export type SortKeys = keyof Pick<
  BookEntity,
  'id' | 'title' | 'author' | 'year'
>;
