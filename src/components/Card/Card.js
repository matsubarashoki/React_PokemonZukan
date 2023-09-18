import React from "react";
import "./Card.css";
import { TransferPokeName } from "../../utils/transfer-pokeName";

export const Card = ({ pokemon }) => {
  return (
    <>
      <div className="card">
        <div className="cardImg">
          <img src={pokemon.sprites.front_default} alt=""></img>
        </div>
        <h3 className="cardName">{TransferPokeName(pokemon.name)}</h3>
        {/* <h3 className="cardName">{pokemon.name}</h3> */}
        <div className="cardInfo">
          <div className="cardTypes">
            <div>タイプ</div>
            {pokemon.types.map((type) => {
              return (
                <div key={type.type.name}>
                  <span className="typeName">{type.type.name}</span>
                </div>
              );
            })}
          </div>
          <div className="cardData">
            <p className="title">重さ：{pokemon.weight}</p>
          </div>
          <div className="cardData">
            <p className="title">高さ：{pokemon.height}</p>
          </div>
          <div className="cardData">
            <div className="title">
              アビリティ：
              {pokemon.abilities.map((ability) => {
                return <p key={ability.ability.name}>{ability.ability.name}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
