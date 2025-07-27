"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_VtQCjaV_qiTXWhRAKz3a0LLrf-dFi2Pirf6HTHG7O8Q6ByyTW9VWfXtNRUrM5WZE"}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}