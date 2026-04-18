-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CONTACTS TABLE
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    status TEXT DEFAULT 'Active', -- Active, Lead, Inactive
    notes TEXT,
    tags JSONB DEFAULT '[]'
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access for authenticated users" ON contacts FOR ALL USING (auth.role() = 'authenticated');

-- 3. DEALS TABLE (Negotiations)
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    value DECIMAL(12, 2) DEFAULT 0,
    status TEXT DEFAULT 'Discovery', -- Discovery, Negotiation, Proposal, Won, Lost
    stage TEXT DEFAULT 'discovery',
    priority TEXT DEFAULT 'medium', -- low, medium, high
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE
);

ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access for authenticated users" ON deals FOR ALL USING (auth.role() = 'authenticated');

-- 4. ACTIVITIES TABLE (Timeline)
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- system, manual, status, communication
    title TEXT NOT NULL,
    content TEXT
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Full access for authenticated users" ON activities FOR ALL USING (auth.role() = 'authenticated');

-- 5. SEED DATA (Optional, but helpful)
-- Only run if you want example data
-- INSERT INTO contacts (first_name, last_name, email, company, status) VALUES ('John', 'Doe', 'john@example.com', 'Enterprise Corp', 'Active');
