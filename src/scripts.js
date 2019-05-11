const userRepository = new UserRepository()
const hydrationRepository = new HydrationRepository();

const users = userRepository.instantiateUsers();
const waters = hydrationRepository.instantiateHydration();

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

// let hydrationUserData = hydrationRepository.getHydrationDataFromId(instantiatedUser.id);
// // let hydrationUserDataByDate = hydrationUserData.hydrationData.find(item => item.date === todaysDate);
// console.log(hydrationUserData)


let instantiatedWater = waters.find(item => item.id === instantiatedUser.id)

let hydrationIndex = instantiatedWater.hydrationData.findIndex(item => item.date === todaysDate);

let fluidIntakeByDate = instantiatedWater.getFluidIntakeByDate(instantiatedWater, todaysDate);

console.log(instantiatedUser);
console.log(instantiatedWater);

$(document).ready(() => {
  $('main').append( 
    "<article class='main-widget'>" +
      `<p class='main-widget__address'>Address: ${instantiatedUser.address} </p>` +
      `<p class='main-widget__email'>Email: ${instantiatedUser.email} </p>` +
      `<p class='main-widget__Stride'>Stride: ${instantiatedUser.strideLength} </p>` +
      `<p class='main-widget__daily-step'>Daily Step Goal: ${instantiatedUser.dailyStepGoal}</p>` +
    "</article> "
  )
  $('main').append( 
    "<article class='main-widget'>" +
      `<p class='main-widget__date'>Date: ${todaysDate} </p>` +
      `<p class='main-widget__'>Number of Oz Today: ${fluidIntakeByDate} </p>` +
      `<p class='main-widget__'>Number of Oz Last Week: ${instantiatedWater.getDailyFluidIntakeByWeek(instantiatedWater, hydrationIndex)} </p>` +
    "</article> "
  )
  $('.footer-greeting-js').append(`Hello, ${instantiatedUser.getFirstName()}!  Your daily step goal is ${compareStepGoal(instantiatedUser)} average.`);
});

