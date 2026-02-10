const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json)=>displayLesson(json.data));
}


const displayLesson =(lessons) =>{
const levelContainer =document.getElementById("level-container");
levelContainer.innerHTML='';

for(let lesson of lessons){
    const btnDiv= document.createElement('div');
    btnDiv.innerHTML=`
      <button
                        class="btn bg-white hover:bg-blue-600 text-black hover:text-white border-blue-800">${lesson.lessonName}</button>`
                        levelContainer.append(btnDiv)

}
}

loadLessons()