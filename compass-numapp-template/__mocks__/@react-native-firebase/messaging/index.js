const messaging = jest.fn(() => {
  return {
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(1)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  };
});

messaging.AuthorizationStatus = {
  NOT_DETERMINED: -1,

  DENIED: 0,

  AUTHORIZED: 1,

  PROVISIONAL: 2,
};

export default messaging;
