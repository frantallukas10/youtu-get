#!/usr/bin/env node

const { getYoutubeInfo, isValidId } = require('./src/main.js');
const fs = require('fs');
const path = require('path');
const username = require('os').userInfo().username;
const yellowColor = '\x1b[33m%s\x1b[0m';
const redColor = '\x1b[31m%s\x1b[0m';
const greenColor = '\x1b[32m%s\x1b[0m';

const defaultOutput = path.resolve(
  `/Users/${username}/Downloads/`,
  'youtube-playlist-data.json'
);

const getValue = type => {
  let output = defaultOutput;
  process.argv.map(item => {
    if (item.includes(type)) {
      output = item.replace(`${type}=`, '');
    }
  });
  return output;
};

const isValidOutputPath = output => {
  const validOutput = /[a-z]+.json$/.exec(output);
  if (!validOutput) {
    console.log(
      redColor,
      '\nPlease define correct your output path where you want save your youtube information!'
    );
    console.log(
      yellowColor,
      '--------------------------------------' +
        '\nCorrectly defined command:' +
        '\nytget id="PLxQ30nUCB0uNCCKBD_JW1udM7iYH27cu2" output="./youtube_data.json"'
    );
    return false;
  }
  return output;
};

const validId = id => {
  if (isValidId(id)) {
    console.log(
      redColor,
      '\nPlease define correct your playlist youtube id, is exactly 12 or more chars!'
    );
    console.log(
      yellowColor,
      '--------------------------------------' +
        '\nCorrectly defined command:' +
        '\nytget id="PLxQ30nUCB0uNCCKBD_JW1udM7iYH27cu2" output="./my_output_folder/youtube_data.json"'
    );
    return false;
  }
  return id;
};

let output = isValidOutputPath(getValue('output'));
let id = validId(getValue('id'));

output &&
  id &&
  getYoutubeInfo(id).then(res => {
    if (res === false) {
      return;
    }

    !fs.existsSync(path.dirname(output)) && fs.mkdirSync(path.dirname(output));

    fs.writeFileSync(path.resolve(output), JSON.stringify(res, null, 2));

    console.log(greenColor, `Your data was save in this file: ${output}`);
  });
