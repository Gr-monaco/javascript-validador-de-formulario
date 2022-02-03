const userForm = document.forms["form"];
const userName = userForm["fname"];
const userSurname = userForm["fsurname"];
const userCpf = userForm["fcpf"];
const userUser = userForm["fuser"];

let userNameValid = false;

const valid = {
    'userName' : false,
    'userSurname' : false,
    'userCpf' : false,
    'userUser' : false
}

function start(){
    userName.addEventListener("blur", function() {validadeName(userName, "Nome deve estar preenchido.", 'userName')});
    userSurname.addEventListener("blur", function() {validadeName(userSurname, "Sobrenome deve estar preenchido.", 'userSurname')})
}

function usernameLenght(){
    return userUser.value.length > 3 && userUser.value.length < 12 ? true : false;
}

function userNameSurnameValid(obj){
    obj.value.trim();
    return obj.value !== "" ? true : false;
}

function validadeName(obj, errorText, validationBoolKey){  // divisão de função não deixaria mais simples? Complexidade de código fica reduzida, talvez vale repetição
    obj.value = obj.value.trim(); // Retira excesso de espaço
    if (obj.value === ""){
        if (!(obj.parentElement.getElementsByClassName("error-warming").length)){ //verifica se não existe erros dentro do objeto
            addErrorText(obj.parentElement, errorText);
            valid[validationBoolKey] = false;
        }
    }else{
        if(obj.parentElement.getElementsByClassName("error-warming").length){ //Pode não remover todos os erros se por acaso for adicionado outro erro no mesmo div
            let objInQuestion = obj.parentElement.getElementsByClassName("error-warming")[0];
            objInQuestion.classList.add("error-warming-end"); // Adiciona a classe de animação final que vai ser removida
            objInQuestion.addEventListener("animationend", function() {removeError(objInQuestion)}) // adiciona evento de remoção
            valid[validationBoolKey] = true;
        }
    }
}

function removeError(obj){
    obj.parentElement.removeChild(obj.parentElement.getElementsByClassName("error-warming")[0]);
}

function addErrorText(obj, text){
    let ul = document.createElement("ul");
    ul.classList.add("error-warming")
    let li = document.createElement("li");

    li.innerText = text;
    ul.appendChild(li);
    obj.appendChild(ul);
}

start()
valid['userName'] = true;
