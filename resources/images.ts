interface WebpackRequireContext {
  (key: string): any;
  keys(): string[];
  resolve(key: string): string;
}
declare const require: {
  (path: string): any;
  context(directory: string, useSubdirectories: boolean, regExp?: RegExp): WebpackRequireContext;
};

const imagesList = require.context("@public/images", true);

const getImage = (name: string, list: WebpackRequireContext): string => {
  return list(`./${name}`).default.src;
};

const images = {
  placeholders: {
    image: getImage("image-placeholder.png", imagesList),
  },
};

export default images;
