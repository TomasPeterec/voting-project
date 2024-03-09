const { parseEmails } = require('./parsingEmailFromString')

test('Parse emails and names correctly', () => {
  const input = 'Tomas Peterec <info@tomaspeterec.sk>, Tomas Peterec <tomas.peterec77@gmail.com>'
  const expectedOutput = [
    { mail: 'info@tomaspeterec.sk', name: 'Tomas Peterec' },
    { mail: 'tomas.peterec77@gmail.com', name: 'Tomas Peterec' }
  ]

  expect(parseEmails(input)).toEqual(expectedOutput)
})
