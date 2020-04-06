module.exports = (id, data) => {
  const index = data.findIndex(item => item.id === id);
  return index >= 0 ? index : null;
};
