let my_content = document.querySelector("#my-content");
let body = document.querySelector("body");
let food = [
    {
        name: "Pizza",
        price: "200",
        image: "https://imgs.search.brave.com/eljUT7mGb_AfZKPrxlyjg87wCWOv_NCnCvfNcegkf4Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEyNDUx/ODY0LmpwZw",
        shop: "Food Village"
    },
    {
        name: "Chicken Satay",
        price: "250",
        image: "https://imgs.search.brave.com/u4HbG1syhadxW-AEocQSBjKwuBfRG5zVH0aimRhbxFc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU0/OTE3OTYyL3Bob3Rv/L2NoaWNrZW4tc2F0/YXkuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVdLM2dyNGwy/WnNnV0JKZmF3a0hC/N2x4RU5xRG41QXo5/aG1XUllfNkZhWXM9",
        shop: "Cafe Down Town"
    }, {
        name: "Momos",
        price: "150",
        image: "https://imgs.search.brave.com/GRxO2DC8t06pD-wCRzHw4a7b78ZimhgMah9DUVPGio4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE0Lzk0LzM4LzM5/LzM2MF9GXzE0OTQz/ODM5OTFfb3VNT29G/N09mdDQ2MDQwTFU1/MW9BdTNvTmNxcThS/NlUuanBn",
        shop: "Nepal's Item"
    },
    {
        name: "Hakka Noodles",
        price: "250",
        image: "https://imgs.search.brave.com/QA_a2xiSQcNFYSZINOLrOqeL8c5-QAXAMnUA0w1jeq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4Lzg3LzUyLzMx/LzM2MF9GXzg4NzUy/MzEyN19CVHhpYUdq/RGkwZnZDenBzUDRm/MzZvdlVGSlRMYllO/cS5qcGc",
        shop: "D Bapi"
    },
    {
        name: "French Fries",
        price: "130",
        image: "https://imgs.search.brave.com/erWNPNAbcVYQpHt6oaRHg7qP-qyGnALpdC-FaekWHHg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/MzgwMjE4NC92aWRl/by9zYWx0LWZhbGxp/bmctb250by1mcmVu/Y2gtZnJpZXMtaW4t/c2xvdy1tb3Rpb24t/c2hvdC1vbi1waGFu/dG9tLWZsZXgtNGst/Y2FtZXJhLmpwZz9i/PTEmcz02NDB4NjQw/Jms9MjAmYz1zVWoy/S3JDbERxYU9SQnJj/Wk1CWFVnejhDUndF/bVl4d1dYX3JNT3Zu/OElNPQ",
        shop: "American Village Food"
    },
    {
        name: "Sushi",
        price: "200",
        image: "https://imgs.search.brave.com/Zmns9xXgxWLAT5VV9sHTmusY0BPMdnZwvmeweAVGmlw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzODQx/OTAxLmpwZw",
        shop: "Your Sweets"
    },
]
my_content.innerHTML = food.map(
    (item) => {
        return `<div id="food-name">
        <img src="${item.image}">
     <hr> <div id="item-text">  <h1>${item.name}</h1>
        <h3>Price : ${item.price}/-</h3>
               <h5>Shop Name : ${item.shop}</h5></div>
        <button id="btn" onclick="addToCart('${item.name}')">Add to Cart</button>
        </div>`
    }
).join("");
let cart = [];

let cartContainer = document.createElement("div");
cartContainer.id = "cart-container";
body.appendChild(cartContainer);
cartContainer.style.display = "none";
function addToCart(userSelected) {
    let selectedItem = food.find(
        (target) => {
            return target.name === userSelected
        }
    )
    let exixtingItem = cart.find(
        (target) => {
            return target.name === userSelected
        }
    );
    console.log(exixtingItem);
    if (exixtingItem) {
        exixtingItem.quantity += 1;
    }
    else {
        cart.push(
            { ...selectedItem, quantity: 1 }
        );
    }
    showCart();
}
function showCart() {

    let totalPrice = 0;
    let cartHTML = `<p id="h">Your Cart</p>`;
    cartHTML += `
    <table>
    <tr>
    <th>Name</th>
    <th>Quantity</th>
    <th>Total</th>
    </tr>`;
    cart.forEach(
        (check) => {
            let itemPrice = check.price * check.quantity;
            totalPrice += itemPrice;

            cartHTML += `<tr>
    <td>${check.name}</td>
    <td>${check.quantity}</td>
    <td>Rs ${itemPrice}/-</td>
    </tr>`
        }
    );
    cartHTML += `
<tr style="color:rgba(127, 0, 0, 1);
        z-index: 1;">
    <td>-</td>
    <td>-</td>
    <td><b>Rs ${totalPrice}/-</b></td>
    </tr>
    </table>`;
    cartContainer.innerHTML = cartHTML;
    cartContainer.style.display = "flex";
}
