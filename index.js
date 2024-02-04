const item = document.querySelector("#item");
const listItems = document.querySelector("#listItems");
const num = document.querySelector(".num");
const alreadyExists = document.querySelector("#alreadyexists");

const Postdata = async () => {
  try {
    const additionalInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: item.value }),
    };

    const Url = "http://localhost:8080/";

    const fetchData = await fetch(Url, additionalInfo);
    const todoData = await fetchData.json();
    alreadyExists.innerHTML = todoData.message;

    if (fetchData.ok) {
      console.log(todoData);
    } else {
      console.log(`error while fetching data`, fetchData.status);

      console.log(todoData.message);
    }
  } catch (err) {
    console.log(err);
  }
};

const DeleteTodo = async (todo) => {
    try {
      const deleteInfo = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: todo }),
      };
  
      const url = "http://localhost:8080/";
  
      const fetchDelete = await fetch(url, deleteInfo);
      const deletemsg = await fetchDelete.json();
      
      alreadyExists.innerHTML = deletemsg.message;
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

let totalList = 0;

item.addEventListener("keyup", async (e) => {
  e.stopPropagation();
  if (e.key == "Enter") {
    getInputValues(e.target.value);
    num.innerHTML = `Number of list:${totalList + 1}`;
    await Postdata();
    item.value = null;
  }
});

const getInputValues = (item) => {
  const listVal = document.createElement("li");
  listVal.innerHTML = `${item} 
    <i class="fas  fa-times"></i>
    `;
  listItems.appendChild(listVal);

  listVal.addEventListener("click", function (e) {
    e.stopPropagation();

    this.classList.toggle("done");
  });

  listVal.querySelector("i").addEventListener("click", function (e) {
    DeleteTodo(item);
    e.stopPropagation();
    listVal.remove();
  });
};
