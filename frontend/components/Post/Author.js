import { ButtonSmall } from '../styles/Button'
import { formatDate } from '../../lib/formatDate'
import formatReadTime from '../../lib/formatReadTime'

const Author = (author, body, createdAt) => (
  <div className="author">
    <img src={author.image} />
    <div className="info">
      <div className="top">
        <span>{author.name}</span>
        <ButtonSmall>Follow</ButtonSmall>
      </div>
      <div className="bottom">
        <span>
          {formatDate(createdAt)} &bull; {formatReadTime(body.split(' ').length, true)}
        </span>
      </div>
    </div>
  </div>
)

export default Author
