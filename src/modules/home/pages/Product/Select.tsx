import React from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { selectProducts } from '../../../auth/redux/productReducer';

type MyType = { title: string; options: string[] };

const Select = (data: MyType) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectProducts(event.target.value.toString()));
  };

  return (
    <Form.Select aria-label="Default select example" onChange={handleChangeStatus}>
      <option selected>{data.title}</option>
      {data?.options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
};

export default Select;
