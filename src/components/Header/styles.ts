import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  variants: {
    justify: {
      centered: {
        justifyContent: 'center',
      },
      spaced: {
        justifyContent: 'space-between'
      } 
    }
  },
  defaultVariants: {
    justify: 'spaced'
  }
});

export const ShoppingCartButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '0.75rem',
  width: '3rem',
  height: '3rem',
  borderRadius: 6,
  backgroundColor: '$gray800',
  border: 'none',
  cursor: 'pointer',
  variants: {
      iconType: {
        full: {
          color: '$gray300',
        },
        empty: {
          color: '$gray500',
        }
      }
    },
  svg: {
    
    lineHeight: 0,
  }, 

  span: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 'calc(-0.75rem + 3px)',
    right: 'calc(-0.75rem + 3px)',
    borderRadius: '50%',
    backgroundColor: '$green500',
    color: '$white',
    fontSize: '$sm',
    fontWeight: 700,
    width: 'calc(1.5rem + 3px)',
    height: 'calc(1.5rem + 3px)',
    border: 'solid 3px $gray900',
  },

  '&:hover': {
    filter: 'brightness(1.1)',
    transition: 'all 0.2s',
  }
});