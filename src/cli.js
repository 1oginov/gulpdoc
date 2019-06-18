#!/usr/bin/env node
'use strict';

const fs = require('fs');

const Gulpdoc = require('./Gulpdoc');

const getFlagValue = (argument) => {
  const i = process.argv.indexOf(`-${argument}`);

  if (i === -1) {
    return null;
  }

  return process.argv[i + 1];
};

const annotation = getFlagValue('a') || 'gulptask';
const destination = getFlagValue('d') || './gulpdoc.md';

let source = getFlagValue('s');

if (!source) {
  source = process.argv[2];

  if (!source) {
    throw new Error('Source path is not specified');
  }
}

process.stdout.write(`Gathering Gulp tasks annotated with "${annotation}" ` +
    `from "${source}" to "${destination}"...\n`);

const tasks = Gulpdoc.getTasks(source, annotation);

if (tasks.length === 0) {
  process.stdout.write('No Gulp tasks found.\n');
  process.exit();
}

tasks.sort((a, b) => {
  if (a.name === 'default') {
    return -1;
  }

  if (b.name === 'default') {
    return 1;
  }

  return a.name.localeCompare(b.name);
});

let data = '';

tasks.forEach((task) => {
  data += `* \`gulp ${task.name}\` - ${task.description.replace(/[\r\n]+/g, ' ')}\n`;
});

fs.writeFileSync(destination, data);

process.stdout.write(`${tasks.length} Gulp task${tasks.length > 1 ? 's' : ''}` +
    ` ha${tasks.length > 1 ? 've' : 's'} been documented.\n`);
