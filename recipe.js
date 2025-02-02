const recipes = [
    {
      title: "Pancake",
      ingredients: ["Flour", "Milk", "Egg", "Vanilla essence", "Baking Powder"],
      preparation: ["Mix ingredients.", "Heat a pan.", "Pour batter and cook."]
    },
    {
      title: "Fish Salad",
      ingredients: ["Fish", "Lettuce", "Olive Oil", "Salt", "Pepper"],
      preparation: ["Chop vegetables.", "Grill fish.", "Mix everything."]
    },
    {
      title: "Chana Masala",
      ingredients: [
        "Channa",
        "Tomato",
        "Olive Oil",
        "Salt",
        "Chilli Powder",
        "Onion",
        "Ginger Garlic Paste"
      ],
      preparation: [
        "Chop vegetables.",
        "Boil the channa.",
        "Fry ginger garlic paste, onion,tomato,chilli powder",
        "Mix everything."
      ]
    },
    {
      title: "Carrot Soup",
      ingredients: [
        "Carrot",
        "Onion",
        "Olive Oil",
        "Salt",
        "Chilli",
        "Ginger Garlic Paste",
        "Pepper"
      ],
      preparation: [
        "Chop vegetables.",
        "Boil the Carrot,Onion.",
        "Fry ginger garlic paste in Olive oil",
        "Add pepper",
        "Mix everything."
      ]
    },
    {
      title: "Creamy Pasta",
      ingredients: [
        "Pasta",
        "Tomato",
        "Olive Oil",
        "Salt",
        "Pepper Powder",
        "Onion",
        "Ginger Garlic Paste",
        "Carrot",
        "Capsicum"
      ],
      preparation: [
        "Chop vegetables.",
        "Boil the Pasta.",
        "Fry ginger garlic paste, onion,tomato,mix of vegetables",
        "Mix everything."
      ]
    },
    {
      title: "MilkShake",
      ingredients: ["Milk", "Strawberry", "Almonds", "Sugar"],
      preparation: ["Chop the strawberry.", "Add everything to the blender."]
    }
  ];
  
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const recipeTitle = document.getElementById("recipe-title");
  const ingredientsList = document.getElementById("ingredients");
  const preparationList = document.getElementById("preparation");
  const closeModal = document.getElementById("close");
  
  document.querySelectorAll(".recipe").forEach((recipeElement) => {
    recipeElement.addEventListener("click", () => {
      const index = recipeElement.getAttribute("data-index");
      const recipe = recipes[index];
  
      recipeTitle.textContent = recipe.title;
      ingredientsList.innerHTML = recipe.ingredients
        .map((item) => `<li>${item}</li>`)
        .join("");
      preparationList.innerHTML = recipe.preparation
        .map((step) => `<li>${step}</li>`)
        .join("");
  
      // show modal
      modal.style.display = "flex";
    });
  });
  
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  const formModal = document.getElementById("form-modal");
  const formClose = document.getElementById("form-close");
  const addRecipe = document.getElementById("add-recipe");
  addRecipe.addEventListener("click", () => {
    formModal.style.display = "flex";
  });
  
  formClose.addEventListener("click", () => {
    console.log("close");
    formModal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
    if (e.target === formModal) {
      formModal.style.display = "none";
    }
  });
  const submit = document.getElementById("submit");
  const formTitle = document.getElementById("form-title-text");
  const formIngredients = document.getElementById("form-ingredients-text");
  const formURL = document.getElementById("form-url-text");
  const formPreparation = document.getElementById("form-preparation-text");
  submit.addEventListener("click", () => {
    const imgUrl = formURL.value.trim();
    const newRecipe = {
      title: formTitle.value.trim(),
      ingredients: formIngredients.value.split(",").map((item) => item.trim()),
      preparation: formPreparation.value.split(",").map((item) => item.trim())
    };
  
    if (
      newRecipe.title &&
      newRecipe.ingredients.length &&
      newRecipe.preparation.length
    ) {
      recipes.push(newRecipe); // Add new recipe to the array
      console.log(recipes.length);
      formModal.style.display = "none";
      renderRecipes(newRecipe, imgUrl, recipes.length);
  
      formTitle.value = "";
      formIngredients.value = "";
      formPreparation.value = "";
      formURL.value = "";
      alert("Recipe added successfully");
    } else {
      alert("Please fill out all fields!");
    }
  });
  
  const reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    formTitle.value = "";
    formIngredients.value = "";
    formPreparation.value = "";
    formURL.value = "";
  });
  
  function renderRecipes(recipe, imageUrl, index) {
    console.log(recipe, imageUrl);
    const recipesContainer = document.getElementById("recipes");
  
    const recipeDivContainer = document.createElement("div");
    recipeDivContainer.classList.add("recipe-div");
  
    const closeButton = document.createElement("span");
    closeButton.classList.add("recipe-close");
    closeButton.innerHTML = "&times;";
    recipeDivContainer.appendChild(closeButton);
  
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.setAttribute("data-index", index);
  
    const recipeTitle = document.createElement("p");
    recipeTitle.textContent = recipe.title;
    recipeDiv.appendChild(recipeTitle);
  
    const recipeImg = document.createElement("img");
    recipeImg.src =
      imageUrl ||
      "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=600";
    recipeImg.alt = recipe.title;
    recipeImg.width = 60;
    recipeImg.height = 60;
    recipeDiv.appendChild(recipeImg);
    recipeDivContainer.appendChild(recipeDiv);
  
    recipesContainer.appendChild(recipeDivContainer);
  
    // click event to show modal for each recipe
    recipeDiv.addEventListener("click", () => {
      document.getElementById("recipe-title").textContent = recipe.title;
      document.getElementById("ingredients").innerHTML = recipe.ingredients
        .map((item) => `<li>${item}</li>`)
        .join("");
      document.getElementById("preparation").innerHTML = recipe.preparation
        .map((step) => `<li>${step}</li>`)
        .join("");
      modal.style.display = "flex";
    });
  }
  
  // search
  const searchBox = document.getElementById("search");
  
  searchBox.addEventListener("input", () => {
    const searchText = searchBox.value.toLowerCase();
    const recipeElements = document.querySelectorAll(".recipe-div");
    const addRecipe = document.getElementById("add-recipe");

  
    recipeElements.forEach((recipeElement, index) => {
      const recipeTitle = recipes[index]?.title.toLowerCase();
  
      if (recipeTitle.includes(searchText)) {
        recipeElement.style.display = "flex";
      } else {
        recipeElement.style.display = "none";
      }
    });
  });
  //recipe close button
  const recipeCloseButton = document.querySelectorAll(".recipe-close");
  recipeCloseButton.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("close button clicked");
      alert("Recipe is removed!");
      button.parentElement.remove();
    });
  });
  