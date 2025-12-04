import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connectionString}`,
});

/* 
    SERIAL
    -Auto-incrementing integer starting from 1
    -Automatically generates unique IDs for each row
    -Use this for: Primary keys (unique identifiers)
    -Example values: 1, 2, 3, 4, 5...
    When to use:
    -Always use for id column to uniquely identify each record
    
    VARCHAR(n)
    -Variable length text with a maximum limit
    -VARCHAR(100) = can store up to 100 characters
    -Uses only the space needed (if you store 10 characters, it uses 10 spaces)
    
    When to use:
    -Names, emails, phone numbers, usernames
    -When you know the max length
    -Shorter text with a predictable limit

    TEXT
    -Variable length text with no maximum limit
    -Can store very long content
    -Use as much space as needed
    
    When to use:
    -Long descriptions, addresses, comments, bio
    -When you don't know the max length
    -Longer text content

    INT
    -Whole numbers (no decimals)
    -Can store values from -2,147,483,648 to 2,147,483,647

    When to use:
    -Age, count, quantity, numbers without decimals

    TIMESTAMP
    Stores date and time information
    -DEFAULT NOW() = automatically sets current date/time when row is created
    -Format: 2024-11-30 14:35:22
    
    When to use:
    -Track when records are created or modified
    -created_at = when the record was first inserted
    -updated_at = when the record was last modified

    NOT NULL
    -Means the column must have a value
    -Cannot be empty or null

    Without NOT NULL: You can insert a row without providing this field
    With NOT NULL: You must provide a value, or it will error
    
    Difference between VARCHAR vs TEXT?
    -VARCHAR = Short text with a limit (names, emails, phones)
    -TEXT = Long text with no limit (addresses, descriptions, bio)
*/
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};
export default initDB;
