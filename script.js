const schools = [
{name:"South Forsyth High", type:"Public", grade:"High", rating:5, location:"Cumming, GA"},
{name:"Lambert High School", type:"Public", grade:"High", rating:5, location:"Suwanee, GA"},
{name:"Pinecrest Academy", type:"Private", grade:"K-12", rating:4, location:"Cumming, GA"},
{name:"Creekside Daycare", type:"Daycare", grade:"Pre-K", rating:4, location:"Alpharetta, GA"}
];

function goToResults(){
window.location.href = "results.html";
}

function renderSchools(list){
const container = document.getElementById("results") || document.getElementById("featuredSchools");
if(!container) return;

container.innerHTML = list.map(s => `     <div class="card">       <h3>${s.name}</h3>       <p>${s.type} • ${s.grade}</p>       <p>⭐ ${s.rating}</p>       <p>${s.location}</p>       <button onclick="saveFavorite('${s.name}')">❤️ Save</button>       <button onclick="viewDetails('${s.name}')">View</button>     </div>
  `).join("");
}

function filterSchools(){
const type = document.getElementById("typeFilter").value;
const grade = document.getElementById("gradeFilter").value;
const rating = document.getElementById("ratingFilter").value;

let filtered = schools.filter(s =>
(!type || s.type === type) &&
(!grade || s.grade.includes(grade)) &&
(!rating || s.rating >= rating)
);

renderSchools(filtered);
}

function viewDetails(name){
localStorage.setItem("selectedSchool", name);
window.location.href = "details.html";
}

function saveFavorite(name){
let favs = JSON.parse(localStorage.getItem("favs")) || [];
if(!favs.includes(name)){
favs.push(name);
localStorage.setItem("favs", JSON.stringify(favs));
alert("Saved!");
}
}

window.onload = () => {
renderSchools(schools);

const selected = localStorage.getItem("selectedSchool");
if(selected){
const school = schools.find(s => s.name === selected);
const el = document.getElementById("details");
if(el && school){
el.innerHTML = `         <div class="card">           <h2>${school.name}</h2>           <p>${school.type}</p>           <p>${school.grade}</p>           <p>⭐ ${school.rating}</p>           <p>${school.location}</p>         </div>
      `;
}
}
};
