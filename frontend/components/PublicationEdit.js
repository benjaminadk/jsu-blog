import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import NProgress from 'nprogress'
import axios from 'axios'
import formatFilename from '../lib/formatFilename'
import Save from './PublicationEdit/Save'
import Name from './PublicationEdit/Name'
import Description from './PublicationEdit/Description'
import Avatar from './PublicationEdit/Avatar'
import Divider from './PublicationEdit/Divider'
import Logo from './PublicationEdit/Logo'
import Social from './PublicationEdit/Social'
import Tags from './PublicationEdit/Tags'
import Editors from './PublicationEdit/Editors'
import Writers from './PublicationEdit/Writers'

const CREATE_PUBLICATION_MUTATION = gql`
  mutation CREATE_PUBLICATION_MUTATION($data: PublicationCreateInput) {
    createPublication(data: $data) {
      success
      message
      id
    }
  }
`

const SINGLE_PUBLICATION_QUERY = gql`
  query SINGLE_PUBLICATION_QUERY($id: ID!) {
    publication(id: $id) {
      id
      name
    }
  }
`

const Container = styled.div`
  display: grid;
  justify-items: center;
  .content {
    width: 75%;
    margin-top: 2rem;
    margin-bottom: 5rem;
  }
`

class PublicationEdit extends React.Component {
  state = {
    clean: true,
    title: '',
    id: '',
    name: '',
    description: '',
    avatar: '',
    logo: '',
    email: '',
    twitter: '',
    facebook: '',
    tags: []
  }

  file1 = React.createRef()
  file2 = React.createRef()

  async componentDidMount() {
    let res
    if (this.props.id && this.props.id !== 'new') {
    } else {
      this.setState({ title: 'New Publication' })
    }
  }

  onSaveOrCreate = async () => {
    const { clean, id, name, description, avatar } = this.state
    if (!name || !description || !avatar) {
      return alert('Name, description, and avatar are required.')
    }
    if (clean) return
    NProgress.start()
    let res
    const data = { ...this.state }
    delete data.clean
    delete data.title
    delete data.id
    if (id) {
      //update
    } else {
      res = await this.props.client.mutate({
        mutation: CREATE_PUBLICATION_MUTATION,
        variables: { data }
      })
      NProgress.done()
      if (res.data.createPublication.success) {
        this.setState({ id: res.data.createPublication.id, title: name, clean: true })
      } else {
        alert(res.data.createPublication.message)
      }
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value, clean: false })

  onClickFile1 = () => this.file1.current.click()

  onClickFile2 = () => this.file2.current.click()

  onFile = async (e, signS3, property) => {
    NProgress.start()
    const { id } = this.props.user
    const file = e.target.files[0]
    const filename = formatFilename('user', id, 'publication', file.name)
    const filetype = file.type
    const res = await signS3({ variables: { filename, filetype } })
    const { requestUrl, imageUrl } = res.data.signS3
    await axios({
      method: 'PUT',
      url: requestUrl,
      data: file,
      headers: {
        'Content-Type': filetype
      },
      onUploadProgress: e => {
        const completed = Math.round((e.loaded * 100) / e.total)
        if (completed === 100) {
          NProgress.done()
          this.setState({ [property]: imageUrl, clean: false })
        }
      }
    })
  }

  onDelete = () => this.setState({ logo: '', clean: false })

  setTags = tags => this.setState({ tags })

  render() {
    const {
      state: { clean, title, id, name, description, avatar, logo, email, twitter, facebook, tags }
    } = this
    return (
      <Container>
        <div className="content">
          <Save title={title} clean={clean} onClick={this.onSaveOrCreate} />
          <div>
            <Name name={name} onChange={this.onChange} />
            <Description description={description} onChange={this.onChange} />
            <Avatar
              inputRef={this.file1}
              image={avatar}
              onClick={this.onClickFile1}
              onChange={this.onFile}
            />
            <Divider size="sm" text="Items with * are required." />
            <Logo
              inputRef={this.file2}
              image={logo}
              onClick={this.onClickFile2}
              onChange={this.onFile}
              onDelete={this.onDelete}
            />
            <Divider size="md" text="Social and tags" />
            <Social email={email} twitter={twitter} facebook={facebook} onChange={this.onChange} />
            <Tags tags={tags} setTags={this.setTags} />
            <Divider size="md" text="People" />
            <Editors />
            <Writers />
          </div>
        </div>
      </Container>
    )
  }
}

export default withApollo(PublicationEdit)
