-- Create the User table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20),
    token VARCHAR(255)
);

-- Create the ParkingSpot table
CREATE TABLE "ParkingSpot" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the Booking table
CREATE TABLE "Booking" (
    id SERIAL PRIMARY KEY,
    created_by_user INT NOT NULL,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP,
    parking_spot INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (created_by_user) REFERENCES "User"(id),
    CONSTRAINT fk_parking_spot FOREIGN KEY (parking_spot) REFERENCES "ParkingSpot"(id)
);

-- Insert sample data into the User table
INSERT INTO "User" (first_name, last_name, email, role, token)
VALUES 
('John', 'Doe', 'john.doe@example.com', 'admin', 'token-admin-123'),
('Jane', 'Smith', 'jane.smith@example.com', 'user', 'token-user-456');

-- Insert sample data into the ParkingSpot table
INSERT INTO "ParkingSpot" ("name")
VALUES 
('Spot A'),
('Spot B'),
('Spot C');

-- Insert sample data into the Booking table
INSERT INTO "Booking" (created_by_user, start_date_time, end_date_time, parking_spot)
VALUES 
(1, '2024-09-01 09:00:00', '2024-09-01 10:00:00', 1),
(2, '2024-09-01 11:00:00', '2024-09-01 12:30:00', 2),
(1, '2024-09-02 14:00:00', '2024-09-02 15:00:00', 3);
