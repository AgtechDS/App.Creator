// save as list-structure.js
import fs from "fs";
import path from "path";

const rootDir = "A:\\AgTechDesigne\\Progetti\\MenuServe";
const includeDirs = ["api", "client", "server", "shared"];
const outputFile = path.join(rootDir, "project-structure.txt");

function listDir(dir, indent = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      if (includeDirs.includes(item.name) || indent !== "") {
        fs.appendFileSync(outputFile, `${indent}${item.name}/\n`);
        listDir(path.join(dir, item.name), indent + "  ");
      }
    } else {
      fs.appendFileSync(outputFile, `${indent}${item.name}\n`);
    }
  }
}

// Svuota/crea file di output
fs.writeFileSync(outputFile, "");

// Scansiona solo cartelle incluse
for (const dir of includeDirs) {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath)) {
    fs.appendFileSync(outputFile, `${dir}/\n`);
    listDir(fullPath, "  ");
  }
}

console.log(`Struttura salvata in: ${outputFile}`);
