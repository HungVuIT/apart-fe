import React from 'react';
import classes from './contact.module.scss';
import CardProfile from './CardProfile';
import avt1 from '../../../assets/img/avt1.jpg';
import avt2 from '../../../assets/img/avt2.jpg';
function Contact() {
  const infors = [
    {
      id: 1,
      name: 'Lê Tiến Dũng',
      img: avt1,
      fb: 'https://www.facebook.com/tiendung.130500/',
      email: 'dung.le1305@hcmut.edu.vn',
      specialized: 'FrontEnd Developer',
      description: 'Tôi là một Frontend developer chủ yếu làm việc với HTML, CSS, JavaScript, React và Angular.'
    },
    {
      id: 2,
      name: 'Vũ Hoàng Hùng',
      img: avt2,
      fb: 'https://www.facebook.com/rox14122000',
      email: 'hung.vuit@hcmut.edu.vn',
      specialized: 'BackEnd Developer',
      description: 'Tôi là một BackEnd developer chủ yếu làm việc với JavaScript, NodeJs, NestJs, PostgreSQL'
    }
  ];
  return (
    <div className={classes.wrapper}>
      {
        infors.map(infor => <CardProfile key={infor.id} infor={infor} />)
      }
    </div>
  );
}

export default Contact;
