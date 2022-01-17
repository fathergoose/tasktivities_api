import './App.css';
import Workspace from './pages/Workspace';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <div className='App'>
      <header className='App-header' />
      <ApolloProvider client={client}>
        <Workspace />
      </ApolloProvider>
    </div>
  );
}

export default App;
