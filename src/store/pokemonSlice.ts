import {Pokemon, PokemonState} from "@/app/interface/Pokemon";
import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

const initialState: PokemonState = {
  list: [],
  fullList: [],
  page: 1,
  loading: false,
  searchTerm: "",
};

export const fetchPokemons = createAsyncThunk("pokemon/fetch", async (page: number): Promise<Pokemon[]> => {
  const limit = 6;
  const offset = (page - 1) * limit;

  const delay = new Promise((resolve) => setTimeout(resolve, 500));

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();

  const details = await Promise.all(
    data.results.map(async (p: {url: string}) => {
      const resp = await fetch(p.url);
      return resp.json();
    })
  );

  await delay;
  return details;
});

export const searchGlobalPokemon = createAsyncThunk("pokemon/searchGlobal", async (name: string) => {
  if (name.length < 2) return null;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) return [];
    const data = await response.json();
    return [data];
  } catch {
    return [];
  }
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.list = state.fullList;
    },
  },
  extraReducers: (builder) => {
    builder

      // Paginación normal (SOLO UN .pending)
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.fullList = action.payload;

        // Actualizamos la lista principal si no hay una búsqueda activa
        if (!state.searchTerm) state.list = action.payload;
      })

      // Búsqueda Global
      .addCase(searchGlobalPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchGlobalPokemon.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.list = action.payload;
        } else {
          // Si el nombre es muy corto (< 2), filtramos lo que ya tenemos
          state.list = state.fullList.filter((p) => p.name.toLowerCase().startsWith(state.searchTerm.toLowerCase()));
        }
      });
  },
});

export const {nextPage, prevPage, setSearchTerm, clearSearch} = pokemonSlice.actions;
export default pokemonSlice.reducer;
