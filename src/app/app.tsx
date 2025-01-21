import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter, ErrorRouteComponent, ErrorComponent } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import './index.css';
import StatusProvider from './context/StatusContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InGameProvider from './context/InGameContext';
import StoreProvider from './context/StoreContext';

const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error('No app element found');
}

const root = createRoot(appElement);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StatusProvider>
        <StoreProvider>
          <InGameProvider>
            <RouterProvider router={router} />
          </InGameProvider>
        </StoreProvider>
      </StatusProvider>
    </QueryClientProvider>
  </StrictMode>
);