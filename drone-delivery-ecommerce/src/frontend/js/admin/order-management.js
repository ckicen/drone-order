// This file contains the JavaScript logic for managing orders in the admin panel.

document.addEventListener('DOMContentLoaded', function() {
    const orderTableBody = document.getElementById('orderTableBody');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Fetch and display orders
    function fetchOrders() {
        loadingSpinner.style.display = 'block';
        fetch('/api/orders')
            .then(response => response.json())
            .then(orders => {
                loadingSpinner.style.display = 'none';
                displayOrders(orders);
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                console.error('Error fetching orders:', error);
            });
    }

    // Display orders in the table
    function displayOrders(orders) {
        orderTableBody.innerHTML = '';
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.user.name}</td>
                <td>${order.totalAmount}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="updateOrderStatus(${order.id}, 'Shipped')">Ship</button>
                    <button onclick="updateOrderStatus(${order.id}, 'Delivered')">Deliver</button>
                </td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    // Update order status
    window.updateOrderStatus = function(orderId, status) {
        fetch(`/api/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        .then(response => response.json())
        .then(updatedOrder => {
            fetchOrders(); // Refresh the order list
        })
        .catch(error => {
            console.error('Error updating order status:', error);
        });
    };

    fetchOrders(); // Initial fetch of orders
});