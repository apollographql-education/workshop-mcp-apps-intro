import Layout from './layout/Layout';
import { Fallback, HomePage, Location } from './pages';
import { useToolInfo } from '@apollo/client-ai-apps/react';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  const toolInfo = useToolInfo();

  function getInitialRoute() {
    switch (toolInfo?.toolName) {
      case 'GetLatestReviewsAndLocations':
        return '/';
      case 'GetLocationDetails':
        return `/location/${toolInfo.toolInput.locationId}`;
      case 'SubmitReview': {
        const id = toolInfo.toolInput.locationReview.locationId;
        return id ? `/location/${id}` : '/';
      }
      default: {
        // @ts-expect-error Fallthrough case for `toolInfo` which should be
        // `never`. If expect-error is reported as unused, it means there is a
        // missing case above.
        console.warn(`Unable to match route for tool '${toolInfo?.toolName}`);
        return '/';
      }
    }
  }

  const [initialRoute] = useState(getInitialRoute);

  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location/:id" element={<Location />} />
          <Route element={<Fallback />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}
