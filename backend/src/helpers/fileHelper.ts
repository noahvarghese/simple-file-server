import fs from "fs";

export const createDirIfNotExists = (path: string): void => {
  const pathExists = fs.existsSync(path);

  if (pathExists) {
    const stats = fs.statSync(path);

    if (!stats.isDirectory()) {
      throw new Error(`Error: ${path} is not a directory`);
    }

    return;
  }

  fs.mkdirSync(path);
};
