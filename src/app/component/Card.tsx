import CardProps from "../interface/CarProps";

const Card = ({name, id, image}: CardProps) => {
  return (
    <div className="group relative flex flex-col items-center bg-slate-50 p-2 rounded-2xl w-64 transition-all duration-300 ease-in-out hover:bg-white hover:shadow-[0_20px_25px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04)] hover:-translate-y-2 border border-transparent hover:border-amber-200">
      <span className="absolute top-3 right-4 font-mono text-xs font-bold text-gray-300 group-hover:text-amber-500 transition-colors">
        #{id.toString().padStart(3, "0")}
      </span>

      <div className="absolute top-10 size-32 bg-amber-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out opacity-50 z-0"></div>

      <img
        alt={name}
        src={image}
        className="relative z-10 size-40 object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
      />

      <div className="mt-4 text-center">
        <h3 className="text-xl font-black capitalize text-slate-800 tracking-tight group-hover:text-amber-600 transition-colors">
          {name}
        </h3>

        <div className="mt-2 flex gap-1 justify-center">
          <span className="px-3 py-1 bg-slate-200 text-[10px] font-bold uppercase rounded-full text-slate-500 group-hover:bg-amber-400 group-hover:text-white transition-colors">
            Pokémon
          </span>

          <span className="px-3 py-1 bg-slate-200 text-[10px] font-bold uppercase rounded-full text-slate-500 group-hover:bg-amber-400 group-hover:text-white transition-colors">
            Gen 1
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
