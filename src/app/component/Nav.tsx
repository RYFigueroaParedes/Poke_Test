"use client";
import {useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {searchGlobalPokemon, fetchPokemons, setSearchTerm, clearSearch} from "../../store/pokemonSlice";

const Nav = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.pokemon.page);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.trim()) {
        dispatch(setSearchTerm(inputValue));
        dispatch(searchGlobalPokemon(inputValue));
      } else {
        dispatch(clearSearch());
        // Solo recargamos la página si el input se vacía manualmente
        if (inputValue === "") dispatch(fetchPokemons(page));
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, dispatch, page]);

  return (
    <nav className="bg-white/80 font-text flex m-auto h-16 w-3/4 justify-center items-center text-center sticky top-4 z-50 rounded-xl overflow-hidden shadow-lg border border-amber-100 mt-2">
      {/* SECCIÓN IZQUIERDA: BUSCADOR (ÁMBAR) */}
      <div className=" w-1/2 h-full flex items-center px-6 gap-3">
        {/* LUPA */}
        <div className="text-amber-900 opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="w-full bg-white border rounded-full py-1.5 px-4 text-sm font-bold placeholder:text-amber-800/50 focus:outline-none focus:bg-white transition-all shadow-inner"
        />

        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="text-amber-900 hover:text-red-600 font-black text-xl transition-colors"
          >
            ×
          </button>
        )}
      </div>

      <div className="w-1/2 h-full flex items-center justify-around px-4 ">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
          className="h-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          alt="pika"
        />

        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif"
          className="h-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          alt=""
        />

        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/16.gif"
          className="h-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          alt="char"
        />

        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/10.gif"
          className="h-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          alt="char"
        />
      </div>
    </nav>
  );
};

export default Nav;
