import validationsParams from "./validationParams";

const nameValidation = (name, params) => {
  const { minName, maxName, regexName } = params;
  let aux;
  if (name.length < minName) {
    aux = `El nombre debe contener al menos ${minName} caracter/es`;
  } else if (name.length > maxName) {
    aux = `El nombre no puede contener mas de ${maxName} caracteres`;
  }
  if (regexName.test(name)) {
    if (aux) {
      aux = aux + ` y no puede contener numeros`;
    } else {
      aux = `El nombre no puede contener numeros`;
    }
  }
  return aux;
};

const imageValidation = (image, max, regexUrlImage) => {
  let aux;
  if (image.length === 0) {
    aux = `Este campo no puede estar vacío`;
  } else if (image.length > max) {
    aux = `Este campo no puede contener mas de ${max} caracteres`;
  }
  if (!regexUrlImage.test(image)) {
    if (!regexUrlImage.test(image)) {
      aux
        ? (aux = aux + ` y debe ser una URL`)
        : (aux = `El valor no corresponde a una URL`);
    }
  }
  return aux;
};

const statValidation = (statName, stat, max, min) => {
  if (min) {
    if (stat < min) return `${statName} no puede ser menor a ${min}`;
  }
  if (stat > max) return `${statName} no puede ser mayor a ${max}`;
};

const formValidation = (pokemon, setErrors) => {
  let auxErrors = {};
  let aux;
  const { name, image, hp, attack, defense, speed, height, weight } = pokemon;
  const {
    minName,
    maxName,
    regexName,
    maxImage,
    regexUrlImage,
    minPrimaryStats,
    maxPrimaryStats,
    maxSpeed,
    maxHeight,
    maxWeight,
  } = validationsParams;

  aux = nameValidation(name, { minName, maxName, regexName });
  if (aux) {
    auxErrors.name = aux;
  }

  aux = imageValidation(image, maxImage, regexUrlImage);
  if (aux) {
    auxErrors.image = aux;
  }

  aux = statValidation("Vida", hp, maxPrimaryStats, minPrimaryStats);
  if (aux) {
    auxErrors.hp = aux;
  }

  aux = statValidation("Ataque", attack, maxPrimaryStats, minPrimaryStats);
  if (aux) {
    auxErrors.attack = aux;
  }

  aux = statValidation("Defensa", defense, maxPrimaryStats, minPrimaryStats);
  if (aux) {
    auxErrors.defense = aux;
  }

  aux = statValidation("Velocidad", speed, maxSpeed);
  if (aux) {
    auxErrors.speed = aux;
  }

  aux = statValidation("Altura", height, maxHeight);
  if (aux) {
    auxErrors.height = aux;
  }

  aux = statValidation("Peso", weight, maxWeight);
  if (aux) {
    auxErrors.weight = aux;
  }

  if (Object.keys(auxErrors).length > 0) {
    setErrors(auxErrors);
  } else {
    setErrors(false);
  }
};

export default formValidation;
