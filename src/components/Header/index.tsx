import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/future/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useShoppingCart } from 'use-shopping-cart';
import logoImg from '../../assets/logo.svg';
import { ShoppingCart } from '../ShoppingCart';
import { HeaderContainer, ShoppingCartButton } from './styles';

interface HeaderProps {
  isSuccessScreen?: boolean;
}

export function Header({ isSuccessScreen = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useShoppingCart()

  function handleOpenShoppingCart() {
    setIsOpen(state => !state);
  }

  function handleCloseShoppingCart() {
    setIsOpen(state => !state);
  }

  return (
    <HeaderContainer justify={isSuccessScreen ? 'centered' : 'spaced'}>
      <Link href="/">
        <a>
          <Image src={logoImg} alt=""/>
        </a>
      </Link>
      {!isSuccessScreen && (
        <>
          <ShoppingCartButton iconType={cartCount === 0 ? 'empty' : 'full'} onClick={handleOpenShoppingCart} >
            <HiOutlineShoppingBag size={24} />
            { cartCount !== 0 && <span>{cartCount}</span>}
          </ShoppingCartButton>
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <ShoppingCart closeShoppingCart={handleCloseShoppingCart}/>
          </Dialog.Trigger>
        
      </Dialog.Root>
        </>
        
      )}
      
      
    </HeaderContainer>
  )
}