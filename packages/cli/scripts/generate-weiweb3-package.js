const fs = require("fs");

const existingPackageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const newPackageJson = { ...existingPackageJson, name: "weiweb3" };

fs.writeFileSync("package.json", JSON.stringify(newPackageJson, null, 2));

fs.writeFileSync(
  "README.md",
  `# weiweb3 cli

  This is a proxied package of the \`@weiweb3/cli\` for convenient usage with \`npx weiweb3\`.
  
  You can find the actual package [here](https://www.npmjs.com/package/@weiweb3/cli).
  `
);
