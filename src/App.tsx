import { FC } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CollectionDetails, CollectionsPage } from './modules/collections';
import { Layout } from './shared/components/Layout';

export const App: FC = () => {
  return (
    <Router
      basename='/magic'
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Layout>
        <Routes>
          <Route path='/' element={<CollectionsPage />} />
          <Route path='/collection/:id' element={<CollectionDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};
