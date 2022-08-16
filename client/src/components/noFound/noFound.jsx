import { Link } from 'react-router-dom'
import './noFound.css'

const NoFound = () => {

  return (
    <>
      <div className='intro'>
        <div className='introText'>
          <p>No Found Page</p>
        </div>
        <div className='buttonContainer'>
          <Link to='/home'>
            <button className='introButton' type="button">Return to home</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NoFound