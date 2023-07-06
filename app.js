
let myLeads = []

const inputURl = document.querySelector(".input-website-url")
const saveInputBtn = document.querySelector(".save-input-btn")
const unOrderedUrlList = document.querySelector(".unordered-list-Url")
const deleteBtn = document.querySelector(".delete-btn")
const saveTabBtn = document.querySelector(".save-tab-btn")

/* ----- listen to clicks to add the url's to the array --------- */
saveInputBtn.addEventListener('click',function()
{   
    myLeads.push(inputURl.value)    
    /* ----- clear the input value --------- */
    inputURl.value = ""
    /* ----- save the array to the localStorage and convert it to string --------- */
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderData(myLeads)   
})

/* ----- listen for double clicks to clear the local storage, array and DOM --------- */
deleteBtn.addEventListener('dblclick',function()
{
    localStorage.clear()
    myLeads = []
    renderData(myLeads)
})

/* ----- listen to clicks to save the url of the current tab --------- */
saveTabBtn.addEventListener('click',function()
{
    /* ----- use chrome API to get the current tab --------- */
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderData(myLeads)
    })
})


/* ----- get the leads from the localStorage in the form of an array --------- */
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


/* ----- check if leadsFromLocalStorage contains any leads if yes then assign it to the array and call renderData() --------- */
if(leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    renderData()
}

/* ----- function to render the data --------- */
function renderData(leads)
{
    /* ----- display the url's using template strings --------- */
    let listItems = ""
    for(let i = 0; i < leads.length; i++)
    {        
        listItems += `
                <li>
                <a target="_blank" href = "${leads[i]}">
                ${leads[i]}
                </a>
                </li>
        `    
    }    
    unOrderedUrlList.innerHTML = listItems
}
