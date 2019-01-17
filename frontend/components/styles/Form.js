import styled from 'styled-components'
import { darken } from 'polished'

const Form = styled.form.attrs({
  method: 'POST'
})`
  min-width: 30rem;
  max-width: 35rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows[1]};
  h1,
  p {
    margin: 0;
    padding: 0;
    line-height: 1;
    text-align: center;
    margin-bottom: 1rem;
    color: ${props => props.theme.black};
  }
  h1 {
    font-family: 'Roboto Slab Bold';
  }
  p {
    padding: 0 2rem;
    font-size: 1.25rem;
    font-family: 'Roboto Slab';
    line-height: 1.25;
  }
  fieldset {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 0;
    &:disabled {
      opacity: 0.5;
    }
    label {
      position: relative;
      display: grid;
      grid-template-rows: 1fr 1fr;
      & > :first-child {
        justify-self: center;
        color: ${props => props.theme.grey[5]};
        font-size: 1.15rem;
        font-family: 'Roboto Bold';
      }
      input {
        border-bottom: 1px solid ${props => props.theme.grey[2]};
        font-size: 1.5rem;
        font-family: 'Roboto';
        padding: 0 0.25rem;
        transition: all 0.25s;
        &:focus {
          border-bottom: 1px solid ${props => props.theme.grey[4]};
        }
      }
    }
    .signup {
      display: grid;
      justify-items: center;
      align-items: center;
      margin-top: 2rem;
      input[type='submit'] {
        width: 15rem;
        font-family: 'Roboto Slab';
        border-radius: ${props => props.theme.borderRadius};
        background: ${props => props.theme.black};
        color: ${props => props.theme.white};
        padding: 0.75rem 1.5rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        transition: all 0.25s;
        &:hover {
          background: ${props => darken(0.1, props.theme.black)};
        }
      }
      span {
        font-size: 1.25rem;
        font-family: 'Roboto';
        & > :first-child {
          font-family: 'Roboto Bold';
          color: ${props => darken(0.05, props.theme.primary)};
          margin-left: 0.5rem;
          cursor: pointer;
          transition: all 0.25s;
          &:hover {
            color: ${props => darken(0.1, props.theme.primary)};
          }
        }
      }
    }
  }
`

export default Form
