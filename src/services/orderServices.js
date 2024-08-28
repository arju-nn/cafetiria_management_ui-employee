import axios from 'axios'
class OrderService {

    static async placeOrder(data) {
        const token= JSON.parse(localStorage.getItem("user"))?.token;
        console.log('token: ', token);
        let response = await axios.post('http://localhost:5000/api/orders', data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response;
        // return axios.post('http://localhost:5000/api/orders', data);
    }
    static calculateTotal(items) {
        console.log('items: ', items);
        // Calculate total based on items data including price
        const total = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    
        return total;
    }
    
    
}

export default OrderService;