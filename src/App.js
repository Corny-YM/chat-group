// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/AuthProvider';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ChatRoom />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
