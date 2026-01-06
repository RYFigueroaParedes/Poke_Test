// src/app/component/Loader.tsx
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 space-y-4">
      {/* Imagen de carga (Pokéball girando o Pikachu corriendo) */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Cargando"
        className="size-16 animate-bounce"
      />
      <div className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Barra de progreso animada */}
        <div className="absolute top-0 left-0 h-full bg-amber-400 animate-[shimmer_1.5s_infinite]"></div>
      </div>
      <p className="text-amber-600 font-black italic animate-pulse tracking-widest text-sm">BUSCANDO POKÉMON...</p>
    </div>
  );
};

export default Loader;
