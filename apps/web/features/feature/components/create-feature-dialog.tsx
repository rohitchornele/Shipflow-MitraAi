'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { Button } from '~/components/ui/button';

import { Input } from '~/components/ui/input';

import { Textarea } from '~/components/ui/textarea';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import { useProject } from '~/features/project/hooks/use-project';
import { useCreateFeature } from '../hooks/use-create-feature';

const schema = z.object({
  title: z.string().min(1),

  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  children: React.ReactNode;
};

export function CreateFeatureDialog({
  children,
}: Props) {
  const router = useRouter();

  const { project } = useProject();

  const [open, setOpen] = useState(false);

  const {
    createFeatureAsync,
    isCreating,
  } = useCreateFeature();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      title: '',

      description: '',
    },
  });

  async function onSubmit(
    values: FormValues
  ) {
    if (!project) return;

    const feature =
      await createFeatureAsync({
        projectId: project.id,

        title: values.title,

        description: values.description,
      });

    setOpen(false);

    router.push(
      `/dashboard/projects/${project.id}/features/${feature.id}`
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger >
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Create Feature
          </DialogTitle>

          <DialogDescription>
            Start a new feature. AI will help
            gather requirements after creation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Dark Mode"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Describe the feature..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isCreating}
            >
              {isCreating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              Create Feature
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}