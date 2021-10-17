DROP DATABASE GIBannerCreator;
CREATE DATABASE GIBannerCreator;

USE GIBannerCreator;

CREATE TABLE Banners (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    startDay DATE NOT NULL,
    endDay DATE NOT NULL
);

CREATE TABLE Items (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    rarity INT NOT NULL,
    type ENUM('character', 'weapon'),
    image text
);

CREATE TABLE BannerItems (
    itemId CHAR(36) NOT NULL,
    bannerId CHAR(36) NOT NULL,
    FOREIGN KEY (itemId) REFERENCES Items(id),
    FOREIGN KEY (bannerId) REFERENCES Banners(id)
);

CREATE TABLE Weapons (
    id CHAR(36) NOT NULL PRIMARY KEY,
    itemId CHAR(36) NOT NULL,
    FOREIGN KEY (itemId) REFERENCES Items(id)
);

CREATE TABLE Characters (
    id CHAR(36) NOT NULL PRIMARY KEY,
    itemId CHAR(36) NOT NULL,
    FOREIGN KEY (itemId) REFERENCES Items(id)
);