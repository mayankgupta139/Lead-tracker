// chrome://extensions/

let myLeads=[]   // should be assigned with empty array

const inputEl=document.getElementById("input-el")

const inputBtn=document.getElementById("input-btn")     // const var can't be reassigned

const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
const ulEl=document.getElementById("ul-el")

// getting leads from localstorage using JSON.parse()
const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  myLeads=leadsFromLocalStorage
  render(myLeads)
}


tabBtn.addEventListener("click" , function(){
  // console.log(tabs[0].url)
 

  chrome.tabs.query({active:true , currentWindow:true} , function(tabs){
             myLeads.push(tabs[0].url)
             localStorage.setItem("myLeads" , JSON.stringify(myLeads))
             render(myLeads)
  })

})


/*=================================================================================================================== */
// listening the double click on delete button 
// on clicked we cleared localstorage, myLeads and DOM
   deleteBtn.addEventListener("dblclick",function(){
      localStorage.clear()
      myLeads=[]
      render(myLeads)
      })
/*=================================================================================================================== */
inputBtn.addEventListener("click", function(){
    
    myLeads.push(inputEl.value)
    console.log(myLeads)
    clearLeads()  // for clearing the input field after rendering
    // save the myLeads array to localSorage
    // wrap with the JSON.stringify()

    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    
    render(myLeads) // this will render the input data
    console.log(localStorage.getItem("myLeads"))
  
})

// logging out the item in the myLeads array using for loop
// rendering the leads in the unordred list using ulEl.textContent 

/*
for(let i=0; i<myLeads.length; i++){
   // ulEl.textContent+= "   "+myLeads[i]
  //  ulEl.innerHTML+="<li>" + myLeads[i] + "</li>" // it converts the data in lists item "it is easier to understand"

  // create element --> set text content--> append to ul

  const li=document.createElement("li")
  li.textContent=myLeads[i]
  ulEl.append(li)
}
 */
// for printing the element on the screen on clicking the  SAVE INPUT button
function render(leads){
let listItems=""
for(let i=0; i<leads.length; i++){
    // listItems+= "<li><a target='blank' href='' >" +myLeads[i]+ "</a></li>"  // bcz it is a complex syntax
    // now we use template string which looks like html code
    // template string/literals
    listItems+= `
                 <li>
                         <a target='blank' href='${leads[i]}' > 
                           ${leads[i]}
                         </a>
                 </li> 
                `
}
ulEl.innerHTML=listItems
}

// clearLeads() function

function clearLeads(){
    inputEl.value=""
}
/*===================================================================================================================== */
/*
   const welcomeEl=document.getElementById("welcome-el")

   function greetUser(greeting , name , emoji){
     welcomeEl.textContent=` ${greeting} , ${name} , ${emoji}`
   }

   greetUser("Hello" , "Mayank" , "WoooW!")

   arr=["first" , "second" , "third"]
 let first=getfirst(arr)
 console.log(first)

 function getFirst(array){
   return array[0]
 }

*/