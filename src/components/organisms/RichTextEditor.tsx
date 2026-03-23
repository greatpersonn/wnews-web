import { useEffect, useRef } from 'react';
import { Button } from '@/components/atoms/Button';
import styles from './RichTextEditor.module.scss';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = (command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <Button variant="ghost" onClick={() => exec('bold')}>B</Button>
        <Button variant="ghost" onClick={() => exec('italic')}>I</Button>
        <Button variant="ghost" onClick={() => exec('formatBlock', 'h2')}>H2</Button>
        <Button variant="ghost" onClick={() => exec('insertUnorderedList')}>• List</Button>
        <Button variant="ghost" onClick={() => exec('insertOrderedList')}>1. List</Button>
      </div>

      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
          }
        }}
      />
    </div>
  );
}