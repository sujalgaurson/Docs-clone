"use client"

import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenameDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
    initialTitle: string;
}

export const RenameDialog = ({ documentId, children, initialTitle }: RenameDialogProps) => {
    const update = useMutation(api.Documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({ id: documentId, title: title.trim() || "Untitled" })
            .then(() => toast.success("Document renamed successfully"))
            .catch(()=> toast.error("Failed to rename document"))
            .finally(() => {
                setIsUpdating(false);
                setOpen(false);
            });
    };

    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent onClick={(e) => e.stopPropagation()}>
            <form onSubmit={onSubmit}>
            <DialogHeader>
                <DialogTitle>Rename Document</DialogTitle>
                <DialogDescription>
                    Enter a new name for your document.
                </DialogDescription>
            </DialogHeader>
            <div className="my-4">
                <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Document Name" 
                    onClick={(e)=>{e.stopPropagation()}}
                    />
            </div>
            <DialogFooter>
                <Button
                    type="submit" 
                    variant="ghost" 
                    disabled={isUpdating} 
                    onClick={(e) => { e.stopPropagation() }} 
                    className="ml-2"
                    >
                    Save
                </Button>
                <Button 
                   type="button" 
                    variant="ghost" 
                    disabled={isUpdating} 
                    onClick={(e) => { e.stopPropagation(); 
                    setOpen(false); }} 
                    >
                    Cancel
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    )
}