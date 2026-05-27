export type ShowcaseContext = {
  framework: string;
  runner?: "node" | "bun";
  skipHttpSmoke?: boolean;
  attach?: (name: string, body: string | Buffer, contentType?: string) => Promise<void>;
  browser?: {
    goto: (url: string) => Promise<void>;
    getTitle: () => Promise<string>;
  };
};

export type RuntimeHints = {
  attempt?: number;
};
