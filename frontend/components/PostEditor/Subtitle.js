import PropTypes from 'prop-types'
import { SubtitleInput } from '../styles/EditorStyles'

const Subtitle = ({ subtitle, onChange }) => (
  <SubtitleInput show={Boolean(subtitle)}>
    <span>Subtitle</span>
    <input
      type="text"
      name="subtitle"
      placeholder="Subtitle"
      value={subtitle}
      onChange={onChange}
    />
  </SubtitleInput>
)

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Subtitle
