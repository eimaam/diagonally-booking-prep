import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AppLayout } from './layout/AppLayout';
import { ExpertsPage } from './pages/experts';
import { MyBookingsPage } from './pages/bookings';

const App = () => (
  <BrowserRouter>
    <DataProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ExpertsPage />} />
          <Route path="bookings" element={<MyBookingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DataProvider>
  </BrowserRouter>
);

export default App;
