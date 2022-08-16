import NavBar from "../navBar/navBar";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchGenres } from "../../store/actions";
import axios from "axios";
import "../formVideogame/formVideogame.css";

const validate = (input) => {
  let errors = {};
  if (input.name === "") {
    errors.name = "*Name of videogame is required";
  } else if (!/^[a-zA-Z0-9_: &()]+$/.test(input.name)) {
    errors.name = "*Invalid character";
  }
  if (!input.rating) {
    errors.rating = "*Rating required";
  } else if (!/^[0-4](\.)[0-9]{2}|5(\.)0{2}/.test(input.rating)) {
    errors.rating = "Invalid rating";
  }
  if (!input.image) {
    errors.image = "*Image required";
  } else if (
    !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(input.image)
  ) {
    errors.image = "*Invalid link image";
  }
  if (!input.released) {
    errors.released = "*Date required";
  } else if (
    !/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(input.released)
  ) {
    errors.released = "*Invalid date";
  }
  if (!input.description) {
    errors.description = "*Description must be not empty";
  }
  if (input.genres.length < 1) {
    errors.genres = "*Select at least one genre";
  }
  if (input.platforms.length < 1) {
    errors.platforms = "*Select at least one platform";
  }
  return errors;
};

const FormVideogame = ({ genres, fetchGenres }) => {
  const [videogame, setVideogame] = useState({
    name: "",
    rating: "",
    image: "",
    released: "",
    description: "",
    genres: [],
    platforms: [],
  });
  const [error, setError] = useState({
    name: "",
    rating: "",
    image: "",
    released: "",
    description: "",
    genres: "",
    platforms: "",
  });

  const [platform, setPlatform] = useState([]);

  useEffect(() => {
    fetchGenres();
    const llamada = async () => {
      const response = await axios.get(`http://localhost:3001/platforms`);
      setPlatform(response.data);
    };
    llamada();
  }, [fetchGenres]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      axios
        .post(`http://localhost:3001/videogame`, videogame)
        .then(() => {
          alert("Video game added successfully");
          document.getElementById("formGame").reset();
          setVideogame({ genres: [], platforms: [] });
        })
        .catch(() => alert("Video game could not be added"));
    } else {
      alert("ERROR, Some fields are missing. check again");
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "rating") value = parseFloat(value).toFixed(2);
    if (name === "name") value = value.trim();
    setVideogame({
      ...videogame,
      [name]: value,
    });
    let data = validate({ ...videogame, [name]: value });
    setError({ ...data });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (!videogame[name].includes(value)) {
      setVideogame({
        ...videogame,
        [name]: [...videogame[name], value],
      });
      let data = validate({ ...videogame, [name]: value });
      setError({ ...data });
      e.target.value = "select";
    } else {
      setVideogame({
        ...videogame,
        [name]: [...videogame[name].filter((data) => data !== value)],
      });
      let data = validate({
        ...videogame,
        [name]: videogame[name].filter((data) => data !== value),
      });
      setError({ ...data });
      e.target.value = "select";
    }
  };

  return (
    <>
      <NavBar />
      <div className="totalGame">
        <form
          className="gameForm"
          onSubmit={handleSubmit}
          autoComplete="off"
          id="formGame"
        >
          <div className="firtPart">
            <div className="nameForm">
              <label className="allTextForm" for="name">
                Name{" "}
              </label>
              <input
                className="input"
                onChange={handleInputChange}
                name="name"
                type="text"
                placeholder="Name videogame"
              />
            </div>
            <div className="errorForm">
              {error.name ? <p className="errorName">{error.name}</p> : <p></p>}
            </div>
            <div>
              <label className="allTextForm" for="image">
                Image{" "}
              </label>
              <input
                className="input"
                onChange={handleInputChange}
                name="image"
                placeholder="Image"
                type="text"
              />
            </div>
            <div className="errorForm">
              {error.image ? (
                <p className="errorImage">{error.image}</p>
              ) : (
                <p></p>
              )}
            </div>
            <div className="otherDats">
              <div className="releasedForm">
                <label className="allTextForm" for="rating">
                  Released{" "}
                </label>
                <input
                  className="input"
                  onChange={handleInputChange}
                  type="date"
                  id="released"
                  name="released"
                />
              </div>
              <div className="errorForm">
                {error.released ? (
                  <p className="errorReleased">{error.released}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="ratingForm">
                <label className="allTextForm" for="rating">
                  Rating{" "}
                </label>
                <input
                  className="input"
                  onChange={handleInputChange}
                  name="rating"
                  placeholder="(0.00 - 5.00)"
                  type="text"
                />
              </div>
              <div className="errorForm">
                {error.rating ? (
                  <p className="errorRating">{error.rating}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div>
              <label className="allTextForm" for="description">
                Description{" "}
              </label>
              <textarea
                className="descriptionGame"
                id="description"
                onChange={handleInputChange}
                name="description"
                placeholder="  Write a description..."
              />
            </div>
            <div className="errorForm">
              {error.description ? (
                <p className="errorDescription">{error.description}</p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="secondPart">
            <label className="allTextForm">Genres </label>
            <select
              name="genres"
              onChange={handleSelectChange}
              defaultValue={"select"}
            >
              <option value="select" disabled hidden>
                Select
              </option>
              {genres.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
            <div className="botones">
              <div className="dataGenres">
                {videogame.genres.length > 0 ? (
                  videogame.genres.map((item) => {
                    let data = genres.find((element) => element.id === item);
                    console.log(data);
                    return (
                      <p className="genres-item" key={`genre${data.name}`}>
                        {data.name}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className="errorDisplay">
                {error.genres ? (
                  <p className="errorGenres">{error.genres}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <label className="allTextForm">Platforms </label>
            <select
              name="platforms"
              onChange={handleSelectChange}
              defaultValue={"select"}
            >
              <option value="select" disabled hidden>
                Select
              </option>
              {platform.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="botones">
              <div className="dataPlatforms">
                {videogame.platforms.length > 0 ? (
                  videogame.platforms.map((item) => (
                    <p className="platform-item" key={`platform${item}`}>
                      {item}
                    </p>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="errorDisplay">
                {error.platforms ? (
                  <p className="errorPlatforms">{error.platforms}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
          <div className="submitForm">
            <button className="buttonInput" type="submit">
              Create Video Game
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenres: () => dispatch(fetchGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormVideogame);
