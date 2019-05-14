class SleepRepository {
  constructor(dataFilepath) {
    this.dataFilepath = dataFilepath;
    this.sleepData = this.findFilePath(dataFilepath)
  }

  getIndex(date) {
    let allSleepData = this.sleepData.map(el => {
      return el.sleepData.slice().reverse();
    })
    let dates = allSleepData[0].map(el => el.date);
    return dates.indexOf(dates);
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

  getSleepQualityAboveThree(date) {
    let indicesAboveThree = [];
    let qualities = this.sleepData.reduce((acc, cur) => {
      let day = cur.sleepData.findIndex(currDate => currDate.date === date);
      let week = cur.sleepData.slice(day, day + 7)
      acc.push(Number((week.reduce((accu, curr) => {
        accu = accu + curr.sleepQuality
        return accu 
      }, 0) / 7).toFixed(2)))
      return acc
    }, []) 
    qualities.forEach((el, index) => {
      if (el >= 3) {
        indicesAboveThree.push(index + 1)
      }
    })
  }

  getLaziestPerson(source, date) {
    let userIds = [];
    let hours = [];
    let final = [];
    this.sleepData.forEach(user => {
      userIds.push(user.userID)
      user.sleepData.forEach(day => {
        if (day.date  === date) {
          hours.push(day.hoursSlept)
        }
      })
    })
    let max = Math.max(...hours)
    hours.forEach((el, index)=> {
      if (el === max) {
        final.push([el, userIds[index + 1 ]])
      }
    })
    return final.map(item => {
      return item = item[1]
    })
    
  }
  findFilePath(dataFilepath) {
    if (typeof module !== 'undefined') {
      return require(dataFilepath);
    } else {
      return sleepData;
    }
  }
   
  instantiateSleepers() {
    return sleepData.map(datum => datum = new Sleep(datum.userID, datum.sleepData));
  }
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = SleepRepository;
}