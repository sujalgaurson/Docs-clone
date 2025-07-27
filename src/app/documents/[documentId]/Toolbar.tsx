"use client";
import { cn } from '@/lib/utils';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, Printer, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { useEditorStore } from '@/Store/Use-editor-store';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Label } from '@radix-ui/react-dropdown-menu'
import { type Level } from '@tiptap/extension-heading';
import { type ColorResult, CirclePicker, SketchPicker} from 'react-color';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LineHeightbutton = () => {
    const { editor } = useEditorStore();

    const LineHeights = [
        {
            label : 'Default',
            value : 'normal',
        },
        {
            label : 'Single',
            value : '1',
        },
        {
            label : '1.15',
            value : '1.15',
        },
        {
            label : '1.5',
            value : '1.5',
        },
        {
            label : 'Double',
            value : '2',
        }
    ]


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <ListCollapseIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 w-full mt-2 bg-white shadow-lg rounded-md z-50'>
                {LineHeights.map(({label, value})=>(
                    <button 
                    key={value}
                    onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
                    className='flex items-center px-2 py-1 gap-2 hover:bg-neutral-200/80'>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes('textStyle').fontSize
    ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
    : "16" ;

    const [fontSize, setFontSize] = useState(currentFontSize);
    const[inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);

        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }

    const increment = ()=>{
        const newSize = parseInt(fontSize) + 1
        updateFontSize(newSize.toString());
    }

    const decrement = ()=>{
        const newSize = parseInt(fontSize) - 1
        if (newSize > 0) updateFontSize(newSize.toString());
    }

    return (
        <div className='flex items-center gap-x-0.5'>
          <button 
          onClick={decrement}
          className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
            <MinusIcon className='size-4'/>
          </button>  
          {isEditing ? (
            <Input
            type='text'
            className='text-xs h-7 w-10 flex flex-col rounded-sm items-center bg-transparent focus:outline-none focus:ring-0'
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            />
          ):(
            <button
            onClick={()=>{
                setIsEditing(true);
                setFontSize(currentFontSize);
            }}
            className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                {currentFontSize}
            </button>
          )}
          <button
          onClick={increment}
          className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
           <PlusIcon className='size-4'/>
          </button>
        </div>
    );
}

const ListButton = () => {
    const { editor } = useEditorStore();

    const List = [
        {
            label: 'Bullet List',
            icon: ListIcon,
            isActive: editor?.isActive('bulletList'),
            onclick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: 'Ordered List',
            icon: ListOrderedIcon,
            isActive: editor?.isActive('orderedList'),
            onclick: () => editor?.chain().focus().toggleOrderedList().run(),
        }
    ]


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <ListIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 w-full mt-2 bg-white shadow-lg rounded-md z-50'>
                {List.map(({label, icon : Icon, onclick, isActive})=>(
                    <button 
                    key={label}
                    onClick={onclick}
                    className={cn('flex items-center px-2 py-1 gap-2 hover:bg-neutral-200/80', { 'bg-neutral-200/80': isActive })}>
                        <Icon/>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const TextAlignButton = () => {
    const { editor } = useEditorStore();

    const Alignments = [
        {
            label : 'Align Left',
            value : 'left',
            icon : AlignLeftIcon,
        },
        {
            label : 'Align Center',
            value : 'center',
            icon : AlignCenterIcon,
        },
        {
            label : 'Align Right',
            value : 'right',
            icon : AlignRightIcon,
        },
        {
            label : 'Align Justify',
            value : 'justify',
            icon : AlignJustifyIcon,
        }
    ]


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <AlignLeftIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 w-full mt-2 bg-white shadow-lg rounded-md z-50'>
                {Alignments.map(({label, value, icon : Icon})=>(
                    <button 
                    key={value}
                    onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                    className='flex items-center px-2 py-1 gap-2 hover:bg-neutral-200/80'>
                        <Icon/>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const onChange = (url: string) => {
        if (!editor || !url.trim()) return;
        editor.chain().focus().setImage({ src: url }).run();
        setImageUrl('');
        setIsOpen(false);
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (open) {
                setImageUrl('');
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <ImageIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-4 mt-2 flex flex-col gap-y-2 bg-white shadow-lg rounded-md z-50' align="start">
                <Input
                    placeholder='Paste Image URL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onChange(imageUrl);
                        }
                        if (e.key === 'Escape') {
                            setIsOpen(false);
                        }
                    }}
                    autoFocus
                />
                <Button 
                    type='button' 
                    onClick={() => onChange(imageUrl)}
                    disabled={!imageUrl.trim()}
                >
                    Insert Image
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const onChange = (href: string) => {
        if (!editor || !href.trim()) return;
        
        // Add protocol if missing
        let url = href.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        // If text is selected, add link to selection
        // If no selection, insert link text
        if (editor.view.state.selection.empty) {
            editor?.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
        } else {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
        
        setValue('');
        setIsOpen(false); // Close dropdown
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (open) {
                setValue(editor?.getAttributes('link').href || '');
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    'text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80',
                    editor?.isActive('link') && 'bg-neutral-200/80'
                )}>
                    <Link2Icon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-4 mt-2 flex flex-col gap-y-2 bg-white shadow-lg rounded-md z-50' align="start">
                <Input
                    placeholder='https://example.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onChange(value);
                        }
                        if (e.key === 'Escape') {
                            setIsOpen(false);
                        }
                    }}
                    autoFocus
                />
                <div className="flex gap-2">
                    <Button 
                        type='button' 
                        onClick={() => onChange(value)}
                        disabled={!value.trim()}
                        size="sm"
                    >
                        Apply
                    </Button>
                    {editor?.isActive('link') && (
                        <Button 
                            type='button' 
                            variant="outline"
                            onClick={() => {
                                editor?.chain().focus().unsetLink().run();
                                setValue('');
                                setIsOpen(false);
                            }}
                            size="sm"
                        >
                            Remove
                        </Button>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    ); 

}

const HighlightButton = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("highlight").color || "#FFFFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <HighlighterIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-4 flex flex-col gap-y-1 bg-white shadow-lg rounded-md z-50'>
                <SketchPicker onChangeComplete={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const TextColorButton = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000"; // Default to black if no color is set

    const handleColorChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-xs h-7 min-w-7 flex flex-col rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <span className='text-sm'>A</span>
                    <div className='h-0.5 w-full' style={{backgroundColor : value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-4 mt-2 flex flex-col gap-y-1 bg-white shadow-lg rounded-md z-50'>
                <CirclePicker onChangeComplete={handleColorChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const HeadingLevelButton = ()=>{
    const { editor } = useEditorStore();

    const headings = [
        { label: 'Normal Text', value: '0', fontSize : '16px' },
        { label: 'Heading 1', value: '1', fontSize : '32px' },
        { label: 'Heading 2', value: '2', fontSize : '24px' },
        { label: 'Heading 3', value: '3', fontSize : '20px' },
        { label: 'Heading 4', value: '4', fontSize : '18px' },
        { label: 'Heading 5', value: '5', fontSize : '16px' },
    ];

    const getCurrentHeading = () => {
        for(let level=1; level<=5; level++){
            if(editor?.isActive('heading', { level })) {
                return `Heading ${level}`;
            }
        }

        return 'Normal Text';
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-[120px] flex gap-8 rounded-sm items-center justify-center hover:bg-neutral-200/80'>
                    <span className='truncate'>
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className='size-4 ml-2 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-4 mt-2 flex flex-col gap-y-1 bg-white shadow-lg rounded-md z-50'>
                {headings.map(({label,value,fontSize}) => (
                    <DropdownMenuItem 
                        key={value} 
                        style={{ fontSize }}
                        className={cn("flex items-center justify-between gap-x-2 px-2 py-1 hover:bg-neutral-200/80",
                            (value === '0' && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80'
                        )}
                        onClick={()=>{
                            if(value === '0') {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().toggleHeading({ level: Number(value) as Level }).run();
                            }
                        }}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const FontFamilyButton = ()=>{
    const { editor } = useEditorStore();

    const fonts = [
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Courier New', value: '"Courier New", monospace' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Times New Roman', value: '"Times New Roman", serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-[120px] flex gap-8 rounded-sm items-center justify-between hover:bg-neutral-200/80'>
                    <span className='truncate'>
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className='size-4 ml-2 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-50 mt-2 p-4 flex flex-col gap-y-1 bg-white shadow-lg rounded-md'>
                {fonts.map((font) => (
                    <DropdownMenuItem 
                        key={font.label} 
                        onClick={() => editor?.chain().focus().setFontFamily(font.value).run()}
                        style={{ fontFamily: font.value }}
                    >
                        {font.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


interface ToolbarButtonProps{
    onClick?: () => void;
    icon: LucideIcon;
    isActive?: boolean;
}

const ToolBarButton = ( {
    onClick,
    isActive,
    icon : Icon
 } : ToolbarButtonProps ) => {
    return (
        <button 
        onClick={onClick} 
        className={cn(
            "text-sm h-7 min-w-7 flex rounded-sm items-center justify-center hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}>
            <Icon className='size-4' />
        </button>
    )
}

export const Toolbar = () => {
    const {editor} = useEditorStore();
    console.log("Editor in Toolbar:", editor);
    const section : {
        label : string;
        icon : LucideIcon;
        onClick : () => void;
        isActive? : boolean;
        }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Print",
                    icon: Printer,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    },
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                    isActive: editor?.isActive('bold'),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                    isActive: editor?.isActive('italic'),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                    isActive: editor?.isActive('underline'),
                }
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("liveblocksCommentMark"),
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("tasklist"), 
                },
                {
                    label: "Remove Formating",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                    isActive: editor?.isActive("tasklist"), 
                },
            ]
        ];
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {section[0].map((item)=>(
        <ToolBarButton 
            key={item.label} {...item}
        />
    ))}
      <Separator orientation='vertical' className='h-6 mx-1 bg-neutral-300' />
      <FontFamilyButton/>
      <Separator orientation='vertical' className='h-6 mx-1 bg-neutral-300' />
      <HeadingLevelButton/>
      <Separator orientation='vertical' className='h-6 mx-1 bg-neutral-300' />
      <FontSizeButton/>

      <Separator orientation='vertical' className='h-6 mx-1 bg-neutral-300' />
      {section[1].map((item)=>(
          <ToolBarButton 
          key={item.label} {...item}
          />
        ))}
        <TextColorButton/>
        <HighlightButton/>
      
      <Separator orientation='vertical' className='h-6 mx-1 bg-neutral-300' />
        <ImageButton/>
        <LinkButton/>
        <TextAlignButton/>
        <ListButton/>
        <LineHeightbutton/>

      {section[2].map((item)=>(
          <ToolBarButton 
          key={item.label} {...item}
          />
        ))}
    </div>
  )
}
