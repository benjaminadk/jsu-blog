import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { ButtonSave } from '../styles/Button'

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: ID!, $data: PostUpdateInput) {
    updatePost(id: $id, data: $data) {
      success
      message
    }
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px dashed ${props => props.theme.grey[1]};
  span {
    justify-self: center;
    width: 80%;
    text-align: center;
    font-family: 'Roboto Slab';
    font-size: 1rem;
    background: ${props => props.theme.grey[0]};
    border: 1px dashed ${props => props.theme.grey[5]};
  }
`

const SaveStatus = ({ clean, onClick }) => (
  <Mutation mutation={UPDATE_POST_MUTATION}>
    {(updatePost, { loading, error }) => (
      <Container>
        <ButtonSave clean={clean} onClick={() => onClick(updatePost)}>
          Save
        </ButtonSave>
        <span>
          {loading
            ? 'Saving...⏳'
            : clean
            ? 'Everything is up to date. 🌼'
            : 'Click to save changes. 👆'}
        </span>
      </Container>
    )}
  </Mutation>
)

export default SaveStatus
