-- CreateTable
CREATE TABLE IF NOT EXISTS `leads` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `arr` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `stage` INTEGER NOT NULL DEFAULT 1,
    `cloudSpend` VARCHAR(191) NOT NULL DEFAULT '$0.0k/mo',
    `tags` JSON NULL,
    `source` VARCHAR(191) NOT NULL DEFAULT 'website_form',
    `budgetMatchScore` INTEGER NOT NULL DEFAULT 0,
    `engagementScore` INTEGER NOT NULL DEFAULT 0,
    `conversionScore` DOUBLE NOT NULL DEFAULT 0,
    `isUnsubscribed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `leads_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `call_logs` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `outcome` VARCHAR(191) NOT NULL,
    `durationSeconds` INTEGER NOT NULL DEFAULT 0,
    `notes` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `call_logs_leadId_idx`(`leadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `customers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `arr` VARCHAR(191) NOT NULL,
    `cogsMargin` VARCHAR(191) NOT NULL DEFAULT '75.0%',
    `stripeStatus` VARCHAR(191) NOT NULL DEFAULT 'Active',
    `cloudSpend` VARCHAR(191) NOT NULL DEFAULT '$10,000/mo',
    `contractRenewal` VARCHAR(191) NOT NULL DEFAULT '2026-12-31',
    `healthScore` INTEGER NOT NULL DEFAULT 85,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
