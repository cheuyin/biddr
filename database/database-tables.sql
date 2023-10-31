-- CREATION OF BIDDR. DATABASE TABLES

CREATE TABLE LocationAgeOfMajority(
    location VARCHAR(32) PRIMARY KEY,
    ageOfMajority INT NOT NULL
);

CREATE TABLE LocationDateOfBirthLegalAge(
    location VARCHAR(32),
    dateOfBirth DATE,
    isLegalAge BOOLEAN NOT NULL,
    PRIMARY KEY(location, dateOfBirth),
    FOREIGN KEY(location) REFERENCES LocationAgeOfMajority(location)
);

CREATE TABLE User(
    email VARCHAR(256) PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    profilePicture BYTEA,
    fullName VARCHAR(32) NOT NULL,
    hashedPassword VARCHAR(256) NOT NULL,
    timeJoined TIMESTAMP NOT NULL,
    bio VARCHAR(512),
    dateOfBirth DATE,
    location VARCHAR(32),
    FOREIGN KEY(location, dateOfBirth) REFERENCES LocationDateOfBirthLegalAge(location, dateOfBirth)
);

CREATE TABLE Wallet(
    walletName VARCHAR(32),
    email VARCHAR(256),
    balance FLOAT NOT NULL,
    PRIMARY KEY(walletName, email),
    FOREIGN KEY(email) REFERENCES User(email)
);

CREATE TABLE Community(
    communityName VARCHAR(32) PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    longName VARCHAR(64) NOT NULL,
    description VARCHAR(256) NOT NULL,
    FOREIGN KEY(email) REFERENCES User(email)
);

CREATE TABLE Joins(
    communityName VARCHAR(32),
    email VARCHAR(256),
    timeJoined TIMESTAMP,
    PRIMARY KEY(communityName, email),
    FOREIGN KEY(communityName) REFERENCES Community(communityName),
    FOREIGN KEY(email) REFERENCES User(email)
);

CREATE TABLE Post(
    postID INT PRIMARY KEY,
    postedEmail VARCHAR(256) NOT NULL,
    walletName VARCHAR(32) NOT NULL,
    walletEmail VARCHAR(256) NOT NULL,
    communityName VARCHAR(32) NOT NULL,
    timePosted TIMESTAMP NOT NULL,
    expiryTime TIMESTAMP NOT NULL,
    text VARCHAR(512),
    image BYTEA,
    title VARCHAR(32) NOT NULL,
    FOREIGN KEY(postedEmail) REFERENCES User(email),
    FOREIGN KEY(walletName, walletEmail) REFERENCES Wallet(walletName, email),
    FOREIGN KEY(communityName) REFERENCES Community(communityName)
);

CREATE Table Auction(
    postID INT,
    minBid FLOAT,
    PRIMARY KEY(postID),
    FOREIGN KEY(postID) REFERENCES Post(postID)
);