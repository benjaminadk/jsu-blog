import styled from 'styled-components'

export const MenuOuter = styled.div.attrs(props => ({
  style: {
    ...props.position
  }
}))`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  z-index: 100;
`

export const MenuInner = styled.div.attrs(props => ({
  style: {
    width: `${props.width}rem`
  }
}))`
  border: 1px solid ${props => props.theme.grey[3]};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.white};
  padding: 0;
  line-height: 1.4;
  box-shadow: ${props => props.theme.shadows[1]};
  ul {
    padding: 0.75rem 0;
    margin: 0;
    list-style: none;
    list-style-image: none;
    .separator {
      border-top: 1px solid ${props => props.theme.grey[3]};
      margin: 1rem 0;
    }
    .list-item {
      color: ${props => props.theme.grey[12]};
      font-family: 'Roboto Slab';
      font-size: 1.25rem;
      padding: 1rem 2rem;
      cursor: pointer;
      transition: color 0.25s;
      &:hover {
        color: ${props => props.theme.black};
      }
    }
  }
`

export const MenuArrow = styled.div`
  position: absolute;
  top: -0.6rem;
  ${props => props.position};
  margin-left: -0.7rem;
  &::after {
    content: '';
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    background: ${props => props.theme.white};
    transform: rotate(45deg);
    box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.75);
  }
`

export const Backdrop = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: transparent;
`
