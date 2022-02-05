const userForm = document.forms["form"];
const userName = userForm["fname"];
const userSurname = userForm["fsurname"];
const userCpf = userForm["fcpf"];
const userUser = userForm["fuser"];
const submitButton = userForm['fbutton'];


const valid = {
    'userName' : false,
    'userSurname' : false,
    'userCpf' : false,
    'userUser' : false
}

function start(){
    userName.addEventListener("blur", function() {validadeName(userNameValid, userName, "Nome deve estar preenchido.", 'userName')});
    userSurname.addEventListener("blur", function() {validadeName(userSurnameValid, userSurname, "Sobrenome deve estar preenchido.", 'userSurname')});
    userUser.addEventListener("blur", function () {validadeName(usernameLenght, userUser, "Usuário deve ter entre 3 a 12 caractéres.", "userUser")});
    userCpf.addEventListener("blur", function () {validadeName(validateCPF, userCpf, "Insira um CPF válido.", "userCpf")});
}

function usernameLenght(){
    userUser.value = userUser.value.trim();
    userUser.value = userUser.value.replace(' ', '-');
    return userUser.value.length > 3 && userUser.value.length < 12 ? true : false;
}

function userNameValid(){
    userName.value = userName.value.trim();
    return userName.value !== "" ? true : false;
}

function userSurnameValid(){
    userSurname.value = userSurname.value.trim();
    return userSurname.value !== "" ? true : false;
}

function validateCPF() {
    let [pv1, pv2] = userCpf.value.split('-');
    pv1 = pv1.replace('.','').replace('.','');
    let array_pv1 = pv1.split('');
    let array_pv2 = pv2.split('');
    let array_rep = array_pv1.concat(array_pv2);
    if(array_rep.every(f => f === array_rep[0])) return false;
    

    let p1 = userCpf.value.split('-')[0].replace('.', '').replace('.', '');
    let array_p1 = p1.split('');
    array_p1 = array_p1.reverse()
    let soma = array_p1.map(f => parseInt(f)).reduce(f = (prev, current, index, array) => {
        //console.log(array[index], index+2, prev, current*(index+2));
        return prev += current * (index + 2);
    },0);

    let middle = (soma % 11 > 9) ? 0 : soma;

    if (!(11 - middle%11 === parseInt(userCpf.value.split('-')[1][0]))) return false;

    array_p1.unshift(userCpf.value.split('-')[1][0])
    soma = array_p1.map(f => parseInt(f)).reduce(f = (prev, current, index, array) => {
        return prev += current * (index + 2);
    },0);

    middle = (soma % 11 === 0) ? 0 : soma;
    if (!(11 - middle%11 === parseInt(userCpf.value.split('-')[1][1]))) return false;

    return true;
}

function validadeName(validationFunction ,obj, errorText, validationBoolKey){  // divisão de função não deixaria mais simples? Complexidade de código fica reduzida, talvez vale repetição
    if (!validationFunction()){
        if (!(obj.parentElement.getElementsByClassName("error-warming").length)){ //verifica se não existe erros dentro do objeto
            addErrorText(obj.parentElement, errorText);
            valid[validationBoolKey] = false;
        }
    }else{
        if(obj.parentElement.getElementsByClassName("error-warming").length){ //Pode não remover todos os erros se por acaso for adicionado outro erro no mesmo div
            let objInQuestion = obj.parentElement.getElementsByClassName("error-warming")[0];
            objInQuestion.classList.add("error-warming-end"); // Adiciona a classe de animação final que vai ser removida
            objInQuestion.addEventListener("animationend", function() {removeError(objInQuestion)}) // adiciona evento de remoção
        }
        valid[validationBoolKey] = true;
    }
    enableButton();
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


//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every
function enableButton(){
    if(Object.values(valid).every(f => f)){
        submitButton.disabled = false;
    }
    else {
        submitButton.disabled = true;
    }
}

start()
