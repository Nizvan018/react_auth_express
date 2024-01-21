import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

function App() {
	return (
		<AuthProvider>
			<TaskProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />

						<Route element={<ProtectedRoute />}>
							<Route path='/tasks' element={<TasksPage />} />
							<Route path='/add-task' element={<TaskFormPage />} />
							<Route path='/tasks/:id' element={<TaskFormPage />} />
							<Route path='/profile' element={<Profile />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</TaskProvider>
		</AuthProvider>
	)
}

export default App