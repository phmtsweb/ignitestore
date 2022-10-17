import { styled } from "../../styles";

export const CardItemContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',
});

export const CardItemImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #1ea483 0%, #7645d4 100%)',
  borderRadius: 8,
  width: '6.375rem',
  height: '5.8125',
  img: {
    objectFit: 'cover',
  }
});

export const CardItemInfoContainer = styled('div', {  
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  
  span: {
    lineHeight: 1.6,
    fontSize: '$md',
    color: '$gray300',
  },
  strong: {
    lineHeight: 1.6,
    fontSize: '$md',
    color: '$gray100',
    fontWeight: 700,
  },
  a: {
    lineHeight: 1.6,
    fontSize: '1rem',
    color: '$green500',
    fontWeight: 700,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: '$green300',
    }
  }
});