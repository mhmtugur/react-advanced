import React, { createContext, useContext } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  power?: number;
  selected?: boolean;
}

const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemons) =>
    pokemons.map((p) => ({
      ...p,
      power:
        p.hp +
        p.attack +
        p.defense +
        p.special_attack +
        p.special_defense +
        p.speed,
    }))
  )
);

const selected$ = new BehaviorSubject<number[]>([]);

const pokemons$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) =>
    pokemon.map((p) => ({
      ...p,
      selected: selected.includes(p.id),
    }))
  )
);

const deck$ = pokemons$.pipe(
  map((pokemons) => pokemons.filter((p) => p.selected))
);

fetch("/pokemon-simplified.json")
  .then((res) => res.json())
  .then((data) => rawPokemon$.next(data));

const PokemonContext = createContext({ pokemons$, selected$, deck$ });

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider: React.FC<{ children: any }> = ({ children }) => (
  <PokemonContext.Provider
    value={{
      pokemons$,
      selected$,
      deck$,
    }}
  >
    {children}
  </PokemonContext.Provider>
);
