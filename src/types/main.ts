import type {
  ChildProcessExecOutput,
  ChildProcessOnChunk,
} from '@banez/child_process/types';
import type { DockerImageInfo, DockerImageList } from '.';
import type { DockerContainerInfo, DockerContainerList } from './container';

export interface DockerArgs {
  [name: string]: string | string[];
}

export interface Docker {
  container: {
    list(): Promise<DockerContainerList>;
    info(nameOrId: string): Promise<DockerContainerInfo>;
    logs(data: {
      nameOrId: string;
      lines: string;
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      };
    }): Promise<void>;
    tail(data: {
      nameOrId: string;
      lines?: number;
      onChunk: ChildProcessOnChunk;
      doNotThrowError?: boolean;
    }): ChildProcessExecOutput;
    start(
      nameOrId: string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
    stop(
      nameOrId: string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
    restart(
      nameOrId: string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
    remove(
      nameOrId: string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
    run(config: {
      args: DockerArgs;
      onChunk?: ChildProcessOnChunk;
      doNotThrowError?: boolean;
    }): Promise<void>;
    exists(nameOrId: string): Promise<boolean>;
    exec(
      command: string[] | string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
  };
  image: {
    pull(
      name: string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
    remove(
      nameOrId: string,
      options?: {
        onChunk?: ChildProcessOnChunk;
        doNotThrowError?: boolean;
      },
    ): Promise<void>;
    list(): Promise<DockerImageList>;
    info(nameOrId: string): Promise<DockerImageInfo>;
    exists(nameOrId: string): Promise<boolean>;
  };
}
