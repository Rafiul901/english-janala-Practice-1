const loadLessons =async()=>{
const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
const json = await res.json();
wordLesson(json.data);
}

const wordLesson=(lessons)=>{
    const wordContainer =document.getElementById('word-container');
    wordContainer.innerHTML='';

    for(const lesson of lessons){
        const btnDiv= document.createElement('div');
        btnDiv.innerHTML=` <button class="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-indigo-700">${lesson.lessonName}</button>`;
        wordContainer.append(btnDiv)
    }
}

const loadLevel =async(id)=>{
const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
const json = await res.json();
loadWords(json.data);
}

const loadWords =(words)=>{
    console.log(words);
}
















loadLessons()