interface Language {
  code: string;
  name: string;
  native: string;
  rtl: boolean;
}

interface Continent {
  code: string;
  name: string;
}

interface State {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  capital: String;
  currency: String;
  languages: Language[];
  emoji: string;
  emojiU: string;
  states: State[];
}
