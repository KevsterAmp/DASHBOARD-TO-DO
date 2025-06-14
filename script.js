const addBox = document.querySelector(".addBox");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("#title");
const descTag = popupBox.querySelector("#desc");
const addBtn = popupBox.querySelector("button");
const kanbanColumns = document.querySelectorAll(".kanban-column");
let selectedTag = "Personal";
let selectedTagColor = "#7875A9";
const tagColors = {
  Personal: "#7875A9",
  Work: "#7DA9D6",
  School: "#FF8E8E",
  Coding: "#7BC683",
};

let notes = JSON.parse(localStorage.getItem("tasks")) || [];

function loadTasksFromLocalStorage() {
  // Clear existing cards
  kanbanColumns.forEach((column) => {
    column.querySelector(".kanban-cards").innerHTML = "";
  });

  // Load tasks from localStorage
  notes = JSON.parse(localStorage.getItem("tasks")) || [];

  // Create cards based on loaded tasks
  notes.forEach((task) => {
    createKanbanCard(task);

    // Check if the task is completed and apply the completed-card class
    if (task.status === "Completed") {
      const card = document.querySelector(`[data-id="${task.id}"]`);
      if (card) {
        card.classList.add("completed-card");
      }
    }
  });
}

window.addEventListener("load", loadTasksFromLocalStorage);

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

function deleteKanbanCard(cardId) {
  const cardToDelete = document.querySelector(`[data-id="${cardId}"]`);
  if (cardToDelete) {
    cardToDelete.remove();
  }

  notes = notes.filter((task) => task.id !== cardId);
  localStorage.setItem("tasks", JSON.stringify(notes));
}

function createKanbanCard(task) {
  const { title, description, tag, tagColor, status, id } = task;
  const card = document.createElement("div");
  const tagClassName = `tag-${tag.replace(/\s/g, "-")}`; // Replace spaces with hyphens
  card.classList.add("kanban-card");
  card.classList.add(tagClassName);
  card.draggable = true;
  card.dataset.tag = tag;
  card.dataset.id = id || generateUniqueId();

  const cardTemplate = `
    <h4>${title}<div class="icons">
      <i class="fas fa-edit edit-icon" onclick="editKanbanCard('${id}')"></i> 
      <i class="fas fa-trash-alt delete-icon" onclick="deleteKanbanCard('${id}')"></i>
    </div></h4>
    <p>${description}</p>
    <div class="kanban-card-tag" style="background-color: ${tagColor}">${tag}</div>
  `;


  card.innerHTML = cardTemplate;

  const targetColumn = Array.from(kanbanColumns).find(
    (column) => column.querySelector("h5").textContent.trim() === task.status
  );

  if (targetColumn) {
    targetColumn.querySelector(".kanban-cards").appendChild(card);
  } else {
    const todoColumn = kanbanColumns[0];
    todoColumn.querySelector(".kanban-cards").appendChild(card);
  }

  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.dataset.id);
  });
}

function moveKanbanCard(cardId, newStatus) {
  const cardToMove = document.querySelector(`[data-id="${cardId}"]`);
  if (cardToMove) {
    const currentColumn = cardToMove.closest(".kanban-column");
    const targetColumn = Array.from(kanbanColumns).find(
      (column) => column.querySelector("h5").textContent.trim() === newStatus
    );

    if (targetColumn && currentColumn !== targetColumn) {
      if (newStatus === "Completed") {
        cardToMove.classList.add("completed-card");
      } else {
        cardToMove.classList.remove("completed-card");
      }

      targetColumn.querySelector(".kanban-cards").appendChild(cardToMove);
      const updatedTask = notes.find((task) => task.id === cardId);
      if (updatedTask) {
        updatedTask.status = newStatus; // Update the status property
        localStorage.setItem("tasks", JSON.stringify(notes)); // Save the updated tasks
      }
    }
  }
}


addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if (selectedTag && (noteTitle || noteDesc)) {
    const newTask = {
      id: generateUniqueId(),
      title: noteTitle,
      description: noteDesc,
      tag: selectedTag, // This is the tag name (e.g., "Personal")
      tagColor: selectedTagColor,
      status: "To do", // Initial status when the task is created
    };

    notes.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(notes));

    createKanbanCard(newTask);
    titleTag.value = "";
    descTag.value = "";
    closeIcon.click();
  } else {
    alert("Please select a tag and fill in the title or description.");
  }
});

kanbanColumns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("hover");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    const newStatus = column.querySelector("h5").textContent.trim();
    moveKanbanCard(cardId, newStatus);
    kanbanColumns.forEach((col) => col.classList.remove("hover"));
  });
});

const tagRadioButtons = document.querySelectorAll('input[name="radio"]');

tagRadioButtons.forEach((radio) => {
  radio.addEventListener("click", () => {
    selectedTag = radio.nextElementSibling.textContent.trim();
    selectedTagColor = tagColors[selectedTag];
  });
});

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const categoryLinks = document.querySelectorAll('.menu li:not(.logout)');

function filterCardsByCategory(selectedCategory) {
  const kanbanCards = document.querySelectorAll('.kanban-card');
  
  kanbanCards.forEach((card) => {
    const cardCategory = card.dataset.tag;
    if (cardCategory === selectedCategory || selectedCategory === 'All') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  const headerTitle = document.querySelector('.header-title h2');
  headerTitle.textContent = selectedCategory;
}

categoryLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedCategory = link.textContent.trim();
    
    categoryLinks.forEach((categoryLink) => {
      categoryLink.classList.remove('active');
    });
    link.classList.add('active');
    
    filterCardsByCategory(selectedCategory);
  });
});

const homeCategoryLink = document.querySelector('.dash');

homeCategoryLink.addEventListener('click', (event) => {
  event.preventDefault();

  categoryLinks.forEach((categoryLink) => {
    categoryLink.classList.remove('active');
  });
  homeCategoryLink.classList.add('active');

  const kanbanCards = document.querySelectorAll('.kanban-card');
  kanbanCards.forEach((card) => {
    card.style.display = 'block';
  });

  const headerTitle = document.querySelector('.header-title h2');
  headerTitle.textContent = 'Home';
});


// Edit popup
const editPopup = document.querySelector(".edit-popup");
const editCloseIcon = editPopup.querySelector(".close-edit-popup");
const editTitleTag = editPopup.querySelector("#edit-title");
const editDescTag = editPopup.querySelector("#edit-desc");
const editTagRadioButtons = document.querySelectorAll('input[name="edit-radio"]');
const updateTaskBtn = editPopup.querySelector(".update-task");
let currentEditingTaskId;

// open edit popup details
function openEditPopup(taskId) {
  const taskToEdit = notes.find((task) => task.id === taskId);
  if (taskToEdit) {
    currentEditingTaskId = taskId;
    editTitleTag.value = taskToEdit.title;
    editDescTag.value = taskToEdit.description;
    // Set the correct radio button based on the task's tag
    editTagRadioButtons.forEach((radio) => {
      if (radio.nextElementSibling.textContent.trim() === taskToEdit.tag) {
        radio.checked = true;
      }
    });
    editPopup.classList.add("show");
  }
}

// update task with new details
function updateTask() {
  const editedTask = notes.find((task) => task.id === currentEditingTaskId);
  if (editedTask) {
    editedTask.title = editTitleTag.value;
    editedTask.description = editDescTag.value;
    
    editTagRadioButtons.forEach((radio) => {
      if (radio.checked) {
        editedTask.tag = radio.nextElementSibling.textContent.trim();
        editedTask.tagColor = tagColors[editedTask.tag];
      }
    });
    localStorage.setItem("tasks", JSON.stringify(notes));
    loadTasksFromLocalStorage();
    editPopup.classList.remove("show");
  }
}


updateTaskBtn.addEventListener("click", updateTask);
editCloseIcon.addEventListener("click", () => editPopup.classList.remove("show"));


kanbanColumns.forEach((column) => {
  column.querySelector(".kanban-cards").addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit-icon");
    if (editButton) {
      const cardId = editButton.closest(".kanban-card").dataset.id;
      openEditPopup(cardId);
    }
  });
});


