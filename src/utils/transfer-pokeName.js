import Pokemon_Names from "./pokemon-name.json";

export const TransferPokeName = (pokeNameEn) => {
  // Quita記事のコピー
  // for (let i = 0; i < Pokemon_Names.length; i++) {
  //   let pokename = String(Pokemon_Names[i].en).toLowerCase();
  //   if (pokename === pokeNameEn) {
  //     return Pokemon_Names[i].ja;
  //   }
  // }

  // nextを開くときにreduceでnullでエラーになってしまう。。
  const filteredValue = Pokemon_Names.map((nameset) => {
    return {
      ja: nameset.ja,
      en: String(nameset.en).toLowerCase(),
    };
  })
    .filter((newNameSet) => {
      return newNameSet.en === pokeNameEn;
    })
    .reduce((target, obj, index) => {
      //配列を解除するためにreduce
      target[index] = obj;
      return target;
    });
  return filteredValue.ja ? filteredValue.ja : pokeNameEn;
};
