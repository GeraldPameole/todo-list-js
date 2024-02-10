/**                               Initialisation de liste des taches**
 * 
/* Sélection des éléments de formulaire, d'entrée et de liste de notre code HTML à l'aide de leurs identifiants.
Stocker ces éléments dans des variables pour un accès facile dans notre code JavaScript.
 */
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

/* Ajout d'un écouteur d'événement pour la soumission de formulaire 
  gérer l'événement lorsqu'un utilisateur ajoute une nouvelle tâche.
  /* Dans cette fonction :
  => Empêcher le comportement de soumission de formulaire par défaut, qui actualise la page.
  => Vérifier si le champ de saisie est vide et alerter l'utilisateur si c'est le cas.
  => Préparation de l'ajout de la nouvelle tâche (que nous traiterons dans les prochaines étapes).
  => Effacement du champ de saisie après l'ajout d'une tâche.*/
/* Intégration de la fonction Ajouter une tâche*/

todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newTask = todoInput.value;

  if (newTask === '') {
    alert('Please enter a task!');
    return;
  }
  todoInput.value = '';
  addTask(newTask);
});
/* Création d'une fonction pour ajouter des tâches
/*Dans cette fonction :
    => Création d'un nouvel élément <li> pour la tâche.
    => Définir son contenu textuel sur la tâche transmise à la fonction.
    => Ajout du nouvel élément de liste à notre élément todo-list .
+ amelioration de la fonction d'ajout de tâches. 
.*/
function addTask(task) {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);

  // + modification de notre fonction addTask pour inclure des fonctionnalités supplémentaires telles que des cases à cocher et des boutons de suppression pour chaque tâche
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  listItem.appendChild(checkBox);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  listItem.appendChild(editButton);

  checkBox.addEventListener('change', function () {
    if (this.checked) {
      taskText.style.textDecoration = 'line-through';
    } else {
      taskText.style.textDecoration = 'none';
    }
  });

  deleteButton.addEventListener('click', function () {
    todoList.removeChild(listItem);
  });
  //Implémentation de la fonctionnalité d'édition
  /* si tâche en mode édition =>
  enregistrons la tâche modifiée et revenons au mode d'affichage.
  Sinon ,passons en mode édition en remplaçant le texte de la tâche par un champ de saisie.*/
  editButton.addEventListener('click', function () {
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
      taskText.textContent = this.previousSibling.value; //
      listItem.classList.remove('editing');
      editButton.textContent = 'Edit';
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskText.textContent;
      listItem.insertBefore(input, taskText);
      listItem.removeChild(taskText);
      listItem.classList.add('editing');
      editButton.textContent = 'Save';
    }

  });
  saveTasksToLocalStorage();
}
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list').forEach(task => {
    const taskText = task.querySelector('span').textContent;
    const isCompleted = task.classList.contains('completed');
    tasks.push(taskText, isCompleted);

  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.addEventListener('DOMContentLoaded', function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    addTask(task.text);
  });
});
