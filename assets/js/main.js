const userForm = document.forms["form"];
const userName = userForm["fname"];
const userSurname = userForm["fsurname"];
const userCpf = userForm["fcpf"];
const userUser = userForm["fuser"];

let userNameValid = false;

function validadeName(){
    userName.value = userName.value.trim(); // Retira excesso de espaço
    if (userName.value === ""){
        if (!(userName.parentElement.getElementsByClassName("error-warming").length)){ //verifica se não existe erros dentro do objeto
            addErrorText(userName.parentElement, "Nome deve ser preenchido");
        }
    }else{
        if(userName.parentElement.getElementsByClassName("error-warming").length){ //Pode não remover todos os erros se por acaso for adicionado outro erro no mesmo div
            userName.parentElement.removeChild(userName.parentElement.getElementsByClassName("error-warming")[0]); //Pega o parente e remove o elemento filho dentro da lista
        }
    }
}

function addErrorText(obj, text){
    let ul = document.createElement("ul");
    ul.classList.add("error-warming")
    let li = document.createElement("li");

    li.innerText = text;
    ul.appendChild(li);
    obj.appendChild(ul);
}