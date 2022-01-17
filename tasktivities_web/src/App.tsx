import './App.css';
import Workspace from './pages/Workspace';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styled from 'styled-components';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const AppWrapper = styled.div`
  padding-left: 10em;
  padding-right: 10em;
  min-height: 100%;
  text-align: center;
}
`;
function App() {
  return (
    <AppWrapper>
      <header className='App-header' />
      <ApolloProvider client={client}>
        <Workspace />
      </ApolloProvider>
    </AppWrapper>
  );
}

export default App;
