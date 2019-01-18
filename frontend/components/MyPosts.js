import styled from 'styled-components'
import { format, formatDistance } from 'date-fns'
import { ChevronDown } from 'styled-icons/octicons'
import { ButtonOutline } from './styles/Button'
import Menu from './Menu'

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
  h3,
  h4 {
    font-family: 'Roboto Slab Bold';
    margin: 0;
  }
  h3 {
    margin-top: 1.5rem;
  }
  h4 {
    color: ${props => props.theme.grey[10]};
  }
  p {
    font-family: 'Roboto Condensed';
    font-size: 1.3rem;
    margin: 0;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.grey[10]};
    svg {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      transition: color 0.25s;
      &:hover {
        color: ${props => props.theme.black};
      }
    }
  }
`

export default class MyPosts extends React.Component {
  state = {
    tab: 'drafts',
    drafts: [],
    published: [],
    show: false,
    menu: null,
    navigation: []
  }

  componentDidMount() {
    let drafts = []
    let published = []
    this.props.user.posts.forEach(post => {
      let words = post.body.split(' ').length
      post.words = words
      if (post.published) {
        published.push(post)
      } else {
        drafts.push(post)
      }
    })
    this.setState({ drafts, published })
  }

  setTab = tab => this.setState({ tab })

  onOpenMenu = (e, id, i) => {
    // can use event for approximate placement or mucho refs for exact placement
    // const { pageX: x, pageY: y } = e.nativeEvent
    const { x, y } = this[`menu-${i}`].getBoundingClientRect()
    const { tab } = this.state
    const type = tab === 'drafts' ? 'draft' : 'story'
    const navigation = [
      { type: 'edit', text: `Edit ${type}`, id },
      { type: 'delete', text: `Delete ${type}`, id }
    ]
    if (tab === 'published') {
      navigation.push({ type: 'stats', text: 'View stats', id })
    }
    this.setState({ show: true, menu: { x: Math.round(x), y: Math.round(y) }, navigation })
  }

  onCloseMenu = () => this.setState({ show: false, menu: null })

  renderPosts = () => {
    const { tab, drafts, published } = this.state
    const posts = tab === 'drafts' ? drafts : published
    return posts.map((post, i) => (
      <Post key={post.id}>
        <h3>{post.title}</h3>
        {post.subtitle && <h4>{post.subtitle}</h4>}
        {post.published ? (
          <p>
            Created @ {format(new Date(post.createdAt), 'PPP')} &bull; {Math.ceil(post.words / 265)}{' '}
            min read{' '}
            <ChevronDown
              ref={el => (this[`menu-${i}`] = el)}
              onClick={e => this.onOpenMenu(e, post.id, i)}
            />
          </p>
        ) : (
          <p>
            Last edited {formatDistance(new Date(post.updatedAt), new Date())} ago &bull;{' '}
            {Math.ceil(post.words / 265)} min read ({post.words} words) so far{' '}
            <ChevronDown
              ref={el => (this[`menu-${i}`] = el)}
              onClick={e => this.onOpenMenu(e, post.id, i)}
            />
          </p>
        )}
      </Post>
    ))
  }

  render() {
    const {
      state: { tab, drafts, published, show, menu, navigation }
    } = this
    const menuPosition = {
      top: show ? `calc(${menu.y}px + 3rem)` : 0,
      left: show ? `calc(${menu.x}px - 5rem)` : 0
    }
    return (
      <Container tab={tab}>
        <div className="content">
          <div className="heading">
            <h1>Your Stories</h1>
            <div>
              <ButtonOutline>Write a story</ButtonOutline>
            </div>
          </div>
          <ul>
            <li onClick={() => this.setTab('drafts')}>Drafts {drafts.length}</li>
            <li onClick={() => this.setTab('published')}>Published {published.length}</li>
          </ul>
          <div className="posts">{this.renderPosts()}</div>
        </div>
        <Menu
          show={show}
          width={12}
          menuPosition={menuPosition}
          arrowPosition="left: 6rem;"
          navigation={navigation}
          onClose={this.onCloseMenu}
        />
      </Container>
    )
  }
}
