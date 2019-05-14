const chai = require('chai');
const expect = chai.expect;
const Sleep = require('../src/Sleep.js');
describe('Sleep', function() {
  let sampleSleepData;

  beforeEach(function() {
    sampleSleepData = {
      "userID": 1,
      "sleepData": [
        {
          "date": "06/05/2019",
          "hoursSlept": 8,
          "sleepQuality": 4.8
        },
        {
          "date": "07/05/2019",
          "hoursSlept": 10.7,
          "sleepQuality": 4.8
        },
        {
          "date": "08/05/2019",
          "hoursSlept": 8.1, 
          "sleepQuality": 1.9
        },
        {
          "date": "09/05/2019",
          "hoursSlept": 4.5,
          "sleepQuality": 3.4
        },
        {
          "date": "10/05/2019",
          "hoursSlept": 10.7,
          "sleepQuality": 4.3
        },
        {
          "date": "11/05/2019",
          "hoursSlept": 5.6,
          "sleepQuality": 3.5
        },
        {
          "date": "12/05/2019",
          "hoursSlept": 10.1,
          "sleepQuality": 1.7
        },
        {
          "date": "13/05/2019",
          "hoursSlept": 10.1,
          "sleepQuality": 3.2
        },
        {
          "date": "14/05/2019",
          "hoursSlept": 10.5,
          "sleepQuality": 2
        },
        {
          "date": "15/05/2019",
          "hoursSlept": 6.1,
          "sleepQuality": 2.9
        },
        {
          "date": "16/05/2019",
          "hoursSlept": 8.7,
          "sleepQuality": 4.2
        },
        {
          "date": "17/05/2019",
          "hoursSlept": 10.1,
          "sleepQuality": 4.4
        },
        {
          "date": "18/05/2019",
          "hoursSlept": 10.9,
          "sleepQuality": 2.5
        },
        {
          "date": "19/05/2019",
          "hoursSlept": 4.6,
          "sleepQuality": 1.9
        }
      ]
    }
  })


  it('should create instances of sleep', function () {
    const sleep = new Sleep();
    expect(sleep).to.be.an.instanceOf(Sleep);
  });
  
  it('should return average number of hours slept per day', function() {
    const sleep = new Sleep();
    expect(sleep.getAverageSleepHours(sampleSleepData)).to.equal(8.478571428571428)
  });

  it('should return average sleep quality per day', function() {
    const sleep = new Sleep();
    expect(sleep.getAverageSleepQuality(sampleSleepData)).to.equal(3.25)
  })
  it('should display hours slept by date', function () {
    const sleep = new Sleep();
    expect(sleep.getSleepHoursByDate(sampleSleepData, '12/05/2019')).to.equal(10.1);
  })
  it('should display sleep quality by date', function() {
    const sleep = new Sleep();
    expect(sleep.getSleepQualityByDate(sampleSleepData, '12/05/2019')).to.equal(1.7);
  })
  it('should get a weeks worth of sleep hours by the date', function() {
    const sleep = new Sleep();
    expect(sleep.getDailySleepHoursByWeek(sampleSleepData, '19/05/2019')).to.eql([10.1, 10.1, 10.5, 6.1, 8.7, 10.1, 10.9]);
  })
  it('should get a weeks worth of sleep Quality by the date', function() {
    const sleep = new Sleep();
    expect(sleep.getDailySleepQualityByWeek(sampleSleepData, '19/05/2019')).to.eql([1.7, 3.2, 2, 2.9, 4.2, 4.4, 2.5]);
  });
})