class ActivityRepository {
  constructor(dataFilepath) {
    this.dataFilepath = dataFilepath;
    this.activityData = this.findFilePathOne(dataFilepath)
    this.userData = this.findFilePathTwo(dataFilepath)

  }
  
  getIndex(date) {
    let allActivityData = this.activityData.map(el => {
      return el.activityData.slice().reverse();
    })
    let dates = allActivityData[0].map(el => el.date)
    return dates.indexOf(date);
  }
  
  getAverageSteps(data, date) {
    let userSteps = data.map(el=> el.activityData)
    let daySteps = []
    let steps = userSteps.forEach(user => {
      return user.reduce((acc, day) => {
        if (day.date === date) {
          acc += day.numSteps
          daySteps.push(acc)
        }
        return acc
      }, 0)
    })
    return daySteps.reduce((acc, curr) => {
      return acc += curr
    }, 0) / daySteps.length
  }
  
  getAverageStairsClimbed(data, date) {
    let userData = data.map(el=> el.activityData)
    let dayFlights = []
    let flights = userData.forEach(user => {
      return user.reduce((acc, day) => {
        if (day.date === date) {
          acc += day.flightsOfStairs;
          dayFlights.push(acc)
        }
        return acc
      }, 0)
    })
    return dayFlights.reduce((acc, curr) => {
      return acc += curr
    }, 0) / dayFlights.length
  }
  
  getAverageMinutesActive(data, date) {
    let userData = data.map(el=> el.activityData)
    let minutesActive = []
    let minutes = userData.forEach(user => {
      return user.reduce((acc, day) => {
        if (day.date === date) {
          acc += day.minutesActive;
          minutesActive.push(acc)
        }
        return acc
      }, 0)
    })
    return minutesActive.reduce((acc, curr) => {
      return acc += curr
    }, 0) / minutesActive.length
  }

  findFilePathOne(dataFilepath) {
    if (typeof module !== 'undefined') {
      return require(dataFilepath);
    } else {
      return activityData;
    }
  }

  findFilePathTwo(dataFilepath) {
    if (typeof module !== 'undefined') {
      return require(dataFilepath);
    } else { 
      return userData
  }
  }

  instantiateWalkers() {
    return activityData.map(datum => datum = new Activity(datum.userID, datum.activityData, this.userData));
  }
}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = ActivityRepository;
}