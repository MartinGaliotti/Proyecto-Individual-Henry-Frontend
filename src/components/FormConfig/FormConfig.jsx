import Styles from "./FormConfig.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAndFilterChars } from "../../redux/actions";

const FormConfig = (props) => {
  const { setConfig, setReload } = props;

  const dispatch = useDispatch();

  const types = useSelector((state) => state.allTypes);

  const [options, setOptions] = useState({
    type: "nothing",
    origin: "API",
    sortBy: "default",
    order: "nothing",
  });

  const optionsTypesRender = () => {
    return types.map((type, key) => {
      return (
        <option key={key} value={type}>
          {type}
        </option>
      );
    });
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setOptions({ ...options, [property]: value });
  };

  const hideConfig = () => {
    setConfig(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(orderAndFilterChars(options)).then(() => {
      setReload(Math.random());
    });
    hideConfig();
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.container}>
      <button className={Styles.buttonClose} onClick={hideConfig}>
        <span className={Styles.X}>X</span>
      </button>
      {/*  */}
      <div className={Styles.optionContainer}>
        <label htmlFor="type">Filtrar por tipo: </label>
        <select
          onChange={handleChange}
          value={options.type}
          className={Styles.select}
          name="type"
        >
          <option value="nothing">------</option>
          {optionsTypesRender()}
        </select>
      </div>
      {/*  */}
      <div className={Styles.optionContainer}>
        <label htmlFor="origin">Filtrar por origen: </label>
        <select
          onChange={handleChange}
          value={options.origin}
          className={Styles.select}
          name="origin"
        >
          <option value="API">API</option>
          <option value="BDD">Mis pokemons</option>
        </select>
      </div>
      {/*  */}
      <div className={Styles.optionContainer}>
        <label htmlFor="sortBy">Ordenar por: </label>
        <select
          onChange={handleChange}
          value={options.sortBy}
          className={Styles.select}
          name="sortBy"
        >
          <option value="default">Defecto</option>
          <option value="name">Nombre</option>
          <option value="attack">Ataque</option>
        </select>
      </div>
      {/*  */}
      <div className={Styles.optionContainer}>
        <label htmlFor="order">En orden: </label>
        <select
          onChange={handleChange}
          value={options.order}
          className={Styles.select}
          name="order"
        >
          <option value="nothing">------</option>
          <option value="upward">Ascendente</option>
          <option value="falling">Descendente</option>
        </select>
      </div>
      {/*  */}
      <button type="submit" className={Styles.submit}>
        Aplicar
      </button>
    </form>
  );
};

export default FormConfig;
