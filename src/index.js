const URLString = "http://localhost:3000/dogs/";
const table = document.querySelector("#table-body");
const form = document.getElementById("dog-form");
const hiddenAttr = document.createElement("input");
hiddenAttr.setAttribute("type", "hidden");
hiddenAttr.value = "";
form.append(hiddenAttr);

form[3].addEventListener("click", function editDog(event) {
  event.preventDefault();
  id = form[4].value;
  fetch(`${URLString}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: form[0].value,
      breed: form[1].value,
      sex: form[2].value
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      table.innerHTML = "";
      getDogs();
    });
});

function getDogs() {
  fetch(URLString)
    .then(function(response) {
      return response.json();
    })
    .then(function(dogs) {
      for (const dog of dogs) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${
          dog.sex
        }</td> <td><button>Edit</button></td>`;
        table.appendChild(newRow);
        newRow
          .querySelector("button")
          .addEventListener("click", function prefillDogFields() {
            form[0].value = dog.name;
            form[1].value = dog.breed;
            form[2].value = dog.sex;
            form[4].value = dog.id;
          });
      }
    });
}

function initialize() {
  getDogs();
}

initialize();
