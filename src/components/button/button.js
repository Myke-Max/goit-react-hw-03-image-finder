import React from 'react';
import s from './button.module.css';

const Button = ({ nextPage }) => {
  return (
    <div className={s.load__wrapper}>
      <button className={s.Button} type="button" onClick={nextPage}>
        {' '}
        Load More
      </button>
    </div>
  );
};

export default Button;
