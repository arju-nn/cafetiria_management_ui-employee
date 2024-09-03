import React, { useState, useEffect } from 'react'; // Add useEffect for retrieving user name
import { Card, Row, Col, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import OrderForm from '../components/Order/OrderForm';
import OrderSummary from '../components/Order/OrderSummary';
import OrderService from '../services/orderServices';

const OrderPage = () => {
    const [order, setOrder] = useState({ items: [] });
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(''); // State to hold the user name
    const navigate = useNavigate(); // Initialize the navigate hook

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log('user: ', user);
        if (user) {
            setUserName(user.user.email); // Assuming user object has a 'name' property
        }
    }, []); // Empty dependency array to run the effect only once

    const logOut = () => {
        localStorage.removeItem("user");
        message.success('Logged out successfully');
        navigate("/login");
    };

    const handleItemChange = (updatedItems) => {
        console.log({updatedItems});
        setOrder({ items: updatedItems.items });
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
            extra={
                <div>
                    <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{userName}</span> {/* Apply styles to the username */}
                    <Button type="primary" onClick={logOut}>Logout</Button>
                </div>
            }
            style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}
        >
            <Row gutter={16} style={{ display: 'flex', flexDirection: 'row' }}>
                <Col span={12}>
                    <OrderForm 
                        onItemChange={handleItemChange}
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