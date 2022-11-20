import React from "react";
import { Link } from "react-router-dom";
import { UploadFile } from "../components/UploadFile";
import { buildUrl } from "../utils/apiUtils";

export const Upload = (): JSX.Element => {
  const onSubmit = (...args: any): void => console.log(args);

  return (
    <div>
      <h1>Upload</h1>
      <form
        method="POST"
        action={buildUrl("")}
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <UploadFile />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};
