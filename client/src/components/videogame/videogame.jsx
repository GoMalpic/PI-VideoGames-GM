import "../videogame/videogame.css";

const Videogame = ({ name, image, rating, genres }) => {
  return (
    <div class="card">
      <div class="card2">
        <div className="textBox">
          <div className="rating">
            <p>{rating}</p>
          </div>
          <div className="name">
            <p>{name}</p>
          </div>
        </div>
        <div className="genders">
          {genres && genres.map((item, idx) => <p key={idx}>/{item.name}</p>)}
        </div>
        <div className="imgBox">
          <div
            className="img-card"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Videogame;
