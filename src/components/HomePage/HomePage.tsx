import React from "react";
import imgIconn from '../avatar/imgIconn.png'
import s from './HomePage.module.css'


export const HomePage = () => {
  return (
    <div>
      <h1 className={s.heading}>Welcome to Social Network</h1>
      <div className={s.homePageImg}>
        <img src={imgIconn} alt="img" />
      </div>
      <p className={s.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
        voluptatibus fugiat vero corporis delectus, quae hic eius aliquam!
        Architecto eos hic cumque aperiam cum perspiciatis eligendi molestiae
        ducimus velit labore?
      </p>
    </div>

  );
};

