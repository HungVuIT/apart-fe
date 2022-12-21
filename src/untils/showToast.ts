import { toast } from 'react-toastify';
import { typeToast } from '../interface/globalType';

export const showToastMessage = (content: JSX.Element, type: string) => {
  type === typeToast.SUCCESS
    ? toast.success(content, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    : toast.error(content, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
};
