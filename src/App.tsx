import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/client";
import { RepoList } from "./components/RepoList";

function App() {
  return (
    <ApolloProvider client={client}>
      <RepoList />
    </ApolloProvider>
  );
}

export default App;
