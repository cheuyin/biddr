# API docs

## Wallets

- GET all wallets for a user: `http://localhost:8000/api/wallets/harrislatasha@example.org/`
- GET one wallet for a user: `http://localhost:8000/api/wallets/harrislatasha@example.org/kitchen especially`
- POST `http://localhost:8000/api/wallets`

```json
{
  "walletName": "test",
  "email": "ronald84@example.org"
}
```

- DELETE `http://localhost:8000/api/wallets`

```json
{
  "walletName": "test",
  "email": "ronald84@example.org"
}
```

- PUT set balance for a wallet: `http://localhost:8000/api/wallets/harrislatasha@example.org/kitchen especially`

```json
{
  "balance": 6969.42
}
```

## Posts

- GET post by ID: `http://localhost:8000/api/posts/9`
- GET posts by user: `http://localhost:8000/api/users/cgarza@example.org/posts`
- GET posts in community: `http://localhost:8000/api/communities/beautiful/posts`
- POST post (auction or fundraiser): `http://localhost:8000/api/posts`

```json
{
  "type": "auction",
  "postedEmail": "cgarza@example.org",
  "walletName": "late themselves",
  "walletEmail": "ronald84@example.org",
  "communityName": "beautiful",
  "expiryTime": "2007-04-17T08:21:49.000Z",
  "text": "test post",
  "image": null,
  "title": "This is a test post by API",
  "value": 6969.69
}
```

- DELETE post by ID: `http://localhost:8000/api/posts/22`. NOTE: delete doesn't currently work because we have not implemented ON DELETE CASCADE

## App User

- GET user by email: `http://localhost:8000/api/users/email@example.org`
- POST new user: `http://localhost:8000/api/users/`

```json
{
  "email": "email@example.org",
  "username": "username",
  "profilePicture": null,
  "fullName": "example",
  "password": "password",
  "bio": "this is a bio",
  "dateOfBirth": "2002-02-28",
  "location": "canada"
}
```

- PUT new user information: `http://localhost:8000/api/users/email@example.org`

```json
{
  "email": "email@example.org",
  "username": "username",
  "profilePicture": null,
  "fullName": "example",
  "bio": "this is a bio",
  "dateOfBirth": "2002-02-28",
  "location": "canada"
}
```

- PUT new user password: `http://localhost:8000/api/users/email@example.org/password`

```json
{
  "email": "email@example.org",
  "password": "newpassword"
}
```

- GET user communities: `http://localhost:8000/api/users/email@example.org/communities`

### Non-exposed AppUser endpoints

- GET user by username (used to check if new username doesn't already exist when a user is created/changed)

### Non-exposed LocationDateOfBirthIsLegalAge endpoints

- POST new LocationDateOfBirthIsLegalAge tuple (creates a new tuple in this table when a user signs up with a unique dateOfBirth/location pair)
- GET LocationDateOfBirthIsLegal tuple by location/dateOfBirth (used during sign-up to check if there already exists a tuple with the same dateOfBirth/location pair)

## LocationAgeOfMajority

- GET all LocationAgeOfMajority values: `http://localhost:8000/api/users/locations`

### Non-exposed LocationAgeOfMajority endpoints

- GET LocationAgeOfMajority by location (used to access ageOfMajority when determining isLegalAge)

## Bids

- GET all bids by wallet: `http://localhost:8000/api/wallets/cgarza@example.org/official raise/bids`
- GET bid by id: `http://localhost:8000/api/bids/10`
- GET all bids for post: `http://localhost:8000/api/posts/8/bids`
- GET highest bid amount for an auction: `http://localhost:8000/api/posts/8/bids/highest`
- POST bid `http://localhost:8000/api/bids`

```json
{
  "walletName": "official raise",
  "email": "cgarza@example.org",
  "postId": 8,
  "amount": 5003
}
```

Note, this POST request return 422 error if price is not higher than existing biggest bid. It also updates all status of relevant bids to NULL and sets the new bid 'highest'.

## Donations

- GET all donations for a post: `http://localhost:8000/api/posts/11/donations`
- GET all donations by wallet: `http://localhost:8000/api/wallets/chris36@example.net/help involve/donations`
- GET donation by id: `http://localhost:8000/api/donations/4`
- POST donation `http://localhost:8000/api/donations`

```json
{
  "walletName": "help involve",
  "email": "chris36@example.net",
  "postId": 11,
  "amount": 69.42
}
```
