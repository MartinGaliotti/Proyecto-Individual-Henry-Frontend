import Styles from "./SearchBar.module.css";
import { useState } from "react";
import URL from "../../helpers/URL";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNameChars } from "../../redux/actions";

const SearchBar = (props) => {
  const { setReload } = props;

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const actualPage = useSelector((state) => state.actualPage); // Trae la pagina actual del estado global

  const handleChange = (event) => {
    const actual = event.target.value; // Obtiene el valor del input en cada cambio
    setName(actual); // Y lo setea en el estado local
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name !== "") {
      try {
        const response = await axios.get(
          `${URL.BaseUrl}${URL.Pokemons}?name=${name}` // Pide los pokemons por nombre al back
        );
        const { data } = response;
        setReload(Math.random());
        dispatch(addNameChars(data)); // Dispatch de los pokemons
      } catch (error) {
        window.alert("No se encontro ningun pokemon con ese nombre"); // Si hay un error envia una alerta
      }
    } else {
      setReload(1);
    }
  };

  return (
    <form className={Styles.search} onSubmit={handleSubmit}>
      <input
        className={Styles.input}
        placeholder="Inserte un nombre... "
        type="text"
        onChange={handleChange}
        value={name}
      />
      <button className={Styles.button} type="submit"></button>
    </form>
  );
};

export default SearchBar;
