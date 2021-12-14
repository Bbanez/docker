import type {
  ChildProcessExecOutput,
  ChildProcessOnChunk,
} from '@banez/child_process/types';
import type { DockerContainerInfo, DockerContainerList } from './container';

export interface DockerArgs {
  [name: string]: string | string[];
}

export interface Docker {
  container: {
    list(): Promise<DockerContainerList>;
    info(nameOrId: string): Promise<DockerContainerInfo>;
    logs(data: { nameOrId: string; lines: string }): Promise<string>;
    tail(data: {
      nameOrId: string;
      lines?: number;
      onChunk: ChildProcessOnChunk;
    }): ChildProcessExecOutput;
    start(nameOrId: string): Promise<string>;
    stop(nameOrId: string): Promise<string>;
    restart(nameOrId: string): Promise<string>;
    remove(nameOrId: string): Promise<string>;
    run(config: {
      args: DockerArgs;
      onChunk?: ChildProcessOnChunk;
    }): Promise<void>;
  };
  image: {
    pull(name: string): Promise<string>;
    remove(nameOrId: string): Promise<string>;
  };
}
