import styled from 'styled-components'
import { Add } from 'styled-icons/material'
import { Checkmark } from 'styled-icons/icomoon'
import TOPICS from '../../constants/topics'

const Container = styled.div`
  margin-top: 4rem;
`

const Heading = styled.header`
  line-height: 1.75;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  span {
    font-family: 'Roboto Bold';
    font-size: 1.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.black};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, 28rem);
  grid-gap: 4rem;
  justify-items: center;
  margin-top: 4rem;
`

const Card = styled.div`
  width: 28rem;
  height: 28rem;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.grey[2]};
  .top {
    height: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    & > :first-child {
      font-family: 'Roboto Bold';
      font-size: 1.75rem;
      cursor: pointer;
    }
    & > :last-child {
      width: 3rem;
      height: 3rem;
      display: grid;
      justify-items: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid ${props => props.theme.grey[4]};
      color: ${props => props.theme.grey[4]};
      cursor: pointer;
      svg {
        width: 2rem;
        height: 2rem;
        color: inherit;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 18rem;
    background-image: ${props => `url("${props.image}")`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    background-origin: border-box;
    cursor: pointer;
  }
`

const Topics = props => (
  <Container>
    {TOPICS.map(x => (
      <div className="section">
        <Heading>
          <span>{x.title}</span>
        </Heading>
        <Grid>
          {x.topics.map((y, index) => (
            <Card image={y.src}>
              <div className="top">
                <span>{y.name}</span>
                <span>
                  <Add />
                </span>
              </div>
              <div className="bottom" />
            </Card>
          ))}
        </Grid>
      </div>
    ))}
  </Container>
)

export default Topics
