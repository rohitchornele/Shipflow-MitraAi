export type RepositoryVisibility = 'public' | 'private';

export type RepositoryHealth =
  | 'disconnected'
  | 'connected'
  | 'syncing'
  | 'ready';