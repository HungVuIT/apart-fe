import { fetchProvince, fetchDistrict, fetchWard } from './../RegisterShop/fetch';
import { IShop } from './../../../interface/common/interface';
import { IDistrict, IProvince } from '../RegisterShop/type';
export const setDefaultValue = async (
  setProvince: any,
  setDistrict: any,
  setWard: any,
  setLoadingPage: any,
  setValue: any,
  shop: IShop
) => {
  setLoadingPage(true);
  const province = await fetchProvince(setProvince);
  const idProvince = getIdProvince(shop.province, province);
  if (idProvince) {
    const district = await fetchDistrict(idProvince, setDistrict);
    const idDistrict = getIdDistrict(shop.district, district);
    setValue('province', shop.province);
    if (idDistrict) {
      fetchWard(idDistrict, setWard);
      setValue('district', shop.district);
      setValue('ward', shop.ward);
    }
  }
  setLoadingPage(false);
};
const getIdProvince = (name: string, province: IProvince[]) => {
  const id = province.findIndex(item => item.province_name === name);
  return id === -1 ? null : province[id].province_id;
};
const getIdDistrict = (name: string, district: IDistrict[]) => {
  const id = district.findIndex(item => item.district_name === name);
  return id === -1 ? null : district[id].district_id;
};
