const charactersAPI = new APIHandler('http://localhost:8000');

const characterInfo= document.querySelector('.characters-container')
const characterId=document.getElementsByName('character-id')
const characterIdDelete=document.getElementsByName('character-id-delete')

const nameChar=document.getElementById('nameChar')
const occupationChar=document.getElementById('occupationChar')
const weaponChar=document.getElementById('weaponChar')
const cartoonChar=document.getElementById('cartoonChar')

const idEdit=document.getElementById('idEdit')
const nameEdit=document.getElementById('nameEdit')
const occupationEdit=document.getElementById('occupationEdit')
const weaponEdit=document.getElementById('weaponEdit')
const cartoonEdit=document.getElementById('cartoonEdit')

const btnCreate=document.getElementById('send-data')
const btnUpdate=document.getElementById('update-data')

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList().then(response =>{
      
      console.log(`All characters are:`, response.data)
      response.data.map(character=>{
       let cartoon=''
        character.cartoon ? cartoon='is cartoon' : cartoon='is not a cartoon'
        const card="<div class='character-info'>  <div class='name'>"+ character.name + "</div> <div class='occupation'>"+ character.occupation +"</div><div class='cartoon'>"+ cartoon +"</div><div class='weapon'>"+ character.weapon +"</div></div>"
        characterInfo.innerHTML+=card
      })
  
    })
    .catch(error => console.log(error));
       
     
       
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    charactersAPI.getOneRegister(characterId[0].value).then(response =>{
      
      console.log(`All characters are:`, response.data)
       const character=response.data
       let cartoon=''
        character.cartoon ? cartoon='is cartoon' : cartoon='is not a cartoon'
        const card="<div class='character-info'>  <div class='name'>"+ character.name + "</div> <div class='occupation'>"+ character.occupation +"</div><div class='cartoon'>"+ cartoon +"</div><div class='weapon'>"+ character.weapon +"</div></div>"
        characterInfo.innerHTML+=card
     
  
    })
    .catch(error => console.log(error));
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    charactersAPI.deleteOneRegister(characterIdDelete[0].value).then(response =>{
      
      console.log(`All characters are:`, response.data)
    
    })
    .catch(error => console.log(error));
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
           
    event.preventDefault()

     const character={ 
      name: nameEdit.value,
      occupation: occupationEdit.value,
      weapon: weaponEdit.value,
      cartoon:cartoonEdit.checked
     };
     console.log(character)
     charactersAPI.updateOneRegister(idEdit.value, character).then(response =>{
      
      console.log(`All characters are:`, response.data)
      btnUpdate.style.backgroundColor='green'
    })
    .catch(error =>{
      console.log(error)
      btnUpdate.style.backgroundColor='red'
    } );



  });


  document.getElementById('new-character-form').addEventListener('submit', function (event) {
   event.preventDefault()
   //retrieve id 
   let id=0
   charactersAPI.getFullList().then(response =>{

          response.data.map(char=>id=char.id)
   }
   )


     const character={ 
      id: id,
      name: nameChar.value,
      occupation: occupationChar.value,
      weapon: weaponChar.value,
      cartoon:cartoonChar.checked
     };
     console.log(character)
     charactersAPI.createOneRegister(character).then(response =>{
      
      console.log(`All characters are:`, response.data)
      btnCreate.style.backgroundColor='green'
    })
    .catch(error =>  {
      btnCreate.style.backgroundColor='red'
      console.log(error)});
  });


});
