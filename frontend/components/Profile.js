import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: grid;
  justify-items: center;
  .user-info {
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 12rem;
    margin-top: 5rem;
    .user-text {
      .user-name {
        display: flex;
        align-items: center;
        line-height: 1;
        color: ${props => props.theme.black};
        & > :first-child {
          font-size: 3rem;
        }
        & > :last-child {
          font-size: 1.35rem;
          border: 1px solid;
          border-radius: ${props => props.theme.borderRadius};
          padding: 0.25rem 1rem;
          margin-left: 2rem;
          cursor: pointer;
          transition: all 0.25s;
          &:hover {
            background: ${props => props.theme.grey[0]};
          }
        }
      }
      .user-bio {
        font-size: 1.75rem;
      }
    }
    img {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
    }
  }
`

const Profile = ({ user }) => (
  <Container>
    <div className="user-info">
      <div className="user-text">
        <div className="user-name">
          <span>{user.name}</span>
          <Link href="/profile-edit">
            <a>Edit profile</a>
          </Link>
        </div>
        <span className="user-bio">{user.bio}</span>
      </div>
      <img src={user.image} alt="avatar" />
    </div>
  </Container>
)

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })
}

export default Profile
