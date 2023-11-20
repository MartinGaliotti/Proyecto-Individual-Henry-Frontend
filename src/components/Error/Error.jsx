import pathName from "../../helpers/PATHNAME.routes";
import { useNavigate, useLocation } from "react-router-dom";
import Style from "./Error.module.css";

const Error = (props) => {
  const { text, error } = props; // Destructuring de Props
  const navigate = useNavigate();
  const actualLocation = useLocation().pathname;

  const handleClick = (event) => {
    // Dependiendo que boton llamo a la función
    const path = event.target.name;
    path === pathName.HOME
      ? navigate(path) // Redirige al home
      : (window.location.href = window.location.href); // Recarga la pagina
  };

  return (
    <div className={Style.container}>
      <h1>
        <span className={Style.text}>{text}</span>
        <span className={Style.error}>{error}</span>
      </h1>
      <button className={Style.retry} name="retry" onClick={handleClick}>
        Volver a intentar
      </button>
      {actualLocation !== pathName.HOME ? (
        <button
          className={Style.back}
          name={pathName.HOME}
          onClick={handleClick}
        >
          Vover a la pagina principal
        </button>
      ) : undefined}
    </div>
  );
};

export default Error;
