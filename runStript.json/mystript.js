name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches: '*'

jobs:
  build-and-test:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        node-version: [10.x, 12.x, 14.x, 16.x, 18.x]
        os: [ubuntu-latest, windows-latest, centos-latest]

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install Node Dependencies
        run: npm ci

      - name: Build Project (if present)
        run: npm run build --if-present

      - name: Run Tests
        run: npm test
