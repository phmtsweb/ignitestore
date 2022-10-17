import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import Stripe from 'stripe';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { CartDetails } from 'use-shopping-cart/core';
import { Header } from '../../components/Header';
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from './styles';

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    currency: string;
    price_data: {
      price_id: string;
    }
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreateingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const { addItem, removeItem, cartDetails } = useShoppingCart();
  const [isButtonRemove, setIsButtonRemove] = useState(() => {
    return Object.hasOwn(cartDetails as CartDetails, product.id);
  });

  async function handleAddProduct() {
    // try {
    //   setIsCreatingCheckoutSession(true);
    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.priceId
    //   });

    //   const { url } = response.data;

    //   window.location.href = url;
    // } catch (err) {
    //   setIsCreatingCheckoutSession(false);
    //   alert('Falha ao redirecionar para o checkout');
    // }
    setIsCreatingCheckoutSession(true);
    if (isButtonRemove) {
      removeItem(product.id)
      setIsButtonRemove(false);
    } else {
      addItem(product);
      setIsButtonRemove(true);
    }
    setIsCreatingCheckoutSession(false);
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <Header />
      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatCurrencyString({
            value: product.price,
            currency: product.currency,
            language: 'pt-BR'
          }) }</span>
          <p>{product.description}</p>
          <button type='button' disabled={isCreateingCheckoutSession} onClick={handleAddProduct}>{!isButtonRemove ? 'Colocar na Sacola' : (
            <span>
              <HiOutlineTrash size={24} />
              Remover da sacola
            </span>
          )}</button>
        </ProductDetails>
      
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id as string;

  const product = await stripe.products.retrieve(productId, {
    expand: [ 'default_price']
  });
  const price = product.default_price as Stripe.Price;
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: price.unit_amount as number,
        currency: price.currency,
        price_data: {
          price_id: price.id,
        }
      }
    },
    revalidate: 60 * 60 * 2,
  }
}