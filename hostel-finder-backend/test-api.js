// Quick test script to verify API endpoints
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000';

async function testAPI() {
    console.log('Testing API endpoints...\n');

    // Test 1: Health check
    try {
        const healthResponse = await fetch(`${API_BASE_URL}/`);
        const healthData = await healthResponse.json();
        console.log('✓ Health check:', healthData.status);
    } catch (error) {
        console.error('✗ Health check failed:', error.message);
        return;
    }

    // Test 2: Login
    try {
        const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'ahad@gmail.com', password: '1234' })
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
            console.log('✓ Login successful:', loginData.user.email);
            
            // Test 3: Get hostels with auth
            const hostelsResponse = await fetch(`${API_BASE_URL}/hostels`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Email': 'ahad@gmail.com',
                    'X-User-Password': '1234'
                }
            });
            const hostelsData = await hostelsResponse.json();
            if (hostelsResponse.ok) {
                console.log(`✓ Get hostels successful: Found ${hostelsData.length} hostels`);
            } else {
                console.error('✗ Get hostels failed:', hostelsData);
            }
        } else {
            console.error('✗ Login failed:', loginData);
        }
    } catch (error) {
        console.error('✗ Test failed:', error.message);
    }
}

testAPI();


