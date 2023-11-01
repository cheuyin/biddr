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
    postID SERIAL PRIMARY KEY,
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

CREATE TABLE Auction(
    postID SERIAL,
    minBid FLOAT,
    PRIMARY KEY(postID),
    FOREIGN KEY(postID) REFERENCES Post(postID)
);

-- Stanley's part
CREATE TABLE Fundraiser(
    postID SERIAL,
    goal FLOAT,
    PRIMARY KEY(postID),
    FOREIGN KEY(postID) REFERENCES Post(postID)
);

CREATE TABLE Bid(
    bidID SERIAL PRIMARY KEY,
    walletName VARCHAR(32) NOT NULL,
    email VARCHAR(256) NOT NULL,
    postID INT NOT NULL,
    amount FLOAT NOT NULL,
    timeCreated TIMESTAMP NOT NULL,
    status VARCHAR(16),
    FOREIGN KEY (walletName, email) REFERENCES Wallet(walletName, email),
    FOREIGN KEY (postID) REFERENCES Auction(postID)
);

CREATE TABLE Donation(
    donationID SERIAL PRIMARY KEY,
    walletName VARCHAR(32) NOT NULL,
    email VARCHAR(256) NOT NULL,
    postID SERIAL NOT NULL,
    amount FLOAT NOT NULL,
    timeCreated TIMESTAMP NOT NULL,
    FOREIGN KEY (walletName, email) REFERENCES Wallet (walletName, email),
    FOREIGN KEY (postID) REFERENCES Fundraiser (postID)
);

CREATE TABLE Comment(
    commentID SERIAL PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    postID SERIAL NOT NULL,
    text VARCHAR(256) NOT NULL,
    timeSent TIMESTAMP NOT NULL,
    FOREIGN KEY (email) REFERENCES User(email),
    FOREIGN KEY (postID) REFERENCES Post(postID)
);

CREATE TABLE Chat(
    chatID SERIAL PRIMARY KEY,
    chatName VARCHAR(32)
);

CREATE TABLE PrivateMessage(
    messageID SERIAL PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    chatID SERIAL NOT NULL,
    text VARCHAR(256) NOT NULL,
    timeSent TIMESTAMP NOT NULL,
    FOREIGN KEY(email) REFERENCES User(email),
    FOREIGN KEY(chatID) REFERENCES Chat(chatID) ON DELETE CASCADE
);

CREATE TABLE EngagedIn(
    email VARCHAR(256),
    chatID SERIAL,
    PRIMARY KEY (email, chatID),
    FOREIGN KEY (email) REFERENCES User(email),
    FOREIGN KEY (chatID) REFERENCES Chat(chatID) ON DELETE CASCADE
);


