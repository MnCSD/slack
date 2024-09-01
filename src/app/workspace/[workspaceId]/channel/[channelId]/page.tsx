"use client";

import { UseGetChannel } from "@/features/channels/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { Loader, Triangle, TriangleAlert } from "lucide-react";
import React from "react";
import { Header } from "./header";
import { ChatInput } from "./chat-input";
import { channel } from "diagnostics_channel";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { data, isLoading } = UseGetChannel({ id: channelId });

  if (isLoading) {
    return (
      <div className="h-full bg-white flex-1 flex items-center justify-center">
        <Loader className="size-5 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full bg-white flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlert className="size-5  text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <Header name={data.name} />
      <div className="flex-1" />
      <ChatInput placeholder={`Message #${data.name}`} />
    </div>
  );
};

export default ChannelIdPage;
