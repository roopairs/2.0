// Dimensions.js inside __mocks__ folder

const mockEventListener = jest.fn((type, handler) => {handler();});

const Dimensions = {
  get: jest.fn().mockReturnValue({width: 500, height:500}),
  addEventListener: mockEventListener,
  removeEventListener: mockEventListener,
};

export {Dimensions, mockEventListener};