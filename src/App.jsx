import Layout from './layout/Layout';
import { Router } from './Router/Router';

import './styles/style.scss';

function App() {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
