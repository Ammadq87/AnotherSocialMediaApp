import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
// import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Router>
                <div className="flex flex-row h-screen">
                    {/* <SideBar/>             */}
                    <div className='w-full'>
                        <NavBar />
                        <div id='app_container' className="p-8 m-auto flex flex-row gap-8 w-full h-full">

                            <Routes>
                                <Route path='/' element={<Feed />} />
                                <Route path='/auth'>
                                    <Route path='login' element={<Login />} />
                                    <Route path='register' element={<Register />} />
                                </Route>
                                <Route path='/feed' element={<Feed />} />
                                <Route path='/task' />
                                <Route path='/account' element={<Account />} />
                            </Routes>
                        </div>
                    </div>
                    <Toaster position="bottom-right"
                        reverseOrder={false} />
                </div>
            </Router>
        </>
    )
}

export default App