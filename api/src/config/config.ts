export const PORT = 8080;
export type EnvironmentSet = {
  [index: string]: Environment;
};

export type Environment = {
  serverURL: string;
  dbString: string;
};

export const environment: EnvironmentSet = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/tasktivities',
  },
  production: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/tasktivities-prod',
  },
};
