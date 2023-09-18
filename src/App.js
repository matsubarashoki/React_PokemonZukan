import "./App.css";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Card } from "./components/Card/Card";
import { Navbar } from "./components/Navbar/Navbar";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細を取得
      loadPokemon(res.results);
      setPrevURL(res.previous);
      setNextURL(res.next);
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

  const handlePrevPage = async () => {
    setIsLoading(true);
    let data = prevURL ? await getAllPokemon(prevURL) : null;
    loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setIsLoading(false);
  };
  const handleNextPage = async () => {
    setIsLoading(true);
    let data = nextURL ? await getAllPokemon(nextURL) : null;
    loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
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
      <div className="btn">
        <button onClick={handlePrevPage}>前へ</button>
        <button onClick={handleNextPage}>後へ</button>
      </div>
    </>
  );
}

export default App;
