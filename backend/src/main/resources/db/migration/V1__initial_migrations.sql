CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users
(
    id                 UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    full_name          VARCHAR(255) NOT NULL,
    email              VARCHAR(255) UNIQUE  NOT NULL,
    password           VARCHAR(255) NOT NULL,
    profile_image_url  VARCHAR(255),
    created_at         TIMESTAMP NOT NULL,
    updated_at         TIMESTAMP,
    role               VARCHAR(50)  NOT NULL,
    is_active          BOOLEAN      NOT NULL DEFAULT FALSE,
    activation_token   VARCHAR(255)
);

-- Index on the email column for faster lookups during authentication.
CREATE INDEX idx_users_email ON users (email);