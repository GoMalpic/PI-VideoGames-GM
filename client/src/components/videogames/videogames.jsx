import NavBar from '../navBar/navBar';
import Filters from '../filters/filters';
import Pagination from '../pagination/pagination';
import Videogame from '../videogame/videogame';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchVideogames } from '../../store/actions/index';
import { Link } from 'react-router-dom';
import '../videogames/videogames.css';

const Videogames = ({ videogames, fetchVideogames, currentPage }) => {
  const cardsPerPage = 15;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = videogames.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    fetchVideogames()
  }, [fetchVideogames])

  return (
    <>
        <div className='gamesContainer'>
        <NavBar/>
            <div className='filters'>
              <Filters actualPage={currentPage} />
              <Pagination cardsPerPage={cardsPerPage} totalCards={videogames.length} />
            </div>
            <div className='cards'>
              {videogames.length >= 1 &&
                <>
                  {currentCards.map(videogame =>
                    <Link to={'/game/' + videogame.id} className='nameLink' style={{ textDecoration: 'none' }}>
                    <Videogame key={videogame.id} name={videogame.name} image={videogame.image} rating={videogame.rating} id={videogame.id} genres={videogame.genres} />
                    </Link>
                  )}
                </>
              }
            </div>
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    videogames: state.filteredVideogames,
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideogames: () => dispatch(fetchVideogames())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videogames)