import styled from 'styled-components'
import NProgress from 'nprogress'
import { withApollo } from 'react-apollo'
import Markdown from 'markdown-to-jsx'
import { SINGLE_POST_QUERY } from './PostEdit'
import { ButtonSmall } from './styles/Button'
import { formatDate } from '../lib/formatDate'
import formatReadTime from '../lib/formatReadTime'
import overrides from './styles/Overrides'

const Container = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 5rem;
  .content {
    width: 50%;
    .heading {
      margin-bottom: 5rem;
      .title {
        font-family: 'Roboto Slab';
        font-size: 4rem;
        line-height: 1;
      }
      .subtitle {
        font-family: 'Roboto';
        font-size: 2.5rem;
        color: ${props => props.theme.grey[10]};
      }
      .author {
        display: grid;
        grid-template-columns: 5rem 1fr;
        grid-gap: 2rem;
        font-family: 'Roboto Slab';
        font-size: 1.3rem;
        img {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
        }
        .info {
          display: flex;
          flex-direction: column;
          .top {
            display: flex;
            align-items: center;
            & > :last-child {
              margin-left: 1rem;
            }
          }
          .bottom {
            display: flex;
            align-items: center;
            color: ${props => props.theme.grey[5]};
          }
        }
      }
    }
    .body {
      display: grid;
      .featured {
        justify-self: center;
        min-width: 50%;
        max-width: 100%;
        margin-bottom: 5rem;
      }
      .markdown {
        width: 100%;
      }
    }
  }
`

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
    await this.setState({ post: res.data.post })
    await this.setState({ loading: false })
  }

  componentWillUnmount() {
    this.props.setTopic('')
  }

  render() {
    const {
      state: { loading }
    } = this
    if (loading) return null
    const { title, subtitle, body, image, author, createdAt } = this.state.post
    return (
      <Container>
        <div className="content">
          <div className="heading">
            <div className="title">{title}</div>
            {subtitle && <div className="subtitle">{subtitle}</div>}
            <div className="author">
              <img src={author.image} />
              <div className="info">
                <div className="top">
                  <span>{author.name}</span>
                  <ButtonSmall>Follow</ButtonSmall>
                </div>
                <div className="bottom">
                  <span>
                    {formatDate(createdAt)} &bull; {formatReadTime(body.split(' ').length, true)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            {image && <img className="featured" src={image} />}
            <div className="markdown">
              <Markdown children={body} options={{ overrides }} />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default withApollo(Post)
