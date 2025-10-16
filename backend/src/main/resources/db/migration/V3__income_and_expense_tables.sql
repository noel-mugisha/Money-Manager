CREATE TABLE expenses (
                          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                          name VARCHAR(150) NOT NULL,
                          icon VARCHAR(255),
                          date DATE DEFAULT CURRENT_DATE,
                          amount NUMERIC(12, 2) NOT NULL,
                          user_id UUID NOT NULL,
                          category_id UUID NOT NULL,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP,
                          CONSTRAINT fk_expenses_user FOREIGN KEY ("user_id")
                              REFERENCES users (id) ON DELETE CASCADE,
                          CONSTRAINT fk_expenses_category FOREIGN KEY (category_id)
                              REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TABLE incomes (
                          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                          name VARCHAR(150) NOT NULL,
                          icon VARCHAR(255),
                          date DATE DEFAULT CURRENT_DATE,
                          amount NUMERIC(12, 2) NOT NULL,
                          user_id UUID NOT NULL,
                          category_id UUID NOT NULL,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP,
                          CONSTRAINT fk_expenses_user FOREIGN KEY ("user_id")
                              REFERENCES users (id) ON DELETE CASCADE,
                          CONSTRAINT fk_expenses_category FOREIGN KEY (category_id)
                              REFERENCES categories (id) ON DELETE CASCADE
);
