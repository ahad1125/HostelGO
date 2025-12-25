const db = require("../config/database");

class Hostel {
    static async findById(id) {
        const [rows] = await db.query(
            `SELECT h.*, u.name as owner_name, u.email as owner_email, 
                    COALESCE(u.contact_number, '') as owner_contact_number
             FROM hostels h 
             JOIN users u ON h.owner_id = u.id 
             WHERE h.id = ?`,
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    static async findAll(filters = {}) {
        let query = "SELECT * FROM hostels";
        const conditions = [];
        const values = [];

        if (filters.city) {
            conditions.push("city = ?");
            values.push(filters.city);
        }

        if (filters.is_verified !== undefined) {
            conditions.push("is_verified = ?");
            values.push(filters.is_verified);
        }

        if (filters.owner_id) {
            conditions.push("owner_id = ?");
            values.push(filters.owner_id);
        }

        if (filters.maxRent) {
            conditions.push("rent <= ?");
            values.push(parseInt(filters.maxRent));
        }

        if (filters.facility) {
            conditions.push("LOWER(facilities) LIKE ?");
            values.push(`%${filters.facility.toLowerCase()}%`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += " ORDER BY id DESC";
        const [rows] = await db.query(query, values);
        return rows;
    }

    static async search(searchParams) {
        const conditions = [];
        const values = [];

        if (searchParams.city) {
            conditions.push("city LIKE ?");
            values.push(`%${searchParams.city}%`);
        }

        if (searchParams.name) {
            conditions.push("name LIKE ?");
            values.push(`%${searchParams.name}%`);
        }

        let query = "SELECT * FROM hostels";
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += " ORDER BY id DESC";
        const [rows] = await db.query(query, values);
        return rows;
    }

    static async create(hostelData) {
        const { name, address, city, rent, facilities, owner_id, contact_number, is_verified } = hostelData;
        const [result] = await db.query(
            "INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [name, address, city, parseInt(rent), facilities || '', owner_id, contact_number || null, is_verified || 0]
        );
        return { id: result.insertId, ...hostelData };
    }

    static async updateById(id, updates) {
        const fields = [];
        const values = [];
        
        Object.keys(updates).forEach(key => {
            if (key === 'rent') {
                fields.push(`${key} = ?`);
                values.push(parseInt(updates[key]));
            } else {
                fields.push(`${key} = ?`);
                values.push(updates[key]);
            }
        });
        
        values.push(id);
        await db.query(
            `UPDATE hostels SET ${fields.join(", ")} WHERE id = ?`,
            values
        );
        return await this.findById(id);
    }

    static async deleteById(id) {
        const [result] = await db.query("DELETE FROM hostels WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }

    static async setVerificationStatus(id, is_verified) {
        await db.query("UPDATE hostels SET is_verified = ? WHERE id = ?", [is_verified, id]);
        return await this.findById(id);
    }
}

module.exports = Hostel;