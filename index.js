#!/usr/bin/env node

const messages = require('./Messages.json');
const common = require('common-words');
const commonWords = common.map(obj => obj.word);
const fs = require('fs');
const outStream = fs.createWriteStream('./output.txt', { 'flags': 'a' });

commonWords.push('i');
commonWords.push('is');
commonWords.push('ss');
commonWords.push('');

const wordCounts = {};
const output = '';

messages.RECORDS.forEach((message) => {
  const tokens = message.body_xml.toLowerCase().replace(/[^0-9a-z\s]/gi, '').split(' ');

  tokens.forEach((token) => {
    if (commonWords.indexOf(token) === -1) {
      if (wordCounts[token] === undefined) {
        wordCounts[token] = 1;
      }
      else {
        wordCounts[token]++;
      }
    }
  });
});

const sortable = [];

Object.keys(wordCounts).forEach((word) => {
  sortable.push([word, wordCounts[word]]);
});

sortable.sort((a, b) => {
  return b[1] - a[1];
});


sortable.forEach((item, index) => {
  outStream.write((index + 1) + ': ' + item[0] + ' (' + item[1] + ')\n');
});

outStream.end();
