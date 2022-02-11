# Validador de JavaScript
Esse projeto foi um desafio que decidi após ver uma aula do curso de JavaScript do Luiz Otávio Miranda. 

Eu primeiro fiz o projeto antes de ver como o professor fez o dele. O do professor, claro, ficou muito melhor e mais eficiente do que o meu, mas consegui aprender bastante e implementar coisas diferentes, como animações.

 **Link para testar**: https://gr-monaco.github.io/javascript-validador-de-formulario/


![Formulário criado](/assets/img/image1.jpg)

## O código
Eu tentei reutilizar ao máximo o código utilizado, entretanto, acredito que isso acabou aumentando a complexidade demais do projeto, mas pelo menos acabou criando um sistema no qual era fácil adicionar validação de input.

    function validadeInput(validationFunction ,obj, errorText, validationBoolKey){  // divisão de função não deixaria mais simples? Complexidade de código fica reduzida, talvez vale repetição
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

O código acima poderia ser enxugado, mas ele acaba permitindo a inserção de validadores muito facilmente.

    function start(){
        userName.addEventListener("blur", function() {validadeInput(userNameValid, userName, "Nome deve estar preenchido.", 'userName')});
        userSurname.addEventListener("blur", function() {validadeInput(userSurnameValid, userSurname, "Sobrenome deve estar preenchido.", 'userSurname')});
        userUser.addEventListener("blur", function () {validadeInput(usernameLenght, userUser, "Usuário deve ter entre 3 a 12 caractéres.", "userUser")});
        userCpf.addEventListener("blur", function () {validadeInput(validateCPF, userCpf, "Insira um CPF válido.", "userCpf")});
        userPassword.addEventListener("blur", function() {validadeInput(userpasswordLenght, userPassword, "A senha deve conter entre 6 a 12 caractéres.", "userPassword")});
        userRepPassword.addEventListener("blur", function() {validadeInput(userRepeatPasswordValid, userRepPassword, "As duas senhas devem ser iguais.", "userRepPassword")})
    }

Basta ter uma função validadora, que retorna <code>true</code> ou <code>false</code>, o input que está sendo validado, texto de erro e a váriavel aonde vai estar guardado se o input está valido ou não.

## Problemas
O último código apresentando tem muitos eventListener, que em grande quantidade pode causar queda em performance do navegador. Também existe problema de código muito longo e que poderia ser reduzido.

## Considerações
No final de tudo, apesar de não ser um produto muito polido e com vários pontos que poderiam ser melhorados, esse pequeno projeto me proporcionou grande aprendizado na linguagem JavaScript e permitiu que eu me desenvolvesse bastante. 