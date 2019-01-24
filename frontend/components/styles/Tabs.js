import styled from 'styled-components'

const Tabs = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  li {
    font-family: 'Roboto Bold';
    font-size: 1.35rem;
    margin-right: 3rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.25s;
    &:nth-child(1) {
      color: ${props => (props.tab === 1 ? props.theme.black : props.theme.grey[5])};
      border-bottom: ${props =>
        props.tab === 1 ? `2px solid ${props.theme.grey[10]}` : '2px solid transparent'};
    }
    &:nth-child(2) {
      color: ${props => (props.tab === 2 ? props.theme.black : props.theme.grey[5])};
      border-bottom: ${props =>
        props.tab === 2 ? `2px solid ${props.theme.grey[10]}` : '2px solid transparent'};
    }
    &:nth-child(3) {
      color: ${props => (props.tab === 3 ? props.theme.black : props.theme.grey[5])};
      border-bottom: ${props =>
        props.tab === 3 ? `2px solid ${props.theme.grey[10]}` : '2px solid transparent'};
    }
    &:nth-child(4) {
      color: ${props => (props.tab === 4 ? props.theme.black : props.theme.grey[5])};
      border-bottom: ${props =>
        props.tab === 4 ? `2px solid ${props.theme.grey[10]}` : '2px solid transparent'};
    }
    &:hover {
      color: ${props => props.theme.black};
    }
  }
`

export default Tabs
