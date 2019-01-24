import styled from 'styled-components'
import Router from 'next/router'
import { ButtonOutline } from './styles/Button'

const Container = styled.div`
  display: grid;
  justify-items: center;
  .content {
    width: 75%;
    margin-top: 2rem;
    .heading {
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
    }
    .section {
      .title {
        font-family: 'Roboto Slab Bold';
        border-bottom: 1px solid ${props => props.theme.grey[2]};
      }
    }
  }
`

class MyPublications extends React.Component {
  onNewPublication = () => Router.push({ pathname: '/publication-edit', query: { id: 'new' } })

  render() {
    return (
      <Container>
        <div className="content">
          <div className="heading">
            <h1>Publications</h1>
            <ButtonOutline onClick={this.onNewPublication}>New publication</ButtonOutline>
          </div>
          <div className="section">
            <div className="title">Staff</div>
          </div>
        </div>
      </Container>
    )
  }
}

export default MyPublications
