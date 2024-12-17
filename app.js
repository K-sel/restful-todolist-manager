//Variables Globales
// Sélection des éléments du DOM pour le formulaire d'inscription, de connexion et le bouton de déconnexion
const formSignUp = document.querySelector("form[name=signup]");
const formLogin = document.querySelector("form[name=login]");
const formTodo = document.querySelector("form[name=todo]");
const logoutButton = document.querySelector("button[name=logout]");

// Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un jeton dans le localStorage
// Retourne true si un jeton existe, false sinon
const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

// Affiche un message à l'utilisateur dans la zone de message désignée
const displayMessage = (message) => {
  document.querySelector(".message").textContent = message; // Sélectionne l'élément de message et met à jour son texte
};

// Gère la visibilité des éléments de l'interface en fonction du statut d'authentification
// Affiche/masque les éléments nécessitant ou non une authentification
const handleInterfaceAuth = () => {
  const auth = isAuthenticated(); // Vérification du statut d'authentification actuel

  // Basculement de la visibilité des éléments nécessitant une authentification
  document
    .querySelectorAll(".requires-auth")
    .forEach((el) => el.classList.toggle("hidden", !auth));

  // Basculement de la visibilité des éléments ne nécessitant pas d'authentification
  document
    .querySelectorAll(".requires-unauth")
    .forEach((el) => el.classList.toggle("hidden", auth));
};

// Bascule entre les formulaires de connexion et d'inscription
// Gère les états actifs des formulaires et des onglets
const toggleForm = (formName) => {
  // Effacement des messages existants
  displayMessage("");

  // Désactivation de tous les formulaires
  document
    .querySelectorAll("form")
    .forEach((form) => form.classList.remove("active"));

  // Activation du formulaire spécifié
  document.querySelector(`form[name='${formName}']`).classList.add("active");

  // Désactivation de tous les onglets
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));

  // Activation de l'onglet correspondant
  document.querySelector(`.tab#${formName}`).classList.add("active");
};

// Méthode de création d'un nouvel utilisateur
// Prend des données de formulaire en entrée et gère le processus de création d'utilisateur
const createUser = async (formData) => {
  let form = Object.fromEntries(formData);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  };

  try {
    // Envoi d'une requête POST vers le point de terminaison de création d'utilisateurs
    let response = await fetch(
      "https://progweb-todo-api.onrender.com/users/",
      options
    );

    // Analyse de la réponse du serveur
    let data = await response.json();

    // Affichage du message renvoyé par le serveur
    displayMessage(data.message);

    // Retour des données de réponse
    return data;

    // Gestion des erreurs potentielles
  } catch (e) {
    console.error(`${e.message}`);
  }
};

// Méthode d'authentification utilisateur
// Envoie les identifiants de connexion au serveur et gère l'état d'authentification
const login = async (formData) => {
  let form = Object.fromEntries(formData);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  };

  try {
    // Envoi d'une requête POST vers le point de terminaison de connexion
    let response = await fetch(
      "https://progweb-todo-api.onrender.com/users/login",
      options
    );

    // Analyse de la réponse du serveur
    const data = await response.json();

    // Si la connexion est réussie (statut 200), stocker le jeton et mettre à jour l'interface
    if (response.status == 200) {
      localStorage.setItem("token", data.token); // Stockage du jeton d'authentification
      handleInterfaceAuth(); // Mise à jour de l'interface utilisateur
      fetchTodos(); // Vas chercher les todos de l'utilisateur et les affiches
    }

    // Affichage du message renvoyé par le serveur
    displayMessage(data.message);

    // Gestion des erreurs potentielles
  } catch (e) {
    console.error(`${e.message}`);
  }
};

//Ajouter des todos
const fetchTodos = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    // Envoi d'une requête POST vers le point de terminaison de création d'utilisateurs
    let response = await fetch(
      "https://progweb-todo-api.onrender.com/todos/",
      options
    );

    // Analyse de la réponse du serveur
    let data = await response.json();
    console.log(data);

    //Si les todos ont été trouvé, on les affiche avec la méthode displayTodos
    if (response.status === 200) {
      displayTodos(data.todos);
    }
    //De plus, on affiche le message de statut
    displayMessage(data.message);

    // Gestion des erreurs potentielles
  } catch (e) {
    console.error(`${e.message}`);
  }
};

