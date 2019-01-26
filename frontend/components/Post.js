import styled from 'styled-components'
import NProgress from 'nprogress'
import { withApollo } from 'react-apollo'
import { SINGLE_POST_QUERY } from './PostEdit'

const Container = styled.div``

class Post extends React.Component {
  state = {
    loading: true,
    post: null
  }

  async componentDidMount() {
    NProgress.start()
    const { id } = this.props.query
    const res = await this.props.client.query({
      query: SINGLE_POST_QUERY,
      variables: { id }
    })
    NProgress.done()
    this.props.setTopic(res.data.post.topic)
    this.setState({ post: res.data.post, loading: false })
  }

  componentWillUnmount() {
    this.props.setTopic('')
  }

  render() {
    const {
      state: { loading, post }
    } = this
    if (loading) return null
    return (
      <Container>
        <div>{post.title}</div>
      </Container>
    )
  }
}

export default withApollo(Post)
