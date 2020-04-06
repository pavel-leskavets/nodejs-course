const USER_DATA = [
  {
    id: '9bc061c9-c548-40a2-a7c0-0e32f8ea5ae9',
    name: 'Max',
    login: 'MadMax',
    password: 'sdfsdfsdf'
  },
  {
    id: 'dd738cf9-b578-4d34-989e-227dc9483b6e',
    name: 'John',
    login: 'Wilkes ',
    password: 'Booth'
  },
  {
    id: 'ba9dd268-f6e4-4c87-91aa-4850038ffc3b',
    name: 'Lee',
    login: 'Harvey',
    password: 'Oswald'
  }
];

const getAll = async () => USER_DATA;

module.exports = { getAll, USER_DATA };
