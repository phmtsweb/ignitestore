import type { AppProps } from 'next/app';
import { CartProvider } from 'use-shopping-cart';
import { globalStyles } from '../styles/global';
import { Container } from '../styles/pages/app';

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode='checkout-session'
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
      currency='BRL'
    >
      <Container>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
    
  )
}

export default MyApp
