import React from 'react';
import classes from './card-profile.module.scss';
function CardProfile({ infor }: any) {
  return (
    <section className={classes.wrapper}>
      <aside className={classes['profile-card']}>
        <header>
          {/* Hình của bạn */}
          <a href={infor.fb}>
            <img src={infor.img} alt={infor.name} />
          </a>

          {/* Tên của bạn */}
          <h1>{infor.name}</h1>

          {/* Công việc hay nghề của bạn */}
          <h2>- {infor.specialized} -</h2>
        </header>

        {/* Thêm thông tin của bạn */}
        <div className={classes['profile-bio']}>
          <p>
            Tôi là một nhà phát triển web.
            <br />
            {infor.description}
            <br />
            Liên hệ với tôi qua email: <a href={'mailto:' + infor.email} className={classes.email}>{infor.email}</a>
          </p>
        </div>
      </aside>
    </section>
  );
}
export default CardProfile;
