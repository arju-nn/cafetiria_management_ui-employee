import React, { useState } from 'react';
import { Card, Row, Col, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // Ensure this hook is imported for navigation
import OrderForm from '../components/Order/OrderForm';
import OrderSummary from '../components/Order/OrderSummary';
import OrderService from '../services/orderServices';

const OrderPage = () => {
    const [order, setOrder] = useState({ items: [] });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate hook

    const logOut = () => {
        localStorage.removeItem("user");
        message.success('Logged out successfully');
        navigate("/login");
    };

    const handleOrderSubmit = async (newOrder) => {
        const total = OrderService.calculateTotal(newOrder.items);
        setOrder({ items: newOrder.items });
        const transformedObject = {
            "userId": newOrder.userId || 1,
            total: total,
            "items": newOrder.items.map(item => ({
                "itemId": item.itemId,
                "quantity": item.quantity
            }))
        };
        
        setLoading(true);
        try {
            const response = await OrderService.placeOrder(transformedObject, total);
            if (response) {
                console.log('response: ', response);
                message.success('Order created successfully!');
                // setOrder({ items: response.data });
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card 
            title="Order" 
            extra={<Button type="primary" onClick={logOut}>Logout</Button>} // Add the Logout button here
            style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}
        >
            <Row gutter={16} style={{ display: 'flex', flexDirection: 'row' }}>
                <Col span={12}>
                    <OrderForm 
                        onOrderSubmit={handleOrderSubmit} 
                        order={order} 
                    />
                </Col>
                <Col span={12}>
                    <OrderSummary order={order} />
                </Col>
            </Row>
        </Card>
    );
};

export default OrderPage;
