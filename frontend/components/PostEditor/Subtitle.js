import PropTypes from 'prop-types'
import { SubtitleInput } from '../styles/EditorStyles'

const Subtitle = ({ subtitle, onChange, onFocus }) => (
  <SubtitleInput show={Boolean(subtitle)}>
    <span>Subtitle</span>
    <input
      type="text"
      name="subtitle"
      placeholder="Subtitle"
      value={subtitle}
      onChange={onChange}
      onFocus={onFocus}
    />
  </SubtitleInput>
)

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

export default Subtitle
