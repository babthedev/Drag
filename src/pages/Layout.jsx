import { Outlet } from "react-router-dom"
import SideNav from "../SideNav"
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';

const Layout = ( ) => {
  // const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);
  return (
    <div className={`${isDarkMode ? "bg-black" : "bg-white"}`}>
        <SideNav/>
        <Outlet/>
    </div>
  )
}

export default Layout