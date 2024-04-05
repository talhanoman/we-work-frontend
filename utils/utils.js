function capitalizeFirstLetter(text) {
  return text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase();
}

function toCamelCase(inputString) {
  return inputString
    ?.toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export { capitalizeFirstLetter, toCamelCase };
