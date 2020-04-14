import { chalk } from "../deps.js";

import tokenizer from "./tokenize.js";
import Input from "./input.js";

const HIGHLIGHT_THEME = {
  "brackets": chalk.cyan,
  "at-word": chalk.cyan,
  "comment": chalk.gray,
  "string": chalk.green,
  "class": chalk.yellow,
  "call": chalk.cyan,
  "hash": chalk.magenta,
  "(": chalk.cyan,
  ")": chalk.cyan,
  "{": chalk.yellow,
  "}": chalk.yellow,
  "[": chalk.yellow,
  "]": chalk.yellow,
  ":": chalk.yellow,
  ";": chalk.yellow,
};

function getTokenType([type, value], processor) {
  if (type === "word") {
    if (value[0] === ".") {
      return "class";
    }
    if (value[0] === "#") {
      return "hash";
    }
  }

  if (!processor.endOfFile()) {
    let next = processor.nextToken();
    processor.back(next);
    if (next[0] === "brackets" || next[0] === "(") return "call";
  }

  return type;
}

function terminalHighlight(css) {
  let processor = tokenizer(new Input(css), { ignoreErrors: true });
  let result = "";
  while (!processor.endOfFile()) {
    let token = processor.nextToken();
    let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
    if (color) {
      result += token[1].split(/\r?\n/)
        .map((i) => color(i))
        .join("\n");
    } else {
      result += token[1];
    }
  }
  return result;
}

export default terminalHighlight;
