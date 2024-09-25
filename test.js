const axios = require('axios');

const runTests = async () => {
  try {
    let response;

    response = await axios.post('http://localhost:8000/add', {
      payer: 'DANNON',
      points: 300,
      timestamp: '2022-10-31T10:00:00Z'
    });
    console.log('Add transaction response:', response.data);

    response = await axios.post('http://localhost:8000/add', {
      payer: 'UNILEVER',
      points: 200,
      timestamp: '2022-10-31T11:00:00Z'
    });
    console.log('Add transaction response:', response.data);

    response = await axios.post('http://localhost:8000/add', {
      payer: 'DANNON',
      points: -200,
      timestamp: '2022-10-31T15:00:00Z'
    });
    console.log('Add transaction response:', response.data);

    response = await axios.post('http://localhost:8000/add', {
      payer: 'MILLER COORS',
      points: 10000,
      timestamp: '2022-11-01T14:00:00Z'
    });
    console.log('Add transaction response:', response.data);

    response = await axios.post('http://localhost:8000/add', {
      payer: 'DANNON',
      points: 1000,
      timestamp: '2022-11-02T14:00:00Z'
    });
    console.log('Add transaction response:', response.data);

    // Spend points
    const spendResponse = await axios.post('http://localhost:8000/spend', { points: 5000 });
    console.log('Spend response:', spendResponse.data);

    // Check balance
    const balanceResponse = await axios.get('http://localhost:8000/balance');
    console.log('Balance response:', balanceResponse.data);

  } catch (error) {
    console.error('Error running tests:', error);
  }
};

runTests();