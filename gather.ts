import * as fs from 'node:fs';
import * as masto from './masto.js';

const filename = process.argv[2];
const buf = fs.readFileSync(filename);
const outbox = masto.loadArchive(buf);
let notes = masto.notes(outbox);

// filter to public notes
notes = notes.filter(note => {
  const to = note.to;
  if (!(to instanceof Array)) return false;
  if (to.length != 1) return false;
  if (to[0] !== 'https://www.w3.org/ns/activitystreams#Public') return false;
  return true;
});

console.log(JSON.stringify(notes));
