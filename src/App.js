import "./App.css";
import {Container, Row} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Footer from "./components/index/Footer/Footer";
import SignIn from "./components/index/form/SignIn";
import SignUp from "./components/index/form/SignUp";
import Index from "./components/index/index/Index";
import ForgotPassword from "./components/index/form/ForgotPassword";
import News from "./components/index/news/News";
import AppNavigation from "./components/app/navigation/AppNavigation";
import Navigation from "./components/index/navigation/Navigation";
import PrivateRoute from "./components/other/PrivateRoute";
import Error404 from "./components/other/Error404";
import {useAuth} from "./components/other/AuthProvider";
import Search from "./components/app/search/Search";
import PrivateProfile from "./components/app/profile/PrivateProfile";
import PublicProfile from "./components/app/profile/PublicProfile";
import MissionStatistics from "./components/app/profile/misison/MissionStatistics";
import Chat from "./components/app/messenger/Chat";
import Users from "./components/app/users/Users";
import Admin from "./components/app/admin/Admin";
import AdminRoute from "./components/other/AdminRoute";
import NormalRoute from "./components/other/NormalRoute";
import AdminNavigation from "./components/app/admin/navigation/AdminNavigation";
import Account from "./components/app/admin/account/Account";
import Cookies from "universal-cookie";
import {useEffect} from "react";
import AOS from "aos";

export default function App() {

  const cookies = new Cookies();
  const {auth} = useAuth();

  let navigationBar;

  if (auth === "USER") navigationBar = <AppNavigation/>;
  else if (auth === "ADMIN") navigationBar = <AdminNavigation/>;
  else {
    cookies.set("idUser", "", {path: '/'});
    cookies.set("role", "", {path: '/'});
    navigationBar = <Navigation/>;
  }

  return (
      <BrowserRouter forceRefresh={true}>
        {navigationBar}
        <Container>
          <Row>
            <Routes>
              <Route exact path={"/"} element={<NormalRoute><Index/></NormalRoute>}/>
              <Route exact path={"/news"} element={<NormalRoute><News/></NormalRoute>}/>
              <Route exact path={"/signin"} element={<NormalRoute><SignIn/></NormalRoute>}/>
              <Route exact path={"/signup"} element={<NormalRoute><SignUp/></NormalRoute>}/>
              <Route exact path={"/resetpassword"} element={<NormalRoute><ForgotPassword/></NormalRoute>}/>

              <Route exact path={"/profile"} element={<PrivateRoute><PrivateProfile/></PrivateRoute>}/>
              <Route exact path={"/:username"} element={<PrivateRoute><PublicProfile/></PrivateRoute>}/>

              <Route exact path={"level/:mapName"} element={<PrivateRoute><MissionStatistics/></PrivateRoute>}/>
              <Route exact path={":username/level/:mapName"} element={<PrivateRoute><MissionStatistics/></PrivateRoute>}/>

              <Route exact path={"/search/"} element={<PrivateRoute><Search/></PrivateRoute>}/>
              <Route exact path={"/search/:username"} element={<PrivateRoute><Search/></PrivateRoute>}/>

              <Route exact path={"/messenger"} element={<PrivateRoute><Chat/></PrivateRoute>}/>
              <Route exact path={"/messenger/:username"} element={<PrivateRoute><Chat/></PrivateRoute>}/>

              <Route exact path={"/users"} element={<PrivateRoute><Users/></PrivateRoute>}/>
              <Route exact path={":username/users"} element={<PrivateRoute><Users/></PrivateRoute>}/>

              <Route exact path={"/changepassword"} element={<PrivateRoute><Account/></PrivateRoute>}/>

              <Route exact path={"/admin"} element={<AdminRoute><Admin/></AdminRoute>}/>

              <Route path={"*"} element={<Error404/>}/>
            </Routes>
          </Row>
        </Container>
      </BrowserRouter>
  );
}