export type historyItemType = {
  _id: string;
  date: string;
  menu: string;
  count: number;
  total: number;
};

export type orderType = {
  userId?: string;
  menu?: string;
  isHot?: boolean;
  count: number;
};
