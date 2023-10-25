const parentContainer = document.querySelector(".parent-container");

window.addEventListener('load', ()=>{
    parentContainer.style.transform = 'translateY(-100%)';
});

const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector("header");
const navBarList = document.querySelector(".navbar ul");

menuToggle.addEventListener('click', ()=>{
    header.classList.toggle('menu-open');
    navBarList.classList.toggle("active");
});

const endPoint = ('https://swapi.dev/api/people');

async function fetchData() {
    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw new Error('Network timed out');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error', error);
    }
}
function createList(data) {
    const list = document.querySelector('.character-list');
    list.innerHTML = '';

    data.forEach((character)=>{
        const listItem = document.createElement("li");
        
        listItem.innerHTML = character.name;

   
        listItem.addEventListener('click', () => 
        showDetails(character));
        list.appendChild(listItem);
    });
   
    const cancelList = document.querySelector('.but');
    
    cancelList.style.display = "block";
    
    cancelList.addEventListener('click', ()=>{
    list.innerHTML = '';
    cancelList.style.display = "none";
    });
} 
const characterImages = {
    
    "C-3PO": "/images/c-3po.webp",
    "R2-D2": "/images/R2-D2.jpeg",
    "Luke Skywalker": "/images/Luke Skywalker.webp",
    "Darth Vader": "/images/Darth Vader.jpeg",
    "Leia Organa": "/images/Leia Organa.jpeg",
    "Owen Lars" : "/images/Owen Lars.jpeg",
    "Beru Whitesun lars": "/images/Beru Whitesun lars.jpeg",
    "R5-D4": "/images/R5-D4.webp",
    "Obi-Wan Kenobi": "/images/Obi-Wan Kenobi.jpeg",
    "Biggs Darklighter": "/images/Biggs Darklighter.jpeg",
    
};
function showDetails(character) {
    const details = document.querySelector('.character-details');
    const characterName = character.name;
    const characterImageURL = characterImages[characterName] || "R2-D2.jpeg";
    details.innerHTML = `
    <h3>Name: ${character.name}</h3>
    <img src = "${characterImageURL}" alt="${characterName}" />
    <p>Gender: ${character.gender}</p>
    <p>Height: ${character.height} cm</p>
    `;  
}
const fetchDataButton = document.querySelector('.fetchData');

fetchDataButton.addEventListener('click', ()=>{
    
    fetchData()
    .then((data) => {
    createList(data);
    console.log(data);
})
.catch((error)=> {
    console.error('Error fetching data:', error);
});
});