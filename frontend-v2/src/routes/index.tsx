import { FC } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import About from '../pages/About';
import Profile2 from '../pages/Profile2';
import Home from '../pages/Home';

const MyRoutes: FC<RouteProps> = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/profile2' element={<Profile2 />} />
  </Routes>
);

export default MyRoutes;
