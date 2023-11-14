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
