import { Link } from "react-router-dom";
import "./gameIntro.css";
import "./normalize.css";

const GameIntro = () => {
  return (
    <>
      <div className="introGame">
        <div className="introText">
          <p>Video Games APP</p>
        </div>
        <div className="buttonContainerIntro">
          <Link to="/home">
            <button data-text="Awesome" class="buttonIntro">
              <span class="actual-text">&nbsp;Start&nbsp;</span>
              <span class="hover-text" aria-hidden="true">
                &nbsp;Start&nbsp;
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GameIntro;
