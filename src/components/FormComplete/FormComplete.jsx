import { useNavigate } from "react-router-dom";
import pathName from "../../helpers/PATHNAME.routes";
import { formState } from "../../views/Create/consts";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Styles from "./FormComplete.module.css";

const FormComplete = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathName.HOME); // Redirige al Home
  };

  const resultRender = (result) => {
    if (result === formState.created) {
      // Si el pokemon se creo bien renderiza esto
      return (
        <div className={Styles.container}>
          <h1 className={Styles.title}>¡Pokemon creado exitosamente!</h1>
          <button className={Styles.back} onClick={handleClick}>
            <i className={Styles.animation}></i>Vover a la pagina principal
            <i className={Styles.animation}></i>
          </button>
        </div>
      );
    } else if (result === formState.complete) {
      return <Loading />;
    } else {
      // Si el pokemon no se creo bien retorna esto
      return (
        <Error text={"El pokemon no pudo crearse debido a: "} error={result} />
      );
    }
  };

  return resultRender(props.result);
};
export default FormComplete;
