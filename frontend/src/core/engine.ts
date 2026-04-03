/**
 * Core text transformation functions for FluxText
 */

export type TransformFunction = (input: string) => string;

export const transforms: Record<string, TransformFunction> = {
  lowercase: (txt: string) => txt.toLowerCase(),
  uppercase: (txt: string) => txt.toUpperCase(),
  sentenceCase: (txt: string) => {
    return txt.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  },
  titleCase: (txt: string) => {
    return txt.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  },
  capitalizedCase: (txt: string) => {
    return txt.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  },
  alternatingCase: (txt: string) => {
    return txt.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
  },
  inverseCase: (txt: string) => {
    return txt.split('').map(c => {
      const isUpper = c === c.toUpperCase();
      return isUpper ? c.toLowerCase() : c.toUpperCase();
    }).join('');
  },
  trimWhitespace: (txt: string) => txt.replace(/\s+/g, ' ').trim(),
  base64Encode: (txt: string) => btoa(txt), 
  base64Decode: (txt: string) => {
    try {
      return atob(txt);
    } catch (e) {
      return txt;
    }
  },
  urlEncode: (txt: string) => encodeURIComponent(txt),
  urlDecode: (txt: string) => {
     try {
       return decodeURIComponent(txt);
     } catch(e) {
       return txt;
     }
  },
  removeFormatting: (txt: string) => txt.replace(/[\n\r]+/g, ' ').replace(/\t/g, ' ')
};

/**
 * Pipeline processor: chains multiple transforms together.
 */
export const runPipeline = (input: string, transformNames: string[]): string => {
  return transformNames.reduce((currentText, tName) => {
    const fn = transforms[tName];
    if (fn) {
      return fn(currentText);
    }
    return currentText;
  }, input);
};
