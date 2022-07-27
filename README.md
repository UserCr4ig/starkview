StarNet Monitoring Dashboard

## Getting Started

1. First, install packages

```bash
npm install
# or
yarn install
```

2. Deploy docker image

```bash
docker-compose up
```

3. Change values in .env.local

```
TWITTER_CONSUMER_KEY="GBicen3gGCBNRBav0lBkI6gT1"
TWITTER_CONSUMER_KEY_SECRET="PfxYby5njOy3IQEVb8qogQgi1mHv1kKDiQdthamPkoKHrnExEY"
TWITTER_BEARER_TOKEN="AAAAAAAAAAAAAAAAAAAAAAIWfQEAAAAApYPMpJiGCtwDKXwYreQ6zhVolgQ%3DADCJeNkfjW9sYxBtKltgF7eFhQ8TUkvg3aWB6kNdcZtwRI8HWw"
TEST_TWITTER_HANDLE="StarkWareLtd"
DATABASE_URL="postgres://myuser:mypassword@localhost:5432/median-db"
```

4. Create Database Model with Prisma

```bash
npx prisma db push
```

5. Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
