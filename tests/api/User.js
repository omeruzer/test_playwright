const { test, expect } = require('@playwright/test');

class User {
    constructor(url, headers) {
        this.url = url;
        this.headers = headers;
    }

    async createUser(body) {
        const result = await fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
        });

        if (result.ok) {
            const response = await result.json();
            // Status code 201 mi kontrol et
            expect(result.status).toBe(201);

            // Response name ile request name aynı mı kontrol et
            expect(response.name).toBe(body.name);

            return response;
        } else {
            console.error('HTTP error:', result.status);
        }
    }

    async getAllUser() {
        const result = await fetch(this.url, {
            method: 'GET',
            headers: this.headers
        });

        if (result.ok) {
            expect(result.status).toBe(200);
            return result.json()
        } else {
            console.error('HTTP error:', result.status);
        }
    }

    async getOneUser(id, body) {
        const result = await fetch(`${this.url}/${id}`, {
            method: 'GET',
            headers: this.headers
        });

        if (result.ok) {
            const response = await result.json()
            return response;
        } else {
            console.error('HTTP error:', result.status);
        }
    }

    async getOneUserControl(user, request) {
        // Oluşturulan kullanıcı ile get one ile çağırılan kullanıcı doğru mu
        expect(user.name).toBe(request.name);
        expect(user.email).toBe(request.email);
        expect(user.gender).toBe(request.gender);
        expect(user.status).toBe(request.status);
    }

    async updateUser(id, body) {

        const result = await fetch(`${this.url}/${id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body),
        });

        if (result.ok) {
            const response = await result.json()
            
            const userData = await this.getOneUser(id)

            await this.getOneUserControl(userData, response)

            return response;
        } else {
            console.error('HTTP error:', result.status);
        }
    }

    async removeUser(id) {
        const result = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        });

        if (result.ok) {
            await expect(result.status).toBe(204);

            return result.status
        } else {
            console.error('HTTP error:', result.status);
        }
    }

}
module.exports = User;