import { createInstallationClient } from './github-app';
import { RepositoryFile } from './types';
const MAX_FILE_SIZE_BYTES = 100_000;
const MAX_FILES = 200;

const CODE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.py',
  '.go',
  '.rb',
  '.rs',
  '.java',
  '.kt',
  '.swift',
  '.c',
  '.h',
  '.cpp',
  '.cs',
  '.php',
  '.sql',
  '.prisma',
  '.css',
  '.md',
  '.json',
  '.yml',
  '.yaml',
];

const SKIPPED_FOLDERS = [
  'node_modules/',
  'dist/',
  'build/',
  '.next/',
  '.turbo/',
  '.git/',
  'coverage/',
];

type TreeEntry = {
  path?: string;
  type?: string;
  sha?: string;
  size?: number;
};

function hasCodeExtension(path: string) {
  return CODE_EXTENSIONS.some((extension) => path.endsWith(extension));
}

function isSkippedPath(path: string) {
  return SKIPPED_FOLDERS.some((folder) => path.includes(folder));
}

function isIndexableFile(entry: TreeEntry) {
  if (entry.type !== 'blob' || !entry.path || !entry.sha) {
    return false;
  }

  if (entry.size && entry.size > MAX_FILE_SIZE_BYTES) {
    return false;
  }

  if (isSkippedPath(entry.path)) {
    return false;
  }

  return hasCodeExtension(entry.path);
}

export async function getRepositoryFiles(
  installationId: number,
  repositoryOwner: string,
  repositoryName: string,
  branch: string
): Promise<RepositoryFile[]> {
  const octokit = createInstallationClient(installationId);


  const { data: tree } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
    {
      owner: repositoryOwner,
      repo: repositoryName,
      tree_sha: branch,
      recursive: '1',
    }
  );

  const entries = tree.tree.filter(isIndexableFile).slice(0, MAX_FILES);

  const files: RepositoryFile[] = [];

  for (const entry of entries) {
    const { data: blob } = await octokit.request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        owner: repositoryOwner,
        repo: repositoryName,
        file_sha: entry.sha!,
      }
    );

    const content = Buffer.from(blob.content, 'base64').toString('utf8');

    files.push({
      filePath: entry.path!,
      content,
    });
  }

  console.log('================================');
  console.log('Files:', files.length);

  const totalBytes = files.reduce(
    (sum, file) => sum + Buffer.byteLength(file.content, 'utf8'),
    0
  );

  console.log('Total MB:', (totalBytes / 1024 / 1024).toFixed(2));

  console.log(
    'Largest file:',
    Math.max(...files.map((f) => Buffer.byteLength(f.content, 'utf8'))) / 1024,
    'KB'
  );

  console.log('================================');

  return files;
}
