// Dimensions.js inside __mocks__ folder

const mockEventListener = jest.fn((type, handler) => {handler();});

const Dimensions = {
  get: jest.fn().mockReturnValue({width: 100, height:100}),
  addEventListener: mockEventListener,
  removeEventListener: mockEventListener,
};

export {Dimensions, mockEventListener};