-- DROP TABLES (IF THEY EXIST) TO RESET DATABASE
DROP TABLE IF EXISTS Likes;
DROP TABLE IF EXISTS EngagedIn;
DROP TABLE IF EXISTS Joins;
DROP TABLE IF EXISTS PrivateMessage;
DROP TABLE IF EXISTS Chat;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Donation;
DROP TABLE IF EXISTS Bid;
DROP TABLE IF EXISTS Fundraiser;
DROP TABLE IF EXISTS Auction;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS Community;
DROP TABLE IF EXISTS Wallet;
DROP TABLE IF EXISTS AppUser;
DROP TABLE IF EXISTS LocationDateOfBirthLegalAge;
DROP TABLE IF EXISTS LocationAgeOfMajority;

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

CREATE TABLE AppUser(
    email VARCHAR(256) PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    profilePicture BYTEA,
    fullName VARCHAR(32) NOT NULL,
    hashedPassword VARCHAR(256) NOT NULL,
    timeJoined TIMESTAMP NOT NULL,
    bio VARCHAR(512),
    dateOfBirth DATE,
    location VARCHAR(32),
    refreshtoken VARCHAR(256),
    FOREIGN KEY(location, dateOfBirth) REFERENCES LocationDateOfBirthLegalAge(location, dateOfBirth)
);

CREATE TABLE Wallet(
    walletName VARCHAR(32),
    email VARCHAR(256),
    balance FLOAT NOT NULL,
    PRIMARY KEY(walletName, email),
    FOREIGN KEY(email) REFERENCES AppUser(email)
);

CREATE TABLE Community(
    communityName VARCHAR(32) PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    longName VARCHAR(64) NOT NULL,
    description VARCHAR(256) NOT NULL,
    FOREIGN KEY(email) REFERENCES AppUser(email)
);

CREATE TABLE Joins(
    communityName VARCHAR(32),
    email VARCHAR(256),
    PRIMARY KEY(communityName, email),
    FOREIGN KEY(communityName) REFERENCES Community(communityName),
    FOREIGN KEY(email) REFERENCES AppUser(email)
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
    FOREIGN KEY(postedEmail) REFERENCES AppUser(email),
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
    FOREIGN KEY (email) REFERENCES AppUser(email),
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
    FOREIGN KEY(email) REFERENCES AppUser(email),
    FOREIGN KEY(chatID) REFERENCES Chat(chatID) ON DELETE CASCADE
);

CREATE TABLE EngagedIn(
    email VARCHAR(256),
    chatID SERIAL,
    PRIMARY KEY (email, chatID),
    FOREIGN KEY (email) REFERENCES AppUser(email),
    FOREIGN KEY (chatID) REFERENCES Chat(chatID) ON DELETE CASCADE
);

CREATE TABLE Likes(
    email VARCHAR(256),
    postID SERIAL,
    PRIMARY KEY (email, postID),
    FOREIGN KEY (email) REFERENCES AppUser(email),
    FOREIGN KEY (postID) REFERENCES Post(postID)
);

INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Liechtenstein', 22);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Eritrea', 20);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Ukraine', 21);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Nicaragua', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Christmas Island', 17);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Turkmenistan', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Yemen', 21);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Northern Mariana Islands', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Korea', 19);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Romania', 20);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('China', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('India', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('United States', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Indonesia', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Brazil', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Bangladesh', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Russia', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Japan', 20);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Pakistan', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Mexico', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Philippines', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Vietnam', 16);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Germany', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Iran', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Turkey', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('United Kingdom', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Thailand', 20);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('France', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Italy', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Egypt', 21);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('South Korea', 19);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Kenya', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Spain', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Colombia', 18);
INSERT INTO LocationAgeOfMajority (location, ageofmajority) VALUES ('Canada', 19);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Christmas Island', '1988-02-28', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Romania', '2018-09-15', False);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Korea', '2020-12-13', False);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Liechtenstein', '2017-06-25', False);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Eritrea', '1980-06-16', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Turkmenistan', '1996-01-30', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Northern Mariana Islands', '1981-06-14', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Ukraine', '1970-06-28', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Yemen', '1974-05-01', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Nicaragua', '1991-03-18', True);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Italy', '2023-10-19', False);
INSERT INTO LocationDateOfBirthLegalAge VALUES ('Nicaragua', '2023-08-09', False);
INSERT INTO AppUser VALUES ('woodgregory@example.net', 'trouble', NULL, 'Benjamin Schmitt', '09a3871fa15155c510b8b23733c47be8', '1987-05-23T12:03:01', 'million ground human', '2017-06-25', 'Liechtenstein');
INSERT INTO AppUser VALUES ('cgarza@example.org', 'how', NULL, 'Karen Ross', '533cb108fc75cac8f5c20d6fd8ccdf2e', '2017-02-02T03:31:43', 'federal partner also', '1980-06-16', 'Eritrea');
INSERT INTO AppUser VALUES ('millerdaniel@example.com', 'financial', NULL, 'Charles Fox', 'c6187c365b23b135ff561c8c278cdcf1', '1990-04-29T19:16:19', 'air his develop', '1970-06-28', 'Ukraine');
INSERT INTO AppUser VALUES ('harrislatasha@example.org', 'yard', NULL, 'Lori Butler', 'bcf6738be52090341bfef777bdeb4ff8', '1974-12-19T08:27:43', 'tend policy management', '1991-03-18', 'Nicaragua');
INSERT INTO AppUser VALUES ('karen15@example.com', 'network', NULL, 'Kari Griffin', '85d80aa21d6735e7b6e7fe1eb7e6050c', '2023-05-10T23:57:07', 'boy PM relate', '1988-02-28', 'Christmas Island');
INSERT INTO AppUser VALUES ('chris36@example.net', 'start', NULL, 'Brandon Gonzalez', '0094386106b4a99d899c014bb31884e2', '2000-08-15T16:40:11', 'smile join ago', '1996-01-30', 'Turkmenistan');
INSERT INTO AppUser VALUES ('rwalter@example.org', 'former', NULL, 'Jacob Mack', 'd7415cdcc79ea33a41a4b527f9f262ee', '1985-02-13T07:32:48', 'word same game', '1974-05-01', 'Yemen');
INSERT INTO AppUser VALUES ('ronald84@example.org', 'activity', NULL, 'Laura Kennedy', '7e22c0dee896798a63e251fc4ed55934', '1999-06-06T11:11:51', 'bring final through', '1981-06-14', 'Northern Mariana Islands');
INSERT INTO AppUser VALUES ('hallmatthew@example.org', 'foot', NULL, 'Derrick Bridges', '3b3ad97a9aee71b4e37df8fdbe4b9beb', '2000-03-25T16:17:07', 'Mrs school until', '2020-12-13', 'Korea');
INSERT INTO AppUser VALUES ('jeffreyreeves@example.org', 'wear', NULL, 'Robert Woods', '87db52446d964090b4b7c862fc590b0c', '1980-05-09T14:54:17', 'free anything send', '2018-09-15', 'Romania');
INSERT INTO AppUser VALUES ('inallchats1@gmail.com', 'inallchats1', NULL, 'Bruce Wayne', '$2b$10$tiEHk3V5QNF2zTo6LAOJReDCPYX1ooQsHDGV6Ua3auPWQuZXyPhy.', '1980-05-09T14:54:17', 'I am awesome.', '2023-10-19', 'Italy');
INSERT INTO AppUser VALUES ('inallchats2@gmail.com', 'inallchats2', NULL, 'Peter Parker', '$2b$10$79sOg3lpH2Geda7DF6qRE.t14P64QRilDjMrs7ufs.K.5KujBk9la', '1980-05-09T14:54:17', 'I am very chill.', '2023-08-09', 'Nicaragua');
INSERT INTO AppUser VALUES ('sunnynie@example.com', 'sunnynie', NULL, 'Sunny Nie', '$2b$10$Q5/mRRTG2rlH8kJPrMYLTeY5s1aueCSPk2XmSbhOcufyPMsGG5rsa', '2000-05-09T14:54:17', 'Sunny acc', '2023-08-09', 'Nicaragua');
INSERT INTO Wallet VALUES ('help involve', 'chris36@example.net', 0.68);
INSERT INTO Wallet VALUES ('them computer', 'cgarza@example.org', 5.4);
INSERT INTO Wallet VALUES ('much seven', 'harrislatasha@example.org', 94.05);
INSERT INTO Wallet VALUES ('provide customer', 'millerdaniel@example.com', 62.14);
INSERT INTO Wallet VALUES ('send man', 'cgarza@example.org', 59336.81);
INSERT INTO Wallet VALUES ('late themselves', 'ronald84@example.org', 8.19);
INSERT INTO Wallet VALUES ('official raise', 'cgarza@example.org', 5.45);
INSERT INTO Wallet VALUES ('knowledge international', 'ronald84@example.org', 3381.56);
INSERT INTO Wallet VALUES ('kitchen especially', 'harrislatasha@example.org', 1059.94);
INSERT INTO Wallet VALUES ('Mrs increase', 'chris36@example.net', 7309.75);
INSERT INTO Community VALUES ('more', 'karen15@example.com', 'north member', 'may professor clear community in');
INSERT INTO Community VALUES ('among', 'ronald84@example.org', 'green response', 'audience quickly federal respond house');
INSERT INTO Community VALUES ('body', 'hallmatthew@example.org', 'national onto', 'than former they unit draw');
INSERT INTO Community VALUES ('nature', 'jeffreyreeves@example.org', 'son bit', 'new organization not husband identify');
INSERT INTO Community VALUES ('benefit', 'jeffreyreeves@example.org', 'all adult', 'share return decade event professional');
INSERT INTO Community VALUES ('beautiful', 'ronald84@example.org', 'quickly term', 'person think anything war traditional');
INSERT INTO Community VALUES ('side', 'millerdaniel@example.com', 'time four', 'bad prepare young anything it');
INSERT INTO Community VALUES ('everybody', 'hallmatthew@example.org', 'hour particularly', 'wait poor sort economy our');
INSERT INTO Community VALUES ('star', 'ronald84@example.org', 'fly become', 'series many draw nor strong');
INSERT INTO Joins VALUES ('more', 'woodgregory@example.net');
INSERT INTO Post VALUES (1, 'ronald84@example.org', 'provide customer', 'millerdaniel@example.com', 'beautiful', '1992-06-05T23:10:28', '1993-07-05T23:10:28', 'expert group decide', NULL, 'join should');
INSERT INTO Post VALUES (2, 'cgarza@example.org', 'send man', 'cgarza@example.org', 'more', '1987-01-20T23:57:12', '1988-02-19T23:57:12', 'thus should now', NULL, 'physical case');
INSERT INTO Post VALUES (3, 'woodgregory@example.net', 'Mrs increase', 'chris36@example.net', 'among', '1985-03-25T03:32:03', '1986-04-24T03:32:03', 'out education I', NULL, 'question point');
INSERT INTO Post VALUES (4, 'rwalter@example.org', 'send man', 'cgarza@example.org', 'side', '2013-12-04T05:55:04', '2015-01-03T05:55:04', 'edge else recent', NULL, 'popular perform');
INSERT INTO Post VALUES (5, 'millerdaniel@example.com', 'Mrs increase', 'chris36@example.net', 'among', '1979-12-22T04:03:16', '1981-01-20T04:03:16', 'big design low', NULL, 'with citizen');
INSERT INTO Post VALUES (6, 'harrislatasha@example.org', 'provide customer', 'millerdaniel@example.com', 'side', '1998-02-06T02:20:55', '1999-03-08T02:20:55', 'single left determine', NULL, 'new method');
INSERT INTO Post VALUES (7, 'cgarza@example.org', 'late themselves', 'ronald84@example.org', 'beautiful', '2006-03-18T01:21:49', '2007-04-17T01:21:49', 'support rate point', NULL, 'per figure');
INSERT INTO Post VALUES (8, 'karen15@example.com', 'late themselves', 'ronald84@example.org', 'nature', '2019-05-01T16:22:50', '2020-05-30T16:22:50', 'sort hair order', NULL, 'style responsibility');
INSERT INTO Post VALUES (9, 'hallmatthew@example.org', 'them computer', 'cgarza@example.org', 'star', '2004-12-31T02:07:11', '2006-01-30T02:07:11', 'like number word', NULL, 'water believe');
INSERT INTO Post VALUES (10, 'cgarza@example.org', 'send man', 'cgarza@example.org', 'body', '1975-10-09T06:12:48', '1976-11-07T06:12:48', 'notice marriage not', NULL, 'thus kid');
INSERT INTO Post VALUES (11, 'harrislatasha@example.org', 'them computer', 'cgarza@example.org', 'star', '1993-04-27T04:53:54', '1994-05-27T04:53:54', 'democratic amount kid', NULL, 'room town');
INSERT INTO Post VALUES (12, 'jeffreyreeves@example.org', 'them computer', 'cgarza@example.org', 'body', '1976-01-20T14:43:52', '1977-02-18T14:43:52', 'party third teacher', NULL, 'tonight word');
INSERT INTO Post VALUES (13, 'ronald84@example.org', 'send man', 'cgarza@example.org', 'more', '2005-06-10T21:07:31', '2006-07-10T21:07:31', 'early article subject', NULL, 'shake food');
INSERT INTO Post VALUES (14, 'rwalter@example.org', 'help involve', 'chris36@example.net', 'benefit', '2010-06-09T21:03:07', '2011-07-09T21:03:07', 'car chance project', NULL, 'represent organization');
INSERT INTO Post VALUES (15, 'woodgregory@example.net', 'late themselves', 'ronald84@example.org', 'body', '2005-09-11T15:18:11', '2006-10-11T15:18:11', 'movement for defense', NULL, 'major campaign');
INSERT INTO Post VALUES (16, 'millerdaniel@example.com', 'send man', 'cgarza@example.org', 'more', '2020-07-01T05:43:26', '2021-07-31T05:43:26', 'citizen history force', NULL, 'check avoid');
INSERT INTO Post VALUES (17, 'karen15@example.com', 'much seven', 'harrislatasha@example.org', 'beautiful', '1991-07-11T15:01:17', '1992-08-09T15:01:17', 'add success home', NULL, 'guy leg');
INSERT INTO Post VALUES (18, 'rwalter@example.org', 'official raise', 'cgarza@example.org', 'everybody', '2000-07-08T11:27:35', '2001-08-07T11:27:35', 'environment weight think', NULL, 'material week');
INSERT INTO Post VALUES (19, 'harrislatasha@example.org', 'provide customer', 'millerdaniel@example.com', 'more', '2000-01-24T15:23:20', '2001-02-22T15:23:20', 'son himself Republican', NULL, 'half meeting');
INSERT INTO Post VALUES (20, 'karen15@example.com', 'help involve', 'chris36@example.net', 'among', '2023-01-25T02:40:39', '2024-02-24T02:40:39', 'guy indeed and', NULL, 'nearly argue');
INSERT INTO Auction VALUES (1, 3550.95);
INSERT INTO Auction VALUES (2, 5392.71);
INSERT INTO Auction VALUES (3, 4.46);
INSERT INTO Auction VALUES (4, NULL);
INSERT INTO Auction VALUES (5, 9.63);
INSERT INTO Auction VALUES (6, 0.01);
INSERT INTO Auction VALUES (7, 42235.16);
INSERT INTO Auction VALUES (8, 55563.29);
INSERT INTO Auction VALUES (9, 0.92);
INSERT INTO Auction VALUES (10, 76496.81);
INSERT INTO Fundraiser VALUES (11, 6202.05);
INSERT INTO Fundraiser VALUES (12, 5506.01);
INSERT INTO Fundraiser VALUES (13, 73668.05);
INSERT INTO Fundraiser VALUES (14, NULL);
INSERT INTO Fundraiser VALUES (15, 97992.89);
INSERT INTO Fundraiser VALUES (16, 0.96);
INSERT INTO Fundraiser VALUES (17, 0.57);
INSERT INTO Fundraiser VALUES (18, 4775.0);
INSERT INTO Fundraiser VALUES (19, 0.73);
INSERT INTO Fundraiser VALUES (20, 85.72);
INSERT INTO Bid VALUES (1, 'late themselves', 'ronald84@example.org', 5, 183.47, '2015-11-01T05:58:42', 'Paid');
INSERT INTO Bid VALUES (2, 'send man', 'cgarza@example.org', 6, 751.67, '1970-09-29T09:22:46', 'Highest');
INSERT INTO Bid VALUES (3, 'much seven', 'harrislatasha@example.org', 1, 362.46, '2023-09-24T16:43:20', 'Paid');
INSERT INTO Bid VALUES (4, 'official raise', 'cgarza@example.org', 10, 788.9, '1973-12-14T09:28:36', NULL);
INSERT INTO Bid VALUES (5, 'official raise', 'cgarza@example.org', 7, 78610.8, '2009-07-17T17:25:16', 'Paid');
INSERT INTO Bid VALUES (6, 'kitchen especially', 'harrislatasha@example.org', 3, 98.35, '2006-12-07T15:47:49', NULL);
INSERT INTO Bid VALUES (7, 'official raise', 'cgarza@example.org', 1, 63.39, '1978-11-19T18:28:32', NULL);
INSERT INTO Bid VALUES (8, 'provide customer', 'millerdaniel@example.com', 1, 0.08, '1972-08-14T07:11:11', 'Paid');
INSERT INTO Bid VALUES (9, 'help involve', 'chris36@example.net', 8, 1679.43, '1976-06-07T06:08:49', 'Highest');
INSERT INTO Bid VALUES (10, 'official raise', 'cgarza@example.org', 8, 7.71, '1986-11-06T00:31:55', NULL);
INSERT INTO Donation VALUES (1, 'Mrs increase', 'chris36@example.net', 11, 96447.01, '1983-07-15T13:57:45');
INSERT INTO Donation VALUES (2, 'late themselves', 'ronald84@example.org', 12, 37.95, '1994-07-22T08:03:24');
INSERT INTO Donation VALUES (3, 'much seven', 'harrislatasha@example.org', 17, 4.95, '1974-05-26T23:36:59');
INSERT INTO Donation VALUES (4, 'help involve', 'chris36@example.net', 11, 0.87, '2016-10-28T02:08:57');
INSERT INTO Donation VALUES (5, 'knowledge international', 'ronald84@example.org', 14, 726.49, '1980-10-30T02:44:52');
INSERT INTO Donation VALUES (6, 'help involve', 'chris36@example.net', 15, 16.56, '2010-10-29T22:56:36');
INSERT INTO Donation VALUES (7, 'kitchen especially', 'harrislatasha@example.org', 14, 87044.52, '1973-03-29T16:55:58');
INSERT INTO Donation VALUES (8, 'provide customer', 'millerdaniel@example.com', 11, 7.98, '1977-11-27T12:13:54');
INSERT INTO Donation VALUES (9, 'help involve', 'chris36@example.net', 19, 2167.84, '1971-05-28T10:16:57');
INSERT INTO Comment VALUES (1, 'woodgregory@example.net', 5, 'indeed war fact', '2019-03-31T12:41:15');
INSERT INTO Comment VALUES (2, 'rwalter@example.org', 9, 'degree same sort', '1979-01-27T17:13:38');
INSERT INTO Comment VALUES (3, 'woodgregory@example.net', 4, 'rise system sense', '1999-08-13T23:01:18');
INSERT INTO Comment VALUES (4, 'harrislatasha@example.org', 6, 'huge clearly car', '1976-08-13T19:43:55');
INSERT INTO Comment VALUES (5, 'cgarza@example.org', 5, 'former upon sport', '1971-02-20T11:26:26');
INSERT INTO Comment VALUES (6, 'ronald84@example.org', 2, 'for onto stay', '1983-10-21T03:16:56');
INSERT INTO Comment VALUES (7, 'cgarza@example.org', 4, 'brother church our', '1996-10-15T18:22:07');
INSERT INTO Comment VALUES (8, 'ronald84@example.org', 10, 'mission media enough', '2014-08-04T06:15:16');
INSERT INTO Comment VALUES (9, 'ronald84@example.org', 10, 'by movement quite', '1992-01-13T01:35:47');
INSERT INTO Chat VALUES (1,  'per truth article');
INSERT INTO Chat VALUES (2,  'day activity process');
INSERT INTO Chat VALUES (3,  'tell oil front');
INSERT INTO Chat VALUES (4,  'stock democratic federal');
INSERT INTO Chat VALUES (5,  'religious summer between');
INSERT INTO Chat VALUES (6,  'significant attorney investment');
INSERT INTO Chat VALUES (7,  'head site benefit');
INSERT INTO Chat VALUES (8,  'improve thing eight');
INSERT INTO Chat VALUES (9,  'door expert sea');
INSERT INTO Chat VALUES (10,  'white remain quality');
INSERT INTO PrivateMessage VALUES (1, 'hallmatthew@example.org', 8, 'life popular million', '1988-03-22T06:53:17');
INSERT INTO PrivateMessage VALUES (2, 'jeffreyreeves@example.org', 9, 'despite medical safe', '2003-08-31T22:31:43');
INSERT INTO PrivateMessage VALUES (3, 'woodgregory@example.net', 4, 'expect watch right', '2002-11-24T10:16:00');
INSERT INTO PrivateMessage VALUES (4, 'harrislatasha@example.org', 10, 'foot understand little', '1972-07-16T19:26:26');
INSERT INTO PrivateMessage VALUES (5, 'millerdaniel@example.com', 7, 'authority open over', '2016-10-10T05:51:15');
INSERT INTO PrivateMessage VALUES (6, 'jeffreyreeves@example.org', 9, 'pull best chair', '2013-02-23T11:30:18');
INSERT INTO PrivateMessage VALUES (7, 'jeffreyreeves@example.org', 10, 'lose return customer', '2015-04-30T20:26:52');
INSERT INTO PrivateMessage VALUES (8, 'woodgregory@example.net', 4, 'star process election', '2004-07-30T07:56:19');
INSERT INTO PrivateMessage VALUES (9, 'woodgregory@example.net', 4, 'case book spring', '1970-04-23T22:22:17');
INSERT INTO EngagedIn VALUES ('harrislatasha@example.org', 10);
INSERT INTO EngagedIn VALUES ('millerdaniel@example.com', 7);
INSERT INTO EngagedIn VALUES ('chris36@example.net', 5);
INSERT INTO EngagedIn VALUES ('jeffreyreeves@example.org', 9);
INSERT INTO EngagedIn VALUES ('hallmatthew@example.org', 8);
INSERT INTO EngagedIn VALUES ('chris36@example.net', 1);
INSERT INTO EngagedIn VALUES ('jeffreyreeves@example.org', 10);
INSERT INTO EngagedIn VALUES ('woodgregory@example.net', 4);
INSERT INTO EngagedIn VALUES ('millerdaniel@example.com', 4);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 1);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 2);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 3);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 4);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 5);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 6);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 7);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 8);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 9);
INSERT INTO EngagedIn VALUES ('inallchats1@gmail.com', 10);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 1);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 2);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 3);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 4);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 5);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 6);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 7);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 8);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 9);
INSERT INTO EngagedIn VALUES ('inallchats2@gmail.com', 10);
INSERT INTO Likes VALUES ('karen15@example.com', 8);
INSERT INTO Likes VALUES ('millerdaniel@example.com', 9);
INSERT INTO Likes VALUES ('chris36@example.net', 3);
INSERT INTO Likes VALUES ('ronald84@example.org', 4);
INSERT INTO Likes VALUES ('jeffreyreeves@example.org', 6);
INSERT INTO Likes VALUES ('cgarza@example.org', 5);
INSERT INTO Likes VALUES ('harrislatasha@example.org', 7);
INSERT INTO Likes VALUES ('rwalter@example.org', 2);
INSERT INTO Likes VALUES ('rwalter@example.org', 10);

--Re-align serial values in tables with "id" primary key.
SELECT setval(pg_get_serial_sequence('post', 'postid'), COALESCE(max(postid) + 1, 1)) FROM Post;
SELECT setval(pg_get_serial_sequence('auction', 'postid'), COALESCE(max(postid) + 1, 1)) FROM Auction;
SELECT setval(pg_get_serial_sequence('fundraiser', 'postid'), COALESCE(max(postid) + 1, 1)) FROM Fundraiser;
SELECT setval(pg_get_serial_sequence('bid', 'bidid'), COALESCE(max(bidid) + 1, 1)) FROM Bid;
SELECT setval(pg_get_serial_sequence('donation', 'donationid'), COALESCE(max(donationid) + 1, 1)) FROM Donation;
SELECT setval(pg_get_serial_sequence('comment', 'commentid'), COALESCE(max(commentid) + 1, 1)) FROM Comment;
SELECT setval(pg_get_serial_sequence('chat', 'chatid'), COALESCE(max(chatid) + 1, 1)) FROM Chat;
SELECT setval(pg_get_serial_sequence('privatemessage', 'messageid'), COALESCE(max(messageid) + 1, 1)) FROM PrivateMessage;