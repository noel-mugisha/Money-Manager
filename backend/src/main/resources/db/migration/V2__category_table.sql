CREATE TABLE categories (
                            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                            name VARCHAR(100) NOT NULL,
                            type VARCHAR(50) NOT NULL,
                            icon VARCHAR(255),
                            user_id UUID NOT NULL,
                            created_at TIMESTAMP,
                            updated_at TIMESTAMP,
                            CONSTRAINT fk_categories_user FOREIGN KEY ("user_id")
                                REFERENCES users (id) ON DELETE CASCADE
);
