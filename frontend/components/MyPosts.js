import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import { ME_QUERY } from './User'
import { ChevronDown } from 'styled-icons/octicons'
import { ButtonOutline, ButtonDelete, ButtonCancel } from './styles/Button'
import Tabs from './styles/Tabs'
import Menu from './Menu'
import Modal from './Modal'
import { formatDate, formatDateFromNow } from '../lib/formatDate'
import formatReadTime from '../lib/formatReadTime'

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id) {
      success
      message
    }
  }
`

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
        font-family: 'Roboto Bold';
        font-size: 4.5rem;
      }
      & > :last-child {
        justify-self: flex-end;
      }
    }
    .empty {
      width: 100%;
      margin-top: 5rem;
      p {
        font-family: 'Roboto';
        text-align: center;
      }
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
    cursor: pointer;
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

const Confirm = styled.div`
  h1 {
    font-family: 'Roboto Bold';
    font-weight: normal;
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }
  p {
    font-family: 'Roboto Slab';
    font-size: 1.4rem;
    margin: 0;
    margin-bottom: 2rem;
    padding: 0;
    color: ${props => props.theme.grey[10]};
  }
  button {
    margin-right: 2rem;
  }
`

export default class MyPosts extends React.Component {
  state = {
    tab: 1,
    drafts: [],
    published: [],
    showMenu: false,
    coordsMenu: null,
    navigation: [],
    showModal: false,
    postId: null
  }

  componentDidMount() {
    this.setPosts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.posts.length !== this.props.user.posts.length) {
      this.setPosts()
    }
  }

  setPosts = () => {
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
    const type = tab === 1 ? 'draft' : 'story'
    const navigation = [
      { type: 'link', text: `Edit ${type}`, pathname: '/post-edit', id },
      { type: 'cb', text: `Delete ${type}`, id, cb: this.onOpenModal }
    ]
    if (tab === 2) {
      navigation.push({ type: 'link', text: 'View stats', pathname: '/my-stats', id })
    }
    this.setState({
      showMenu: true,
      coordsMenu: { x: Math.round(x), y: Math.round(y) },
      navigation,
      postId: id
    })
  }

  onPostClick = (id, published) => {
    if (!published) return
    Router.push({ pathname: '/post', query: { id } })
  }

  onCloseMenu = () => this.setState({ showMenu: false, coordsMenu: null })

  onOpenModal = () => this.setState({ showModal: true })

  onCloseModal = () => this.setState({ showModal: false, postId: null })

  onNewStory = () => Router.push({ pathname: '/post-edit', query: { id: 'new' } })

  onDeletePost = async deletePost => {
    const res = await deletePost({
      variables: { id: this.state.postId }
    })
    if (res.data.deletePost.success) {
      this.onCloseModal()
    }
  }

  renderTabs = () => {
    const { tab, drafts, published } = this.state
    const posts = tab === 1 ? drafts : published
    if (!drafts.length || !published.length) {
      return (
        <div className="empty">
          {tab === 1 ? (
            <p>You have no drafts.</p>
          ) : (
            <p>You haven’t published any public stories yet.</p>
          )}
        </div>
      )
    } else {
      return posts.map((post, i) => (
        <Post key={post.id}>
          <h3 onClick={() => this.onPostClick(post.id, post.published)}>{post.title}</h3>
          {post.subtitle && <h4>{post.subtitle}</h4>}
          {post.published ? (
            <p>
              Created @ {formatDate(post.createdAt)} &bull; {formatReadTime(post.words, true)}
              <ChevronDown
                ref={el => (this[`menu-${i}`] = el)}
                onClick={e => this.onOpenMenu(e, post.id, i)}
              />
            </p>
          ) : (
            <p>
              Last edited {formatDateFromNow(post.updatedAt)} ago &bull;{' '}
              {formatReadTime(post.words, false)}
              <ChevronDown
                ref={el => (this[`menu-${i}`] = el)}
                onClick={e => this.onOpenMenu(e, post.id, i)}
              />
            </p>
          )}
        </Post>
      ))
    }
  }

  render() {
    const {
      state: { tab, drafts, published, showMenu, coordsMenu, navigation, showModal }
    } = this
    const menuPosition = {
      top: showMenu ? `calc(${coordsMenu.y}px + 3rem)` : 0,
      left: showMenu ? `calc(${coordsMenu.x}px - 5rem)` : 0
    }
    return (
      <Container>
        <div className="content">
          <div className="heading">
            <h1>Your stories</h1>
            <div>
              <ButtonOutline onClick={this.onNewStory}>Write a story</ButtonOutline>
            </div>
          </div>
          <Tabs tab={tab}>
            <li onClick={() => this.setTab(1)}>Drafts {drafts.length}</li>
            <li onClick={() => this.setTab(2)}>Published {published.length}</li>
          </Tabs>
          {this.renderTabs()}
        </div>
        <Menu
          show={showMenu}
          width={12}
          menuPosition={menuPosition}
          arrowPosition="left: 6rem;"
          navigation={navigation}
          onClose={this.onCloseMenu}
        />
        <Modal show={showModal} transparent={true} onClose={this.onCloseModal}>
          <Mutation mutation={DELETE_POST_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
            {(deletePost, { loading, error }) => (
              <Confirm>
                <h1>Delete</h1>
                <p>Deleted stories are gone forever. Are you sure?</p>
                <div>
                  <ButtonDelete onClick={() => this.onDeletePost(deletePost)}>
                    {loading ? '💥' : 'Delete'}
                  </ButtonDelete>
                  <ButtonCancel onClick={this.onCloseModal}>Cancel</ButtonCancel>
                </div>
              </Confirm>
            )}
          </Mutation>
        </Modal>
      </Container>
    )
  }
}
