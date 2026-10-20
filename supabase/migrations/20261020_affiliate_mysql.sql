-- ==============================================================================
-- CC CARVAN — AFFILIATE MARKETING SYSTEM (MySQL / Hostinger Migration)
-- Mirror schema for Hostinger MySQL compatibility
-- ==============================================================================

-- 1. Affiliates Table
CREATE TABLE IF NOT EXISTS affiliates (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    promo_details TEXT,
    website_or_social TEXT,
    status ENUM('pending', 'approved', 'rejected', 'suspended') NOT NULL DEFAULT 'pending',
    referral_code VARCHAR(100) UNIQUE,
    commission_rate DECIMAL(5, 2) NULL,
    rejection_reason TEXT,
    approved_at DATETIME NULL,
    approved_by VARCHAR(36) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_affiliates_email (email),
    INDEX idx_affiliates_status (status),
    INDEX idx_affiliates_referral_code (referral_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Affiliate Links Table
CREATE TABLE IF NOT EXISTS affiliate_links (
    id VARCHAR(36) PRIMARY KEY,
    affiliate_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NULL,
    category_id VARCHAR(36) NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    click_count INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_affiliate_links_affiliate_id (affiliate_id),
    INDEX idx_affiliate_links_slug (slug),
    INDEX idx_affiliate_links_product_id (product_id),
    INDEX idx_affiliate_links_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Alter Orders table for Affiliate Attribution
-- Note: Run column addition safely
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS affiliate_id VARCHAR(36) NULL,
ADD COLUMN IF NOT EXISTS affiliate_link_id VARCHAR(36) NULL;

-- 4. Commissions Table
CREATE TABLE IF NOT EXISTS commissions (
    id VARCHAR(36) PRIMARY KEY,
    affiliate_id VARCHAR(36) NOT NULL,
    affiliate_link_id VARCHAR(36) NULL,
    order_id VARCHAR(64) NOT NULL,
    order_item_id VARCHAR(64) NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    sale_amount DECIMAL(12, 2) NOT NULL,
    commission_rate DECIMAL(5, 2) NOT NULL,
    commission_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'approved', 'reversed') NOT NULL DEFAULT 'pending',
    available_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_commissions_affiliate_id (affiliate_id),
    INDEX idx_commissions_order_id (order_id),
    INDEX idx_commissions_status (status),
    INDEX idx_commissions_available_at (available_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Payout Methods Table
CREATE TABLE IF NOT EXISTS payout_methods (
    id VARCHAR(36) PRIMARY KEY,
    affiliate_id VARCHAR(36) NOT NULL,
    method ENUM('easypaisa', 'jazzcash', 'bank_transfer', 'other') NOT NULL,
    account_title VARCHAR(255) NOT NULL,
    account_number VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_payout_methods_affiliate_id (affiliate_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Withdrawals Table
CREATE TABLE IF NOT EXISTS withdrawals (
    id VARCHAR(36) PRIMARY KEY,
    affiliate_id VARCHAR(36) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    account_title VARCHAR(255) NOT NULL,
    account_number VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) NULL,
    status ENUM('pending', 'approved', 'rejected', 'paid') NOT NULL DEFAULT 'pending',
    admin_note TEXT NULL,
    transaction_reference VARCHAR(255) NULL,
    requested_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME NULL,
    processed_by VARCHAR(36) NULL,
    INDEX idx_withdrawals_affiliate_id (affiliate_id),
    INDEX idx_withdrawals_status (status),
    INDEX idx_withdrawals_requested_at (requested_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Global Affiliate Settings Table
CREATE TABLE IF NOT EXISTS affiliate_settings (
    id INT PRIMARY KEY DEFAULT 1,
    default_commission_rate DECIMAL(5, 2) NOT NULL DEFAULT 10.00,
    cookie_days INT NOT NULL DEFAULT 30,
    hold_days INT NOT NULL DEFAULT 7,
    min_withdrawal DECIMAL(12, 2) NOT NULL DEFAULT 1000.00,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default global settings row (id = 1)
INSERT INTO affiliate_settings (id, default_commission_rate, cookie_days, hold_days, min_withdrawal)
VALUES (1, 10.00, 30, 7, 1000.00)
ON DUPLICATE KEY UPDATE id=id;
