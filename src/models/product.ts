export interface IProduct {
  order: string;
  status: string;
  total: number;
  currency: string;
  fundingMethod: string;
  createdAt: string;
  updatedAt: string;
  client: string;
  id: string;
  createdBy: number;
  invoice: string;
}

export type idParam = {
  id: string;
};
