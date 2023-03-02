const command = "eslint --ext .js,.mjs,.cjs,.ts,.json,.json5 --fix";

export default {
  "*.js": command,
  "*.mjs": command,
  "*.cjs": command,
  "*.ts": command,
  "*.json": command,
  "*.json5": command,
};
