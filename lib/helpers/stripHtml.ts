export const removeEscapeChars = (string: string) => {
  return string
    .replace(/&nbsp;/gi, " ")
    .replace(/\t|\n/g, " ")
    .replace(/\s+/g, " ");
};

export const prune = (string: string, length = 170) => {
  return removeEscapeChars(string);
};

export const stripHtml = (str) => {
  if (!str) {
    return "";
  }

  return removeEscapeChars(str.replace(/<(?:.|\n)*?>/gm, ""));
};
