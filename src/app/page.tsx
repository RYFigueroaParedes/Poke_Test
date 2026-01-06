"use client";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {fetchPokemons, nextPage, prevPage} from "../store/pokemonSlice";
import Nav from "./component/Nav";
import Card from "./component/Card";
import Loader from "./component/Loader";

export default function Home() {
  const dispatch = useAppDispatch();

  const {list, page, loading, searchTerm} = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons(page));
  }, [page, dispatch]);

  return (
    <main className="min-h-screen bg-amber-200 flex flex-col pb-10">
      <Nav />

      <div className="bg-white rounded-xl m-auto px-10 py-8 mt-4 w-3/4 shadow-lg border border-gray-100 min-h-125 relative overflow-hidden">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 justify-items-center animate-in fade-in duration-500">
            {list.length > 0 ? (
              list.map((pokemon, index) => (
                <div
                  key={pokemon.id}
                  className="animate-in fade-in zoom-in duration-500"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                  />
                </div>
              ))
            ) : (
              // Mensaje por si no encuentra nada
              <div className="col-span-3 flex flex-col items-center justify-center h-64">
                <p className="text-gray-400 italic">No se encontraron Pokémones con "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {!loading && list.length > 1 && (
        <div className="bg-white/80 backdrop-blur-sm mt-8 w-fit px-8 h-20 flex items-center justify-center gap-10 m-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
          {/* Botón Anterior */}
          <button
            onClick={() => dispatch(prevPage())}
            disabled={page <= 1 || loading}
            className={`group relative flex cursor-pointer items-center justify-center px-6 py-3 font-black uppercase tracking-tighter transition-all duration-300 rounded-xl overflow-hidden
            ${
              page <= 1
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-slate-900 text-amber-400 hover:bg-amber-400 hover:text-slate-900 active:scale-95 shadow-lg hover:shadow-amber-400/40"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl">«</span> Anterior
            </span>
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
          </button>

          {/* Indicador de Página */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">
              Sector
            </span>
            <div className="relative">
              <p className="text-3xl font-black text-slate-800 italic leading-none">
                {page.toString().padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={() => dispatch(nextPage())}
            disabled={loading}
            className="group relative cursor-pointer flex items-center justify-center px-6 py-3 bg-slate-900 text-amber-400 font-black uppercase tracking-tighter transition-all duration-300 rounded-xl overflow-hidden hover:bg-amber-400 hover:text-slate-900 active:scale-95 shadow-lg hover:shadow-amber-400/40 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Siguiente <span className="text-xl">»</span>
            </span>
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
          </button>
        </div>
      )}
    </main>
  );
}
