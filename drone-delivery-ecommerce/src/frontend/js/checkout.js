// File: /drone-delivery-ecommerce/drone-delivery-ecommerce/src/frontend/js/checkout.js

document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    const deliveryAddressInput = document.getElementById('deliveryAddress');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const submitButton = document.getElementById('submitOrder');
    const messageDiv = document.getElementById('message');

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const deliveryAddress = deliveryAddressInput.value.trim();
        const paymentMethod = paymentMethodSelect.value;

        if (!deliveryAddress || !paymentMethod) {
            showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
            return;
        }

        const orderData = {
            deliveryAddress,
            paymentMethod,
            items: getCartItems() // Function to retrieve items from the cart
        };

        submitOrder(orderData);
    });

    function submitOrder(orderData) {
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Đặt hàng không thành công!');
            }
            return response.json();
        })
        .then(data => {
            showMessage('Đặt hàng thành công! Mã đơn hàng: ' + data.orderId, 'success');
            // Optionally redirect to order confirmation page
            setTimeout(() => {
                window.location.href = 'user/orders.html';
            }, 2000);
        })
        .catch(error => {
            showMessage(error.message, 'error');
        });
    }

    function showMessage(message, type) {
        messageDiv.innerHTML = `<div class="${type}-message">${message}</div>`;
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 3000);
    }
});