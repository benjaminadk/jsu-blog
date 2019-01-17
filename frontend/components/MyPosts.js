import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  justify-items: center;
  .content {
    width: 75%;
    .heading {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      h1 {
        font-family: 'Roboto Slab Bold';
      }
      & > :last-child {
        justify-self: flex-end;
      }
    }
    ul {
      list-style: none;
      display: flex;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid ${props => props.theme.grey[2]};
    }
    li {
      font-family: 'Roboto Bold';
      font-size: 1.35rem;
      margin-right: 3rem;
      padding-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.25s;
      &:first-of-type {
        color: ${props => (props.tab === 'drafts' ? props.theme.black : props.theme.grey[5])};
        border-bottom: ${props =>
          props.tab === 'drafts' ? `2px solid ${props.theme.grey[10]}` : '2px solid white'};
      }
      &:last-of-type {
        color: ${props => (props.tab === 'published' ? props.theme.black : props.theme.grey[5])};
        border-bottom: ${props =>
          props.tab === 'published' ? `2px solid ${props.theme.grey[10]}` : '2px solid white'};
      }
      &:hover {
        color: ${props => props.theme.black};
      }
    }
    .posts {
      display: grid;
      grid-template-rows: repeat(auto-fit, minmax(7.5rem, 1fr));
    }
  }
`

const Post = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.grey[5]};
  h3 {
    font-family: 'Roboto Slab Bold';
  }
`

export default class MyPosts extends React.Component {
  state = {
    tab: 'drafts',
    drafts: [],
    published: []
  }

  componentDidMount() {
    let drafts = []
    let published = []
    this.props.user.posts.forEach(post => {
      if (post.published) {
        published.push(post)
      } else {
        drafts.push(post)
      }
    })
    this.setState({ drafts, published })
  }

  setTab = tab => this.setState({ tab })

  renderPosts = () => {
    const { tab, drafts, published } = this.state
    const posts = tab === 'drafts' ? drafts : published
    return posts.map(post => (
      <Post key={post.id}>
        <h3>{post.title}</h3>
      </Post>
    ))
  }

  render() {
    const {
      state: { tab, drafts, published }
    } = this
    return (
      <Container tab={tab}>
        <div className="content">
          <div className="heading">
            <h1>Your Stories</h1>
            <div>
              <button>Write a story</button>
            </div>
          </div>
          <ul>
            <li onClick={() => this.setTab('drafts')}>Drafts {drafts.length}</li>
            <li onClick={() => this.setTab('published')}>Published {published.length}</li>
          </ul>
          <div className="posts">{this.renderPosts()}</div>
        </div>
      </Container>
    )
  }
}
