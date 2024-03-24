
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './components/accounts/Login';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/createpost/CreatePost';
import DetailView from './components/details/DetailView'


const PrivateRoute = ({ isAuthenticated, ...props }) => {

  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
  : <Navigate replace to='/login' />
}


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    
      <DataProvider>
        <BrowserRouter>
        
        <div >
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home/>} />
            </Route>

            <Route path='/createpost' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/createpost' element={<CreatePost/>} />
            </Route>


            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView/>} />
            </Route>

          </Routes>
        </div>
        </BrowserRouter>
      </DataProvider>
    
  );
}

export default App;
