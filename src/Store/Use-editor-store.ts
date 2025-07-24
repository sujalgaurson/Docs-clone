import {create} from 'zustand';
import { type Editor } from '@tiptap/react';

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
//   content: string;
//   setContent: (content: string) => void;
//   isEditing: boolean;
//   setIsEditing: (isEditing: boolean) => void;
}

export const useEditorStore = create<EditorState>((set)=> ({
    editor : null,
    setEditor : (editor) => set({editor})
}))