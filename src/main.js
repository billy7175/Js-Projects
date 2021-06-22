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
      "Dashboadrd",
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
    deleteUser: function(id){
      id = parseInt(id);
      data.users.forEach((user) => {
        if(user.id === id){
          const deleteUser = user;
          data.users.splice(deleteUser.id,1);
          console.log(data.user);
        }
      });
    },
    logData: function () {
      return data;
    },
    userData: function(){
      return data.users;
    }
  };
})();

const UICtrl = (function () {
  const UISelectors = {
    iconList: ".icon-list",
    menuList: ".menu-list",
    userList: ".user-list",
    addBtn: ".add-btn",
    addUser: ".add-user",
    cancelBtn: ".cancel-btn",
    modal: ".modal-overlay",
    userName: "#user-name",
    userAge: "#user-age",
    userAddress: "#user-address",
    userClass: "#user-class",
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
    document.querySelector(UISelectors.modal).style.display = 'none';

    document.querySelector(UISelectors.userList).addEventListener('click', deleteUser)
  };

  function deleteUser(e){
    
    let confirm = confirm("Do you want to delete a user?");
    confirm
    if(e.target.classList.contains('delete-user')){

      const id = e.target.parentNode.parentNode.firstElementChild.textContent
      ItemCtrl.deleteUser(id);
      e.target.parentNode.parentNode.remove();
      console.log("can you see me")
    }
  }

  function addUser() {
    const inputs = UICtrl.getUserInputs();
    const newUser = ItemCtrl.addUser(
      inputs.name,
      inputs.age,
      inputs.address,
      inputs.category
    );
    UICtrl.addUserToList(newUser);
  }

  function hideModal() {
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
