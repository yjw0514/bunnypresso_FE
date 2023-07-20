export type menuType = {
  _id: string;
  img_url: string;
  name: string;
  en_name: string;
  price: number;
  takeout: number;
  desc: string;
  category: string;
  img_name: string;
};

export type orderType = {
  userId?: string;
  menu?: string;
  isHot?: boolean;
  count: number;
};
