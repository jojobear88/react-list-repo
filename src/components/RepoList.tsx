import { BaseSyntheticEvent, useMemo, useState } from "react";
import { Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PiForkKnifeFill, PiStarDuotone } from "react-icons/pi";
import { Repository } from "../types/Repository";
import { useReposQuery } from "../services/RepoServices";

const SEARCH_KEYS = ["name", "description", "url", "stargazerCount", "forkCount", "description"];

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
  const { loading, error, data } = useReposQuery();

  const [searchValue, setSearchValue] = useState("");

  const originalRepositories = useMemo(() => {
    if (loading || error) {
      return [];
    }
    return data?.user?.repositories?.nodes || [];
  }, [loading, error, data]);

  const filteredRepositories = useMemo(() => {
    if (!originalRepositories.length) return [];

    if (!searchValue || searchValue === "" || searchValue.trim() === "") {
      return originalRepositories;
    }
    const trimLowerCaseSearchValue = searchValue.toLowerCase().trim();
    const filteredList = originalRepositories.filter((record: Repository) =>
      SEARCH_KEYS.some((recordKey) =>
        record[recordKey as keyof Repository]?.toString().toLowerCase().includes(trimLowerCaseSearchValue)
      )
    );
    return filteredList;
  }, [searchValue, originalRepositories]);

  const onChangeSearch = ({ target: { value } }: BaseSyntheticEvent) => {
    setSearchValue(value);
  };

  return (
    <div>
      <h3>Available Repository</h3>
        { loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Error has occurred ...</p>
      ):(
        <div>
        <Input onChange={onChangeSearch} className="search-field" size="large" placeholder="Search repository" />
        <Table columns={columns} dataSource={filteredRepositories} loading={loading} />
      </div>
      )}
    </div>
  );;
};
