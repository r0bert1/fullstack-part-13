## Database

Start PostgreSQL container with persistent data:

```bash
docker run --name my-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d \
  postgres
```

Access the database:

```
docker exec -it <container_id> psql -U postgres postgres
```
