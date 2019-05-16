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

  getStrideLength(userx) {
    let strideLength = user.strideLength;
    return strideLength;
  }

  getMilesWalked(userx, date) {
    let dateData = this.getDateData(userx, date)
    let strideLength = this.getStrideLength(userx)
    let milesWalkedByDate = ((dateData.numSteps) * strideLength) / 5280;
    return milesWalkedByDate
  }

  getStairsClimbedByDate(user, date) {
    let dateData = this.getDateData(user, date)
    let stairsByDate = dateData.flightsOfStairs
    return stairsByDate
  }
  getStairsClimbedForWeek(user, date) {
    let index = user.activityData.findIndex(item => item.date === date);
    let weeklyStairs = [];
    for (let i = index - 7; i < index; i++) {
      weeklyStairs.push(user.activityData[i].flightsOfStairs)
    }
    return weeklyStairs
  }
  getStepsSteppedForWeek(user, date) {
    let index = user.activityData.findIndex(item => item.date === date);
    let stepsTaken = [];
    for (let i = index - 7; i < index; i++) {
      stepsTaken.push(user.activityData[i].numSteps)
    }
    
    return stepsTaken
  }
  getStepsByDate(user, date) {
    let dateData = this.getDateData(user, date)
    let todaysSteps = dateData.numSteps
    return todaysSteps
  }

  getMinutesActiveByDate(user, date) {
    return (this.getDateData(user, date)).minutesActive
  }
  getMinutesActiveForWeek(user, date) {
    let index = user.activityData.findIndex(item => item.date === date);
    let weeklyActivityMinutes = [];
    for (let i = index - 7; i < index; i++) {
      weeklyActivityMinutes.push(user.activityData[i].minutesActive)
    }
    return weeklyActivityMinutes
  }
  getAverageMinutesActiveForWeek(user, date) {
    return this.getMinutesActiveForWeek(user, date).reduce((a, b) => a + b) / 7

  }

  compareStepsToStepGoal(user, date) {
    let stepCount = (this.getDateData(user, date)).numSteps;
    let stepGoal = (userData.find(el => el.id === user.userID)).dailyStepGoal;
    return stepCount >= stepGoal ? true : false;
  }

  getDaysThatExceedStepGoal(user) {
    let userActivityData = user.activityData;
    let userDates = userActivityData.map(el => el.date)
    let result = [];
    let stepGoal = (userData.find(el => el.id === user.userID)).dailyStepGoal;
    let stepsPerDay = (userActivityData.map(el => el.numSteps))
    stepsPerDay.forEach((el, index) => {
      if (el > stepGoal) {
        result.push(userDates[index])
      }
    })
    return result
  }

  getStairClimbRecord(user) {
    let userActivityData = user.activityData
    let userStairData = userActivityData.map(el => el.flightsOfStairs)
    return Math.max(...userStairData)
  }

  getMinutesActiveRecord(user) {
    let userActivityData = user.activityData
    let userActiveData = userActivityData.map(el => el.minutesActive)
    return Math.max(...userActiveData)
  }
  
  
  findFilePath(dataFilepath) {
    if (typeof module !== 'undefined') {
      return require(dataFilepath);
    } else { 
      return userData
    }
  }
}






if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  userData = require('../data/users')
  module.exports = Activity;
}