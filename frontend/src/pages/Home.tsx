import React from "react";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/apiUtils";

export const Home = (): JSX.Element => {
  const [data, setData] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch(buildUrl(""))
      .then((res) => {
        return res.json();
      })
      .then(setData);
  }, []);

  const links = data.map((file) => (
    <div>
      <a
        key={file}
        href={buildUrl(`download/${file}`)}
        target={"_self"}
        download
      >
        {file}
      </a>
    </div>
  ));

  return (
    <div>
      <div>
        <h1>Home</h1>
        {links}
      </div>
      <Link to={"/upload"}>
        <button>Upload</button>
      </Link>
    </div>
  );
};
