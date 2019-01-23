import styled from 'styled-components'
import Tabs from './styles/Tabs'
import Topics from './MyInterests/Topics'
import { ME_QUERY } from './User'

const Container = styled.div`
  display: grid;
  justify-items: center;
  .content {
    width: 75%;
    margin-top: 2rem;
    h1 {
      font-family: 'Roboto Bold';
      font-size: 4.5rem;
      line-height: 1;
      margin-bottom: 0;
    }
    .subheading {
      font-family: 'Roboto Slab';
      font-size: 1.75rem;
      margin-top: 0;
    }
  }
`

class MyInterests extends React.Component {
  state = {
    tab: 1
  }

  onUpdateUser = async (updateUser, selected, topic) => {
    let { topics } = this.props.user
    if (selected) {
      topics = topics.filter(t => t !== topic)
    } else {
      topics.push(topic)
    }
    await updateUser({
      variables: { data: { topics: { set: topics } } },
      optimisticResponse: {
        __typename: 'Mutation',
        updateUser: {
          __typename: 'UserPayload',
          success: true,
          message: 'User updated.',
          user: Object.assign({}, this.props.user, { topics })
        }
      },
      update: (proxy, { data: { updateUser } }) => {
        const data = proxy.readQuery({ query: ME_QUERY })
        data.me.topics = updateUser.user.topics
        proxy.writeQuery({ query: ME_QUERY, data })
      }
    })
  }

  setTab = tab => this.setState({ tab })

  renderTabs = () => {
    const {
      state: { tab },
      props: {
        user: { topics }
      }
    } = this
    if (tab === 2) {
      return <Topics topics={topics} onUpdateUser={this.onUpdateUser} />
    } else {
      return null
    }
  }

  render() {
    const {
      state: { tab }
    } = this
    return (
      <Container>
        <div className="content">
          <h1>Customize your interests</h1>
          <p className="subheading">
            Here are users, topics, and publications you should consider following on Blog.io.
          </p>
          <Tabs tab={tab}>
            <li onClick={() => this.setTab(1)}>Suggestions</li>
            <li onClick={() => this.setTab(2)}>Topics</li>
            <li onClick={() => this.setTab(3)}>People</li>
            <li onClick={() => this.setTab(4)}>Publications</li>
          </Tabs>
          {this.renderTabs()}
        </div>
      </Container>
    )
  }
}

export default MyInterests
