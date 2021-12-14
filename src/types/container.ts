/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DockerContainerInfo {
  Id: string;
  Created: string;
  Path: string;
  Args: string[];
  State: {
    Status: string;
    Running: boolean;
    Paused: boolean;
    Restarting: boolean;
    OOMKilled: boolean;
    Dead: boolean;
    Pid: number;
    ExitCode: number;
    Error: string;
    StartedAt: string;
    FinishedAt: string;
  };
  Image: string;
  ResolvConfPath: string;
  HostnamePath: string;
  HostsPath: string;
  LogPath: string;
  Name: string;
  RestartCount: number;
  Driver: string;
  Platform: string;
  MountLabel: string;
  ProcessLabel: string;
  AppArmorProfile: string;
  ExecIDs: string | null;
  HostConfig: {
    Binds: string[];
    ContainerIDFile: string;
    LogConfig: {
      Type: string;
    };
    NetworkMode: string;
    PortBindings: {
      [name: string]: Array<{
        HostIp: string;
        HostPort: string;
      }>;
    };
    RestartPolicy: {
      Name: string;
      MaximumRetryCount: number;
    };
    AutoRemove: boolean;
    VolumeDriver: string;
    VolumesFrom: string | null;
    CapAdd: string | null;
    CapDrop: string | null;
    CgroupnsMode: string;
    Dns: any[];
    DnsOptions: any[];
    DnsSearch: any[];
    ExtraHosts: string | null;
    GroupAdd: string | null;
    IpcMode: string;
    Cgroup: string;
    Links: string | null;
    OomScoreAdj: number;
    PidMode: string;
    Privileged: boolean;
    PublishAllPorts: boolean;
    ReadonlyRootfs: boolean;
    SecurityOpt: string | null;
    UTSMode: string;
    UsernsMode: string;
    ShmSize: number;
    Runtime: string;
    ConsoleSize: number[];
    Isolation: string;
    CpuShares: number;
    Memory: number;
    NanoCpus: number;
    CgroupParent: string;
    BlkioWeight: number;
    BlkioWeightDevice: any[];
    BlkioDeviceReadBps: string | null;
    BlkioDeviceWriteBps: string | null;
    BlkioDeviceReadIOps: string | null;
    BlkioDeviceWriteIOps: string | null;
    CpuPeriod: number;
    CpuQuota: number;
    CpuRealtimePeriod: number;
    CpuRealtimeRuntime: number;
    CpusetCpus: string;
    CpusetMems: string;
    Devices: any[];
    DeviceCgroupRules: string | null;
    DeviceRequests: string | null;
    KernelMemory: number;
    KernelMemoryTCP: number;
    MemoryReservation: number;
    MemorySwap: number;
    MemorySwappiness: string | null;
    OomKillDisable: boolean;
    PidsLimit: string | null;
    Ulimits: string | null;
    CpuCount: number;
    CpuPercent: number;
    IOMaximumIOps: number;
    IOMaximumBandwidth: number;
    MaskedPaths: string[];
    ReadonlyPaths: string[];
  };
  GraphDriver: {
    Data: {
      LowerDir: string;
      MergedDir: string;
      UpperDir: string;
      WorkDir: string;
    };
    Name: string;
  };
  Mounts: Array<{
    Type: string;
    Name: string;
    Source: string;
    Destination: string;
    Driver: string;
    Mode: string;
    RW: boolean;
    Propagation: string;
  }>;
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
    Image: string[];
    Volumes: {
      [name: string]: any;
    };
    WorkingDir: string;
    Entrypoint: string[];
    OnBuild: string | null;
    Labels: any;
  };
  NetworkSettings: {
    Bridge: string;
    SandboxID: string;
    HairpinMode: boolean;
    LinkLocalIPv6Address: string;
    LinkLocalIPv6PrefixLen: number;
    Ports: any;
    SandboxKey: string;
    SecondaryIPAddresses: string | null;
    SecondaryIPv6Addresses: string | null;
    EndpointID: string;
    Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    MacAddress: string;
    Networks: {
      [name: string]: {
        IPAMConfig: string | null;
        Links: string | null;
        Aliases: string[];
        NetworkID: string;
        EndpointID: string;
        Gateway: string;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        MacAddress: string;
        DriverOpts: string | null;
      };
    };
  };
}

export interface DockerContainerListItem {
  containerId: string;
  image: string;
  command: string;
  created: string;
  status: string;
  ports: string;
  names: string;
}

export type DockerContainerList = DockerContainerListItem[];

