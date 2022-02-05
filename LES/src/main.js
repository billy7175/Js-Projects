const ItemCtrl = (function () {
  const Item = function (id, name, age, address, category) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.address = address;
    this.category = category;
  };
  const data = {
    items: [
      "Students",
      "Products",
      "Inventory Management",
      "Assets Management",
      "Sales",
      "Purchase",
      "Reports",
      "Staff Management",
      "Customers",
      "Routes",
      "Financial Management",
      "Businness Intelligence",
      "Back Office Management",
    ],
    users: [
      {
        id: 0,
        name: "Billy",
        age: 20,
        category: "TOEIC",
        address: "Out of Earth, Venius",
      },
      {
        id: 1,
        name: "Charlie",
        age: 25,
        category: "Writing",
        address: "Out of Earth, Venius",
      },
      {
        id: 2,
        name: "Lisa",
        age: 30,
        category: "Listening",
        address: "Out of Earth, Venius",
      },
    ],
  };

  return {
    getMenuList: function () {
      return data.items;
    },
    getUserList: function () {
      return data.users;
    },
    addUser: function (name, age, address, category) {
      let ID;
      if (data.users.length > 0) {
        ID = data.users[data.users.length - 1].id + 1;
      } else {
        ID = 0;
      }
      age = parseInt(age);
      newItem = new Item(ID, name, age, address, category);
      data.users.push(newItem);
      return newItem;
    },
    deleteUser: function (id) {
      id = parseInt(id);
      data.users.forEach((user) => {
        if (user.id === id) {
          const deleteUser = user;
          data.users.splice(deleteUser.id, 1);
          console.log(data.user);
        }
      });
    },
    findUpdateUser: function(id){
      id = parseInt(id);
      let found = '';
      data.users.forEach((user) => {
        if(user.id === id){
          found = user;
        }
      });
      return found;
    },
    updateUserList: function(id, inputs){

      data.users.forEach((user) => {
        if(user.id === id){
          user.id = id;
          user.name = inputs.name;
          user.age = inputs.age;
          user.address = inputs.address;
          user.category = inputs.category;
        }
      });
      return data.users;
    },
    logData: function () {
      return data;
    },
    userData: function () {
      return data.users;
    },
  };
})();

