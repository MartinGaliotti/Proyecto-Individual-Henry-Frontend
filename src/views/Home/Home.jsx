import Styles from "./Home.module.css";
import MainNav from "../../components/MainNav/MainNav";
import Cards from "../../components/Cards/Cards";
import Error from "../../components/Error/Error";
import FormConfig from "../../components/FormConfig/FormConfig";
import Loading from "../../components/Loading/Loading";
import Paginated from "../../components/Paginated/Paginated";
import ToCreate from "../../components/ToCreate/ToCreate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllChars, addPageChars } from "../../redux/actions";
import consts from "./consts";

const Home = () => {
  const dispatch = useDispatch();

  const actualPage = useSelector((state) => state.actualPage); // Trae la pagina actual del estado global

  const { cardsPerPage, cantPokemons } = consts; // Destructuring de las constantes

  const [reload, setReload] = useState(false);

  const [config, setConfig] = useState(false);

  useEffect(() => {
    dispatch(addAllChars(cantPokemons)); // Cuando el componente se inicia se hace el dispach de todos los pokemons
  }, []);

  useEffect(() => {
    // Si la pagina actual es un numero y no se esta buscando un pokemon
    if (typeof actualPage === "number") {
      const offset = actualPage * cardsPerPage; // Se obtiene el punto de inicio en el array de pokemons
      if (reload === 1) {
        dispatch(addPageChars(offset, cardsPerPage, "all")); // Cuando se terminan de cargar todos los pokemons se hace el dispatch de los que renderiza la pagina
      } else {
        dispatch(addPageChars(offset, cardsPerPage)); // Cuando se terminan de cargar todos los pokemons se hace el dispatch de los que renderiza la pagina
      }
    }
  }, [actualPage, reload]);

  const render = () => {
    // Renderiza la pagina cuando se hayan cargado los pokemons
    if (typeof actualPage === "number") {
      return (
        <div className={Styles.container}>
          <MainNav setReload={setReload} setConfig={setConfig} />
          <Cards />
          <Paginated />
          <ToCreate />
          {config && (
            <FormConfig
              setReload={setReload}
              setConfig={setConfig}
              className={Styles.formConfig}
            />
          )}
        </div>
      );
    } else if (typeof actualPage === "string") {
      return (
        <Error
          text={"La pagina no pudo cargarse debido a: "}
          error={actualPage}
        />
      );
    } else {
      // Mientras tanto se renderiza el Loading
      return <Loading />;
    }
  };

  return render();
};

export default Home;
