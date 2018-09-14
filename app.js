$(document).ready(function() {
  
  var addInputs = function() {
   
    var keys = Object.keys(localStorage); //["leg workout", "shoulder workout", 'hi']
    
    var $workouts = $('.workouts');
    $workouts.html('');

    var $meals = $('.meals');
    $meals.html('');

    for(var i = 0; i < keys.length; i ++) {
      
      if((keys[i]).includes('workout') || (keys[i]).includes('Workout')) {

        var $workoutBox = $('<div class = "workoutBox"></div>');
        var $workout = $('<div class = "workout"></div>');
        var $eachWorkout = $('<div class = "eachWorkout"></div>');
            
        var workoutObj = JSON.parse(localStorage[keys[i]]);
        var workoutName = workoutObj.workoutName;
        var workoutReps = workoutObj.workoutReps;
          
        $workout.text(keys[i]);
        $workout.prependTo($workoutBox);
        $eachWorkout.html('Workout Name: ' + workoutName + '<br/> Sets x Reps: ' + workoutReps);
        $eachWorkout.appendTo($workoutBox);
        $workoutBox.appendTo($workouts);

      } else if((keys[i]).includes('Breakfast') || (keys[i]).includes('Lunch') || (keys[i]).includes('Dinner')) {

          var $mealBox = $('<div class = "mealBox"></div>');
          var $meal = $('<div class = "meal"></div>');
          var $eachMeal = $('<div class = "eachMeal"></div>');
      
          var mealObj = JSON.parse(localStorage[keys[i]]);
          var mealDescription = mealObj.mealDescription;
          var mealRecipe = mealObj.mealRecipe;
          
          $meal.text(keys[i]);
          $meal.prependTo($mealBox);
          $eachMeal.html('Meal description: ' + mealDescription  +  "<br/> Meal Recipe: " + mealRecipe);
          $eachMeal.appendTo($mealBox);
          $mealBox.appendTo($meals);
          console.log(localStorage);
      }
    }
  }

  addInputs();
  

  $(".add-workout-btn").on("click", function() {
    
    var workoutObj = {};

    let workoutType = $(".user-input-workout").val();
    let workoutName = $(".user-input-workoutName").val();
    let workoutReps = $(".user-input-reps").val();

    if(workoutType === "" || workoutName === "" || workoutReps === "") {
      alert('All fields are required')
    } else {
      $(".user-input-workout").val("");
      $(".user-input-workoutName").val("");
      $(".user-input-reps").val("");

      workoutObj['workoutName'] = workoutName;
      workoutObj['workoutReps'] = workoutReps;

      localStorage.setItem(workoutType, JSON.stringify(workoutObj));

      var localStorageKeys = Object.keys(localStorage);
      var $workouts = $('.workouts');
      $workouts.html('');

      addInputs();
    }
  });

    $(".add-meal-btn").on("click", function() {
    
    var mealObj = {};

    let mealType = $(".user-input-mealType").val();
    let mealName = $(".user-input-mealName").val();
    let mealRecipe = $(".user-input-mealIng").val();

    if(mealType === "" || mealName === "" || mealRecipe === "") {
      alert('All fields are required')
    } else {
      $(".user-input-mealType").val("");
      $(".user-input-mealName").val("");
      $(".user-input-mealIng").val("");

      mealObj['mealDescription'] = mealDescription;
      mealObj['mealRecipe'] = mealRecipe;

      localStorage.setItem(mealType, JSON.stringify(mealObj));

      var localStorageKeys = Object.keys(localStorage);
      var $meals = $('.meals');
      $meals.html('');

      
      addInputs();
    }
  });


   $(".del-text-btn").on("click", function() {
     alert('item deleted? check the console'); // maybe change to a window.confirm
     localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     $(".user-input-title").val("");
     $(".user-input-body").val("");
     // clearing display? what if I have multiple items?
     // after item is removed from local storage, redisplay items from local storage
     // refresh from storage?
   });



});