// Construção dos elementos FORM,INPUT e ITEMS
// Selecionar o todo-form
const todoForm = document.querySelector('.todo-form');
// Selecionar o input do form
const todoInput = document.querySelector('.todo-input');
// Selecionar o <ul> com a class="todo-tasks"
const todoTasksList = document.querySelector('.todo-tasks');
// Selecionar o elemento para notificar o erro de input <p>
const link = document.querySelector('.alert');


// Array para armazenar os TO-DOs
var todos = [];

// Adicionar o eventListener no form, e escutar o evento de submit.
todoForm.addEventListener('submit', function (event) {
    // Previnir o reload da pagina
    event.preventDefault();
    //checa se a tarefa já existe na lista
    if (checkExist(todos)) {
        Swal.fire("Tarefa já inserida na lista");
        link.innerHTML = "Tarefa já existe na lista";
    }
    //checa se o input está vazio
    else if (todoInput.value == '') {
        link.innerHTML = "Informe uma Tarefa valida"
    }
    else {
        //chama a função addTodo(adicionar) com o input que está no form
        link.innerHTML = ""
        addTodo(todoInput.value);
    }
});

function checkExist(todos) {
    /* Procura no array (SOME) o valor do input e retorna true caso existe valor igual. */
    /* Passei os campos para Lower case para validar de forma case insensitive*/
    return todos.some(x => x.name.toLowerCase() === todoInput.value.toLowerCase())
};

/* Funcão criada para testar a mesma solução de checkexist utilizando o FIND
function checkExist(todos){
    todos.find(function (task) {
    /* Procura no array(FIND) o valor do input e retorna true caso existe valor igual */
/*      if (task.name.toLowerCase() === todoInput.value.toLowerCase()) {
          console.log("existe");
          return;   
      }
      else {
          return;
      }
})};*/


// Função para adicionar TO-DOs
function addTodo(task) {
    // Se a task não é vazia.
    if (task !== '') {
        // Cria o objeto, com id, nome e propriedade completed 
        const todo = {
            id: Date.now(),
            name: task,
            completed: false
        };
        // adiciona o objeto no array dos TODOs
        todos.push(todo);
        addToLocalStorage(todos); // chamar a função para guardar no localstorage
        todoInput.value = ''; //Limpar o valor do input//
    }
}

// Função para CARREGAR na tela os TO-DOs(carregando o array : todos) 
function loadTodos(todos) {
    // Limpa a <ul> das tasks com "class=todo-tasks"
    todoTasksList.innerHTML = '';

    // Laço foreach para passar atráves de cada task dentro do array
    todos.forEach(function (task) {
        // Checa se a task está completa
        const flagged = task.completed ? 'checked' : null;

        // cria um elemento <li> e o popula <li> </li>
        const li = document.createElement('li');
        // <li class="task"> </li>
        li.setAttribute('class', 'task');
        // <li class="task" data-key="%dataatual%"> </li>
        li.setAttribute('data-key', task.id);
        /* Exemplo: <li class="task" data-key="%dataatual%"> 
              <input type="checkbox" class="checkbox">
              tarefa a criar
              <button class="delete-button">X</button>
            </li> */
        /* Se as tarefas estão completas, então adiciona a classe ao <li>
         chamada 'flagged' e adiciona o CSS determinado.*/
        if (task.completed === true) {
            li.classList.add('checked');
        }
        // colocar no <li> item com Checkbox Flagged ou não + nome da task + o botão remover
        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${flagged}>${task.name}<button class="delete-button">Remover</button>`;
        // adiciona o <li> ao <ul> (append)
        todoTasksList.append(li);
    });

}

// Sinalizar(Flag) completo ou não completo
function flagging(id) {
    todos.forEach(function (task) {
        if (task.id == id) {
            task.completed = !task.completed;
        }
    });
    addToLocalStorage(todos);
}

// deleta o Todo (tarefa/task) para o ARRAY, para atualizar o localstorage e renderizar a atualização na tela
function deleteTodo(id) {
    todos = todos.filter(function (task) {
        // usar != not !==, são tipagem diferente. número x string
        return task.id != id;
    });
    // Atualizar o localStorage
    addToLocalStorage(todos);
}

// Escutar os eventos de click no checkbox e delete.
todoTasksList.addEventListener('click', function (event) {
    // verifica se o evento foi no checkbox
    if (event.target.type === 'checkbox') {
        flagging(event.target.parentElement.getAttribute('data-key'));
    }

    // verifica se o evento botão Delete.
    if (event.target.classList.contains('delete-button')) {
        // If Confirm utilizando o ALERTA normal, desabilitado para utilizaro sweetalert
        /*  if (confirm('Deseja realmente excluir?') == true) {
        deleteTodo(event.target.parentElement.getAttribute('data-key')); */
        swal.fire({
            icon: 'warning',
            title: 'Você está certo disso?',
            text: 'Ao confirmar o item será removido da lista!',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            //removi a coloração do botão cancelar, tornando o alerta sobre a confirmação
            /* cancelButtonColor: '#d33', */
            confirmButtonText: 'Sim, tenho certeza!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                deleteTodo(event.target.parentElement.getAttribute('data-key'));
                //adicionei alerta de sucesso sem interação
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Item removido da lista!',
                    showConfirmButton: false,
                    width: 300,
                    timer: 1000
                })
            }
        })

    }
}
);
