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