import React from 'react';
import classes from './contact.module.scss';
import CardProfile from './CardProfile';
function Contact() {
  const infors = [
    {
      id: 1,
      name: 'Lê Tiến Dũng',
      img: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/326715846_5943527652360733_3339009230718040802_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=Hgxoj0BjbqQAX_EK4kw&_nc_oc=AQmeSKQ9P-TUtJkiR9BeY1PoqBKKal4BCAK0cK7AkwJHoEdYBjztv5spnoVg0Xs1J7gM7kzyaZNpgqpEpPHVtbkb&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfDpgugtG-BwbUoZe3LvWXE1KolzE-Lcsot7qxLKgMUQJw&oe=6478CA73',
      fb: 'https://www.facebook.com/tiendung.130500/',
      email: 'dung.le1305@hcmut.edu.vn',
      specialized: 'FrontEnd Developer',
      description: 'Tôi là một Frontend developer chủ yếu làm việc với HTML, CSS, JavaScript, React và Angular.'
    },
    {
      id: 2,
      name: 'Vũ Hoàng Hùng',
      img: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/314561593_1571611829903892_4393611875206379581_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=js11pFQN0acAX8Tatzu&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBiVZINku_kqX3NbNCIT7NfnIC__PQYEIyr1b8jdgv4BA&oe=647A8894',
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
