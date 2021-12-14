/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DockerImageInfo {
  Id: string;
  RepoTags: string[];
  RepoDigests: string[];
  Parent: string;
  Comment: string;
  Created: string;
  Container: string;
  ContainerConfig: {
    Hostname: string;
    Domainname: string;
    User: string;
    AttachStdin: boolean;
    AttachStdout: boolean;
    AttachStderr: boolean;
    ExposedPorts: {
      [name: string]: any;
    };
    Tty: boolean;
    OpenStdin: boolean;
    StdinOnce: boolean;
    Env: string[];
    Cmd: string[];
    Image: string;
    Volumes: {
      [name: string]: any;
    };
    WorkingDir: string;
    Entrypoint: string[];
    OnBuild: string | null;
    Labels: any;
  };
  DockerVersion: string;
  Author: string;
  Config: {
    Hostname: string;
    Domainname: string;
    User: string;
    AttachStdin: boolean;
    AttachStdout: boolean;
    AttachStderr: boolean;
    ExposedPorts: {
      [name: string]: any;
    };
    Tty: boolean;
    OpenStdin: boolean;
    StdinOnce: boolean;
    Env: string[];
    Cmd: string[];
    Image: string;
    Volumes: {
      [name: string]: any;
    };
    WorkingDir: string;
    Entrypoint: string[];
    OnBuild: string | null;
    Labels: string | null;
  };
  Architecture: string;
  Os: string;
  Size: number;
  VirtualSize: number;
  GraphDriver: {
    Data: {
      LowerDir: string;
      MergedDir: string;
      UpperDir: string;
      WorkDir: string;
    };
    Name: string;
  };
  RootFS: {
    Type: string;
    Layers: string[];
  };
  Metadata: {
    LastTagTime: string;
  };
}

export interface DockerImageListItem {
  repository: string;
  tag: string;
  imageId: string;
  created: string;
  size: string;
}

export type DockerImageList = DockerImageListItem[];
