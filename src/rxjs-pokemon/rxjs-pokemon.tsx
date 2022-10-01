import { useMemo, useState } from "react";
import { PokemonProvider, usePokemon } from "./store";
import { useObservableState } from "observable-hooks";

// import "./App.css";

const Deck = () => {
  const { deck$ } = usePokemon();
  const deck = useObservableState(deck$, []);
  return (
    <>
      <div>
        {deck.map((p) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                alt="pokemon"
              />
              <div key={p.name}>{p.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Search = () => {
  const [search, setSearch] = useState("");
  const { pokemons$, selected$ } = usePokemon();
  const pokemons = useObservableState(pokemons$, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemons, search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filteredPokemons.map((p) => (
          <div
            key={p.name}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <input
              type={"checkbox"}
              checked={p.selected}
              onChange={() => {
                if (selected$.value.includes(p.id)) {
                  selected$.next(selected$.value.filter((id) => id !== p.id));
                } else {
                  selected$.next([...selected$.value, p.id]);
                }
              }}
            />
            <div>
              <strong>{p.name}</strong> - {p.power}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function RxjsPokemon() {
  return (
    <PokemonProvider>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Search />
        <div style={{ flex: 1 }}>
          <Deck />
        </div>
      </div>
    </PokemonProvider>
  );
}

export default RxjsPokemon;
