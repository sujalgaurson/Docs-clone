"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '@/Store/Use-editor-store'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

import { Ruler } from './Ruler'

//custom extensions
import { FontSizeExtension } from '@/extensions/Font-size'
import { LineHeightExtension } from '@/extensions/Line-height'

export const Editor = () =>{

    const { setEditor } = useEditorStore();

const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
        setEditor(editor);
    },
    onDestroy: ()=> {
        setEditor(null);
    },
    onUpdate: ({ editor }) => {
        setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
        setEditor(editor);
    },
    onTransaction: ({ editor }) => {
        setEditor(editor);
    },
    onFocus: ({ editor }) => {
        setEditor(editor);
    },
    onBlur: ({ editor }) => {
        setEditor(editor);
    },
    onContentError: ({ editor }) => {
        setEditor(editor);
    },
    editorProps:{
        attributes:{
            style: "padding-left: 56px; padding-right: 56px;",
            class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-10 pb-10 " 
        },
    },
    extensions: [
        StarterKit,
        LineHeightExtension.configure({
            types: ['paragraph', 'heading'],
            defaultLineHeight: 'normal',
        }),
        FontSizeExtension,
        TextAlign.configure({
        types: ['heading', 'paragraph'],
        }),
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
            HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        }),
        FontFamily,
        TextStyle,
        Color,
        Highlight.configure({
            multicolor: true,
        }),
        Underline,
        Image,
        ImageResize,
        TaskItem.configure({
            nested: true,
        }),
        TaskList,
        Table.configure({
            resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
    ],
    content: `
        
      `,
})


    return (
        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <Ruler/>
            <div className='min-w-full flex justify-center w-[816px] py-4 print:py-0 print:w-full print:min-w-0'>
            <EditorContent editor={editor} />
            </div>
        </div>
    );
};