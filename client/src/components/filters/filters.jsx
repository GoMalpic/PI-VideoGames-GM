import GenreFilter from '../genreFilter/genreFilter'
import TypeFilter from '../typeFilter/typeFilter'
import Order from '../order/order'
import Rating from '../rating/rating'
import '../filters/filters.css'
import SearchBar from '../searchBar/searchBar'

const Filters = () => {

  return (
    <div className='containerFilter'>
      <p>Genres:</p>
      <GenreFilter />
      <p>Games List:</p>
      <TypeFilter />
      <p>Alphabetic:</p>
      <Order />
      <p>Rating:</p>
      <Rating />
      <p>Search:</p>
      <SearchBar />
    </div>
  )
}

export default Filters