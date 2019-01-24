import styled from 'styled-components'
import { Upload, Image } from 'styled-icons/icomoon'
import PropTypes from 'prop-types'
import { darken } from 'polished'
import { Row, SubHeading, IconButton } from '../styles/EditorStyles'

const Container = styled.div`
  display: grid;
  input[type='text'] {
    justify-self: center;
    align-self: center;
    width: 90%;
    border: 1px dashed ${props => props.theme.grey[5]};
    outline: ${props => (props.copied ? `4px solid ${darken(0.1, props.theme.primary)}` : 'none')};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    font-family: 'Roboto Slab';
    font-size: 1rem;
    text-align: center;
    margin-top: 0.5rem;
    padding: 0.5rem 0.25rem;
  }
  input[type='file'] {
    display: none;
  }
  .icons {
    display: flex;
  }
`

const Uploader = ({ inputRef, copied, imageUrl, onChange, onUploadClick, onCopyClick }) => (
  <Container copied={copied}>
    <Row>
      <SubHeading>Upload Image</SubHeading>
      <div className="icons">
        <IconButton onClick={onUploadClick}>
          <Upload />
        </IconButton>
        <IconButton onClick={onCopyClick}>
          <Image />
        </IconButton>
      </div>
    </Row>
    <input
      type="text"
      value={copied ? 'Copied to clipboard 🌼' : imageUrl}
      placeholder="Copy & paste urls from here into your post."
      readOnly
    />
    <input ref={inputRef} type="file" accept="image/*" multiple={false} onChange={onChange} />
  </Container>
)

Uploader.propTypes = {
  copied: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onUploadClick: PropTypes.func.isRequired,
  onCopyClick: PropTypes.func.isRequired
}

export default Uploader
