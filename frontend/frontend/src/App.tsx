import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import Layout from './components/Layout'; // <-- Importar el Layout
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="exercise/:id" element={<ExerciseDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;