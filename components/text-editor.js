import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function $TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
  })

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button
          className="bg-gray-200 text-gray-600 rounded-md px-2 py-1 mr-2"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <span className="text-md-bold">B</span>
        </button>
        <button
          className="bg-gray-200 text-gray-600 rounded-md px-2 py-1 mr-2"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="italic">I</span>
        </button>
        <button
          className="bg-gray-200 text-gray-600 rounded-md px-2 py-1 mr-2"
          onClick={() => {
            const url = window.prompt("Enter the URL");
            editor.chain().focus().toggleItalic({ href: url }).run();
        }}
        >
          <span>Link</span>
        </button>
        <button
          className="bg-gray-200 text-gray-600 rounded-md px-2 py-1 mr-2"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <span>Bullet List</span>
        </button>
        <button
          className="bg-gray-200 text-gray-600 rounded-md px-2 py-1 mr-2"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <span>Numbered List</span>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

function TextEditor() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-md w-full lg:w-2/3 xl:w-1/2">
        <$TextEditor />
      </div>
    </div>
  )
}

export default TextEditor;
