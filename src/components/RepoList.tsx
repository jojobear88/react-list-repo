import { Table } from "antd";
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
    title: "Projects Resource Path",
    dataIndex: "projectsUrl",
    key: "projectsUrl",
    align: "center",
    render: (_, { projectsUrl }) => (
      <a href={projectsUrl} target="blank">
        {projectsUrl}
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
  console.log('data', data)
  return (
    <div>
    <h3>Available Repository</h3>
      { loading ? (
      <p>Loading ...</p>
    ) : error ? (
      <p>Error has occurred ...</p>
    ):(<Table columns={columns} dataSource={data} />)}
    </div>
  );;
};
