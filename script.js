/**
 * Sélection des éléments de formulaire, d'entrée et de liste de notre code HTML à l'aide de leurs identifiants.
Stocker ces éléments dans des variables pour un accès facile dans notre code JavaScript.
 */
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');


/* Ajout d'un écouteur d'événement pour la soumission de formulaire */
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = todoInput.value;

  if (newTask === '') {
    alert('Inscrivez une tâche!');
    return;
  }
  todoInput.value = '';
});
/* Dans cette fonction :
=> Empêcher le comportement de soumission de formulaire par défaut, qui actualise la page.
=> Vérifier si le champ de saisie est vide et alerter l'utilisateur si c'est le cas.
=> Préparation de l'ajout de la nouvelle tâche (que nous traiterons dans les prochaines étapes).
=> Effacement du champ de saisie après l'ajout d'une tâche.*/

/* Création d'une fonction pour ajouter des tâches*/
function addTask(task) {

  const listItem = document.createElement('li');
  listItem.textContent = task;

  todoList.appendChild(listItem);
}
/*Dans cette fonction :
=> Création d'un nouvel élément <li> pour la tâche.
=> Définir son contenu textuel sur la tâche transmise à la fonction.
=> Ajout du nouvel élément de liste à notre élément todo-list .*/

/*  Intégration de la fonction Ajouter une tâche */
todoForm.addEventListener('submit', function (event) {
  // Existing code
  addTask(newTask); // Add the new task
});