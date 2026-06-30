'use client';

import { useState } from 'react';

import { Check, ChevronsUpDown, Plus, Zap } from 'lucide-react';

import { Button } from '~/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '~/components/ui/command';

import { cn } from '~/lib/utils';

type Workspace = {
  id: string;
  name: string;
  plan: string;
};

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'ShipFlow',
    plan: 'Free',
  },
  {
    id: '2',
    name: 'Personal',
    plan: 'Pro',
  },
  {
    id: '3',
    name: 'Acme Inc',
    plan: 'Business',
  },
];

type WorkspaceSwitcherProps = {
  collapsed?: boolean;
};

export function WorkspaceSwitcher({
  collapsed = false,
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState(false);

  const [workspace, setWorkspace] = useState(mockWorkspaces[0]);

  if (collapsed) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
        <Zap className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* <PopoverTrigger asChild> */}
      <PopoverTrigger>
        <div className="w-full h-14 justify-between rounded-xl flex items-center gap-12"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg border flex items-center justify-center"
            >
              <Zap className="h-4 w-4" />
            </div>

            <div className="text-left">
              <p className="text-sm font-medium truncate">{workspace?.name}</p>

              <p
                className="text-xs text-muted-foreground"
              >
                {workspace?.plan} Plan
              </p>
            </div>
          </div>

          <ChevronsUpDown
            className="h-4 w-4 opacity-50"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No workspaces found</CommandEmpty>

            <CommandGroup heading="Workspaces">
              {mockWorkspaces.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setWorkspace(item);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      workspace?.id === item.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />

                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup>
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                Create Workspace
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