export interface DockerContainerRunConfig {
  /**
   * Add a custom host-to-IP mapping (host:ip)
   */
  addHost?: string[];
  /**
   * Attach to STDIN, STDOUT or STDERR
   */
  attach?: string[];
  cpu?: {
    /**
     * Limit CPU CFS (Completely Fair Scheduler) period
     */
    period?: number;
    /**
     * Limit CPU CFS (Completely Fair Scheduler) quota
     */
    quota?: number;
    rt?: {
      /**
       * Limit CPU real-time period in microseconds
       */
      period?: number;
      /**
       * Limit CPU real-time runtime in microseconds
       */
      runtime?: number;
    };
    /**
     * CPU shares (relative weight)
     */
    shares?: number;
    /**
     * Number of CPUs
     */
    number?: number;
  };
  /**
   * CPUs in which to allow execution (0-3, 0,1)
   */
  cpuSetCpus?: string;
  /**
   * MEMs in which to allow execution (0-3, 0,1)
   */
  cpuSetMems?: string;
  /**
   * Run container in background and print container ID
   */
  detach?: boolean;
  /**
   * Override the key sequence for detaching a container
   */
  detachKeys?: string;
  device?: {
    /**
     * Add a host device to the container
     */
    list?: string[];
    /**
     * Add a rule to the cgroup allowed devices list
     */
    cgroupRule?: string[];
    /**
     * Limit read rate (bytes per second) from a device (default [])
     */
    readBPS?: string[];
    /**
     * Limit read rate (IO per second) from a device (default [])
     */
    readIOPS?: string[];
    /**
     * Limit write rate (bytes per second) to a device (default [])
     */
    writeBPS?: string[];
    /**
     * Limit write rate (IO per second) to a device (default [])
     */
    writeIOPS?: string[];
  };
  /**
   * Skip image verification (default true)
   */
  disableContentTrust?: boolean;
  dns?: {
    /**
     * Set custom DNS servers
     */
    list?: string;
    /**
     * Set DNS options
     */
    option?: string[];
    /**
     * Set custom DNS search domains
     */
    search?: string[];
  };
  /**
   * Container NIS domain name
   */
  domainName?: string;
  /**
   * Overwrite the default ENTRYPOINT of the image
   */
  entryPoint?: string;
  /**
   * Set environment variables
   */
  env?: {
    [name: string]: string;
  };
  /**
   * Read in a file of environment variables
   */
  envFile?: string;
  /**
   * Expose a port or a range of ports
   */
  expose?: string[];
  /**
   * Container host name
   */
  hostname?: string;
  /**
   * Run an init inside the container that forwards signals and reaps processes
   */
  init?: boolean;
  /**
   * Keep STDIN open even if not attached
   */
  interactive?: boolean;
  /**
   * IPv4 address (e.g., 172.30.100.104)
   */
  ip?: string;
  /**
   * IPv6 address (e.g., 2001:db8::33)
   */
  ip6?: string;
  /**
   * IPC mode to use
   */
  ipc?: string;
  /**
   * Container isolation technology
   */
  isolation?: string;
  /**
   * Kernel memory limit
   */
  kernelMemory?: number;
  /**
   * Set meta data on a container
   */
  label?: string[];
  link?: {
    /**
     * Add link to another container
     */
    list?: string[];
  };
  memory?: {
    /**
     * Memory limit
     */
    limit?: number;
    /**
     * Memory soft limit
     */
    reservation?: number;
    /**
     * Swap limit equal to memory plus swap: '-1' to enable unlimited swap
     */
    swap?: number;
    /**
     * Tune container memory swappiness (0 to 100) (default -1)
     */
    swappiness?: number;
  };
  /**
   * Attach a filesystem mount to the container
   */
  mount?: string;
  /**
   * Assign a name to the container
   */
  name?: string;
  network?: {
    name?: string;
    alias?: string[];
  };
  /**
   * Publish a container's port(s) to the host
   */
  publish?: string[];
  /**
   * Publish all exposed ports to random ports
   */
  publishAll?: boolean;
  /**
   * Pull image before running ("always"|"missing"|"never") (default "missing")
   */
  pull?: 'always' | 'missing' | 'never';
  /**
   * Mount the container's root filesystem as read only
   */
  readOnly?: boolean;
  /**
   * Username or UID (format: <name|uid>[:<group|gid>])
   */
  user?: string;
  /**
   * User namespace to use
   */
  userns?: string;
  /**
   * UTS namespace to use
   */
  uts?: string;
  volume?: {
    /**
     * Bind mount a volume
     */
    list?: string[];
    /**
     * Optional volume driver for the container
     */
    driver?: string;
    /**
     * Mount volumes from the specified container(s)
     */
    from?: string[];
  };
  /**
   * Working directory inside the container
   */
  workdir?: string;
}
