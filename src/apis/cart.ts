import { CartItem } from '../types/cart';
import { waitFor, WaitForOptions } from '../utils/waitFor';
import { authFetchQuery } from './api';
import { FetchQueryRes } from './api.type';

export type FetchCartRes = CartItem[];

export const fetchCart = (options?: WaitForOptions<FetchCartRes>) => {
  const promise = authFetchQuery.get<FetchCartRes>(`/cart-items`);

  return waitFor(promise, options);
};

export interface AddCartDataReq {
  productId: number;
}

interface AddCartDataRes {}

export const addToCart: (
  payload: AddCartDataReq
) => FetchQueryRes<AddCartDataRes> = ({ productId }) => {
  return authFetchQuery.post<AddCartDataRes>(`/cart-items`, {
    body: { productId },
  });
};

export interface UpdateCartItemReq {
  cartId: number;
  quantity: number;
}

interface UpdateCartItemRes {}

export const updateCartItem: (
  payload: UpdateCartItemReq
) => FetchQueryRes<UpdateCartItemRes> = ({ cartId, quantity }) => {
  return authFetchQuery.patch<UpdateCartItemRes>(`/cart-items/${cartId}`, {
    body: { quantity },
  });
};

interface DeleteCartItemRes {}

export const deleteCartItem: (
  id: CartItem['id']
) => FetchQueryRes<DeleteCartItemRes> = (id) => {
  return authFetchQuery.delete<DeleteCartItemRes>(`/cart-items/${id}`);
};
