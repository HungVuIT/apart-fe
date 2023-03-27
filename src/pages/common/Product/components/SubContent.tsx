import React from 'react';
import Container from '../../../../components/Container';
import avt from '../../../../assets/img/avtshop.png';
import { useAppSelector } from '../../../../hooks/hooks';
import moment from 'moment';
import 'moment/locale/vi';
interface IProps {
  id: number | undefined
}
function SubContent({ id }: IProps) {
  const { watch, shop } = useAppSelector(state => state.productNow);

  const caculatorDay = (_day: string) => {
    const date = new Date(_day);
    const formattedDate = moment(date, 'YYYYMMDD').locale('vi').fromNow();
    return formattedDate;
  };
  return (
    <Container >
      <div className="sub-content__wrapper">
        <img src={shop.logo || avt} alt="" className="sub-img" />
        <hr className="line" />
        <div className="sub-info">
          <div className="info" style={{ width: '25%' }}>
            <div className="item">
              <span className="title">Đánh giá</span>
              <span className="value">295.7k</span>
            </div>
            <div className="item">
              <span className="title">Sản phẩm</span>
              <span className="value">2.7k</span>
            </div>
          </div>
          <div className="info 2" style={{ width: '40%' }}>
            <div className="item">
              <span className="title">Tỉ lệ phản hồi</span>
              <span className="value">88%</span>
            </div>
            <div className="item">
              <span className="title">Thời gian phản hồi</span>
              <span className="value">Trong vài giờ</span>
            </div>
          </div>
          <div className="info 3" style={{ width: '35%' }}>
            <div className="item">
              <span className="title">Tham gia</span>
              <span className="value">{caculatorDay(shop.createdAt)}</span>
            </div>
            <div className="item">
              <span className="title">Người theo dõi</span>
              <span className="value">295.7k</span>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="sub-address">
          {shop.address + ', ' + shop.ward + ', ' + shop.district + ', ' + shop.province}
        </div>
      </div>
    </Container>
  );
}

export default SubContent;
