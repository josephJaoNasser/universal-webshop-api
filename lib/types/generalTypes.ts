export interface Image {
  id?: string | number;
  src: string;
  alt?: string;
}

export interface Translations {
  name: {
    [key: string]: string;
  };
  description?: {
    [key: string]: string;
  };
}
