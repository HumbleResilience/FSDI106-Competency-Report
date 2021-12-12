let important=false;
let formVisible=true;
let icon;

//toggle on and off the star
function togglePriority(){
    console.log("Clicked");

    if(important==true){
        //set it as non-important
        icon.removeClass("fas").addClass("far");
        important=false;
    }   
    else{
        //set it as imporant
        icon.removeClass("far").addClass("fas");
        important=true;

    }
    
}



function toggleForm(){
    if(formVisible){
        $(".section-form").hide();
        formVisible=false;
    }
    else{
        $(".section-form").show();
        formVisible=true;
    }
}

function fetchTasksFromServer(){
    $.ajax({
        url: 'https://fsdiapi.azurewebsites.net/api/tasks',
        type: "GET",

        success: function(dataString){;
            //parse json string to js object
            let allTasks = JSON.parse(dataString);
            let numOfTasks=0
           // for loop to travel array
            
            //get each object
            //send the object to displayTask fn
            for(let i=0; i<allTasks.length; i++){
                
                let task= allTasks[i];
                //print the task only if the task name is = to your name
                if(task.name==="Eric"){
                displayTask(task);
                numOfTasks += 1;
                }
            }
            // set the count on the screen
            let text="Total: " + numOfTasks + " tasks";
            $("#lblCount").text(text);
        },
        error: function(err){
            console.log("Error getting dat", err);
        }
    });

    
}

function saveTask(){
    console.log("Task saved")

//    let priority =$("#iPriority").val();
   let title = $("#txtTitle").val();
   let desc = $("#txtDescription").val();
   let dueDate=$("#dpDueDate").val();
   let status= $("#selStatus").val();
   let category =$("#selCategory").val();
   let color =$("#selColor").val();

   

   let theTask= new Task(important, title, desc, dueDate, status, category, color);
   // parse object to string  (server doesn't accept objects)
   let stringData = JSON.stringify(theTask);
 
   console.log(theTask);
   console.log(stringData);


     //send the object to the server
   $.ajax({
        url: 'https://fsdiapi.azurewebsites.net/api/tasks/',
        type: 'POST',
        data: stringData,
        contentType: "application/json",

       success: function(res){
           console.log("Server says: ", res);

            displayTask(theTask);
            clearForm();
       },
       error: function(err){
           console.log("Error saving task", err);
       }

   });

   console.log(theTask);


}

function clearForm(){
    $("iPriority").val("");
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#dpDueDate").val("");
    $("#selStatus").val("");
    $("#selCategory").val("");
    $("#selColor").val("");


}

function displayTask(task){  //My Pending Tasks info

    let syntax = `<div class="task">
    <i class="far fa-star"></i>

    <div class="info">
        <h5>${task.title}</h5>
        <p>${task.description} </p>
    </div>

    <div class="details">
        <label class="status">${task.status}</label>
        <div class=categoryAndDate>
            <label class="category">${task.category}</label>
            <label class="dueDate">${task.dueDate}</label>
        </div>
    </div>
    </div>`;


    $(".task-list").append(syntax);

}



function testHttpRequest(){
    $.ajax({
        url: 'https://restclass.azurewebsites.net/api/test',
        type: 'GET',
        success: function(response){
            console.log("Server says: ", response);
        },
        error: function(err){
            console.log("Error on request", err);
        }

    });
}



function init(){
    console.log("Task Manager");
    icon=$("#iPriority");

    //hook events
    icon.click(togglePriority);
    $("#btnShowDetails").click(toggleForm);
    $("#btnSave").click(saveTask);

    //load data
  fetchTasksFromServer();
}


window.onload=init;