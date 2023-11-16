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
