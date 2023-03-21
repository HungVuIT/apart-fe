import { IShop } from './../interface/common/interface';
export const getShop = (id: any, shopLst: IShop[]) => {
  const ids = shopLst.findIndex(shop => shop.id === id);
  return (ids >= 0 && ids < shopLst.length) ? shopLst[ids] : null;
};
