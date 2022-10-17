import type { GetStaticProps } from 'next'
import Image from 'next/future/image'
import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'
import { Header } from '../components/Header'
import { stripe } from '../lib/stripe'

interface HomeProps {
  products: Array<{
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }>
}

const Home = ({ products }: HomeProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.8,
      spacing: 48,
    }
  }); 
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <Header />
      <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Link href={`/products/${product.id}`} key={product.id} prefetch={false}>
          <Product className='keen-slider__slide'>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
        </Link>
        
      ))}

      </HomeContainer>
    </>
    
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount as number) / 100),
    }
  });

  return {
    props: {
      products
    },
    revalidate: 2 * 60 * 60,
  }
}
