/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Select from './Select';
import './Product.css';

import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../../common/redux/thunk';
import { deleteProduct, setListProduct } from '../../../auth/redux/productReducer';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';

import axios from 'axios';
import Cookies from 'js-cookie';
import { API_PATHS } from '../../../../configs/api';
import { IProduct } from '../../../../models/product';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';

const ListProduct = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const data = useSelector((state: AppState) => state.listProduct);
  const { product, selectProduct } = data;

  const [listProducts, setListProducts] = useState(product);

  const getListProduct = async () => {
    const json = await dispatch(fetchThunk(API_PATHS.listProduct, 'get'));

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setListProduct(json.data));
    }
  };

  useEffect(() => {
    getListProduct();
  }, []);

  useEffect(() => {
    if (Number(selectProduct?.length) >= 1) {
      setListProducts(selectProduct);
    } else {
      setListProducts(product);
    }
  }, [selectProduct, product]);

  const handleDelete = async (id: number) => {
    console.log('id delete', id);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
    };
    const json = await axios.delete(`${API_PATHS.listProduct}/${id} `, config);
    console.log('json', json);

    if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginTop: '12px', fontSize: '2.6rem' }}>Payroll Transactions List</h2>

      <section className="productFlex" style={{ justifyContent: 'space-between' }}>
        <Fragment>
          <div className="select productFlex" style={{ gap: '12px' }}>
            <Select title="Status" options={['RECEIVED', 'PENDING', 'FULFILLED']} />
            <Select title="Currency" options={['Chrome', 'Cốc Cốc', 'Safari']} />
          </div>
          <div className="btn productFlex" style={{ gap: '12px' }}>
            <Button variant="outline-info">Apply</Button>
            <Button variant="outline-danger">Clear</Button>
          </div>
        </Fragment>
      </section>

      <section className="productFlex">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Client</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listProducts?.slice(0, 6)?.map((product: IProduct, index: any) => (
              <tr key={index}>
                <td>{product.status}</td>
                <td>{product.createdAt}</td>
                <td>{product.client}</td>
                <td>{product.total}</td>
                <td>
                  <Link to={`/product-detail/:${product.id}`}>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      style={{ color: 'black', zIndex: '9999' }}
                    >
                      View Detail
                    </button>
                  </Link>
                </td>
                <td>
                  <span onClick={() => handleDelete(Number(product.id))}>&#10006;</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default ListProduct;
