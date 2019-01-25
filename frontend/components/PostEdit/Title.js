import PropTypes from 'prop-types'
import { TitleInput } from '../styles/PostEditStyles'

const Title = ({ title, onChange }) => (
  <TitleInput show={Boolean(title)}>
    <span>Title</span>
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={title}
      onChange={onChange}
      spellCheck={false}
    />
  </TitleInput>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Title
