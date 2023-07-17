# SmartBuy Ecommerce Platform

Welcome to SmartBuy Store! This project is an ecommerce platform powered by the BestBuy API. It allows users to browse and purchase a wide range of electronic products, gadgets and some other cool stuff!

## Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (version 18.16.0)
- PNPM (version 8.2.0)

## Installation

1. Clone the repository:

```properties
git clone https://github.com/pedropcruz/smartbuy-store
```

2. Navigate to the project directory:

```properties
cd smartbuy-store
```

3. Install dependencies

```properties
pnpm install
```

# Configuration

1. Obtain an API key from the BestBuy Developer Portal.
2. Rename the .env.example file to .env.
3. Open the .env file and replace `<YOUR_API_KEY>` with your actual BestBuy API key.

# Usage

To start the development server, run the following command:

```properties
pnpm dev
```

Access the application in your browser at http://localhost:3000.

# Running Unit Tests

To run the unit tests, use the following command:

```properties
pnpm test:unit
```

This will execute all the unit tests and display the test results.

# Running end-to-end (e2e) Tests

Before you run this, make sure you have

1. Start the development server (if not already running):

```properties
pnpm test:e2e
```

The e2e tests will simulate user interactions and verify the functionality of the application.
