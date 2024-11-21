export type PeopleGiftListModelItem = {
  id: string;
  name: string;
  location: 'local' | 'remote';
  ideas: { id: string; description: string }[];
};

export type PeopleEntity = Omit<PeopleGiftListModelItem, 'ideas'> & {
  isPending: boolean;
};

export type PeopleCreate = Omit<PeopleEntity, 'id' | 'isPending'>;
export type ApiResult = {
  people: ApiPersonItem[];
};
export type ApiPersonItem = {
  id: string;
  name: string;
  isLocal: boolean;
};
