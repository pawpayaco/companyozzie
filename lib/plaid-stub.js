// /lib/plaid-stub.js

// This is a placeholder file for integrating Plaid later
// You'll replace this with actual Plaid link/token exchange + ACH flow

export const plaid = {
  connectBank: async (userId) => {
    console.log(`Plaid connectBank called for user ${userId}`);
    // Simulate a Plaid Link session creation
    return { linkToken: 'mock_link_token_for_' + userId };
  },

  exchangePublicToken: async (publicToken) => {
    console.log(`Exchanging Plaid public token: ${publicToken}`);
    // Return a fake access token
    return { accessToken: 'mock_access_token_' + publicToken };
  },

  getBankAccounts: async (accessToken) => {
    console.log(`Fetching accounts for access token: ${accessToken}`);
    return [
      {
        id: 'fake_account_123',
        name: 'Chase Checking',
        type: 'checking',
        mask: '1234',
      },
    ];
  },
};
