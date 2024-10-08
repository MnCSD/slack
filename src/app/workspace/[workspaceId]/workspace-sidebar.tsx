import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import React from "react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { UseGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { UseGetMember } from "@/features/members/api/use-get-member";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useChannelId } from "@/hooks/use-channel-id";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = UseGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = UseGetMember({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#1f1022] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#1f1022] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#542556] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
        <WorkspaceSection
          label="Channels"
          hint="New channel"
          onNew={member.role === "admin" ? () => setOpen(true) : undefined}
        >
          {channels?.map((item) => (
            <SidebarItem
              key={item._id}
              label={item.name}
              icon={HashIcon}
              id={item._id}
              variant={channelId === item._id ? "active" : undefined}
            />
          ))}
        </WorkspaceSection>
        <WorkspaceSection label="Direct messages" hint="Open a direct message">
          {members?.map((item) => (
            <UserItem
              key={item._id}
              id={item._id}
              label={item.user.name}
              image={item.user.image}
            />
          ))}
        </WorkspaceSection>
      </div>
    </div>
  );
};
