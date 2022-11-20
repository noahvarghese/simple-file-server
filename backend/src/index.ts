import express, { Request, Response } from "express";
import fs from "fs";
import { createDirIfNotExists } from "./helpers/fileHelper";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import cors from "cors";

const outputDir = path.join(__dirname, "../output");
const app = express();
const port = 8080;

const buildFilePath = (fileName: string): string =>
  path.join(outputDir, fileName);

createDirIfNotExists(outputDir);

app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Allow usage of static files outside the src directory
app.use(express.static(path.join(__dirname, outputDir)));
app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response): void => {
  const files = fs.readdirSync(outputDir);

  res.status(200);
  res.json(files);
});

app.get("/download/:file", (req: Request, res: Response): void => {
  console.log("Downloading file");

  const { file } = req.params;
  const filePath = buildFilePath(file);
  const pathExists = fs.existsSync(filePath);

  if (!pathExists) {
    res.sendStatus(404);
    return;
  }

  const isDirectory = fs.statSync(filePath).isDirectory();

  if (isDirectory) {
    res.sendStatus(403);
    return;
  }

  res.status(200);
  fs.createReadStream(filePath).pipe(res);
});

app.post("/", (req: Request, res: Response): void => {
  console.log("Creating file: " + Object.keys(req.files || {}));

  if (!req.files) {
    res.sendStatus(400);
    return;
  }

  const file: UploadedFile = Array.isArray(req.files)
    ? req.files[0]
    : req.files.file;

  if (!file || !Object.keys(file).length) {
    res.sendStatus(400);
    return;
  }

  const filePath = buildFilePath(file.name);
  const pathExists = fs.existsSync(filePath);

  if (pathExists) {
    res.sendStatus(403);
    return;
  }

  file.mv(filePath);

  res.sendStatus(201);
});

app.listen(port, () => {
  console.log("Server started");
});
