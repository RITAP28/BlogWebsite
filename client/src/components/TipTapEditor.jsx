import React from "react";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading5 } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BiCodeBlock } from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { LuRedo2 } from "react-icons/lu";
import { LuUndo2 } from "react-icons/lu";
import { FaParagraph } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import ReactComponent from '../pages/BlogPages/BlogExtension'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`${editor.isActive('bold') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`${editor.isActive('italic') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`${editor.isActive('strike') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.commands.toggleUnderline()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={`${editor.isActive('underline') ? 'is-active' : ''} border-2 px-1 py-1 selection:bg-slate-400`}
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`${editor.isActive('code') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <FaCode />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${editor.isActive('paragraph') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <FaParagraph />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <LuHeading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <LuHeading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <LuHeading5 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${editor.isActive('codeBlock') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <BiCodeBlock />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${editor.isActive('blockquote') ? 'is-active' : ''} border-2 px-1 py-1`}
      >
        <GrBlockQuote />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
      className="border-2 px-1 py-1"
      >
        <MdOutlineHorizontalRule />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="border-2 px-1 py-1"
      >
        <LuUndo2 />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className="border-2 px-1 py-1"
      >
        <LuRedo2 />
      </button>
    </>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Underline.configure({
    HTMLAttributes: {
      class: 'my-custom-class',
    },
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  ReactComponent,
]

const content = ``;

const TipTapEditor = () => {
  const editor = useEditor({
    extensions,
    content,
  })
  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} >
    <EditorContent editor={editor} />
    </EditorProvider>
  )
}

export default TipTapEditor;