export const HEAD_RULE = {
  tool: 'header',
  regex: /^(#{1,6}) $/g,
  convert: (regex, text) => {
    const matched = text.match(regex);
    if (matched && matched.length > 0) {
      const level = matched[0].trim().length;
      return {text: '', level: level};
    }
    return null;
  }
}

export const DELIMITER_RULE = {
  tool: 'delimiter'
}


