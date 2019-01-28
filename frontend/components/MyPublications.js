import styled from 'styled-components'
import Router from 'next/router'
import { ChevronDown } from 'styled-icons/octicons/ChevronDown'
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
      margin-top: 3rem;
      .title {
        font-family: 'Roboto Slab Bold';
        border-bottom: 1px solid ${props => props.theme.grey[2]};
      }
    }
  }
`

const Publication = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  margin-top: 3rem;
  img {
    width: 4rem;
    height: 4rem;
  }
  .info {
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    & > :first-child {
      font-family: 'Roboto Slab Bold';
      font-size: 1.75rem;
      line-height: 1;
      transition: color 0.25s;
      cursor: pointer;
      &:hover {
        color: ${props => props.theme.grey[10]};
      }
    }
    & > :last-child {
      font-family: 'Roboto Slab';
      font-size: 1.25rem;
    }
  }
  .status {
    display: flex;
    align-items: center;
    font-family: 'Roboto Slab';
    font-size: 1.4rem;
    color: ${props => props.theme.grey[10]};
    transition: color 0.25s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.black};
    }
    svg {
      width: 2rem;
      height: 2rem;
      margin-left: 0.5rem;
      color: inherit;
    }
  }
`

class MyPublications extends React.Component {
  onNewPublication = () => Router.push({ pathname: '/publication-edit', query: { id: 'new' } })

  render() {
    const {
      props: {
        user: { pubsOwner }
      }
    } = this
    return (
      <Container>
        <div className="content">
          <div className="heading">
            <h1>Publications</h1>
            <ButtonOutline onClick={this.onNewPublication}>New publication</ButtonOutline>
          </div>
          <div className="section">
            <div className="title">Staff</div>
            {pubsOwner.map(p => (
              <Publication key={p.id}>
                <img src={p.avatar} />
                <div className="info">
                  <span>{p.name}</span>
                  <span>{p.description}</span>
                </div>
                <div className="status">
                  <span>Owner</span>
                  <ChevronDown />
                </div>
              </Publication>
            ))}
          </div>
          <div className="section">
            <div className="title">Following</div>
          </div>
        </div>
      </Container>
    )
  }
}

export default MyPublications