// Méthode permettant d'afficher les todos, utilise la délégation d'évenements
// Prends en paramètres un tableau d'objets todos (de fetchTodos)
const displayTodos = (todos) => {
  document.querySelector("ul").replaceChildren();
  todos.forEach((el) => {
    let li = document.createElement("li");
    li.innerHTML = `
	        <p class="body">${el.body}</p>
	        <p class="tags">${el.tags}</p>
	        <div class="delete"></div>`;
    li.setAttribute("id", `${el.id}`);
    document.querySelector("ul").append(li);
  });
};

// Méthode de pour supprimer les todos dans le backend et dans le DOM
const deleteTodo = async (id, HTMLelement) => {
  const body = JSON.stringify({ body: null });
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body,
  };

  try {
    let response = await fetch(
      `https://progweb-todo-api.onrender.com/todos/${id}`,
      options
    );
    // console.log(await response.text())
    // Analyse de la réponse du serveur
    let data = await response.json();

    // Affichage du message renvoyé par le serveur
    displayMessage(data.message);

    // Si la todo a bien été supprimée dans la base de données, on la supprime du DOM
    if (response.status === 200) {
      HTMLelement.remove();
    }

    // Gestion des erreurs potentielles
  } catch (e) {
    console.error(`${e.message}`);
  }
};

// Méthode permettant de créer des todos, elle prends les inputs du formulaire
// Envoie a l'API la nouvelle todo
// Si l'ajout a réussi (status 200) on refresh les todos via fetchTodos()
const createTodo = async (formData) => {
  let todo = Object.fromEntries(formData);
  if (todo.body) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(todo),
    };

    try {
      let response = await fetch(
        "https://progweb-todo-api.onrender.com/todos/",
        options
      );

      // Analyse de la réponse du serveur
      let data = await response.json();

      if (response.status === 201) {
        fetchTodos();
      }
      // Affichage du message renvoyé par le serveur
      displayMessage(data.message);

      // Retour des données de réponse
      return data;

      // Gestion des erreurs potentielles
    } catch (e) {
      console.error(`${e.message}`);
    }
  } else {
    displayMessage("Impossible de poster un todo vide.");

  }
};

// Initialisation des écouteurs d'événements pour les formulaires et les éléments interactifs
const initEventListeners = () => {
  // Gestion du changement d'onglets
  document.querySelector(".tab-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("tab")) {
      toggleForm(e.target.id);
    }
  });

  // Gestion de la soumission du formulaire d'inscription
  formSignUp.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    const formData = new FormData(formSignUp); // Collecte des données du formulaire
    createUser(formData) // Création de l'utilisateur et journalisation de la réponse
    formSignUp.reset(); // Réinitialisation du formulaire d'inscription
  });

  // Gestion de la soumission du formulaire de connexion
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    const formData = new FormData(formLogin); // Collecte des données du formulaire
    login(formData); // Tentative de connexion de l'utilisateur
    formLogin.reset(); 
  });

  // Gestion du clic sur le bouton de déconnexion
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token"); // Suppression du jeton d'authentification
    handleInterfaceAuth(); // Mise à jour de l'interface pour l'état non authentifié
    displayMessage("Logged out successfully"); //Affichage utilisateur
  });

  formTodo.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    const formData = new FormData(formTodo);  // Collecte des données du formulaire
    createTodo(formData); // Création de la tâche
    formTodo.reset(); // Réinitialisation du formulaire de connexion
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      let id = e.target.parentElement.attributes[0].value; // Obtention de l'id
      let HTMLelement = e.target.parentElement; // Obtention de l'élément HTML de la tâche
      deleteTodo(id, HTMLelement); // Tentative de suppression de la tâche dans API et DOM
    }
  });
};

// Fonction d'initialisation principale
// Gère l'état d'authentification et configure les écouteurs d'événements
const pageLoad = () => {
  handleInterfaceAuth(); // Vérification et définition de l'état d'authentification initial
  initEventListeners(); // Configuration de tous les écouteurs d'événements
  if (isAuthenticated()) {
    fetchTodos();
  }
};

// Démarrage de l'initialisation de la page lors du chargement du script
pageLoad();
