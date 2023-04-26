import { IProduct } from './../models/product';
interface MyObject {
  product: IProduct;
}

export function getValuesByKey<T extends keyof MyObject>(arr: MyObject[], key: T): MyObject[T][] {
  return arr.reduce((acc: MyObject[T][], curr) => {
    if (!acc.includes(curr[key])) {
      acc.push(curr[key]);
    }
    return acc;
  }, []);
}
