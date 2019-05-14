const userRepository = new UserRepository()
const hydrationRepository = new HydrationRepository();
const sleepRepository = new SleepRepository();
var ctx = $('#hydration-bar-graph');


const users = userRepository.instantiateUsers();
const waters = hydrationRepository.instantiateHydration();
const sleepers = sleepRepository.instantiateSleepers();

let date = new Date();
let todaysDate = (("0" + date.getDate()).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + (date.getFullYear());

console.log(date.getDay() + 4)

const getDayOfWeek = (days = 0) => {
  const fixedDate = date.setDate(date.getDate() + days);
  const dateOfInterest = new Date(fixedDate).getDay();
  var day;
  if (dateOfInterest === 0) {
    day = 'SUN';
  } else if (dateOfInterest === 1) {
    day = 'MON';
  } else if (dateOfInterest === 2) {
    day = 'TUE';
  } else if (dateOfInterest === 3) {
    day = 'WED';
  } else if (dateOfInterest === 4) {
    day = 'THU';
  } else if (dateOfInterest === 5) {
    day = 'FRI';
  } else {
    day = 'SAT';
  }
  return day;
}



var randomId = function generateRandomId() {
  return Math.ceil(Math.random() * 50);
}

var user = userRepository.getUserDataFromId(randomId())
function compareStepGoal(user) {
  return user.dailyStepGoal > userRepository.getAverageStepGoal() ? 'above' : 'below';
}


let instantiatedUser = users.find(item => item.id === user.id)

let instantiatedWater = waters.find(item => item.id === instantiatedUser.id)

let instantiatedSleeper = sleepers.find(item => item.id === instantiatedUser.id)

let hydrationIndex = instantiatedWater.hydrationData.findIndex(item => item.date === todaysDate);

let fluidIntakeByDate = instantiatedWater.getFluidIntakeByDate(instantiatedWater, todaysDate);

let sleepQualityByDate = instantiatedSleeper.getSleepQualityByDate(instantiatedSleeper, todaysDate)

let sleepJoursByDate = instantiatedSleeper.getSleepHoursByDate(instantiatedSleeper, todaysDate)

let sleepHoursByWeek = instantiatedSleeper.getDailySleepHoursByWeek(instantiatedSleeper, todaysDate)

let averageSleepHours = instantiatedSleeper.getAverageSleepHours(instantiatedSleeper)

let averageSleepQuality = instantiatedSleeper.getAverageSleepQuality(instantiatedSleeper)

let yesterday = getDayOfWeek(-1)
let twoDaysAgo =  getDayOfWeek(-1)
let threeDaysAgo =  getDayOfWeek(-1)
let fourDaysAgo =  getDayOfWeek(-1)
let fiveDaysAgo =  getDayOfWeek(-1)
let sixDaysAgo =  getDayOfWeek(-1)
let sevenDaysAgo =  getDayOfWeek(-1)

console.log(yesterday)
console.log(twoDaysAgo)
console.log(threeDaysAgo)
console.log(fourDaysAgo)
console.log(fiveDaysAgo)
console.log(sixDaysAgo)
console.log(sevenDaysAgo)




console.log(instantiatedWater)
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [sevenDaysAgo ,sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday],
    datasets: [{
      label: 'One week ago',
      label: 'Six days ago',
      data: instantiatedWater.getDailyFluidIntakeByWeek(instantiatedWater, hydrationIndex),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Water Consumption this Week (Oz)',
      fontColor: 'black'
    },  
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

$(document).ready(() => {
  $('main').append( 
    "<section class='main-widget'>" +
      `<p class='main-widget__address'>Address: ${instantiatedUser.address} </p>` +
      `<p class='main-widget__email'>Email: ${instantiatedUser.email} </p>` +
      `<p class='main-widget__Stride'>Stride: ${instantiatedUser.strideLength} </p>` +
      `<p class='main-widget__daily-step'>Daily Step Goal: ${instantiatedUser.dailyStepGoal}</p>` +
    "</section> "
  )
  $('.main-widget-hydration').append( 
    `<p class='main-widget__'>Number of Oz Today: ${fluidIntakeByDate} </p>`
  )
  $('main').append( 
    "<section class='main-widget'>" +
      `<p class='main-widget__'>Today's Sleep Stats:<br /> Quality: ${sleepQualityByDate}<br /> Hours Slept: ${sleepJoursByDate} </p>` +
      `<p class='main-widget__'>This Week's Sleep Stats: ${sleepHoursByWeek} </p>` +
      `<p class='main-widget__'>All Time Averages:<br />  Quality: ${Number(averageSleepQuality).toFixed(2)}  <br />  Hours Slept: ${Number(averageSleepHours).toFixed(2)} </p>` +
    "</section> "
  )
  $('.footer-greeting-js').append(`Hello, ${instantiatedUser.getFirstName()}!  Your daily step goal is ${compareStepGoal(instantiatedUser)} average.`);
});

