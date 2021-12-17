import { ChildProcess } from '@banez/child_process';
import type { ChildProcessOnChunkHelperOutput } from '@banez/child_process/types';
import type {
  DockerContainerList,
  Docker as DockerType,
  DockerImageList,
} from './types';

export const Docker: DockerType = {
  container: {
    async list() {
      const exo: ChildProcessOnChunkHelperOutput = {
        out: '',
        err: '',
      };
      try {
        await ChildProcess.advancedExec('docker ps -a', {
          onChunk: ChildProcess.onChunkHelper(exo),
        }).awaiter;
      } catch (error) {
        throw Error(exo.err);
      }
      let lines = exo.out.split('\n');
      const headerIndexes = [0];
      const rows: string[][] = [];
      {
        const header = lines[0];
        let takeNext = false;
        for (let i = 0; i < header.length; i++) {
          if (
            takeNext &&
            header.charAt(i) !== ' ' &&
            header.charAt(i) !== '\n'
          ) {
            headerIndexes.push(i);
            takeNext = false;
          } else if (
            !takeNext &&
            ((header.charAt(i) === ' ' && header.charAt(i + 1) === ' ') ||
              i === header.length - 1)
          ) {
            takeNext = true;
          }
        }
        lines = lines.slice(1);
      }
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line) {
          const rowIndex = rows.push([]) - 1;
          for (let j = 0; j < headerIndexes.length; j++) {
            const startIndex = headerIndexes[j];
            let endIndex = line.indexOf('  ', startIndex);
            if (endIndex === -1 && j > 0) {
              endIndex = line.length;
            }
            rows[rowIndex].push(line.substring(startIndex, endIndex));
          }
        }
      }

      const list: DockerContainerList = [];
      for (let i = 0; i < rows.length; i++) {
        const cols = rows[i];
        list.push({
          containerId: cols[0],
          image: cols[1],
          command: cols[2],
          created: cols[3],
          status: cols[4],
          ports: cols[5],
          names: cols[6],
        });
      }

      return list;
    },
    async info(nameOrId) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker inspect ${nameOrId}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return JSON.parse(exo.out)[0];
    },
    async logs({ nameOrId, lines, options }) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(
          `docker logs --tail ${lines} ${nameOrId}`,
          {
            onChunk: options.onChunk,
            doNotThrowError: options.doNotThrowError,
          },
        ).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['logs', '--tail', lines, nameOrId]);
      }
    },
    tail({ nameOrId, lines, onChunk, doNotThrowError }) {
      return ChildProcess.advancedExec(
        `docker logs --tail ${
          typeof lines === 'number' ? lines : 100
        } -f ${nameOrId}`,
        {
          onChunk,
          doNotThrowError,
        },
      );
    },
    async start(nameOrId, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(`docker start ${nameOrId}`, {
          onChunk: options.onChunk,
          doNotThrowError: options.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['start', nameOrId]);
      }
    },
    async stop(nameOrId, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(`docker stop ${nameOrId}`, {
          onChunk: options.onChunk,
          doNotThrowError: options.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['stop', nameOrId]);
      }
    },
    async remove(nameOrId, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(`docker rm ${nameOrId}`, {
          onChunk: options.onChunk,
          doNotThrowError: options.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['rm', nameOrId]);
      }
    },
    async restart(nameOrId, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(`docker restart ${nameOrId}`, {
          onChunk: options.onChunk,
          doNotThrowError: options.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['restart', nameOrId]);
      }
    },
    async run(config) {
      const args: string[] = [];
      for (const argName in config.args) {
        const argInfo = config.args[argName];
        if (argInfo instanceof Array) {
          if (argInfo.length === 0) {
            args.push(argName);
          } else {
            for (let i = 0; i < argInfo.length; i++) {
              const item = argInfo[i];
              args.push(argName, item);
            }
          }
        } else {
          args.push(argName, argInfo);
        }
      }
      if (config.onChunk) {
        await ChildProcess.advancedExec(`docker run ${args.join(' ')}`, {
          onChunk: config.onChunk,
          doNotThrowError: config.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['run', ...args]);
      }
    },
    async exists(nameOrId) {
      try {
        await Docker.container.info(nameOrId);
        return true;
      } catch (error) {
        return false;
      }
    },
    async exec(command, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(
          `docker exec ${
            command instanceof Array ? command.join(' ') : command
          }`,
          {
            onChunk: options.onChunk,
            doNotThrowError: options.doNotThrowError,
          },
        ).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['exec', ...command]);
      }
    },
  },
  image: {
    async pull(name, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(`docker pull ${name}`, {
          onChunk: options.onChunk,
          doNotThrowError: options.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['pull', name]);
      }
    },
    async remove(nameOrId, options) {
      if (options && options.onChunk) {
        await ChildProcess.advancedExec(`docker rmi ${nameOrId}`, {
          onChunk: options.onChunk,
          doNotThrowError: options.doNotThrowError,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['rmi', nameOrId]);
      }
    },
    async exists(nameOrId) {
      try {
        await Docker.image.info(nameOrId);
        return true;
      } catch (error) {
        return false;
      }
    },
    async info(_nameOrId) {
      return {} as never;
    },
    async list() {
      const exo: ChildProcessOnChunkHelperOutput = {
        out: '',
        err: '',
      };
      try {
        await ChildProcess.advancedExec('docker images', {
          onChunk: ChildProcess.onChunkHelper(exo),
        }).awaiter;
      } catch (error) {
        throw Error(exo.err);
      }
      let lines = exo.out.split('\n');
      const headerIndexes = [0];
      const rows: string[][] = [];
      {
        const header = lines[0];
        let takeNext = false;
        for (let i = 0; i < header.length; i++) {
          if (
            takeNext &&
            header.charAt(i) !== ' ' &&
            header.charAt(i) !== '\n'
          ) {
            headerIndexes.push(i);
            takeNext = false;
          } else if (
            !takeNext &&
            ((header.charAt(i) === ' ' && header.charAt(i + 1) === ' ') ||
              i === header.length - 1)
          ) {
            takeNext = true;
          }
        }
        lines = lines.slice(1);
      }
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line) {
          const rowIndex = rows.push([]) - 1;
          for (let j = 0; j < headerIndexes.length; j++) {
            const startIndex = headerIndexes[j];
            let endIndex = line.indexOf('  ', startIndex);
            if (endIndex === -1 && j > 0) {
              endIndex = line.length;
            }
            rows[rowIndex].push(line.substring(startIndex, endIndex));
          }
        }
      }

      const list: DockerImageList = [];
      for (let i = 0; i < rows.length; i++) {
        const cols = rows[i];
        list.push({
          repository: cols[0],
          tag: cols[1],
          imageId: cols[2],
          created: cols[3],
          size: cols[4],
        });
      }

      return list;
    },
  },
};
