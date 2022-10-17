import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { Header } from "../../components/Header";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ImageListContainer, SuccessContainer } from "./styles";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart();
  useEffect(() => {
    clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Compra efetudada | Ignite Shop</title>
        <meta name="robots" content="noindex,nofollow"/>
      </Head>
      <Header isSuccessScreen/>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
       
          <ImageListContainer  css={{
            transform: `translateX(${24.5 * (products.length - 1)}px)`,
          }}>
            {products.map((product, index) => (
              <ImageContainer key={product.id} css={{
                position: 'relative',
                zIndex: index,
                left: `${-(index * 49)}px`
              }}>
                <Image  src={product.imageUrl} width={120} height={110} alt=""/>
              </ImageContainer>
            ))}
          </ImageListContainer>
          
        <p>Uhull!! <strong>{customerName}</strong> sua compra de <strong>{products.length === 1 ? products[0].name : `${products.length} camisetas`}</strong> já está a caminho da sua casa.</p>
        <Link href='/'>
          <a>Voltar ao catálogo</a>
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details?.name as String;
  // const product = session.line_items?.data[0].price?.product as Stripe.Product;
  // console.log(session);
  const products = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  });

  console.log(products);
  return {
    props: {
      customerName,
      products
    }
  }
};