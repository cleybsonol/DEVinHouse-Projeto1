// Pega tudo do localStorage
getFromLocalStorage();

// Função para adicionar os TO-DOs no localstorage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  loadTodos(todos);
}


// Função para buscar os TO-DOs do localStorage
function getFromLocalStorage() {
  const check = localStorage.getItem('todos');
  // checar se existe itens no local storage
  if (check) {
    // Converte para array e guarda todos
    todos = JSON.parse(check);
    loadTodos(todos);
  }
}

// Observação a função não doi colocada em USO
// Função para limpar os TO-DOs no localstorage  
function clearLocalStorage(todos) {
  // limparo localstorage
  localStorage.clear();
  // zera o array   
  todos = [];
  // renderizar para a tela
  loadTodos(todos)
}
