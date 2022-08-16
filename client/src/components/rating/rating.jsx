import { connect } from 'react-redux'
import { ratingVideogames, setCurrentPage } from '../../store/actions'

const Rating = ({ ratingVideogames, setCurrentPage }) => {

  const handleChange = (e) => {
    const { value } = e.target
    ratingVideogames(value)
    setCurrentPage(1)
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='selecciona'>Choose</option>
      <option value='ratingUp'>Lower to Highest</option>
      <option value='ratingDown'>Higher to Lowest</option>
    </select>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    ratingVideogames: value => dispatch(ratingVideogames(value)),
    setCurrentPage: value => dispatch(setCurrentPage(value))
  }
}

export default connect(null, mapDispatchToProps)(Rating)