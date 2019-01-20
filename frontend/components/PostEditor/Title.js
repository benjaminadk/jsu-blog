import PropTypes from 'prop-types'
import { TitleInput } from '../styles/EditorStyles'

const Title = ({ title, onChange, onFocus }) => (
  <TitleInput show={Boolean(title)}>
    <span>Title</span>
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={title}
      onChange={onChange}
      onFocus={onFocus}
    />
  </TitleInput>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

export default Title
