import Image from "next/future/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { CardItemContainer, CardItemImageContainer, CardItemInfoContainer } from "./styles";

interface CardItemProps {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;   
}

export function CardItem({productId, name, price, imageUrl}: CardItemProps) {
  const {  removeItem } = useShoppingCart();

  function handleRemove() {
    removeItem(productId);
  }
  return (
    <CardItemContainer>
      <CardItemImageContainer>
        <Image src={imageUrl} width={94} height={94} alt=""/>
      </CardItemImageContainer>
      <CardItemInfoContainer>
        <span>{name}</span>
        <strong>{formatCurrencyString({
          value: price,
          currency: 'BRL',
          language: 'pt-BR',
        })}</strong>
        <a onClick={handleRemove}>Remover</a>
      </CardItemInfoContainer>
    </CardItemContainer>
  )
}