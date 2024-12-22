# Blog

## Running
First, migrate the database
```
pnpm prisma migrate deploy
```

If the database is not seeded, run
```
pnpm tsx prisma/seed.ts
```

To run the project, execute
```
pnpm dev [--open]
```

To build the project, execute
```
pnpm build
```
