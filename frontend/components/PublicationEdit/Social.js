import { Email } from 'styled-icons/material/Email'
import { Twitter } from 'styled-icons/boxicons-logos/Twitter'
import { FacebookSquare } from 'styled-icons/boxicons-logos/FacebookSquare'
import { Row, Label, SocialInputs, TextInput } from '../styles/PublicationEditStyles'

const Social = ({ email, twitter, facebook, onChange }) => (
  <Row>
    <Label>Contact info</Label>
    <SocialInputs>
      <div className="input">
        <Email />
        <TextInput name="email" placeholder="Email" value={email} onChange={onChange} />
      </div>
      <div className="input">
        <Twitter />
        <span>twitter.com/</span>
        <TextInput name="twitter" placeholder="username" value={twitter} onChange={onChange} />
      </div>
      <div className="input">
        <FacebookSquare />
        <span>facebook.com/</span>
        <TextInput name="facebook" placeholder="pagename" value={facebook} onChange={onChange} />
      </div>
      <span className="note">These links will be public.</span>
    </SocialInputs>
  </Row>
)

export default Social
