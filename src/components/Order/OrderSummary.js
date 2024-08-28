import React from 'react';
import OrderService from '../../services/orderServices';
import { Card, Divider } from 'antd';

const OrderSummary = ({ order }) => {
    console.log('order: ', order);
    // Calculate total based on the order items
    const total = OrderService.calculateTotal(order.items); 
    // const total = 0

    return (
        <Card style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Order Summary</h2>
            <Divider />
            {order?.items?.length > 0 ? (
                order.items.map(item => (
                    <div key={item.itemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>{item.name}:</span> {/* Adjust the label if needed */}
                        <span>{item.quantity}</span>
                    </div>
                ))
            ) : (
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>No items selected</div>
            )}
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>{total} Rs</span>
            </div>
        </Card>
    );
};

export default OrderSummary;
