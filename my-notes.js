const mainContainer = document.getElementById("main-container");

// getting all lists from local storage

const getAllLists = () => {
  let getAllLists = localStorage;
  //   console.log(getAllLists);

  for (const key in getAllLists) {
    if (getAllLists.hasOwnProperty.call(getAllLists, key)) {
      let list = `<div class="card m-3" style="width: 18rem">
            <div class="card-body  text-center">
              <h5 class="card-title">${key}</h5>
              <p class="card-text">
                ${getAllLists[key]}
              </p>
              </div>
              <div class="d-flex justify-content-around  pb-3">
              <button type="button" class="btn btn-outline-primary" onclick="onEdit(this)">Edit</button>
              <button type="button" class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
          </div>
          </div>
          `;
      mainContainer.insertAdjacentHTML("beforeend", list);
    }
  }
};

// delete button

const onDelete = async (elm) => {
  if (!confirm("Are you sure you want to delete this note?")) {
    return;
  }
  let toDelete =
    elm.parentElement.parentElement.getElementsByClassName("card-title")[0];
  let note = toDelete.innerHTML;
  localStorage.removeItem(toDelete.innerHTML);
  await elm.parentElement.parentElement.remove();
  if (mainContainer.children.length == 0) {
    let empty = `<div id="empty">
    This seems Empty! Please add some Notes.
  </div>`;
    mainContainer.insertAdjacentHTML("afterbegin", empty);
  }
  setTimeout(() => {
    alert(`Note ${note} Deleted Successfully`);
  }, 10);
};

// edit button

const onEdit = (elm) => {
  let toEdit =
    elm.parentElement.parentElement.getElementsByClassName("card-title")[0];
  let newDesc = prompt("Enter updated Note").trim().replace(/\s+/g, " ");
  while (newDesc == null || newDesc == "" || newDesc == " ") {
    if (!confirm("Note cannot be Empty! Do you want to update your Note?")) {
      return;
    }
    newDesc = prompt("Enter updated Note");
  }
  localStorage.setItem(toEdit.innerHTML, newDesc);
  alert(`Note ${toEdit.innerHTML} Edited Successfully`);
  location.reload();
};

// add new note button

const addNote = (elm) => {
  let newTitle = prompt("Enter Note Title").trim().replace(/\s+/g, " ");
  while (newTitle == null || newTitle == "" || newTitle == " ") {
    if (!confirm("Note Title cannot be Empty! Do you want to add new Note?")) {
      return;
    }
    newTitle = prompt("Enter Note Title").trim().replace(/\s+/g, " ");
  }
  let newDesc = prompt("Please Enter your Note").trim().replace(/\s+/g, " ");
  while (newDesc == null || newDesc == "" || newDesc == " ") {
    if (!confirm("Note cannot be Empty! Do you want to add new Note?")) {
      return;
    }
    newDesc = prompt("Please Enter your Note").trim().replace(/\s+/g, " ");
  }
  localStorage.setItem(newTitle, newDesc);
  alert(`Note ${newTitle} Added Successfully`);
  location.reload();
};

const handleEnter = (event)=>{
    if(event.key=="Enter"){
      event.preventDefault();
      searchNotes();
    }
}

//  search button

const searchNotes = async (elm) => {
  if(localStorage.length==0){
    return;
  }
  let searchVal = document
    .getElementById("search")
    .value.toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, " ");
  // console.log(searchVal);
  let searchValArray = [];
  const getSearchValArray = async () => {
    for (const key in localStorage) {
      if (Object.hasOwnProperty.call(localStorage, key)) {
        if (
          key.toLocaleLowerCase().match(searchVal) ||
          localStorage[key].toLocaleLowerCase().match(searchVal)
        ) {
          searchValArray.push(key);
        }
      }
    }
  };
  await getSearchValArray();

  const removeChildrens = async ()=>{
    let allChildrens = Array.from(mainContainer.children);
    for (const i of allChildrens) {
      i.remove();
    }
  }

  await removeChildrens();


  for (const i of searchValArray) {
    let list = `<div class="card m-3" style="width: 18rem">
            <div class="card-body  text-center">
              <h5 class="card-title">${i}</h5>
              <p class="card-text">
                ${localStorage[i]}
              </p>
              </div>
              <div class="d-flex justify-content-around  pb-3">
              <button type="button" class="btn btn-outline-primary" onclick="onEdit(this)">Edit</button>
              <button type="button" class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
          </div>
          </div>
          `;
    mainContainer.insertAdjacentHTML("beforeend", list);
  }
  document.getElementById("search").value = "";
  if(mainContainer.children.length==0){
    let empty = `<div id="no-match">
  Oops! No Match Found :(
</div>`;
  mainContainer.insertAdjacentHTML("afterbegin", empty);
  }
};

getAllLists();

if (mainContainer.children.length == 0) {
  let empty = `<div id="empty">
  This seems Empty! Please add some Notes.
</div>`;
  mainContainer.insertAdjacentHTML("afterbegin", empty);
}
