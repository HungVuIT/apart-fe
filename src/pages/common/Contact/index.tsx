import React from 'react';
import classes from './contact.module.scss';
import CardProfile from './CardProfile';
import avt1 from '../../../assets/img/avt1.jpg';
import avt2 from '../../../assets/img/avt2.jpg';
function Contact() {
  const infors = [
    {
      id: 1,
      name: 'Võ Phạm Long Huy',
      img: avt1,
      // fb: 'https://www.facebook.com/tiendung.130500/',
      email: 'longhuy@hcmut.edu.vn',
      specialized: 'FrontEnd Developer',
      description: 'Tôi là một Frontend developer chủ yếu làm việc với HTML, CSS, JavaScript, React và Angular.'
    },
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
