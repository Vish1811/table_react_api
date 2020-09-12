import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";
import "./App.css";

const Genres = ({ values }) => {
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Practice Questions Here",
        columns: [
          {
            Header: "S.NO.",
            accessor: "show.name"
          },
          {
            Header: "Q.NAME",
            accessor: "show.type"
          },
          {
            Header: "Q.LINK",
            accessor: "show.language"
          },
          {
            Header: "TAGS",
            accessor: "show.genres",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
