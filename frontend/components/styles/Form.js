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
  p {
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
        color: ${props => props.theme.grey[8]};
        font-size: 1.25rem;
      }
      input {
        border-bottom: 1px solid ${props => props.theme.grey[2]};
        font-size: 1.5rem;
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
        border-radius: ${props => props.theme.borderRadius};
        background: ${props => props.theme.black};
        color: ${props => props.theme.white};
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        transition: all 0.25s;
        &:hover {
          background: ${props => darken(0.1, props.theme.black)};
        }
      }
      span {
        font-size: 1.25rem;
        & > :first-child {
          color: ${props => props.theme.primary};
          margin-left: 0.5rem;
          cursor: pointer;
        }
      }
    }
  }
`

export default Form
