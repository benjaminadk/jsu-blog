import styled from 'styled-components'
import Tabs from './styles/Tabs'
import Topics from './MyInterests/Topics'

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
    tab: 1,
    myTopics: []
  }

  setTab = tab => this.setState({ tab })

  renderTabs = () => {
    const { tab } = this.state
    if (tab === 2) {
      return <Topics />
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
