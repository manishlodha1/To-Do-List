const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");


const saveTodo = ()=>{
    const liText = document.querySelectorAll(".listItem span");
    // console.log(liText);
    const data = [];
     liText.forEach(
         (listItem)=>{
             data.push(listItem.textContent);
            //  console.log(listItem.textContent);
         }
     )
    //  console.log(data);
     if(data.length === 0){
        localStorage.removeItem("liText");
     }
     else{
        localStorage.setItem("liText",JSON.stringify(data));
     }


}

item.addEventListener(
    "keyup",
    function(event){
        if(event.key == "Enter"){
            //this indicate kr raha hai item ko 
            // console.log(this.value);
            addToDo(this.value);
            saveTodo();
            //jase hi enter click kr aaga tho jo value hai vo console mai aa ja aagi and item box empty ho ja aaga 
            this.value = "";
        }
    }
)


const addToDo = (item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("listItem");
    listItem.innerHTML = `
       <span class = "intext"> ${item} </span>
        <i class = "fas fa-times"></i>
    `;

    listItem.addEventListener(
        "click",
        function(){
            this.classList.toggle("done");
            saveTodo();
        }
    )

    listItem.querySelector("i").addEventListener(
        "click",
        function(){
            listItem.remove();
            saveTodo();
        }
    )

    toDoBox.appendChild(listItem);
}


//jb page refresh ho tb jo data already hai vo hate na esliye 
(
    function(){
        const lsList = JSON.parse(localStorage.getItem("liText"));
        // console.log("lsList == ",lsList);
        if(lsList !== null){
            lsList.forEach(
                (lsList)=>{
                    addToDo(lsList);
                }
            )
        }
        
    }
)()