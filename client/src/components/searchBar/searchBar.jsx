import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchVideogames } from '../../store/actions'
import '../searchBar/searchBar.css'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchVideogames(search))
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    setSearch(value)
  }

  return (
    <div className='searchDiv'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Videogame...' onChange={handleInputChange} />
        <button type='submit' value='Buscar' className='buttonSearch' ><span class="button_top"> Search
  </span></button>
      </form>
    </div>
  )
}

export default SearchBar