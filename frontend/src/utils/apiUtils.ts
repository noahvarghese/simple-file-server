export const port = 8080;
export const host = "http://10.0.0.103";

export const url = `${host}:${port}`;

export const buildUrl = (path: string): string => `${url}/${path}`;
