/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Essa é a placa de desvio que resolve o erro do UUID:
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
  },
};