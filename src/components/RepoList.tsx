import { useState, useEffect, useCallback } from "react";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PiForkKnifeFill,
  PiMagnifyingGlass,
  PiStarDuotone,
} from "react-icons/pi";
import { Repository } from "../types/Repository";
import { useReposQuery } from "../services/RepoServices";
import { useDebounce } from "../hooks/useDebounce";
import { Repositories } from "../types/Repositories";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<Repository[]>([]);
  const [fetchRepositories, { loading, error, data, fetchMore }] =
    useReposQuery(username, null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const addItems = useCallback(
    (repositories: Repositories) => {
      setDataSource((prevDataSource) => {
        const { nodes } = repositories;
        const newItems = [...prevDataSource, ...nodes];
        return newItems;
      });

      setNextCursor(() => {
        const { pageInfo } = repositories;
        return pageInfo.hasNextPage ? pageInfo.endCursor : null;
      });
    },
    [setDataSource, setNextCursor]
  );

  useEffect(() => {
    if (data) {
      addItems(data.user.repositories);
    }
  }, [data, addItems]);

  const onLoadMore = async () => {
    const resp = await fetchMore({
      variables: { after: nextCursor },
    });
    addItems(resp.data.user.repositories);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFetchRepositories = () => {
    fetchRepositories({
      variables: {
        username,
      },
    });
  };

  const filteredRepositories = dataSource.filter((repo: Repository) =>
    repo.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div>
      <h3>Available Repository</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Error has occurred ...</p>
      ) : (
        <div>
          <Input
            placeholder="GitHub Username"
            value={username}
            onChange={handleUsernameChange}
            style={{ marginBottom: 16 }}
          />
          <Input
            placeholder="Search repositories"
            prefix={<PiMagnifyingGlass />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            onClick={handleFetchRepositories}
            disabled={!username}
          >
            Fetch Repositories
          </Button>
          <Table
            columns={columns}
            dataSource={filteredRepositories}
            loading={loading}
            pagination={false}
          />
          {nextCursor ? (
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
