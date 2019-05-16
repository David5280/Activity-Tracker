class ActivityGoals {
  constructor(allUsers) {
    this.allUsers = allUsers
  }

  getStrideLength(user) {
    let userData = allUsers.find(el => el.id === user.userID);
    let strideLength = userData.strideLength;
    return strideLength;
  }

  getStepsByDate(user, date) {
    let dateData = this.getDateData(user, date)
    let todaysSteps = dateData.numSteps
    return todaysSteps
  }
}