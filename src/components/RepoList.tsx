import { useMemo, useState, useEffect } from "react";
import { Input, Pagination, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PiForkKnifeFill, PiStarDuotone } from "react-icons/pi";
import { Repository } from "../types/Repository";
import { useReposQuery } from "../services/RepoServices";
import { useDebounce } from "../hooks/useDebounce";

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
  const [currentCursor, setCurrentCursor] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { loading, error, data, fetchMore } = useReposQuery(currentCursor);
  const debouncedSearch = useDebounce(searchValue, 500);


  const originalRepositories = useMemo(() => {
    if (loading || error) {
      return [];
    }

    if (data) {
      if (data.repositories) {
        setTotalCount(data.repositories.totalCount);
        if (data.repositories.pageInfo?.hasNextPage) setCurrentCursor(data.repositories.pageInfo.endCursor);
      }
    }
    return data?.repositories?.nodes || [];
  }, [loading, error, data]);

  const filteredRepositories = useMemo(() => {
    if (!originalRepositories.length) return [];

    if (searchValue === "" || searchValue.trim() === "") {
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

  const onChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    fetchMore({variables: {after: currentCursor}})
  }, [currentCursor, debouncedSearch, fetchMore])

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
        <Pagination defaultCurrent={1} total={totalCount} />
      </div>
      )}
    </div>
  );;
};
