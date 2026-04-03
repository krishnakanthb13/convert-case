/**
 * Core text transformation functions for FluxText
 */
import { MORSE_MAP, NATO_MAP, UNICODE_MAPS, UPSIDE_DOWN_MAP } from './helpers';

export type TransformFunction = (input: string) => string;

const toWords = (txt: string) => txt.replace(/([A-Z])/g, ' $1').split(/[\s\-_.\/]+/).filter(Boolean);

export const transforms: Record<string, TransformFunction> = {
  // --- Standard Case ---
  lowercase: (txt: string) => txt.toLowerCase(),
  uppercase: (txt: string) => txt.toUpperCase(),
  sentenceCase: (txt: string) => {
    return txt.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  },
  titleCase: (txt: string) => {
    const minorWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
    return txt.toLowerCase().split(' ').map((word, index) => {
      if (index > 0 && minorWords.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
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

  // --- Coding Cases ---
  camelCase: (txt: string) => {
    const words = toWords(txt);
    return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  },
  pascalCase: (txt: string) => {
    const words = toWords(txt);
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  },
  snakeCase: (txt: string) => {
    return toWords(txt).map(w => w.toLowerCase()).join('_');
  },
  kebabCase: (txt: string) => {
    return toWords(txt).map(w => w.toLowerCase()).join('-');
  },
  constantCase: (txt: string) => {
    return toWords(txt).map(w => w.toUpperCase()).join('_');
  },
  dotCase: (txt: string) => {
    return toWords(txt).map(w => w.toLowerCase()).join('.');
  },
  pathCase: (txt: string) => {
    return toWords(txt).map(w => w.toLowerCase()).join('/');
  },

  // --- Stylized Fonts ---
  bold: (txt: string) => txt.split('').map(c => UNICODE_MAPS.bold[c as keyof typeof UNICODE_MAPS.bold] || c).join(''),
  italic: (txt: string) => txt.split('').map(c => UNICODE_MAPS.italic[c as keyof typeof UNICODE_MAPS.italic] || c).join(''),
  bubble: (txt: string) => txt.split('').map(c => UNICODE_MAPS.bubble[c as keyof typeof UNICODE_MAPS.bubble] || c).join(''),
  square: (txt: string) => txt.split('').map(c => UNICODE_MAPS.square[c as keyof typeof UNICODE_MAPS.square] || c).join(''),
  cursive: (txt: string) => txt.split('').map(c => UNICODE_MAPS.cursive[c as keyof typeof UNICODE_MAPS.cursive] || c).join(''),
  monospace: (txt: string) => txt.split('').map(c => UNICODE_MAPS.monospace[c as keyof typeof UNICODE_MAPS.monospace] || c).join(''),
  strikethrough: (txt: string) => txt.split('').map(c => c + '\u0336').join(''),
  underline: (txt: string) => txt.split('').map(c => c + '\u0332').join(''),
  wideText: (txt: string) => txt.split('').join('  '),
  upsideDown: (txt: string) => {
    return txt.split('').reverse().map(c => UPSIDE_DOWN_MAP[c] || c).join('');
  },
  zalgo: (txt: string) => {
    const marks = [
      '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
      '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F',
      '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D', '\u032E', '\u032F'
    ];
    return txt.split('').map(c => {
      if (/\s/.test(c)) return c;
      let output = c;
      const count = Math.floor(Math.random() * 5) + 2;
      for (let i = 0; i < count; i++) {
        output += marks[Math.floor(Math.random() * marks.length)];
      }
      return output;
    }).join('');
  },

  // --- Encoders & Utilities ---
  morseCode: (txt: string) => {
    return txt.toUpperCase().split('').map(c => MORSE_MAP[c] || c).join(' ');
  },
  binaryCode: (txt: string) => {
    return txt.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  },
  natoPhonetic: (txt: string) => {
    return txt.toUpperCase().split('').map(c => NATO_MAP[c] || c).join(' ');
  },
  rot13: (txt: string) => {
    return txt.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
    });
  },
  reverse: (txt: string) => txt.split('').reverse().join(''),
  reverseWords: (txt: string) => txt.split(/\s+/).reverse().join(' '),
  slugify: (txt: string) => {
    return txt.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  pigLatin: (txt: string) => {
    return txt.split(/\s+/).map(word => {
      if (/^[aeiou]/i.test(word)) return word + 'way';
      return word.replace(/^([^aeiou]+)(.*)/i, '$2$1ay');
    }).join(' ');
  },
  sortLines: (txt: string) => {
    return txt.split(/\r?\n/).sort().join('\n');
  },
  removeUnderscores: (txt: string) => txt.replace(/_/g, ' '),
  removeDashes: (txt: string) => txt.replace(/-/g, ' '),
  trimWhitespace: (txt: string) => txt.replace(/\s+/g, ' ').trim(),
  removeLineBreaks: (txt: string) => txt.replace(/[\r\n]+/g, ' '),
  base64Encode: (txt: string) => {
    try { return btoa(txt); } catch (e) { return txt; }
  },
  base64Decode: (txt: string) => {
    try { return atob(txt); } catch (e) { return txt; }
  },
  urlEncode: (txt: string) => encodeURIComponent(txt),
  urlDecode: (txt: string) => {
    try { return decodeURIComponent(txt); } catch (e) { return txt; }
  }
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
