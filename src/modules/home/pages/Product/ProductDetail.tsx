import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import './Product.css';

import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setDetailProduct } from '../../../auth/redux/productReducer';
import { fetchThunk } from '../../../common/redux/thunk';

import { API_PATHS } from '../../../../configs/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { IProduct, idParam } from '../../../../models/product';

const ProductDetail = () => {
  const { id }: idParam = useParams();

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const getDetailProduct = async () => {
    const json = await dispatch(fetchThunk(`${API_PATHS.listProduct}/${id.slice(1)}`, 'get'));
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setDetailProduct(json.data));
    }
  };

  useEffect(() => {
    getDetailProduct();
  }, []);

  const data = useSelector((state: AppState) => state.listProduct);
  const { detailProduct } = data;
  const [product, setProduct] = useState(detailProduct as IProduct);
  const [totalProduct, setTotalProduct] = useState(product?.total);

  useEffect(() => {
    setProduct(detailProduct as IProduct);
  }, [detailProduct]);

  const handleSetTotal = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentTotal = e.target.value;
    setTotalProduct(currentTotal as any);
  };

  const handleSubmit = async () => {
    const { updatedAt, createdAt, invoice, createdBy, client, ...rest } = product;
    setProduct({ ...rest, ...({ total: Number(totalProduct) } as unknown as IProduct) });

    const fetch = async () => {
      const config = {
        headers: {
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };
      const json = await axios.put(API_PATHS.listProduct, { ...rest }, config);
      if (json.status === 200) {
        alert('Cập nhật thành công');
      }
    };
    fetch();
  };

  return (
    <div className="container mt-5">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Status</InputGroup.Text>
        <Form.Control value={product?.status} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Client</InputGroup.Text>
        <Form.Control aria-describedby="basic-addon1" value={product?.client || 'No'} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Currency</InputGroup.Text>
        <Form.Control aria-describedby="basic-addon1" value={product?.currency || 'Cốc Cốc'} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Total</InputGroup.Text>
        <Form.Control aria-describedby="basic-addon1" value={totalProduct} onChange={handleSetTotal} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Funding</InputGroup.Text>
        <Form.Control aria-describedby="basic-addon1" value={product?.fundingMethod} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Create dAt</InputGroup.Text>
        <Form.Control aria-describedby="basic-addon1" value={product?.createdAt} />
      </InputGroup>

      <Button variant="primary" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default ProductDetail;
