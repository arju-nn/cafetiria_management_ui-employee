import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Card, Row, Col } from 'antd';
import axios from 'axios';

const OrderForm = ({ onOrderSubmit }) => {
    const [form] = Form.useForm();
    const [items, setItems] = useState([]);

    // Fetch items data from API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    // Handle form submission
    const onFinish = (values) => {

        console.log('JSON.parse(localStorage.getItem("user")): ', JSON.parse(localStorage.getItem("user")));
        // Create payload
        const payload = {
            userId: JSON.parse(localStorage.getItem("user"))?.user?.id,
            items: items.map(item => ({
                itemId: item.id, // Adjust if item id is named differently
                quantity: values[item.name] || 0,
                price: item.price,
                name: item.name
            })).filter(item => item.quantity > 0) // Filter out items with zero quantity
        };

        console.log('values: ', values);
        console.log('payload: ', payload);

        // Call the parent function with payload
        onOrderSubmit(payload);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Order Beverages</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                {items.map(item => (
                    <Card key={item.id} style={{ marginBottom: '20px' }}>
                        <Row gutter={16} align="middle">
                            <Col span={12}>
                                <Form.Item
                                    name={item.name}
                                    label={item.name.charAt(0).toUpperCase() + item.name.slice(1)} // Capitalize first letter of item name
                                    initialValue={0}
                                    style={{ marginBottom: '0' }}
                                >
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <Button type="primary" onClick={() => form.setFieldsValue({ [item.name]: form.getFieldValue(item.name) + 1 })}>
                                    +
                                </Button>
                                <Button type="default" onClick={() => form.setFieldsValue({ [item.name]: Math.max(0, form.getFieldValue(item.name) - 1) })} style={{ marginLeft: '10px' }}>
                                    -
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                ))}
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                        Order
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default OrderForm;
