CREATE TABLE drones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    battery_percentage INT CHECK (battery_percentage >= 0 AND battery_percentage <= 100),
    status VARCHAR(50) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    manufacturer VARCHAR(255),
    manufacture_date DATE,
    usage_time INT CHECK (usage_time >= 0) -- in hours
);