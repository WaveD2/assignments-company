import React from 'react';
import Button from 'react-bootstrap/Button';
const ButtonCom = (text: string) => {
  return <Button variant={`${text === 'apply' ? 'outline-info' : 'outline-danger'}`}>{text}</Button>;
};

export default ButtonCom;
