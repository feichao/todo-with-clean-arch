const ids =  {
  createTodoID() {
    return Math.ceil(100000001 + 99999998 * Math.random())
  },
  createUserID() {
    return Math.ceil(900000001 + 99999998 * Math.random())
  }
}

export default ids;