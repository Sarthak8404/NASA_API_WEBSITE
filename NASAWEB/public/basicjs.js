const apiKey="Nu6GZ8ZSK5JuFvx3d0i9OABEj09DewNCZh7VdP3a";
const url="https://api.nasa.gov/planetary/apod?";
const SearchUrl="https://images-api.nasa.gov/search?q=";
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";
let container =document.querySelector(".container");
let button=document.getElementById("fetch-image");
const mbutton=document.createElement("button");
mbutton.classList.add("btn", "btn-primary");
mbutton.textContent="more";

button.addEventListener("click",()=>{
    getImage("normal");
});
let hdButton = document.getElementById("fetch-hd");
hdButton.addEventListener("click",()=>{
    getImage("hd");
})
// https://api.nasa.gov/planetary/apod?date=2020-5-4&api_key=Nu6GZ8ZSK5JuFvx3d0i9OABEj09DewNCZh7VdP3a
function getImage(value){
    let ni=document.querySelector(".image-container");
    const image=document.querySelector(".nimage"); 
    const htmltitle=document.querySelector(".title");
    const htmlexplanation=document.querySelector(".explanation");
    const dateInput = document.querySelector('#dateinput');
    let date=dateInput.value;
    let request=new XMLHttpRequest();
    request.open("GET", `${url}date=${date}&api_key=${apiKey}`, true);
        request.send();
        request.onload=function(){
            if(request.status==200){
                let data=JSON.parse(request.responseText);
                let imageUrl;
                if(value==="hd"){
                    imageUrl=data.hdurl;
                }else{
                    imageUrl=data.url;
                }
                htmlexplanation.textContent=data.explanation;
                htmltitle.textContent=data.title;
                console.log(data);
                image.src=imageUrl;
            }else{
                window.alert("Please Enter date in correct format.");
            }
        }
}
let button1=document.getElementById("fetch-data-image");
button1.addEventListener('click',()=>{
    mbutton.remove();
    showData();
    
})
function showData(){
    const image1=document.querySelector(".image-container1");
    const SearchInput = document.querySelector('#searchInput');
    const morebuttondiv=document.querySelector(".morebutton");
    let searchValue=SearchInput.value;
    let Simage=document.querySelector(".Simage");
    let Stitle=document.querySelector(".title1");
    let Sdescription=document.querySelector(".description1");
    
    morebuttondiv.append(mbutton);
    fetch(SearchUrl+searchValue)
    .then((response)=>  {return response.json()})
    .then((data)=>{
        let val=0;
        displayData();
        function displayData(){
        let requiredimage=data.collection.items[val].links[0].href;
        let requiredtitle=data.collection.items[val].data[0].title;
        let requireddescription=data.collection.items[val].data[0].description;
        console.log(requiredtitle);
        Simage.src=requiredimage;
        Stitle.textContent=requiredtitle;
        Sdescription.textContent=requireddescription; 
        
        mbutton.addEventListener('click',function(){
            val++;
            displayData();
        })
        }
    });
}
const btn = document.getElementById("Marsbutton");
btn.addEventListener('click', function(){
    getImage1();
});

async function getImage1() {
    btn.innerText = "Loading...";
    const randomSol = Math.floor(Math.random() * 3000) ; 
    const url = `${baseUrl}sol=${randomSol}&api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.photos.length);
            const imageUrl = data.photos[randomIndex].img_src;
            console.log("Random image URL:", imageUrl);
            let imageElem = document.querySelector(".marsImage");
            imageElem.style.display="block";
            imageElem.src=imageUrl;
            console.log(url);
        }else{
            console.log("No photos available for the selected sol.");
            getImage1();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    btn.innerText = "PRESS ME!!";
}
// const exampleModal = document.getElementById('exampleModal')
// if (exampleModal) {
//   exampleModal.addEventListener('show.bs.modal', event => {
//     // Button that triggered the modal
//     const button = event.relatedTarget
//     // Extract info from data-bs-* attributes
//     const recipient = button.getAttribute('data-bs-whatever')
//     // If necessary, you could initiate an Ajax request here
//     // and then do the updating in a callback.
//     // Update the modal's content.
//     const modalTitle = exampleModal.querySelector('.modal-title')
//     const modalBodyInput = exampleModal.querySelector('.modal-body input')
//     modalTitle.textContent = `New message to ${recipient}`
//     modalBodyInput.value = recipient
//   })
// }
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')
// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })
// ScriptManager.RegisterStartupScript(Page, Page.GetType(), "myModal", "$('#exampleModal').modal();", true);