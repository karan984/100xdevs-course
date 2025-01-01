import {Client} from "pg"
import dotenv from "dotenv"

dotenv.config()
const client = new Client({
    connectionString: process.env.DB_URL
})

async function createUsersTable(){
    await client.connect()
    let result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `)
    console.log(result)
    
    const insertQuery = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
    `

    const values = ['karanmashru', 'karan@gmail.com', '123456']

    result = await client.query(insertQuery, values)

    console.log(result)
}

createUsersTable()
