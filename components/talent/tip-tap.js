import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import Toolbar from './toolbar';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';

function TipTap({ text, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({ multicolor: true }),
    ],
    content: text,
    editorProps: {
      attributes: {
        class: `w-full h-11 block bg-white text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className='space-y-1'>
      <EditorContent editor={editor} />
      <Toolbar editor={editor} />
    </div>
  );
}

export default TipTap;
