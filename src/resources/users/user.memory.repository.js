const taskService = require('../tasks/task.service');
const idHelper = require('../../helpers/currentIdHelper');

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

const getById = async userId => USER_DATA.find(user => user.id === userId);

const addUser = async user => USER_DATA.push(user);

const updateUser = async (userId, reqBody) => {
  const currentUserIndex = idHelper(userId, USER_DATA);
  if (currentUserIndex !== null) {
    const updatedUser = {
      id: USER_DATA[currentUserIndex].id,
      ...reqBody
    };
    USER_DATA[currentUserIndex] = updatedUser;
    return updatedUser;
  }
  return null;
};

const deleteUser = async userId => {
  const currentUserIndex = idHelper(userId, USER_DATA);
  if (currentUserIndex !== null) {
    await taskService.setUserIdAsNull(userId);
    return USER_DATA.splice(currentUserIndex, 1);
  }
  return null;
};

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
