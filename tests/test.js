const { getYoutubeInfo } = require('../src/main.js');

describe('Testing youtu-get package', () => {
  const correctInputs = 'PLxQ30nUCB0uNCCKBD_JW1udM7iYH27cu2';
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  test(
    '\nTesting getYoutubeInfo function with correct inputs' +
      `\nyoutube playlist id: ${correctInputs}`,
    async () => {
      expect(await getYoutubeInfo(correctInputs)).toMatchSnapshot();
    }
  );

  const wrongInputs = [
    '0',
    '11',
    '222',
    '3333',
    '44444',
    '555555',
    '6666666',
    '77777777',
    '888888888',
    '9999999999',
    'aaaaaaaaaaa',
    123456789012,
    null,
    {},
    [],
    undefined,
    NaN,
    ' ',
    '',
    false,
    true,
    'undefined',
    'null',
  ];

  wrongInputs.map((input) =>
    test(`Testing getYoutubeInfo function with uncorrect inputs: ${input}`, async () => {
      expect(await getYoutubeInfo(input)).toMatchSnapshot();
    })
  );
});
