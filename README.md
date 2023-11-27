# StarkView 
## StarkNet Monitoring Dashboard

StarkNet is a permissionless decentralized ZK-Rollup. It operates as an L2 network over Ethereum, enabling any dApp to achieve unlimited scale for its computation – without compromising Ethereum's composability and security.

[https://starkware.co/starknet/](https://starkware.co/starknet/)

## Getting Started
### 1. First, install packages

```bash
npm install
# or
yarn install
```
### 2. Launch DB instance with docker

```bash
docker-compose up
```
### 3. Duplicate .env.example to .env

Change config values

```
TWITTER_CONSUMER_KEY=""
TWITTER_CONSUMER_KEY_SECRET=""
TWITTER_BEARER_TOKEN=""
TEST_TWITTER_HANDLE="StarkWareLtd"
DATABASE_URL=""
```
### 4. Create Database Model with Prisma

```bash
npx prisma db push
# and
npx prisma generate
```
### 5.  Import Tweets / Repos

```bash
npm run seed-tweets
# and
npm run seed-repos
```
### 6.  Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