const UICtrl = (function () {
  const UISelectors = {
    iconList: ".icon-list",
    menuList: ".menu-list",
    userList: ".user-list",
    addBtn: ".add-btn",
    addUser: ".add-user",
    updateUser: ".update-user",
    updateUserBtn : '.update-user-btn',
    cancelBtn: ".cancel-btn",
    modal: ".modal-overlay",
    userName: "#user-name",
    userAge: "#user-age",
    userAddress: "#user-address",
    userClass: "#user-class",
    name: document.querySelector(".user-name"),
  };
  return {
    populateIconList: function () {
      let html = "";
      for (var i = 0; i <= 12; i++) {
        html += `<li><i class="fa fa-plus"></i></li>`;
      }
      document.querySelector(UISelectors.iconList).innerHTML = html;
    },
    populateMenuList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      document.querySelector(UISelectors.menuList).innerHTML = html;
    },
    populateUserList: function (users) {
      let html = "";
      users.forEach((user) => {
        html += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.address}</td>
        <td>${user.category}</td>
        <td><button class="update-user">UPDATE</button></td>
        <td><button class="delete-user">DELETE</button></td>
      </tr>`;
      });

      document.querySelector(UISelectors.userList).innerHTML = html;
    },
    hideModal: function () {
      document.querySelector(UISelectors.modal).style.display = "none";
    },
    showModal: function () {
      document.querySelector(UISelectors.modal).style.display = "block";
    },
    getUserInputs: function () {
      return {
        name: document.querySelector(UISelectors.userName).value,
        age: document.querySelector(UISelectors.userAge).value,
        address: document.querySelector(UISelectors.userAddress).value,
        category: document.querySelector(UISelectors.userClass).value,
      };
    },
    addUserToList(newUser) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${newUser.id}</td>
      <td>${newUser.name}</td>
      <td>${newUser.age}</td>
      <td>${newUser.address}</td>
      <td>${newUser.class}</td>
      <td><button class="update-user">UPDATE</button></td>
      <td><button class="delete-user">DELETE</button></td>
    `;
      document
        .querySelector(UISelectors.userList)
        .insertAdjacentElement("beforeend", tr);
    },
    updateUserToModal(id){
      UICtrl.showModal();
      const userToUpdate = ItemCtrl.findUpdateUser(id);

      // populateUserToUpdate to Modal UI;
      document.querySelector(UISelectors.userName).value = userToUpdate.name;
      document.querySelector(UISelectors.userAge).value = userToUpdate.age;
      document.querySelector(UISelectors.userAddress).value = userToUpdate.address;
      document.querySelector(UISelectors.userClass).value = userToUpdate.category;
      document.querySelector(UISelectors.updateUserBtn).id = userToUpdate.id;
    },
    updateUserListToUI: function (users){
      let html = "";
      users.forEach((user) => {
        html += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.address}</td>
        <td>${user.category}</td>
        <td><button class="update-user">UPDATE</button></td>
        <td><button class="delete-user">DELETE</button></td>
      </tr>`;
      });

      document.querySelector(UISelectors.userList).innerHTML = html;
    },
    clearInputs: function () {
      document.querySelector(UISelectors.userName).value = "";
      document.querySelector(UISelectors.userAge).value = "";
      document.querySelector(UISelectors.userAddress).value = "";
      document.querySelector(UISelectors.userClass).value = "";
    },
    validateInputs() {
      // if(UISelectors.name.value = ''){
      //   alert("please fill the name.");
      // }
    },
    getSelectors() {
      return UISelectors;
    },
  };
})();

const App = (function (ItemCtrl, UICtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.cancelBtn)
      .addEventListener("click", hideModal);
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", showModal);
    document
      .querySelector(UISelectors.addUser)
      .addEventListener("click", addUser);
    document.querySelector(UISelectors.modal).style.display = "none";

    document
      .querySelector(UISelectors.userList)
      .addEventListener("click", clickUpdateUser);

    document
      .querySelector(UISelectors.userList)
      .addEventListener("click", deleteUser);
  
    document.querySelector(UISelectors.updateUserBtn).addEventListener('click', updateUser)
      
    };

  function clickUpdateUser(e) {
    if (e.target.classList.contains("update-user")) {
      const idToUpdate = e.target.parentNode.parentNode.firstElementChild.textContent;
      UICtrl.updateUserToModal(idToUpdate);
    }
  }

  function updateUser(e){
    let idToUpdate = e.target.id;
    idToUpdate = parseInt(idToUpdate);
    const getUpdateUserInputs = UICtrl.getUserInputs();
    // const found = ItemCtrl.updateUser(idToUpdate);

    const updatedUsers = ItemCtrl.updateUserList(idToUpdate,getUpdateUserInputs);
    UICtrl.updateUserListToUI(updatedUsers);
    UICtrl.hideModal();
  }

  function deleteUser(e) {
    if (e.target.classList.contains("delete-user")) {
      if (confirm("Do you want to delete a user?")) {
        const id = e.target.parentNode.parentNode.firstElementChild.textContent;
        ItemCtrl.deleteUser(id);
        e.target.parentNode.parentNode.remove();
      }
    }
  }

  function addUser() {
    const inputs = UICtrl.getUserInputs();
    if (inputs.name.trim() === "") {
      alert("Please fill the name.");
    } else if (inputs.age.trim() === "") {
      alert("Please fill the age")
    } else if (inputs.address.trim() === "") {
      alert("Please fill the address");
    } else if (inputs.category.trim() === ''){
      alert('Please fill the category'); 
    } else {
      const newUser = ItemCtrl.addUser(
        inputs.name,
        inputs.age,
        inputs.address,
        inputs.category
      );
      UICtrl.addUserToList(newUser);
      UICtrl.clearInputs();
      UICtrl.hideModal();
    }

    
  }

  function hideModal() {
    UICtrl.clearInputs();
    UICtrl.hideModal();
  }

  function showModal() {
    UICtrl.showModal();
  }

  return {
    init: function () {
      // add icons to UI;
      UICtrl.populateIconList();

      // get menuList from data;
      const menuList = ItemCtrl.getMenuList();
      // add menuList to UIl;;
      UICtrl.populateMenuList(menuList);

      // get userList from data;
      const userList = ItemCtrl.getUserList();
      UICtrl.populateUserList(userList);

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
