export interface Image {
  id: String;
  src: String;
  alt: String;
}

export interface Translations {
  name: {
    [key: string]: String;
  };
  description?: {
    [key: string]: String;
  };
}
