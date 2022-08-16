import { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavBar from "../navBar/navBar";
import axios from "axios";
import "../videogameDetail/videogameDetail.css";

const VideogameDetail = () => {
  const [videogame, setVideogame] = useState({});
  const { id } = useParams();

  function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/videogame/${id}`).then((response) => {
      setVideogame(response.data);
    });
  }, [id]);

  return (
    <>
      <NavBar />
      {videogame.image ? (
        <div className="gameCard">
          <div className="col gameDetails">
            <h2 className="firstItem">{videogame.name}</h2>
            <div className="titleDetails">GENRES</div>
            <div className="genres">
              {videogame.genres.map((item) => (
                <p className="details" key={item.name}>
                  {item.name}
                </p>
              ))}
            </div>
            <div className="othersDetails">
              <div className="releasedDetails">
                <p>Released:</p>
                <p>{dateFormat(videogame.released, "dd-MM-yyyy")}</p>
              </div>
              <div className="ratingDetails">
                <p>Rating:</p>
                <p>{videogame.rating}</p>
              </div>
            </div>
            <div className="titleDetails">PLATFORMS</div>
            <div className="platforms">
              {videogame.platforms.map((item) => (
                <p className="details" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <img
            className="col gameImage"
            src={videogame.image}
            alt={videogame.name}
          />
          <div className="gameDescription">
            <div className="titleDetails">DESCRIPTION</div>
            <div>
              <p className="description">{videogame.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading!!</p>
      )}
    </>
  );
};

export default VideogameDetail;
