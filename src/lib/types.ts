export interface Plugin {
  name: string;
  image: string;
}

export interface Config {
  id: string;
  name: string;
  plugin: string;
  author: string;
  contents: string;
  downloads: number;
  views: number;
  isPrivate: boolean;
  category: string | null;
}

export type ConfigWithoutContents = Omit<Config, "contents">;
