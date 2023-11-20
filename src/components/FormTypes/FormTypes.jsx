import Styles from "./FormTypes.module.css";
import { formState } from "../../views/Create/consts";
import actions from "./Consts";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { useState } from "react";

const FormTypes = (props) => {
  const types = useSelector((state) => state.allTypes);

  const [pokemonTypes, setPokemonTypes] = useState([]);

  const handleClick = (event) => {
    const action = event.target.name;
    const value = event.target.value;
    if (action === actions.add) {
      if (value === "unknown" && pokemonTypes.length > 0) {
        window.alert("No puede agregar unknown si ya agrego algun tipo");
      } else {
        !pokemonTypes.includes("unknown")
          ? setPokemonTypes([...pokemonTypes, value]) // Si la accion es agregar, agrega el tipo al pokemon
          : window.alert("No puede incluir un tipo si eligió unknown");
      }
    } else if (action === actions.delete) {
      let aux = pokemonTypes.filter((type) => type !== value); // Si la accion es eliminar, filtra los tipos
      setPokemonTypes(aux); // Y actualiza el estado local
    }
  };

  const handleSubmit = () => {
    if (pokemonTypes.length > 0) {
      props.submit({ ...props.pokemon, types: pokemonTypes }); // Cuando se envia el formulario actualiza el estado del componenete Create
      props.setForm(formState.complete); // Y el estado del Form
    } else {
      window.alert("Debe ingresar al menos un tipo para su pokemon");
    }
  };

  const buttonRender = (type) => {
    // Si el tipo se encuentra agregado, renderiza el boton eliminar
    if (pokemonTypes.includes(type)) {
      return (
        <button
          className={Styles.typeButtonDelete}
          name={actions.delete}
          onClick={handleClick}
          value={type}
        >
          Eliminar
        </button>
      );
    } else {
      // Sino el boton agregar
      return (
        <button
          name={actions.add}
          onClick={handleClick}
          value={type}
          className={Styles.typeButtonAdd}
        >
          Agregar
        </button>
      );
    }
  };

  const typesRender = () => {
    return types.map((type, key) => {
      // Recorre y renderiza los tipos y sus botones
      return (
        <div className={Styles.typeContainer} key={key}>
          <img
            className={Styles.typeImage}
            src={`./src/assets/pokemonTypesImage/${type}.png`}
            alt={type}
          />
          <div className={Styles.type}>{type}</div>
          {buttonRender(type)}
        </div>
      );
    });
  };

  const renderComponent = () => {
    if (types) {
      if (typeof types === "object") {
        return (
          <div className={Styles.container}>
            <h2>Elige el/los tipos: </h2>
            <div className={Styles.typesContainer}>{typesRender()}</div>

            <button onClick={handleSubmit} className={Styles.submit}>
              <span className={Styles.circle} aria-hidden="true">
                <span className={Styles.iconArrow}></span>
              </span>
              <span className={Styles.buttonText}>Crear</span>
            </button>
          </div>
        );
      } else {
        return (
          <Error
            text={"Los tipos no se pudieron renderizar debido a: "}
            error={types}
          />
        );
      }
    } else {
      return <Loading />;
    }
  };

  return renderComponent();
};

export default FormTypes;
