# Fetch Backend Internship - Points Management API

This project is a backend solution for managing points across different payers and transactions. It allows for adding points, spending points, and retrieving the current balance of points per payer. Below are the instructions for setting up and running the server, as well as executing tests for the API.

## Prerequisites
To run the project, make sure you have the following installed:
- **Node.js**: You can download it from [here](https://nodejs.org/).
- **Nodemon**: Nodemon is a tool that automatically restarts your server when code changes. Install it globally by running `npm install -g nodemon`.
- **Axios**: The test file uses Axios for making HTTP requests. If not already installed, run `npm install axios`.

## Project Setup
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   Run the following command to install the necessary Node.js packages for the project:
   ```bash
   npm install
   ```

## Starting the Server
To start the server, follow these steps:

1. Open a terminal window, navigate to the project directory, and run the following command:
   ```bash
   nodemon server.js
   ```

2. The server will start on port **8000** by default. You should see a message in the terminal like:
   ```bash
   Server started on http://localhost:8000
   ```

## Running Tests
There is a `test.js` file included to simulate requests to the API. This includes adding transactions, spending points, and checking balances.

1. Open another terminal tab (while the server is running in the first tab) and run:
   ```bash
   node test.js
   ```

2. The test file will send requests to the API and print responses for actions like adding transactions, spending points, and checking balances.

### Adding More Tests
If you'd like to add more test cases in the `test.js` file, you can follow the format below:

#### Example Test Case: Adding a Transaction
```javascript
// Add a transaction for DANNON
response = await axios.post('http://localhost:8000/add', {
  payer: 'DANNON',
  points: 300,
  timestamp: '2022-10-31T10:00:00Z'
});
console.log('Add transaction response:', response.data);
```

#### Example Test Case: Spending Points
```javascript
// Spend 5000 points
const spendResponse = await axios.post('http://localhost:8000/spend', { points: 5000 });
console.log('Spend response:', spendResponse.data);
```

#### Example Test Case: Checking Balance
```javascript
// Check the current balance
const balanceResponse = await axios.get('http://localhost:8000/balance');
console.log('Balance response:', balanceResponse.data);
```

## Key Endpoints

### Add Points (`/add`)
- **Method**: `POST`
- **Description**: Adds points for a specified payer.
- **Request Body**:
  ```json
  {
    "payer": "DANNON",
    "points": 300,
    "timestamp": "2022-10-31T10:00:00Z"
  }
  ```
- **Response**: Status code `200` on success.

### Spend Points (`/spend`)
- **Method**: `POST`
- **Description**: Spends points in a first-in, first-out order by timestamp. The request specifies the number of points to be spent, and the API decides which payers to deduct points from.
- **Request Body**:
  ```json
  { "points": 5000 }
  ```
- **Response**: An array of payers and the points spent, e.g.:
  ```json
  [
    { "payer": "DANNON", "points": -300 },
    { "payer": "UNILEVER", "points": -200 },
    { "MILLER COORS", "points": -4700 }
  ]
  ```

### Check Balance (`/balance`)
- **Method**: `GET`
- **Description**: Retrieves the current balance of points per payer.
- **Response**:
  ```json
  {
    "DANNON": 1000,
    "UNILEVER": 0,
    "MILLER COORS": 5300
  }
  ```