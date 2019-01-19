import styled from 'styled-components'
import { Upload, Image } from 'styled-icons/icomoon'
import PropTypes from 'prop-types'
import { darken } from 'polished'

const Container = styled.div`
  padding: 0.5rem;
  input[type='text'] {
    width: 100%;
    border: 1px dashed ${props => props.theme.grey[5]};
    outline: ${props => (props.copied ? `4px solid ${darken(0.1, props.theme.primary)}` : 'none')};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    font-family: 'Roboto Slab';
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem 0.25rem;
  }
  input[type='file'] {
    display: none;
  }
  .icons {
    display: grid;
    grid-template-columns: 1fr repeat(2, 5rem);
    justify-content: flex-end;
    align-items: center;
    & > :first-child {
      font-family: 'Roboto Slab Bold';
      font-size: 1.5rem;
      color: ${props => props.theme.grey[10]};
    }
    .icon {
      width: 5rem;
      display: grid;
      justify-items: center;
      align-items: center;
      color: ${props => props.theme.grey[10]};
      cursor: pointer;
      transition: color 0.25s;
      &:hover {
        color: ${props => darken(0.1, props.theme.primary)};
      }
      svg {
        width: 2rem;
        height: 2rem;
        color: inherit;
      }
    }
  }
`

const Uploader = ({ inputRef, copied, imageUrl, onChange, onUploadClick, onCopyClick }) => (
  <Container copied={copied}>
    <div className="icons">
      <span>Upload Image</span>
      <div className="icon" onClick={onUploadClick}>
        <Upload />
      </div>
      <div className="icon" onClick={onCopyClick}>
        <Image />
      </div>
    </div>
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
