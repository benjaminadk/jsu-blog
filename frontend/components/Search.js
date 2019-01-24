import styled from 'styled-components'
import { Search as SearchIcon } from 'styled-icons/material'

const Container = styled.div`
  width: 22rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input[type='text'] {
    width: ${props => (props.show ? '100%' : '0%')};
    background: ${props => props.theme.grey[0]};
    font-family: 'Roboto Slab';
    font-size: 1.35rem;
    transition: width 0.5s;
  }
  span {
    width: 4rem;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    svg {
      width: 2rem;
      height: 2rem;
      color: ${props => props.theme.grey[10]};
      cursor: pointer;
    }
  }
`

class Search extends React.Component {
  state = {
    show: false,
    term: ''
  }

  input = React.createRef()

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.show && this.state.show) {
      this.input.current.focus()
    }
  }

  onChange = e => this.setState({ term: e.target.value })

  onBlur = () => {
    if (!this.state.term) {
      this.setState({ show: false })
    }
  }

  toggleShow = () => this.setState(({ show }) => ({ show: !show }))

  render() {
    const {
      state: { show, term }
    } = this
    return (
      <Container show={show}>
        <span onClick={this.toggleShow}>
          <SearchIcon />
        </span>
        <input
          ref={this.input}
          type="text"
          placeholder="Search Blog.io"
          value={term}
          onChange={this.onChange}
          onBlur={this.onBlur}
          spellCheck={false}
        />
      </Container>
    )
  }
}

export default Search
