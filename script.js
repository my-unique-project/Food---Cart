let my_content = document.querySelector("#my-content");
let body = document.querySelector("body");
let myCart = document.querySelector("#my-cart");
let wrapper = document.querySelector("#wrapper");
let food = [
    {
        name: "Pizza",
        price: "200",
        image: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
        shop: "Food Village"
    },
    {
        name: "Chicken Satay",
        price: "250",
        image: "https://cdn.pixabay.com/photo/2019/12/13/11/03/satay-4692718_1280.jpg",
        shop: "Cafe Down Town"
    }, {
        name: "Momos",
        price: "150",
        image: "https://cdn.pixabay.com/photo/2024/02/20/15/19/ai-generated-8585693_1280.jpg",
        shop: "Nepal's Item"
    },
    {
        name: "Hakka Noodles",
        price: "250",
        image: "https://cdn.pixabay.com/photo/2023/05/27/12/39/noodle-soup-8021418_1280.png",
        shop: "D Bapi"
    },
    {
        name: "French Fries",
        price: "130",
        image: "https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_1280.jpg",
        shop: "American Village Food"
    },
    {
        name: "Sushi",
        price: "200",
        image: "https://cdn.pixabay.com/photo/2020/04/04/15/07/sushi-5002639_1280.jpg",
        shop: "Your Sweets"
    },
]
my_content.innerHTML = food.map(
    (item) => {
        return `<div id="food-name">
        <img src="${item.image}">
      <div id="item-text">  <h1>${item.name}</h1>
        <h3>Rs : ${item.price}/-</h3>
               <h5>Shop Name : ${item.shop}</h5></div>
        <button id="btn" onclick="addToCart('${item.name}')">Add to Cart</button>
        </div>`
    }
).join("");
let cart = [];
let totalQuantity = 0;

let cartContainer = document.createElement("div");
cartContainer.id = "cart-container";
body.appendChild(cartContainer);

let order = document.createElement("div");
order.id = "order-btn";
body.appendChild(order);
order.textContent = "Order Now";
order.style.display = "none";

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
    totalQuantity = 0;
    let cartHTML = `<p id="your-cart-selector">Your Cart</p>
     <button id="del-btn" onclick="closeCart()">Close Cart</button>`;
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
            totalQuantity += check.quantity;
            cartHTML += `<tr>
    <td>${check.name}</td>
    <td>${check.quantity}</td>
    <td>Rs ${itemPrice}/-</td>
    </tr>`
        }
    );
    cartHTML += `
<tr style="color:rgb(255, 255, 255);
        z-index: 1;">
    <td>-</td>
    <td>-</td>
    <td><b>Rs ${totalPrice}/-</b></td>
    </tr>
    </table>`;
    cartContainer.innerHTML = cartHTML;
    myCart.innerHTML = ` ${totalQuantity}`;
}
myCart.addEventListener("click",
    () => {

        if (cart.length === 0) {
            alert("No item added");
            return;
        }
        cartContainer.style.display = "flex";
        wrapper.style.filter = "blur(10px)";
        order.style.display = "flex";
    }
)

function closeCart() {
    cartContainer.style.display = "none";
    wrapper.style.filter = "none";
    order.style.display = "none";
}


order.addEventListener("click",
    async () => {
        // ১. অর্ডার শুরু হওয়ার সাথে সাথে বাটনটি ডিজেবল করা হচ্ছে
        order.style.pointerEvents = "none"; // ক্লিক বন্ধ করবে
        order.style.backgroundColor = "gray";
        order.style.color = "white";
        order.textContent = "Processing..."; // টেক্সট পরিবর্তন করা হলো

        const backendData = cart.map(
            (item) => {
                return {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                };
            });

        // try-finally ব্যবহার করা হয়েছে যাতে কাজ শেষ হলে বাটন আবার আগের অবস্থায় ফিরে আসে
        try {
            const res = await fetch("https://backend-106y.onrender.com/order", {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendData)
            })
            const data = await res.text();
            document.write(data);
        } finally {
            // ২. অর্ডার কমপ্লিট (বা ফেইল) হওয়ার পর বাটন আবার ইনেবল করা হচ্ছে
            order.style.pointerEvents = "auto"; // ক্লিক আবার চালু করা হলো
            order.style.opacity = "1"; // আগের রঙে ফিরিয়ে আনা হলো
            order.textContent = "Order Now"; // টেক্সট ঠিক করা হলো
        }
    }
)
