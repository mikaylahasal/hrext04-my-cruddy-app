// var selectedWorkout = undefined;
$(document).ready(function() {
  
  var addInputs = function() {
    
    var keys = Object.keys(localStorage); //["leg workout", "shoulder workout", 'hi']
  
    var $workouts = $('.workouts');
    $workouts.html('');

    var $meals = $('.meals');
    $meals.html('');

    for(var i = 0; i < keys.length; i ++) {
      
      if((keys[i]).includes('workout') || (keys[i]).includes('Workout')) {

  
        var workoutArray = JSON.parse(localStorage[keys[i]]);
        for(var j = 0; j < workoutArray.length; j++) {
          var $workoutBox = $('<div class = "workoutBox"></div>');
          var $workout = $('<div class = "workout"></div>');
          var $eachWorkout = $('<div id=' + j.toString() + ' class = "eachWorkout"></div>');
         
          var workoutName = (workoutArray[j]).workoutName;
          var workoutReps = (workoutArray[j]).workoutReps;
        
        $workout.html('<h4 class = "workoutKeys"> ' + keys[i] + '</h4>');
        $workout.prependTo($workoutBox);
        $eachWorkout.html('Workout Name: ' + workoutName + '<br/> Sets x Reps: ' + workoutReps);
        $eachWorkout.appendTo($workoutBox);
        $workoutBox.appendTo($workouts);
        }
          
        

      } else if((keys[i]).includes('Breakfast') || (keys[i]).includes('Lunch') || (keys[i]).includes('Dinner')) {
          var mealArray = JSON.parse(localStorage[keys[i]]);
          for(var k = 0; k < mealArray.length; k++) {
            var $mealBox = $('<div class = "mealBox"></div>');
            var $meal = $('<div class = "meal"></div>');
            var $eachMeal = $('<div class = "eachMeal"></div>');


            var mealName = (mealArray[k]).mealName
            var mealRecipe = (mealArray[k]).mealRecipe;
           
            $meal.html('<h4 class = "mealKeys">' + keys[i] + '</h4');
            $meal.prependTo($mealBox);
            $eachMeal.html('Meal Name: ' + mealName  +  "<br/> Meal Recipe: " + mealRecipe);
            $eachMeal.appendTo($mealBox);
            $mealBox.appendTo($meals);
          }     
      }
    }
  }

  addInputs();
  

  $(".add-workout-btn").on("click", function() {
    var workoutArr = [];
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

      if(!localStorage[workoutType]) {
        workoutArr.push(workoutObj);
        localStorage.setItem(workoutType, JSON.stringify(workoutArr));
      } else if(localStorage[workoutType]) {
        var newWorkoutArr = JSON.parse(localStorage[workoutType]);
        (newWorkoutArr).push(workoutObj);
        localStorage.setItem(workoutType, JSON.stringify(newWorkoutArr));
      }
      console.log(workoutType);
 
      var $workouts = $('.workouts');
      $workouts.html('');

      addInputs();
    }
  });

  $(".add-meal-btn").on("click", function() {
    
    var mealArr = [];
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

      if (!localStorage[mealType]) {
        mealArr.push(mealObj);
        localStorage.setItem(mealType, JSON.stringify(mealArr));
      } else if(localStorage[mealType]) {
        var newMealArr = JSON.parse(localStorage[mealType]);
        (newMealArr).push(mealObj);
        localStorage.setItem(mealType, JSON.stringify(newMealArr));
      }
      var $meals = $('.meals');
      $meals.html('');
      addInputs();
    }
  });


   $(".del-workout-btn").on("click", function() {
     var target = selectedWorkout.target.id;
     var targetType = selectedWorkout.target.parentElement.childNodes[0].innerText;
     var workoutArr = localStorage.getItem(targetType);
     alert('Item Deleted'); 
     console.log(localStorage)
     console.log(target, targetType, selectedWorkout, workoutArr);
     workoutArr.splice(target, 1); // grab the title and plop here

     $(".user-input-workout").val("");
     $(".user-input-workoutName").val("");
     $(".user-input-reps").val("");
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

  $(".workoutBox").on("click", ".eachWorkout", function(e) {
    var keys = Object.keys(localStorage);
    for(var i = 0; i < keys.length; i++){
        if(keys[i] === workType) {
          localStorage.removeItem('.user-input-workout')
        }
    }
    selectedWorkout = e;
    var workType = e.target.parentElement.childNodes[0].innerText;
    var workName = e.target.childNodes[0].data;
    console.log(workName);
    workName = workName.slice(14);
    console.log(workName)

    var workReps = e.target.childNodes[2].data;
    workReps = workReps.slice(14)
    console.log(workReps);

    $(".user-input-workout").val(workType);
    $(".user-input-workoutName").val(workName);
    $(".user-input-reps").val(workReps);
  });

  $(".meal").click(function(e) {
    var mealObj = JSON.parse(localStorage.getItem(e.target.innerText));
    
    $(".user-input-mealType").val(e.target.innerText);
    $(".user-input-mealName").val(mealObj.mealName);
    $(".user-input-mealIng").val(mealObj.mealRecipe);
  })




});