

// select elements

let form = document.querySelector('form');

let word = document.querySelector('#word');

let result = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    // getData(form.elements[0].value);
    getData(word.value);4
})

const getData=async(word)=>{

    try{

        result.innerHTML = "Fetching Data.........";
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    console.log(data);

    let definitions = data[0].meanings[0].definitions[0];

    result.innerHTML = `<h2><strong>Word: </strong>${data[0].word}</h2>
    <p class="partsOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning: </strong>${definitions.definition===undefined?"Not Found":definitions.definition}</p>
    <p><strong>Example: </strong>${definitions.example===undefined?"Not Found":definitions.definition}</p>
    <p><strong>Antonyms: </strong></p>
    `;

    if(definitions.antonyms.length ===0){
        result.innerHTML +=`<span>Not Found</span> <br>`;
    }
    else{
        for(let i=0;i<definitions.antonyms.length;i++){
        result +=`<li>${definitions.antonyms[i]}</li>`
        }

    
}

if(data[0].phonetics.length===0){
    result.innerHTML +=`<p>Audio Not Found</p>`;
}
else{
    for(let i=0;i<data[0].phonetics.length;i++){

        if(data[0].phonetics[i].audio.length===0){
            result.innerHTML += '';
        }
        else{
        result.innerHTML +=`Audio :  <audio controls>
        <source src=${data[0].phonetics[i].audio} type="audio/ogg">
        
        Your browser does not support the audio tag.
      </audio>`
        }
    }
}





result.innerHTML+= `<div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>`

    }
    catch(e){
        // console.log(e.message);
        result.innerHTML = "<p>Sorry, the word could not be found</p>"
    }
    // console.log('word' + word);


}