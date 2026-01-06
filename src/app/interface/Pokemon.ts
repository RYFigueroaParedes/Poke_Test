export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonState {
  list: Pokemon[];
  fullList: Pokemon[];
  page: number;
  loading: boolean;
  searchTerm: string;
}
