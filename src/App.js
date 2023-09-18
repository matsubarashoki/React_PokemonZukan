import "./App.css";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Card } from "./components/Card";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細を取得
      // console.log(res.results);
      loadPokemon(res.results);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    //Promise.allは渡した配列でのurlリクエストが終わるまで非同期処理をする
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className="App">
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
