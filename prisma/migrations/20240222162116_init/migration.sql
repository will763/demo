-- CreateTable
CREATE TABLE `tb_login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(40) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `tb_login_email_key`(`email`),
    UNIQUE INDEX `tb_login_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(40) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tb_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_login` ADD CONSTRAINT `tb_login_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
