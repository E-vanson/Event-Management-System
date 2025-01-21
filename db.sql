CREATE DATABASE event_manager_db;
USE event_manager_db;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    max_attendees INT DEFAULT 0,
    current_attendees INT DEFAULT 0,
    organizer_name VARCHAR(100),
    organizer_email VARCHAR(255),
    ticket_price DECIMAL(10,2) DEFAULT 0.00,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color_code VARCHAR(7) NOT NULL
);

INSERT INTO categories (`categoryID`,name, color_code) VALUES
('Conference', '#4a90e2'),
('Workshop', '#e74c3c'),
('Seminar', '#2ecc71'),
('Networking', '#f39c12'),
('Tech Talk', '#9b59b6'),
('Hackathon', '#e67e22'),
('Social', '#3498db'),
('Other', '#95a5a6');

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO users (username, password_hash, email, role) 
VALUES ('admin', SHA2('adminpassword', 256), 'admin@example.com', 'admin');

