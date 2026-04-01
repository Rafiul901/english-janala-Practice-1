const loadLessons=async()=>{
const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
const json = await res.json()
   displayLesson(json.data); 
  
}

const synonym =(arr)=>{
const showSynonym = arr.map(w=> `<span class='btn'>${w}</span>`).join('');
return showSynonym;
}

const showModal =async(id)=>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url);
  const json = await res.json();
  console.log(json.data);
  wordDetails(json.data);

}

const wordDetails =(word)=>{
const wordDetail = document.getElementById('detail');

document.getElementById('my_modal_1').showModal()
wordDetail.innerHTML =`
  
  <!-- Title -->
  <h2 class="text-lg font-semibold text-gray-800">
    ${word.word} <span class="text-gray-500 text-sm">${word.pronunciation}</span>
  </h2>

  <!-- Meaning -->
  <div class="mt-4">
    <p class="text-sm font-medium text-gray-700">Meaning</p>
    <p class="text-gray-600 mt-1">${word.meaning}</p>
  </div>

  <!-- Example -->
  <div class="mt-4">
    <p class="text-sm font-medium text-gray-700">Example</p>
    <p class="text-gray-600 mt-1">
      ${word.sentence}
    </p>
  </div>

  <!-- Synonyms -->
  <div class="mt-4">
    <p class="text-sm font-medium text-gray-700">সমার্থক শব্দ গুলো</p>
    <div class="flex gap-2 mt-2 flex-wrap">
     ${synonym(word.synonyms)}
    </div>
  </div>



</div>`

}

const loadLevel =async(id)=>{
  const url =`https://openapi.programming-hero.com/api/level/${id}`
  
  const res =await fetch(url);
  const json =await res.json();
  
  loadWords(json.data);
}



const loadWords=(words)=>{
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML=''

  if(words.length===0){
    cardContainer.innerHTML=`  <div class="col-span-4 flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-slate-300 rounded-xl">
    
    <!-- Animated/Soft Icon -->
    <div class="mb-6 flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="Refined_Path M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>

    <!-- Text Content -->
    <h1 class="text-2xl font-semibold text-slate-800 mb-2">No words in here!</h1>
  
    
    <!-- Optional: Subtle call to action hint -->
    <div class="mt-8 px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full">
      No Lesson Selected
    </div>
  </div>`;
  return
  } 

  words.forEach(word=>{
    const card =document.createElement('div');
    card.innerHTML=`
    <div class="bg-white w-[300px] rounded-3xl shadow-xl overflow-hidden mx-auto my-4">
  <!-- Top content -->
  <div class="px-8 pt-9 pb-7 text-center">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-1">
      ${word.word}
    </h1>
    
    <p class="text-gray-500 text-sm font-medium tracking-wider">
      MEANING / PRONUNCIATION
    </p>
    
    <div class="mt-8 mb-6">
   <p class="text-xl font-medium text-gray-800">
  ${word.meaning? word.meaning:""} / ${word.pronunciation}
</p>
    </div>
  </div>
  
  <!-- Bottom icons -->
  <div class="bg-gray-50 border-t border-gray-100 px-8 py-5 flex items-center justify-center gap-6">
    <!-- Info Button -->
    <button onclick="showModal(${word.id})" class=" w-10 h-10 bg-white hover:bg-blue-50 transition-colors rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 text-gray-600 hover:text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4v1m0-1H21a2 2 0 01-2 2V9a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    </button>
    
    <!-- Speaker Button -->
    <button class="w-10 h-10 bg-white hover:bg-blue-50 transition-colors rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 text-gray-600 hover:text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0113 5v14a1 1 0 01-1.707.707L5.586 15z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a4 4 0 00-8 0" />
      </svg>
    </button>
  </div>
</div>`;
    cardContainer.append(card)
  })
}

const displayLesson=(lessons)=>{
const levelContainer =document.getElementById('level-container');
levelContainer.innerHTML='';

for(let lesson of lessons){
  const btnDiv =document.createElement('div');
  btnDiv.innerHTML=`<button onclick=loadLevel(${lesson.level_no}) class="btn btn-outline btn-primary">${lesson.lessonName}</button>
  `
  levelContainer.append(btnDiv)
}
}

loadLessons();


// const loadLessons = async () => {
//   const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
//   const json = await res.json();
//   displayLesson(json.data);
// };
// button function
// const loadLevelWord=(id)=>{
// const url =`https://openapi.programming-hero.com/api/level/${id}`;
// fetch (url)
// .then((res)=>res.json())
// .then((data)=>displayLevelWord(data.data))
// }

// const displayLevelWord = (words) => {
//   const wordContainer = document.getElementById("word-container");
//   wordContainer.innerHTML = '';

//   words.forEach(word => {
//     const card = document.createElement('div');

//     card.innerHTML = `
//       <div class="max-w-xs mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden">

//   <div class="p-6 text-center border-b border-gray-200">
//     <h2 class="text-3xl font-bold text-gray-800">${word.word}</h2>
   
//   </div>

//   <div class="p-6 text-center">
//     <p class="text-2xl font-semibold text-gray-900">${word.meaning}</p>
   
//   </div>

// </div>
//     `;

//     wordContainer.append(card);
//   });
// };


// const displayLesson =(lessons) =>{
// const levelContainer =document.getElementById("level-container");
// levelContainer.innerHTML='';

// for(let lesson of lessons){
//     const btnDiv= document.createElement('div');
//     btnDiv.innerHTML=`
//       <button onclick="loadLevelWord(${lesson.level_no})" class="btn bg-white hover:bg-blue-600 text-black hover:text-white border-blue-800">${lesson.lessonName}</button>`
//      levelContainer.append(btnDiv)

// }
// }

// loadLessons()