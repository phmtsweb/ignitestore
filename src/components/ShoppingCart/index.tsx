/* eslint-disable react-hooks/exhaustive-deps */
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { TfiClose } from 'react-icons/tfi';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { CartDetails } from 'use-shopping-cart/core';
import { CardItem } from '../CardItem';
import { BuyButton, CloseButton, ItemsList, Overlay, ShoppingCartContainer, Summary } from "./styles";

interface ShoppingCartProps {
  closeShoppingCart: () => void;
}

export function ShoppingCart({ closeShoppingCart }: ShoppingCartProps) {
  const { cartCount, totalPrice, cartDetails, redirectToCheckout } = useShoppingCart();
  const cartItems = Object.keys(cartDetails as CartDetails).map(productId => {
    if( cartDetails) {

      type  priceDataProps = { price_id: string };
      const priceData = cartDetails[productId].price_data as priceDataProps;
      return {
        id: cartDetails[productId].id,
        name: cartDetails[productId].name,
        price: cartDetails[productId].price,
        image: cartDetails[productId].image as string,
        priceId: priceData.price_id,
      };
    } else {
      return {
        id: '',
        name: '',
        price: 0,
        image: ''
      }
    }
  });
  const totalPriceFormatted = formatCurrencyString({
    value: totalPrice as number,
    currency: 'BRL',
    language: 'pt-BR'
  });

  async function handleCheckout() {
    const line_items = cartItems.map(item => {
      return {
        price: item.priceId,
        quantity: 1,
      }
    });
    const response = await axios.post('/api/checkout', {
      line_items,
    });
    const { sessionId } = response.data;
    redirectToCheckout(sessionId);
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <ShoppingCartContainer>
        <Dialog.Title>Sacola de Compras</Dialog.Title>
        <CloseButton>
          <TfiClose size={16} onClick={closeShoppingCart}/>
        </CloseButton>
        <ItemsList>
          {cartItems.map(item => (
            <CardItem productId={item.id} key={item.id} name={item.name} price={item.price} imageUrl={item.image} />
          ))}
        </ItemsList>
        <Summary>
          <div>
            <span>Quantidade</span>
            <span>{cartCount} {cartCount !== 1 ? ' itens' : 'item'}</span>
          </div>
          <div>
            <strong>Valor total</strong>
            <strong>{totalPriceFormatted}</strong>
          </div>
        </Summary>
        <BuyButton type="button" onClick={handleCheckout}>Finalizar compra</BuyButton>
      </ShoppingCartContainer>
    </Dialog.Portal>
  );
}