import { Mutation } from 'react-apollo'
import { Camera } from 'styled-icons/feather/Camera'
import { Row, Label, ImageInput, LogoImage } from '../styles/PublicationEditStyles'
import { SIGN_S3_MUTATION } from '../ProfileEdit'

const Logo = ({ inputRef, image, onClick, onChange, onDelete }) => (
  <Mutation mutation={SIGN_S3_MUTATION}>
    {(signS3, { loading, error }) => (
      <Row>
        <Label>Logo</Label>
        <ImageInput>
          <div className="left">
            <span onClick={onClick}>{image ? 'Change Image' : 'Add Image...'}</span>
            <span>
              This logo appears at the top of all your publication’s stories. It should have a
              transparent background, and be at least 600px wide and 72px tall.
            </span>
          </div>
          <div className="right">
            <LogoImage image={image} onClick={onClick}>
              <Camera />
            </LogoImage>
            {image && <span onClick={onDelete}>Remove</span>}
            <input ref={inputRef} type="file" onChange={e => onChange(e, signS3, 'logo')} />
          </div>
        </ImageInput>
      </Row>
    )}
  </Mutation>
)

export default Logo
