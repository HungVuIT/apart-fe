import React from 'react';
import Container from '../../components/Container';
import './home.scss';
import banner from '../../assets/img/banner.png';
function Home() {
  return (
    <>
      <Container>
        <div className="banner">
          <img src={banner} alt="banner" className='img-banner'/>
        </div>
      </Container>
    </>
  );
}

export default Home;
