class Activity {
  constructor(userId, activityData) {
    this.id = userId;
    this.activityData = activityData;
  }
  getDateData(user, date) {
    const dateData = user.activityData.find(datum => {
      return datum.date === date
    });
    return dateData
  }
  getStrideLength(user) {
    let userData = allUsers.find(el => el.id === user.userID);
    let strideLength = userData.strideLength;
    return strideLength;
  }
  getMilesWalked(user, date) {
    let dateData = this.getDateData(user, date)
    let strideLength = this.getStrideLength(user)
    let milesWalkedByDate = ((dateData.numSteps) * strideLength) / 5280;
    return milesWalkedByDate
  }
  getMinutesActiveByDate(user, date) {
    return (this.getDateData(user, date)).minutesActive
  }
  getAverageMinutesAvtiveForWeek(user, date) {
    let index = user.activityData.findIndex(item => item.date === date);
    let weeklyActivityMinutes = [];
    for (let i = index - 7; i < index; i++) {
      weeklyActivityMinutes.push(user.activityData[i].minutesActive)
    }
    return (weeklyActivityMinutes.reduce((a, b) => a + b) / 7)
  }
  compareStepsToStepGoal(user, date) {
    let stepCount = (this.getDateData(user, date)).numSteps;
    let stepGoal = (allUsers.find(el => el.id === user.userID)).dailyStepGoal;
    return stepCount >= stepGoal ? true : false;
  }
  getDaysThatExceedStepGoal() {
    
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  var allUsers = require('../data/users')
  module.exports = Activity;
}