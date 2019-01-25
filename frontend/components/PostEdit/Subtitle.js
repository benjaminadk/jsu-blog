import PropTypes from 'prop-types'
import { SubtitleInput } from '../styles/PostEditStyles'

const Subtitle = ({ subtitle, onChange }) => (
  <SubtitleInput show={Boolean(subtitle)}>
    <span>Subtitle</span>
    <input
      type="text"
      name="subtitle"
      placeholder="Subtitle"
      value={subtitle}
      onChange={onChange}
      spellCheck={false}
    />
  </SubtitleInput>
)

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Subtitle
