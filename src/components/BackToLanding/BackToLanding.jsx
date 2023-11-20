import Styles from "./BackToLanding.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import pathName from "../../helpers/PATHNAME.routes";

const BackToLanding = () => {
  const navigate = useNavigate();
  const actual = useLocation().pathname;

  const handleClick = () => {
    actual !== pathName.HOME
      ? navigate(pathName.HOME)
      : navigate(pathName.LANDING); // Si se presiona el boton vuelva al Landing
  };

  return (
    <button className={Styles.button} onClick={handleClick}>
      <span className={Styles.buttonIcon}>&laquo;</span>
      <span className={Styles.buttonText}>Salir</span>
    </button>
  );
};

export default BackToLanding;
