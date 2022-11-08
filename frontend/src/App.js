import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ArticleScreen from './screens/ArticleScreen'
import LoginScreen from './screens/auth/LoginScreen'

import ProfileScreen from './screens/auth/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ArticleListScreen from './screens/ArticleListScreen'
import ArticleEditScreen from './screens/ArticleEditScreen'


import DashboardScreen from './screens/DashboardScreen'
import RegisterScreen2 from './screens/auth/RegisterScreen2'
import ResetPassword from './screens/auth/ResetPassword';
import CategoryScreen from './screens/CategoryScreen';
import EmailVerifyScreen from './screens/auth/EmailVerifyScreen'
import ConfirmPassword from './screens/auth/ConfirmPassword'
import HomeCategoryScreen from './screens/HomeCategoryScree'



function App() {
  return (
    <Router>
       <Container className="shadow">
      <Header />
      <br></br>


      <main className="py-3 mt-5 ">
       
          <Route path='/' component={HomeScreen} exact />
          <Route path='/cat_home/:id' component={HomeCategoryScreen}  />
          <Route path='/login' component={LoginScreen} />
          <Route path='/api/user/password/verify/:id/:token' component={ConfirmPassword} />
        <Route path='/register2' component={RegisterScreen2} />
        <Route path='/api/user/verify/:id/:token' component={EmailVerifyScreen} />
        <Route path='/reset_password' component={ResetPassword} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/article/:id' component={ArticleScreen} />
      

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/articlelist' component={ArticleListScreen} />
          <Route path='/admin/article/:id/edit' component={ArticleEditScreen} />
          
          <Route path='/dashboard' component={DashboardScreen} />
        <Route path="/category" component={CategoryScreen} />
      
          
      
      </main>
      <Footer />
      </Container>
    </Router>
  );
}

export default App;
