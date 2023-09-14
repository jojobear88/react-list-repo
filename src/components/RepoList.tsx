import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PiForkKnifeFill, PiStarDuotone } from "react-icons/pi";
import { Repository } from "../types/Repository";
import { useReposQuery } from "../services/RepoServices";

const columns: ColumnsType<Repository> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (_, { name, url }) => (
      <a href={url} target="blank">
        {name}
      </a>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    render: (text) => <>{text}</>,
  },
  {
    title: "Stars",
    dataIndex: "stars",
    key: "stars",
    align: "center",
    render: (_, { stargazerCount }) => (
      <>
        <PiStarDuotone
          color="#FF9529"
          style={{ marginRight: "8px" }}
          size={15}
        />{" "}
        {stargazerCount || 0}
      </>
    ),
  },
  {
    title: "Forks",
    dataIndex: "forks",
    key: "forks",
    align: "center",
    render: (_, { forkCount }) => (
      <>
        <PiForkKnifeFill
          color="#FF9529"
          style={{ marginRight: "8px" }}
          size={18}
        />
        {forkCount}
      </>
    ),
  },
];

export const RepoList = () => {
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [dataSource, setDataSource] = useState<Repository[]>([]);
  const { loading, error, data, fetchMore } = useReposQuery(null);

  useEffect(() => {
    if (loading || error) {
      return;
    }

    if (data) {
      addItems(data.user.repositories);
    }
  }, [loading, error, data]);

  const addItems = (repositories: any) => {
    const { nodes, pageInfo } = repositories;
    const newItems = [...dataSource, ...nodes];
    setDataSource(newItems);
    if (pageInfo.hasNextPage) {
      setNextCursor(pageInfo.endCursor);
    }
    setHasNextPage(pageInfo.hasNextPage);
  };

  const onLoadMore = async () => {
    const resp = await fetchMore({
      variables: { after: nextCursor },
    });
    addItems(resp.data.user.repositories);
  };

  return (
    <div>
      <h3>Available Repository</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Error has occurred ...</p>
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
          />
          {hasNextPage ? (
            <Button block onClick={() => onLoadMore()}>
              More
            </Button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
