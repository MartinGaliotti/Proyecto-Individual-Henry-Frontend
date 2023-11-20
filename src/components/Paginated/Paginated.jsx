import Styles from "./Paginated.module.css";
import { useSelector, useDispatch } from "react-redux";
import consts from "../../views/Home/consts";
import { changeActualPage } from "../../redux/actions";

const Paginated = () => {
  const dispatch = useDispatch();

  const { next, prev, number } = consts;

  const cantPages = useSelector((state) => state.cantPages);
  const actualPage = useSelector((state) => state.actualPage);

  const changePage = (action) => {
    // Función para cambiar la pagina
    let aux = 0;
    switch (action) {
      case next:
        // Si la acción es aumentar
        if (actualPage < cantPages) {
          aux = actualPage + 1;
        }
        break;
      case prev:
        // Si la acción es decrementar
        if (actualPage > 0) {
          aux = actualPage - 1;
        }
        break;

      case number: // Si la accion es number
        const value = Number(event.target.value);
        aux = value;
        break;

      default:
        aux = actualPage;
        break;
    }
    dispatch(changeActualPage(aux));
  };

  const renderPages = () => {
    let buttons = [];
    let i = 0;
    let max = actualPage + 2;
    actualPage > 2 ? (i = actualPage - 2) : i;

    for (i; i <= cantPages && i <= max; i++) {
      if (i === actualPage) {
        buttons.push(
          <button
            className={Styles.numberActualButton}
            key={i}
            name={number}
            value={i}
            onClick={changePage}
          >
            {i + 1}
          </button>
        );
      } else {
        buttons.push(
          <button
            className={Styles.numberButton}
            key={i}
            name={number}
            value={i}
            onClick={changePage}
          >
            {i + 1}
          </button>
        );
      }
    }
    return buttons;
  };

  const render = () => {
    if (cantPages > 1) {
      return (
        <div className={Styles.container}>
          <button
            className={Styles.buttonText}
            onClick={() => changePage(prev)}
          >
            <span onClick={() => changePage(prev)} className={Styles.icon}>
              {"<<"}
            </span>
            <span onClick={() => changePage(prev)} className={Styles.text}>
              Anterior
            </span>
          </button>
          <div className={Styles.numberContainer}>{renderPages()}</div>
          <button
            className={Styles.buttonText}
            onClick={() => changePage(next)}
          >
            <span onClick={() => changePage(next)} className={Styles.text}>
              {" "}
              Siguiente
            </span>
            <span onClick={() => changePage(next)} className={Styles.icon}>
              {">>"}
            </span>
          </button>
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default Paginated;
