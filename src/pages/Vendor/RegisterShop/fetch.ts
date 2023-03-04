import { IProvince, IDistrict, IWard } from './type';

export const fetchProvince = async (setProvince: React.Dispatch<React.SetStateAction<IProvince[]>>) => {
  try {
    const response = await fetch('https://vapi.vnappmob.com/api/province');
    if (response.ok) {
      const data = await response.json();
      setProvince(data.results);
      return data.results;
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchDistrict = async (id: string, setDistrict: React.Dispatch<React.SetStateAction<IDistrict[]>>) => {
  try {
    const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${id}`);
    if (response.ok) {
      const data = await response.json();
      setDistrict(data.results);
      console.log(data.results);
      return data.results;
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchWard = async (id: string, setWard: React.Dispatch<React.SetStateAction<IWard[]>>) => {
  try {
    const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${id}`);
    if (response.ok) {
      const data = await response.json();
      setWard(data.results);
      console.log(data.results);
      return data.results;
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
};
