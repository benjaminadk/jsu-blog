import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  padding: 0 1rem;
  margin-top: 1rem;
  .heading {
    line-height: 1.5;
    font-size: 2rem;
    color: ${props => props.theme.grey[5]};
    border-bottom: 1px dashed ${props => props.theme.grey[1]};
  }
`

export default props => (
  <Container>
    <div className="heading">Images</div>
    <div className="content">
      <input type="file" />
      <div className="dropzone" />
    </div>
  </Container>
)
