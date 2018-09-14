$(document).ready(function() {
  
  var addInputs = function() {
   
    var keys = Object.keys(localStorage); //["leg workout", "shoulder workout", 'hi']
    console.log(keys);
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
          
        $workout.html('<h4 class = "workoutKeys"> ' + keys[i] + '</h4>');
        $workout.prependTo($workoutBox);
        $eachWorkout.html('<b>Workout Name: </b>' + workoutName + '<br/> <b>Sets x Reps: </b>' + workoutReps + '<br/> <b>Date: </b>' + new Date());
        $eachWorkout.appendTo($workoutBox);
        $workoutBox.appendTo($workouts);

      } else if((keys[i]).includes('Breakfast') || (keys[i]).includes('Lunch') || (keys[i]).includes('Dinner')) {

          var $mealBox = $('<div class = "mealBox"></div>');
          var $meal = $('<div class = "meal"></div>');
          var $eachMeal = $('<div class = "eachMeal"></div>');
      
          var mealObj = JSON.parse(localStorage[keys[i]]);
          var mealName = mealObj.mealName
          var mealRecipe = mealObj.mealRecipe;
          
          $meal.html('<h4 class = "mealKeys">' + keys[i] + '</h4');
          $meal.prependTo($mealBox);
          $eachMeal.html('<b>Meal Name: </b>' + mealName  +  "<br/> <b>Meal Recipe: </b>" + mealRecipe + '<br/> <b>Date: </b>' + new Date());
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

      mealObj['mealName'] = mealName;
      mealObj['mealRecipe'] = mealRecipe;

      localStorage.setItem(mealType, JSON.stringify(mealObj));


      }
      var localStorageKeys = Object.keys(localStorage);
      var $meals = $('.meals');
      $meals.html('');

      
      addInputs();
  });


   $(".del-workout-btn").on("click", function() {
     alert('Item Deleted'); 
     localStorage.removeItem($('.user-input-workout').val()); // grab the title and plop here
     $(".user-input-workout").val("");
     $(".user-input-workoutName").val("");
     $(".user-input-reps").val("");
     // clearing display? what if I have multiple items?
     // after item is removed from local storage, redisplay items from local storage
     // refresh from storage?
   });

    $(".del-meal-btn").on("click", function() {
     alert('Item Deleted'); 
     localStorage.removeItem($('.user-input-mealType').val()); // grab the title and plop here
     $(".user-input-mealType").val("");
     $(".user-input-mealName").val("");
     $(".user-input-mealIng").val("");
     // clearing display? what if I have multiple items?
     // after item is removed from local storage, redisplay items from local storage
     // refresh from storage?
   });

  var selectWorkout = function (workoutType) {
      $(".workoutBox").not("div:contains('" + workoutType + "')").hide()
  };
  $(document).on("click", "h4.workoutKeys", function() {
      selectWorkout($(this).text());
  })

  
  var selectMeal = function (mealType) {
      $(".mealBox").not("div:contains('" + mealType + "')").hide()
   };
  $(document).on("click", "h4.mealKeys", function() {
      selectMeal($(this).text());
  })

  $(".workout").click(function(e) {
    var workoutObj = JSON.parse(localStorage.getItem(e.target.innerText));
    
    $(".user-input-workout").val(e.target.innerText);
    $(".user-input-workoutName").val(workoutObj.workoutName);
    $(".user-input-reps").val(workoutObj.workoutReps);
  })

  $(".meal").click(function(e) {
    var mealObj = JSON.parse(localStorage.getItem(e.target.innerText));
    
    $(".user-input-mealType").val(e.target.innerText);
    $(".user-input-mealName").val(mealObj.mealName);
    $(".user-input-mealIng").val(mealObj.mealRecipe);
  })




});