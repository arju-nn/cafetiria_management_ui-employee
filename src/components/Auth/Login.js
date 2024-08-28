// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import AuthService from '../../services/userAuthServices';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await AuthService.login(values);
            if (response.data.token) {
                // Use response.data.user directly
                console.log('response.data: ', response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate('/order');
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const navigate = useNavigate()


    return (
        // <Form onFinish={onFinish}>
        //     <Form.Item name="email" rules={[{ required: true, message: 'Please input your Employee ID!' }]}>
        //         <Input placeholder="Employee ID" />
        //     </Form.Item>
        //     <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        //         <Input.Password placeholder="Password" />
        //     </Form.Item>
        //     <Form.Item>
        //         <Button type="primary" htmlType="submit" loading={loading}>
        //             Login
        //         </Button>
        //     </Form.Item>
        // </Form>
        <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Login</h2>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Company Mail id!' }]}
                    style={{ marginBottom: '15px' }}
                >
                    <Input placeholder="CCS Email" style={{ padding: '10px', borderRadius: '5px' }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    style={{ marginBottom: '15px' }}
                >
                    <Input.Password placeholder="Password" style={{ padding: '10px', borderRadius: '5px' }} />
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', padding: '2px', borderRadius: '5px' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
