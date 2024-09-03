import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, FileOutlined, LogoutOutlined } from '@ant-design/icons';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage';
import 'antd/dist/reset.css';
// import ReportPage from './ReportPage'; // Import the ReportPage component
import { useEffect, useState } from 'react';

const { Header, Content } = Layout;

function App() {
  const [userEmail, setUserEmail] = useState('');
 

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'))?.user;

    if (userData && userData.email) {
      // Set the user's email
      setUserEmail(userData.email);

      // Remove the user data from local storage

    }
  }, []);




  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem('user');

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <Router>
      <Layout>
        <Header hidden={!userEmail} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/order']} style={{ flex: 1 }}>
            <Menu.Item key="/order" icon={<HomeOutlined />}>
              <Link to="/order">Order</Link>
            </Menu.Item>
            <Menu.Item key="/report" icon={<FileOutlined />}>
              <Link to="/report">Report</Link>
            </Menu.Item>
          </Menu>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {userEmail && (
              <div style={{ color: '#fff', marginRight: '20px' }}>
                {userEmail}
              </div>
            )}
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ padding: 24, minHeight: '80vh' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/order" element={<OrderPage />} />
              {/* <Route path="/report" element={<ReportPage />} /> Add the route for the report page */}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
