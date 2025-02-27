import { FC } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CollectionsPage } from './modules/collections';

const App: FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path='/collections' element={<CollectionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
