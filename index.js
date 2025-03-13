import fs from "node:fs";

import { createRestAPIClient } from "masto";

import configFile from "./config.json" with {type: 'json'};

const masto = createRestAPIClient({
  url: configFile.api_url,
  accessToken: configFile.access_token,
});

function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const NPCIDs =
[
	'BARRY',
	'BLOOD',
	'LYNX',
	'GRIZZLY',
	'VICKY',
	'TREVOR',
	'GRUNTY',
	'IVAN',
	'STEROID',
	'IGOR',
	'SHADOW',
	'RED',
	'REAPER',
	'FIDEL',
	'FOX',
	'SIDNEY',
	'GUS',
	'BUNS',
	'ICE',
	'SPIDER',
	'CLIFF',
	'BULL',
	'HITMAN',
	'BUZZ',
	'RIDER',
	'RAVEN',
	'STATIC',
	'LEN',
	'DANNY',
	'MAGIC',
	'STEPHEN',
	'SCULLY',
	'MALICE',
	'DR_Q',
	'NAILS',
	'THOR',
	'SCOPE',
	'WOLF',
	'MD',
	'MELTDOWN', // 39
	'BIFF',
	'HAYWIRE',
	'GASKET',
	'RAZOR',
	'FLO',
	'GUMPY',
	'LARRY_NORMAL',
	'LARRY_DRUNK',
	'COUGAR',
	'NUMB',
	'BUBBA',
	'IMP_M0', // 51
	'IMP_M1',
	'IMP_M2',
	'IMP_W0',
	'IMP_W1',
	'IMP_W2',
	'MIGUEL', // 57
	'CARLOS',
	'IRA',
	'DIMITRI',
	'DEVIN',
	'ROBOT', // 62: DUMMY 
	'HAMOUS',
	'SLAY',
	'RPC65', // 65: DUMMY
	'DYNAMO',
	'SHANK',
	'IGGY',
	'VINCE',
	'CONRAD',
	'RPC71', // 71: DUMMY
	'MADDOG'
];

const files = fs.readdirSync('./speech/');
const randomFile = randomFrom(files);

const file = fs.readFileSync('./text/' + randomFile + '.txt', 'utf8');
const lines = file.split('\n');
const trimedLines = lines.map(s => s.trim());
const quote = trimedLines.join(' ').trim();
const face = NPCIDs[parseInt(randomFile.substring(0, 3), 10)];

// Create media from a local file
const media = await masto.v2.media.create({
  file: new Blob([fs.readFileSync('./speech/' + randomFile)]),
  description: quote.slice(0, 420),
  thumbnail: new Blob([fs.readFileSync('./faces/' + face + '.png')])
});

// Publish!
await masto.v1.statuses.create({
  status: face + ': ' + quote,
  visibility: "public",
  mediaIds: [media.id],
});
