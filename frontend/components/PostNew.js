import styled from 'styled-components'
import Editor from './Editor'
import Images from './Images'

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
`

class PostNew extends React.Component {
  state = {
    image: ''
  }

  setImage = image => this.setState({ image })

  render() {
    const {
      state: { image },
      props: { user }
    } = this
    return (
      <Container>
        <Editor />
        <Images image={image} user={user} setImage={this.setImage} />
      </Container>
    )
  }
}

export default PostNew
