import styled from 'styled-components'
import Editor from './Editor'
import PostPreview from './PostPreview'
import Images from './Images'

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
`

class PostNew extends React.Component {
  state = {
    preview: false
  }

  togglePreview = () => this.setState(({ preview }) => ({ preview: !preview }))

  render() {
    const {
      state: { preview }
    } = this
    return (
      <Container>
        <Editor />
        <Images />
      </Container>
    )
  }
}

export default PostNew
