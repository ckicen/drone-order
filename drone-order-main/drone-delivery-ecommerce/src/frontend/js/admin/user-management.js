// This file contains the JavaScript logic for managing user accounts in the admin panel.

document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');
    const userForm = document.getElementById('userForm');
    const userIdInput = document.getElementById('userId');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userRoleInput = document.getElementById('userRole');
    const submitButton = document.getElementById('submitButton');

    // Fetch and display users
    function fetchUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                userTableBody.innerHTML = '';
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    `;
                    userTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Edit user
    window.editUser = function(userId) {
        fetch(`/api/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                userIdInput.value = user.id;
                userNameInput.value = user.name;
                userEmailInput.value = user.email;
                userRoleInput.value = user.role;
                submitButton.textContent = 'Update User';
            })
            .catch(error => console.error('Error fetching user:', error));
    };

    // Delete user
    window.deleteUser = function(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            })
            .then(() => fetchUsers())
            .catch(error => console.error('Error deleting user:', error));
        }
    };

    // Handle form submission
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userId = userIdInput.value;
        const userData = {
            name: userNameInput.value,
            email: userEmailInput.value,
            role: userRoleInput.value
        };

        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `/api/users/${userId}` : '/api/users';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(() => {
            fetchUsers();
            userForm.reset();
            submitButton.textContent = 'Add User';
        })
        .catch(error => console.error('Error saving user:', error));
    });

    // Initial fetch
    fetchUsers();
});