import { APActivity, APNote, APOrderedCollection } from 'activitypub-types';
import * as fflate from 'fflate';

export function loadArchive(buf: Uint8Array): APOrderedCollection {
  const unzip = fflate.unzipSync(buf, { filter: (file) => file.name == 'outbox.json' });
  const outboxJson = new TextDecoder().decode(unzip['outbox.json']);
  return JSON.parse(outboxJson) as APOrderedCollection;
}

export function notes(outbox: APOrderedCollection): APNote[] {
  const notes = [];
  for (const item of outbox.orderedItems!) {
    const activity = item as APActivity;
    if (activity.type !== 'Create') continue; // skip boosts etc
    if (!activity.object) continue; // skip deletes etc
    if ((activity.object as any).type !== 'Note') continue; // skip follows etc
    const note = activity.object as APNote;
    notes.push(note);
  }
  return notes;
}
