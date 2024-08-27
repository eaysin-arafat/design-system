const fs = require("fs");
const path = require("path");
const sass = require("sass");

/**
 * compile any input or any scss file to css
 * @param {string} input source file
 * @param {string} output output file
 */

const compile = (input, output) => {
  const result = sass.compile(path.resolve(input), {
    style: "expanded",
    verbose: true,
  });

  fs.writeFileSync(path.resolve(output), result.css);
};

// compile the global css
compile("src/global.scss", "lib/global.css");

/**
 * Get All Components form Atoms, Molecules and Organisms
 * @returns Object[] return array of object containing src and output
 */
const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => ({
      input: `src/${type}/${file}`,
      output: `lib/${file.slice(0, -5)}.css`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

getComponents().forEach((component) =>
  compile(component.input, component.output)
);
