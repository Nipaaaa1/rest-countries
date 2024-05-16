interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital: string[];
}
interface DetailedCountry {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        common: string;
      };
    };
  };
  tld: string;
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  flags: {
    svg: string;
  };
  borders: string[];
  population: number;
  region: string;
  subregion: string;
  capital: string[];
}

export type { Country, DetailedCountry };
