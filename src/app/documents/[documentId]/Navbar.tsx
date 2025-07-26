"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DocumentInput } from './Documnet-Input'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { MenubarSub, MenubarSubContent, MenubarSubTrigger } from '@radix-ui/react-menubar'
import { FileJson2Icon, FilePenIcon, FilePlus2, FileTextIcon, Globe2Icon, GlobeIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SaveIcon, Table2, TextIcon, Trash2Icon, UndoIcon } from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
import { useEditorStore } from '@/Store/Use-editor-store'
import { blob } from 'stream/consumers'
import { Content } from 'next/font/google'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'




export const Navbar = () => {
    const { editor } = useEditorStore();

    const InstertTable = (rows: number, cols: number) => {
        const table = editor?.chain().focus().insertTable({ rows, cols }).run();
    };

    const onDownload = (blob: Blob, fileName: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }

    const onSaveJson = () => {
        const json = editor?.getJSON();
        const blob = new Blob([JSON.stringify(json)], { 
            type: 'application/json' 
        });
        onDownload(blob, `document.json`); //Use document name TODO
    }

    const onSaveHtml = () => {
        if (!editor) return;

        const Content = editor?.getHTML();
        const blob = new Blob([Content], { 
            type: 'text/html' 
        });
        onDownload(blob, `document.html`); //Use document name TODO
    }

    const onSaveText = () => {
        if (!editor) return;

        const Content = editor?.getText();
        const blob = new Blob([Content], { 
            type: 'text/plain' 
        });
        onDownload(blob, `document.txt`); //Use document name TODO
    }

  return (
    <nav className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={51} height={40} />
            </Link>
            <div className='flex flex-col'>
                <DocumentInput/>

                <Menubar className='border-none bg-transparent p-0 h-auto shadow-none '>

                    {/* File Menu */}
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent className='print:hidden'>
                                <MenubarSub>
                                    <MenubarSubTrigger className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                        <SaveIcon className='mr-2' />
                                        Save
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={onSaveJson} className='flex items-center gap-1 p-2 border shadow-md text-sm bg-white'>
                                            <FileJson2Icon className='mr-2' />
                                            JSON
                                        </MenubarItem>
                                        <MenubarItem onClick={()=> window.print()} className='flex items-center gap-1 p-2 border shadow-md text-sm bg-white'>
                                            <BsFilePdf className='mr-2 size-6' />
                                            PDF
                                        </MenubarItem>
                                        <MenubarItem onClick={onSaveHtml} className='flex items-center gap-1 p-2 border shadow-md text-sm bg-white'>
                                            <GlobeIcon className='mr-2' />
                                            HTML
                                        </MenubarItem>
                                        <MenubarItem onClick={onSaveText} className='flex items-center gap-1 p-2 border shadow-md text-sm bg-white'>
                                            <FileTextIcon className='mr-2' />
                                            Text
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>

                                <MenubarItem className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <FilePlus2 className='mr-2' />
                                    New Document
                                </MenubarItem>

                                <MenubarSeparator/> 

                                <MenubarItem className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <FilePenIcon className='mr-2' />
                                    Rename
                                </MenubarItem>

                                <MenubarItem className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <Trash2Icon className='mr-2' />
                                    Remove
                                </MenubarItem>

                                <MenubarSeparator/>

                                <MenubarItem onClick={()=>window.print()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <PrinterIcon className='mr-2' />
                                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>

                            </MenubarContent>
                    </MenubarMenu>

                    {/* Edit Menu */}
                    <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                            <MenubarContent className='print:hidden'>

                                <MenubarItem onClick={() => editor?.chain().focus().undo().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <UndoIcon className='mr-2' />
                                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>

                                <MenubarItem onClick={() => editor?.chain().focus().redo().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <Redo2Icon className='mr-2' />
                                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                                </MenubarItem>

                            </MenubarContent>
                    </MenubarMenu>

                    {/* Insert Menu  */}
                    <MenubarMenu>
                        <MenubarTrigger>Insert</MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                        <Table2 className='mr-2' />
                                        Table
                                    </MenubarSubTrigger>
                                    <MenubarSubContent className='bg-white shadow-md border rounded-md'>
                                        <MenubarItem onClick={() => InstertTable(1, 1)} >
                                            1 x 1
                                        </MenubarItem>
                                        <MenubarItem onClick={() => InstertTable(2, 2)}>
                                            2 x 2
                                        </MenubarItem>
                                        <MenubarItem onClick={() => InstertTable(3, 3)}>
                                            3 x 3
                                        </MenubarItem>
                                        <MenubarItem onClick={() => InstertTable(4, 4)}>
                                            4 x 4
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                    </MenubarMenu>

                    {/* Format  */}
                    <MenubarMenu>
                        <MenubarTrigger>Format</MenubarTrigger>
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <TextIcon className='mr-2' />
                                    Text
                                </MenubarSubTrigger>
                                <MenubarSubContent className='bg-white shadow-md border rounded-md p-1'>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleBold().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                        <span className='font-bold mr-2'>B</span>
                                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleItalic().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                        <span className='italic mr-2'>I</span>
                                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleUnderline().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                        <span className='underline mr-2'>U</span>
                                        Underline <MenubarShortcut>⌘U</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleStrike().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                        <span className='line-through mr-2'>S</span>
                                        Strikethrough <MenubarShortcut>⌘Shift+X</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarSubContent>
                                <MenubarItem onClick={()=> editor?.chain().focus().unsetAllMarks().run()} className='flex items-center p-1 text-sm focus:outline-none cursor-pointer'>
                                    <RemoveFormattingIcon className='mr-2' />
                                    Clear Formating
                                </MenubarItem>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>


                </Menubar>
            </div>
        </div>
        <div className="flex items-center gap-3 pl-6">
        <OrganizationSwitcher 
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
         />
        <UserButton/>
      </div>
    </nav>
  )
}
