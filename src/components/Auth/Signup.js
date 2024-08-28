// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import AuthService from '../../services/userAuthServices';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate= useNavigate()
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await AuthService.signup(values);
            navigate('/login')
            console.log(response.data);
          
        } catch (error) {
            console.error(error);
      
        } finally {
            setLoading(false);
        }
    };

    return (
        // <Form onFinish={onFinish}>
        //     <Form.Item name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
        //         <Input placeholder="Name" />
        //     </Form.Item>
        //     <Form.Item name="email" rules={[{ required: true, message: 'Please input your Employee ID!' }]}>
        //         <Input placeholder="Email Id" />
        //     </Form.Item>
        //     <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        //         <Input.Password placeholder="Password" />
        //     </Form.Item>
        //     <Form.Item>
        //         <Button type="primary" htmlType="submit" loading={loading}>
        //             Signup
        //         </Button>
        //     </Form.Item>
        // </Form>
        <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Registration</h2>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                    style={{ marginBottom: '15px' }}
                >
                    <Input placeholder="Name" style={{ padding: '10px', borderRadius: '5px' }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Employee ID!' }]}
                    style={{ marginBottom: '15px' }}
                >
                    <Input placeholder="Email Id" style={{ padding: '10px', borderRadius: '5px' }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    style={{ marginBottom: '15px' }}
                >
                    <Input.Password placeholder="Password" style={{ padding: '10px', borderRadius: '5px' }} />
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signup;
