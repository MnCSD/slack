import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface HeaderProps {
  name: string;
}

export const Header = ({ name }: HeaderProps) => {
  const [value, setValue] = useState(name);
  const [editOpen, setEditOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            variant={"ghost"}
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
          >
            <span className="truncateS"># {name}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden p-0 bg-gray-50">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel Name</p>
                    <p className="text-sm text-[#126483] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm"># {name}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="">
                  <DialogTitle>Rename channel</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <Input
                    value={value}
                    disabled={false}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="e.g. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button disabled={false} variant={"outline"}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={false}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600 ">
              <TrashIcon className="size-4 " />
              <p className="text-sm font-semibold">Delete channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
