import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProduct } from '../../../models/product';

export interface ProductState {
  product?: IProduct[];
  detailProduct?: IProduct;
  selectProduct?: IProduct[];
}

export const setListProduct = createCustomAction('product/setListProduct', (data: IProduct[]) => ({
  data,
}));
export const setDetailProduct = createCustomAction('product/product-detail', (data: IProduct) => ({
  data,
}));
export const selectProducts = createCustomAction('product/products-select', (data: string) => ({
  data,
}));
export const deleteProduct = createCustomAction('product/products-select', (data: number) => ({
  data,
}));

const actions = { setListProduct, setDetailProduct, selectProducts };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = {}, action: Action) {
  switch (action.type) {
    case getType(setListProduct):
      return { ...state, product: action.data };
    case getType(setDetailProduct):
      return { ...state, detailProduct: action.data };

    case getType(deleteProduct):
      return { ...state, product: state.product?.filter((product) => product.status !== action.data) };

    case getType(selectProducts):
      if (action.data === 'Status') {
        return { selectProduct: state.product };
      } else {
        return {
          ...state,
          selectProduct: state.product?.filter((product) => product.status === action.data),
        };
      }

    default:
      return state;
  }
}
