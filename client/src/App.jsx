import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './Layout';
import Room from './pages/Room';
import NotFound from './pages/404';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="room/:id" element={<Room />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App({ routes }) {
    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    );
}

export default App;
