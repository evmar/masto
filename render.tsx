import * as preact from 'preact';
import notesJson from './notes.json'
import { APNote, } from 'activitypub-types';

const notes = notesJson as unknown as APNote[];

function Note({ note }: { note: APNote }) {
  return <div class='note'>
    <div><a href={note.url as string}>{note.published}</a></div>
    <div dangerouslySetInnerHTML={{ __html: note.content! }} />
  </div>;
}

function Body() {
  return <div>{notes.map(n => <Note note={n} />)}</div>;
}

preact.render(<Body />, document.body);
