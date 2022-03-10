const ids =  {
  createTodoID() {
    return Math.ceil(100000001 + 99999998 * Math.random()).toString();
  },
  createUserID() {
    return Math.ceil(900000001 + 99999998 * Math.random()).toString();
  }
}

export default ids;