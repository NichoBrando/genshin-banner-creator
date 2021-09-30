DROP DATABASE GIBannerCreator;
CREATE DATABASE GIBannerCreator;

USE GIBannerCreator;

CREATE TABLE Items (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    rarity INT NOT NULL,
    type ENUM('character', 'weapon'),
    image text
);

CREATE TABLE Characters (
    id CHAR(36) NOT NULL PRIMARY KEY,
    item_id CHAR(36) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Weapons (
    id CHAR(36) NOT NULL PRIMARY KEY,
    item_id CHAR(36) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Banners (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    start_day DATE NOT NULL,
    end_day DATE NOT NULL
);

CREATE TABLE BannerItems (
    id CHAR(36) NOT NULL PRIMARY KEY,
    item_id CHAR(36) NOT NULL,
    banner_id CHAR(36) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(id),
    FOREIGN KEY (banner_id) REFERENCES Banners(id)
);