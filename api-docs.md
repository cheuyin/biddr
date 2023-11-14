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
