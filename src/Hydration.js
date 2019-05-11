class Hydration {
  constructor(userId, hydrationData) {
    this.id = userId;
    this.hydrationData = hydrationData;
  }
  getAverageFluidIntake(user) {
    return user.hydrationData.reduce((fluid, dailyIntake) => {
      fluid += dailyIntake.numOunces
      return fluid;
    }, 0) / user.hydrationData.length
    
  }
  getFluidIntakeByDate(user, date) {  
    const dateData = user.hydrationData.find(datum => {
      return datum.date === date
    });
    return dateData.numOunces
  }
  getDailyFluidIntakeByWeek(user, index) {
    let weeklyFluids = [];
    for(let i = index - 5; i < index; i++) {
      weeklyFluids.push(user.hydrationData[i].numOunces)
    }
    return weeklyFluids;
  }
}
if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Hydration;
}