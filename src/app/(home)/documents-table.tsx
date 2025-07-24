import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { DocumentsRow } from "./DocumentsRow";

interface DocumentTableProps {
    documents: Doc<"documents">[] | undefined;
    status: PaginationStatus;
    loadMore: (numItems : number) => void;
}

export const DocumentTable = ({ documents, status, loadMore }: DocumentTableProps) => {

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-4">
        {documents === undefined ? (
            <div className="flex items-center justify-center h-24">
                <LoaderIcon className="animate-spin size-5 text-muted-foreground"/>
            </div>
        ) : (
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead>Name</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead className="hidden md:table-cell">Shared</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                    </TableRow>
                </TableHeader>
                {documents.length === 0 ? (
                    <TableBody>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableCell className="h-24 text-center text-muted-foreground" colSpan={4}>
                                No documents found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ): (
                    <TableBody>
                        {documents.map((document)=> (
                            <DocumentsRow key={document._id} document={document} />
                        ))}
                    </TableBody>
                )}
            </Table>
        )}
    </div>
  );
};
