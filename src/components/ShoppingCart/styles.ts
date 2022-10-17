import { Close, Content, Overlay as DialogOverlay, Title } from '@radix-ui/react-dialog';
import { styled } from "../../styles";

export const ShoppingCartContainer = styled(Content, {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: 999,
  width: '30rem',
  padding: '4.5rem 3rem 3rem',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.8)',
  display: 'flex',
  flexDirection: 'column',
});

export const ShoppingCartTitle = styled(Title, {
  fontSize: '$xl',
  fontWeight: 700,
  lineHeight: 1.6,
  color: '$gray100',
});

export const Overlay = styled(DialogOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.25)'
});

export const CloseButton = styled(Close, {
  position: 'absolute',
  border: 'none',
  width: '1.5rem', 
  height: '1.5rem',
  cursor: 'pointer',
  background: 'transparent',
  top: '1.5rem', 
  right: '1.5rem',
  zIndex: 1000, 
  svg: {
    lineHeight: 0,
    color: '$gray500',
  },

  '&:hover': {
    border: 'none',
    svg: {
      color: '$gray300',
    }
  }
});

export const ItemsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem',
  overflowY: 'auto',
  flex: 1,
});

export const Summary = styled('div', {
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    'span:first-child': {
      color: '$gray100',
      fontSize: '1rem',
      lineHeight: 1.6,
    },

    'span:last-child': {
      color: '$gray300',
      fontSize: '$md',
      lineHeight: 1.6,
    },

    'strong:first-child': {
      color: '$gray100',
      fontSize: '$md',
      lineHeight: 1.6,
      fontWeight: 700,
    },

    'strong:last-child': {
      color: '$gray100',
      fontSize: '$xl',
      lineHeight: 1.4,
      fontWeight: 700,
    }
  },



});


export const BuyButton = styled('button', {
  marginTop: '3.5rem',
  display: 'flex',
  width: '100%',
  padding: '1.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$white',
  backgroundColor: '$green500',
  borderRadius: 8,
  fontSize: '$md',
  lineHeight: 1.6,
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$green300',
    transition: 'all 0.2s',
  }
});