import styled from 'styled-components'

export const Heading = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  h1 {
    font-family: 'Roboto Bold';
    font-size: 4.5rem;
  }
  & > :last-child {
    justify-self: flex-end;
  }
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-bottom: 2rem;
`

export const Label = styled.span`
  font-family: 'Roboto Bold';
  font-size: 1.75rem;
`

export const TextInput = styled.input.attrs(props => ({
  type: 'text',
  spellCheck: false
}))`
  font-family: 'Roboto Slab';
  font-size: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  padding: 0.5rem 0;
  &:focus {
    border-bottom: 1px solid ${props => props.theme.grey[7]};
  }
  &::placeholder {
    color: ${props => props.theme.grey[5]};
  }
`

export const SingleInput = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-family: 'Roboto Slab';
    font-size: 1.25rem;
    color: ${props => props.theme.grey[5]};
  }
`

export const ImageInput = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 5rem;
  align-items: center;
  font-family: 'Roboto Slab';
  .left {
    display: flex;
    flex-direction: column;
    & > :first-child {
      font-size: 1.5rem;
      cursor: pointer;
      &:hover {
        color: ${props => props.theme.grey[10]};
      }
    }
    & > :last-child {
      font-size: 1.25rem;
      text-align: justify;
      color: ${props => props.theme.grey[5]};
    }
  }
  .right {
    input[type='file'] {
      display: none;
    }
    span {
      width: 10rem;
      display: block;
      text-align: center;
      font-size: 1.35rem;
      cursor: pointer;
      &:hover {
        color: ${props => props.theme.grey[10]};
      }
    }
  }
`

export const Image = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: ${props => (props.image ? `url("${props.image}")` : 'none')};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  color: ${props => props.theme.grey[5]};
  border: 2px solid ${props => (props.image ? 'transparent' : props.theme.grey[5])};
  border-radius: ${props => (props.image ? 0 : props.theme.borderRadius)};
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    color: ${props => props.theme.grey[10]};
  }
  svg {
    display: ${props => (props.image ? 'none' : 'block')};
    width: 5rem;
    height: 5rem;
    color: inherit;
  }
`

export const AvatarImage = styled(Image)`
  background-size: cover;
`

export const LogoImage = styled(Image)`
  background-size: contain;
  justify-content: ${props => (props.image ? 'flex-start' : 'center')};
`

export const SocialInputs = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  .input {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    svg {
      width: 2rem;
      height: 2rem;
      color: ${props => props.theme.grey[10]};
      margin-right: 0.5rem;
    }
    span {
      font-size: 1.5rem;
      font-family: 'Roboto Slab';
      margin-right: 0.25rem;
    }
  }
  .note {
    font-size: 1.25rem;
    font-family: 'Roboto Slab';
    color: ${props => props.theme.grey[5]};
  }
`
