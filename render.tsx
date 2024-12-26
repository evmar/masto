import * as preact from 'preact';
import * as hooks from 'preact/hooks';
import notesJson from './notes.json'
import { APNote, } from 'activitypub-types';

const notes = notesJson as unknown as APNote[];
notes.reverse();

function Note({ note }: { note: APNote }) {
  let attachments;
  if (note.attachment instanceof Array && note.attachment.length > 0) {
    const n = note.attachment.length;
    attachments = <div><i>({n} attachment{n === 1 ? '' : 's'})</i></div>;
  }
  return <div class='note'>
    <div><a href={note.url as string}>{note.published}</a></div>
    <div dangerouslySetInnerHTML={{ __html: note.content! }} />
    {attachments}
  </div>;
}

function Main() {
  const [query, setQuery] = hooks.useState('');

  const filteredNotes = notes.filter(note =>
    note.content?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <input
        class='filter'
        type='filter'
        placeholder='filter'
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      &nbsp;&nbsp;
      {filteredNotes.length} {query === '' ? 'entries' : 'matches'}
      {filteredNotes.map(n => <Note note={n} />)}
    </main>
  );
}

preact.render(<Main />, document.body);
