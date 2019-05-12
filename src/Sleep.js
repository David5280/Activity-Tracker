class Sleep {
  constructor(userId, sleepData) {
    this.id = userId;
    this.sleepData = sleepData;
  }

  getAverageSleepHours(user) {
    return user.sleepData.reduce((acc, sleepHours) => {
      acc += sleepHours.hoursSlept
      return acc;
    }, 0) / user.sleepData.length
  }

  getAverageSleepQuality(user) {
    return user.sleepData.reduce((acc, sleepData) => {
      acc += sleepData.sleepQuality
      return acc;
    }, 0) / user.sleepData.length
  }
  getSleepQualityByDate(user, date) {
    const dateData = user.sleepData.find(datum => {
      return datum.date === date
    });
    return dateData.sleepQuality;
  }
  getSleepHoursByDate(user, date) {  
    const dateData = user.sleepData.find(datum => {
      return datum.date === date
    });
    return dateData.hoursSlept;
  }
  getDailySleepHoursByWeek(user, date) {
    let index = user.sleepData.findIndex(item => item.date === date);
    let weeklySleep = [];
    for (let i = index - 7; i < index; i++) {
      weeklySleep.push(user.sleepData[i].hoursSlept)
    }
    return weeklySleep;
  }
  getDailySleepQualityByWeek(user, date) {
    let index = user.sleepData.findIndex(item => item.date === date);
    let weeklyQuality = [];
    for (let i = index - 7; i < index; i++) {
      weeklyQuality.push(user.sleepData[i].sleepQuality)
    }
    return weeklyQuality;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Sleep;
}