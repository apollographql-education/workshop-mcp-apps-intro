import Layout from './layout/Layout';
import { Fallback, HomePage, Location } from './pages';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location/:id" element={<Location />} />
          <Route element={<Fallback />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
