"use client";

import React from "react";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full overflow-hidden">
      <Toolbar />
      <div className="flex h-[calc(100vh-38px)] relative">
        <Sidebar />
        <div className="w-[100%] absolute left-[68px] top-[-2px] h-full">
          <ResizablePanelGroup
            className="rounded-md"
            direction="horizontal"
            autoSaveId="mnc-workspace-layout"
          >
            <ResizablePanel
              defaultSize={20}
              minSize={11}
              className="bg-[#5E2C5F]"
            >
              <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={20}> {children}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
