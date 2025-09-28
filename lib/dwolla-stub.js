// /lib/dwolla-stub.js

// Placeholder for Dwolla payout engine logic
// Replace this with real Dwolla API calls for production payouts

export const dwolla = {
  createCustomer: async (userId, userType) => {
    console.log(`Creating Dwolla customer for ${userType} ${userId}`);
    return {
      customerId: `fake_dwolla_customer_${userId}`,
    };
  },

  linkBankAccount: async (customerId) => {
    console.log(`Linking bank for Dwolla customer ${customerId}`);
    return {
      fundingSourceId: `fake_funding_source_${customerId}`,
    };
  },

  createTransfer: async ({
    fromFundingSourceId,
    toFundingSourceId,
    amount,
    payoutJobId,
  }) => {
    console.log(
      `Creating Dwolla transfer of $${amount} for payout job ${payoutJobId}`
    );
    return {
      transferId: `fake_transfer_${payoutJobId}`,
      status: 'pending',
    };
  },

  checkTransferStatus: async (transferId) => {
    console.log(`Checking status of Dwolla transfer ${transferId}`);
    return {
      transferId,
      status: 'processed', // or 'failed', etc.
    };
  },
};
