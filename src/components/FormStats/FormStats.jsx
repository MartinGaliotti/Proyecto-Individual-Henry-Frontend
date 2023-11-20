import Styles from "./FormStats.module.css";
import { formState } from "../../views/Create/consts";
import { useState } from "react";
import formValidation from "./formValidation";

const FormStats = (props) => {
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  }); // Crea un estado local

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setPokemon({ ...pokemon, [property]: value }); // Actualiza el estado local con los datos del formulario cuando cambia
    formValidation({ ...pokemon, [property]: value }, setErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors) {
      const auxErrors = Object.keys(errors); // Si hay errores obtiene cuales

      window.alert(
        `Revise los siguentes campos del formulario: ${auxErrors.map(
          // Y los muestra en una alerta
          (error) => {
            return `\n ${error}`;
          }
        )}`
      );
    } else {
      props.submit(pokemon);
      props.setForm(formState.statsComplete); // Actualiza el estado del formulario cuando se envian los datos
    }
  };

  const renderError = (property) => {
    if (errors && errors[property]) {
      // Si existe un error en la propiedad que llega por argumento
      return <p className={Styles.error}>{errors[property]}</p>; // Renderiza el texto del error
    }
  };

  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Crea tu pokemon</h2>
      <form className={Styles.form} onSubmit={handleSubmit}>
        {/*  */}
        <div className={Styles.textInputContainer}>
          <label htmlFor="name" className={Styles.textLabel}>
            Nombre:
          </label>
          <input
            value={pokemon.name}
            onChange={handleChange}
            placeholder="Ingresar nombre..."
            type="text"
            name="name"
            className={Styles.textInput}
          />
        </div>
        {renderError("name")}
        {/*  */}
        <div className={Styles.textInputContainer}>
          <label htmlFor="image" className={Styles.textLabel}>
            Imagen:
          </label>
          <input
            value={pokemon.image}
            onChange={handleChange}
            placeholder="Ingresar url de la imagen..."
            type="text"
            name="image"
            className={Styles.textInput}
          />
        </div>
        {renderError("image")}
        {/*  */}
        <div className={Styles.fieldContainer}>
          <label htmlFor="hp" className={Styles.label}>
            Vida: {pokemon.hp}
          </label>
          <input
            value={pokemon.hp}
            onChange={handleChange}
            max="255"
            min="1"
            step="1"
            type="range"
            name="hp"
            className={Styles.input}
          />
        </div>
        {renderError("hp")}
        {/*  */}
        <div className={Styles.fieldContainer}>
          <label htmlFor="attack" className={Styles.label}>
            Ataque:{pokemon.attack}
          </label>
          <input
            value={pokemon.attack}
            onChange={handleChange}
            max="255"
            min="1"
            step="1"
            type="range"
            name="attack"
            className={Styles.input}
          />
        </div>
        {renderError("attack")}
        {/*  */}
        <div className={Styles.fieldContainer}>
          <label htmlFor="defense" className={Styles.label}>
            Defensa:{pokemon.defense}
          </label>
          <input
            value={pokemon.defense}
            onChange={handleChange}
            max="255"
            min="1"
            step="1"
            type="range"
            name="defense"
            className={Styles.input}
          />
        </div>
        {renderError("defense")}
        {/*  */}
        <div className={Styles.fieldContainer}>
          <label htmlFor="speed" className={Styles.label}>
            Velocidad:{pokemon.speed}
          </label>
          <input
            value={pokemon.speed}
            onChange={handleChange}
            max="150"
            min="0"
            step="1"
            type="range"
            name="speed"
            className={Styles.input}
          />
        </div>
        {renderError("speed")}
        {/*  */}
        <div className={Styles.fieldContainer}>
          <label htmlFor="height" className={Styles.label}>
            Altura:{pokemon.height}
          </label>
          <input
            value={pokemon.height}
            onChange={handleChange}
            max="50"
            min="0"
            step="0.1"
            type="range"
            name="height"
            className={Styles.input}
          />
        </div>
        {renderError("height")}
        {/*  */}
        <div className={Styles.fieldContainer}>
          <label htmlFor="weight" className={Styles.label}>
            Peso:{pokemon.weight}
          </label>
          <input
            value={pokemon.weight}
            onChange={handleChange}
            max="1000"
            min="0"
            step="1"
            type="range"
            name="weight"
            className={Styles.input}
          />
        </div>
        {renderError("weight")}
        {/*  */}
        <button className={Styles.submit}>
          <span className={Styles.circle} aria-hidden="true">
            <span className={Styles.iconArrow}></span>
          </span>
          <span className={Styles.buttonText}>Siguiente</span>
        </button>
        {/*  */}
      </form>
    </div>
  );
};

export default FormStats;
