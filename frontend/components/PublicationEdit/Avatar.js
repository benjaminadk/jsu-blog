import { Mutation } from 'react-apollo'
import { Camera } from 'styled-icons/feather/Camera'
import { Row, Label, ImageInput, AvatarImage } from '../styles/PublicationEditStyles'
import { SIGN_S3_MUTATION } from '../ProfileEdit'

const Avatar = ({ inputRef, image, onClick, onChange }) => (
  <Mutation mutation={SIGN_S3_MUTATION}>
    {(signS3, { loading, error }) => (
      <Row>
        <Label>Avatar *</Label>
        <ImageInput>
          <div className="left">
            <span onClick={onClick}>{image ? 'Change Image' : 'Add Image...'}</span>
            <span>
              This works like a user icon and appears in previews of your publication content
              throughout Blog.io. It is square and should be at least 60 × 60px in size.
            </span>
          </div>
          <div className="right">
            <AvatarImage image={image} onClick={onClick}>
              <Camera />
            </AvatarImage>
            <input ref={inputRef} type="file" onChange={e => onChange(e, signS3, 'avatar')} />
          </div>
        </ImageInput>
      </Row>
    )}
  </Mutation>
)

export default Avatar
