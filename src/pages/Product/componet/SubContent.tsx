import React from 'react';
import Container from '../../../components/Container';
import avt from '../../../assets/img/avtshop.png';
function SubContent() {
  return (
    <Container >
      <div className="sub-content__wrapper">
        <img src={avt} alt="" className="sub-img" />
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
              <span className="value">4 năm trước</span>
            </div>
            <div className="item">
              <span className="title">Người theo dõi</span>
              <span className="value">295.7k</span>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="sub-address">
          Địa chỉ: 175/ đường Quang Trung - Quận 10 - Thành phố Hồ Chí Minh
        </div>
      </div>
    </Container>
  );
}

export default SubContent;
