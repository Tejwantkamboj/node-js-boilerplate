# node-js-boilerplate

## Docker setup

1. Create a project env file:

```bash
cp .env.docker.example .env
```

2. Start the API and MongoDB:

```bash
docker compose up --build
```

3. Open the API on `http://localhost:3000`.

Notes:

- The app container reads `.env` from the project root.
- In Docker, `MONGODB_URL` should use `mongo` as the hostname because that is the Compose service name.
