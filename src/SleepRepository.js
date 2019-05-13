class SleepRepository {
  constructor(dataFilepath, sleepData) {
    this.dataFilepath = dataFilepath;
    this.sleepData = this.findFilePath(dataFilepath)
  }

  getAverageSleepQuality(sleepData) {
    let averageSleepQualityPerUser = [];
    for (let i = 0; i < sleepData.length; i++) {
      let sleepQualitySum = sleepData[i].sleepData.reduce((acc, datum) => {
        return acc += datum.sleepQuality
      }, 0)
      averageSleepQualityPerUser.push(sleepQualitySum / sleepData[i].sleepData.length);
    }
    return averageSleepQualityPerUser;
  }

  getTotalAverageSleepQuality(sleepData) {
    let averageSleepQuality = this.getAverageSleepQuality(sleepData);
    return averageSleepQuality.reduce((acc, datum) => {
      return acc += datum
    }, 0) / averageSleepQuality.length;
  }

  getSleepQualityAboveThree(user, date) {
    let userClone = {...user}
    let userIDs = [];
    let userData = [];
    let sleepQualities = [];
    for (let i = 0; i < user.length; i++) {
    userIDs.push(userClone[i].userID);
    userData.push(userClone[i].sleepData);
    }
    // console.log(userData);
  console.log(userClone[1].sleepData[3].hoursSlept);
    
    for (let i = 0; i < user.length; i++) {
      userData[i].forEach(item => {
        for(var i = 0; i < sleepData.length; i++) {
          sleepQualities.push(sleepData[i].sleepQuality)
        }
      })
    } 
    // console.log(sleepQualities);
    // console.log(userData)

    // console.log(userClone[1].sleepData[0].sleepQuality)
  }

  findFilePath(dataFilepath) {
    if (typeof module !== 'undefined') {
      return require(dataFilepath);
    } else {
      return sleepData;
    }
  }
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = SleepRepository;
}