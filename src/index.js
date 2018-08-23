import { Parser } from './app/Services/Parser';
import path from 'path';
import 'colors';

const file_path = path.resolve(process.cwd(), 'package.json');

console.log(`Updating ${file_path.green}`);

const parser = new Parser(file_path);
const version = parser.getPackageVersion();

let type = 'patch';
switch (process.argv[2]) {
  case 'major':
    type = 'major';
    break;
  case 'minor':
    type = 'minor';
}

const new_version = version.increase(type).toString();

try {
  parser.writePackageVersion(new_version);
  console.log(`Updated new version ${new_version.green}`);
} catch (error) {
  console.error('Error'.red);
}
