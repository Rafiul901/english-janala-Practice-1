const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json)=>displayLesson(json.data));
}
// button function
const loadLevelWord=(id)=>{
const url =`https://openapi.programming-hero.com/api/level/${id}`;
fetch (url)
.then((res)=>res.json())
.then((data)=>displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = '';

  words.forEach(word => {
    const card = document.createElement('div');

    card.innerHTML = `
      <div class="max-w-xs mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden">

  <div class="p-6 text-center border-b border-gray-200">
    <h2 class="text-3xl font-bold text-gray-800">${word.word}</h2>
   
  </div>

  <div class="p-6 text-center">
    <p class="text-2xl font-semibold text-gray-900">${word.meaning}</p>
   
  </div>

</div>
    `;

    wordContainer.append(card);
  });
};


const displayLesson =(lessons) =>{
const levelContainer =document.getElementById("level-container");
levelContainer.innerHTML='';

for(let lesson of lessons){
    const btnDiv= document.createElement('div');
    btnDiv.innerHTML=`
      <button onclick="loadLevelWord(${lesson.level_no})" class="btn bg-white hover:bg-blue-600 text-black hover:text-white border-blue-800">${lesson.lessonName}</button>`
     levelContainer.append(btnDiv)

}
}

loadLessons()