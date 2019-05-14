const userRepository = new UserRepository()
const hydrationRepository = new HydrationRepository();
const sleepRepository = new SleepRepository();


const users = userRepository.instantiateUsers();
const waters = hydrationRepository.instantiateHydration();
const sleepers = sleepRepository.instantiateSleepers();

let date = new Date();
let todaysDate = (("0" + date.getDate()).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + (date.getFullYear());


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
console.log(sleepJoursByDate);
console.log(instantiatedWater);
console.log(instantiatedSleeper);

$(document).ready(() => {
  $('main').append( 
    "<section class='main-widget'>" +
      `<p class='main-widget__address'>Address: ${instantiatedUser.address} </p>` +
      `<p class='main-widget__email'>Email: ${instantiatedUser.email} </p>` +
      `<p class='main-widget__Stride'>Stride: ${instantiatedUser.strideLength} </p>` +
      `<p class='main-widget__daily-step'>Daily Step Goal: ${instantiatedUser.dailyStepGoal}</p>` +
    "</section> "
  )
  $('main').append( 
    "<section class='main-widget'>" +
      `<p class='main-widget__date'>Date: ${todaysDate} </p>` +
      `<p class='main-widget__'>Number of Oz Today: ${fluidIntakeByDate} </p>` +
      `<p class='main-widget__'>Number of Oz Last Week: ${instantiatedWater.getDailyFluidIntakeByWeek(instantiatedWater, hydrationIndex)} </p>` +
    "</section> "
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

