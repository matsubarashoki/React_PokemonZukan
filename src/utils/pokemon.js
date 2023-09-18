export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (pokemon_url) => {
  return new Promise((resolve, reject) => {
    fetch(pokemon_url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
