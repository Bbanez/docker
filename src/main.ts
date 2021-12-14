import { ChildProcess } from '@banez/child_process';
import type { ChildProcessOnChunkHelperOutput } from '@banez/child_process/types';
import type { DockerContainerList, Docker as DockerType } from './types';

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
    async logs({ nameOrId, lines }) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(
        `docker logs --tail ${lines} ${nameOrId}`,
        {
          onChunk: ChildProcess.onChunkHelper(exo),
        },
      ).awaiter;
      return exo.out;
    },
    tail({ nameOrId, lines, onChunk }) {
      return ChildProcess.advancedExec(
        `docker logs --tail ${
          typeof lines === 'number' ? lines : 100
        } -f ${nameOrId}`,
        {
          onChunk,
        },
      );
    },
    async start(nameOrId) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker start ${nameOrId}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return exo.out;
    },
    async stop(nameOrId) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker stop ${nameOrId}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return exo.out;
    },
    async remove(nameOrId) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker rm ${nameOrId}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return exo.out;
    },
    async restart(nameOrId) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker restart ${nameOrId}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return exo.out;
    },
    async run(config) {
      const args: string[] = [];
      for (const argName in config.args) {
        const argInfo = config.args[argName];
        if (argInfo instanceof Array) {
          for (let i = 0; i < argInfo.length; i++) {
            const item = argInfo[i];
            args.push(argName, item);
          }
        } else {
          args.push(argName, argInfo);
        }
      }
      if (config.onChunk) {
        await ChildProcess.advancedExec(`docker run ${args.join(' ')}`, {
          onChunk: config.onChunk,
        }).awaiter;
      } else {
        await ChildProcess.spawn('docker', ['run', ...args]);
      }
    },
  },
  image: {
    async pull(name) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker pull ${name}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return exo.out;
    },
    async remove(nameOrId) {
      const exo: ChildProcessOnChunkHelperOutput = {
        err: '',
        out: '',
      };
      await ChildProcess.advancedExec(`docker rmi ${nameOrId}`, {
        onChunk: ChildProcess.onChunkHelper(exo),
      }).awaiter;
      return exo.out;
    },
  },
};
