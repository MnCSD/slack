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
    <div className="h-full overflow-hidden bg-[#421347]">
      <Toolbar />
      <div className="flex h-[calc(100vh-38px)] relative">
        <Sidebar />
        {/* border border-[#704e73] */}
        <div className="w-[calc(100%-73px)] absolute bg-red-500 left-[68px] top-0 h-[calc(100%-7px)] rounded-[11px] ">
          <ResizablePanelGroup
            className="rounded-md"
            direction="horizontal"
            autoSaveId="mnc-workspace-layout"
          >
            <ResizablePanel
              defaultSize={20}
              minSize={11}
              className="bg-[#5E2C5F] rounded-l-lg"
            >
              <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle className="bg-[#704e73]" withHandle />
            <ResizablePanel minSize={20}> {children}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
