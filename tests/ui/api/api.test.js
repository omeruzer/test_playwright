const { test, expect } = require('@playwright/test');
const API_URL = 'https://gorest.co.in'
const User = require('./User');

test('API Case', async ({ page }) => {
    // API'nin çağrılacağı URL'yi belirle
    const userUrl = API_URL + '/public/v2/users';

    // token
    const token = '99f1e9c15967953577b53408017142cf4272e0c45e40712dd8f1b1f474d947e0';

    //headers 
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    // Request body oluştur
    const request = {
        email: `omer_${Math.floor(Math.random() * 1000)}@gmail.com`,
        name: 'omer',
        gender: 'male',
        status: 'active',
    };

    //Update Request body oluştur
    const updateRequest = {
        email: `omer_${Math.floor(Math.random() * 1000)}@gmail.com`,
        name: `omer_${Math.floor(Math.random() * 1000)}`,
        gender: 'male',
        status: 'active',
    };

    const user = await new User(userUrl, headers)

    const createdUser = await user.createUser(request)
    const getAllUser = await user.getAllUser()
    const getOneUser = await user.getOneUser(createdUser.id)
    const getOneUserControl = await user.getOneUserControl(getOneUser, request)
    const updateUser = await user.updateUser(createdUser.id, updateRequest)
    const removeUser = await user.removeUser(createdUser.id)

})
