function getTotalPrice(singleProductPrice, quantity) {
  return (singleProductPrice * quantity).toString() || undefined;
}

// Helper function to get a localStorage item or default value
function getLocalStorageItem(key, defaultValue = null) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

// Helper function to set localStorage item
function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Helper function to clear localStorage items
function clearLocalStorageItems(keys) {
  keys.forEach((key) => localStorage.setItem(key, "empty"));
}

function updateFinalBill(allproductspricesArray, totalpriceElement) {
  let total = 0;
  if (allproductspricesArray) {
    allproductspricesArray.forEach((price) => {
      total += parseInt(price.innerText.replace("$", ""));
      console.log(total);
    });

    totalpriceElement.innerText = `$ ${total}`;
  }
}

const newsLetterInputs = document.querySelectorAll(".news-letter input") || undefined;
if (newsLetterInputs) {
  newsLetterInputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      if (e.target.value === "developer" || e.target.value === "Developer") {
        location.href =
          "https://www.google.com/search?q=aced.abdullah&sca_esv=11b9b55d5edba133&sca_upv=1&source=hp&ei=TPbyZp2YKZDVkdUP9Oza6Ak&iflsig=AL9hbdgAAAAAZvMEXDibrGPrrLErY-FJrOkzJLWZDXKb&ved=0ahUKEwid7u31jNyIAxWQaqQEHXS2Fp0Q4dUDCA0&uact=5&oq=aced.abdullah&gs_lp=Egdnd3Mtd2l6Ig1hY2VkLmFiZHVsbGFoSIczUABYuy9wAXgAkAEAmAHqAaABjBaqAQUwLjcuN7gBA8gBAPgBAZgCCqACtBDCAgsQLhiABBiRAhiKBcICChAAGIAEGEMYigXCAgsQABiABBiRAhiKBcICChAuGIAEGEMYigXCAgsQABiABBixAxiDAcICDhAAGIAEGLEDGIMBGIoFwgILEC4YgAQY0QMYxwHCAhEQLhiABBiRAhixAxiDARiKBcICEBAuGIAEGLEDGEMYgwEYigXCAg4QLhiABBixAxjRAxjHAcICCBAAGIAEGLEDwgIREC4YgAQYsQMY0QMYgwEYxwHCAg4QABiABBiRAhixAxiKBcICEBAAGIAEGLEDGEMYyQMYigXCAhAQABiABBixAxhDGIMBGIoFwgIFEAAYgATCAgsQABiABBiSAxiKBcICChAAGIAEGLEDGArCAgcQABiABBgKwgINEAAYgAQYsQMYgwEYCsICDRAAGIAEGLEDGMkDGArCAgQQABgewgIGEAAYChgewgIGEAAYCBgewgIIEAAYCBgKGB7CAgcQABiABBgNwgIGEAAYDRgewgIIEAAYCBgNGB7CAgoQLhgIGAoYDRgewgIKEAAYCBgKGA0YHpgDAJIHBTAuMy43oAf4UQ&sclient=gws-wiz";
      }
    });
    input.addEventListener("focus",(e) => {
 console.log(  input.setAttribute('placeholder',' try entering developer'))
    });
  });
}

if (location.pathname === "/singleproduct.html") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const addtocartbtn = document.querySelector("#addtocartbtn");
      console.log(addtocartbtn);
      if (addtocartbtn) {
        addtocartbtn.addEventListener("click", (event) => {
          console.log(event.target);
          const productElement = `<tr>
      <td id="removebtn"><i class="far fa-times-circle"></i></td>
      <td>
        <div class="cart-img-container">
          <img id="cart-img" src="${localStorage.getItem(
            "clickedImageURL"
          )}" alt="Product Image" style="mix-blend-mode:darken;" />
        </div>
      </td>
      <td><span class="cart-pro-name">${localStorage.getItem(
        "clickedProductName"
      )}</span></td>
      <td><span style="color:#088178; font-weight:600;" class="cart-pro-price">${localStorage.getItem(
        "clickedProductPrice"
      )}</span></td>
      <td><input type="number" value="1" min="1" max="10" class="cart-quantity" /></td>
      <td  ><span class="cart-total"  style="color:#088178; font-weight:600;">$125</span></td>
    </tr>`;
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(productElement);
          localStorage.setItem("cart", JSON.stringify(cart));

          location.href = "cart.html";
        });
      } else console.log("button  not find");
    }, 1000);
  });
}

// Handle cart operations on /cart.html
if (location.pathname === "/cart.html") {
  // if(allproductsprices){
  // allproductsprices.forEach((price)=>{

  // })

  // }

  let tableinputs;

  const tableBody = document.querySelector("tbody");
  window.addEventListener("load", () => {
    setTimeout(() => {
      const allproductsprices = document.querySelectorAll(".cart-total");
      const totalprice = document.querySelector(".totalprice");

      const removebtns = document.querySelectorAll("#removebtn");
      // console.log(removebtns)

      //  updates final bill if items added or removed from cart
      updateFinalBill(allproductsprices, totalprice);
      removebtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const updatedPrices = document.querySelectorAll(".cart-total");
          console.log("click event fired");
          updateFinalBill(updatedPrices, totalprice);
        });
      });

      const clearCartBtn = document.querySelector("#clearCart");
      clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cartProducts = [];

        updateCart(cartProducts);
      });
      tableinputs = document.querySelectorAll(".cart-quantity");

      tableinputs.forEach((input) => {
        // ------------------------------------------------------
        if (tableinputs) {
          tableinputs.forEach((input) => {
            input.addEventListener("input", (event) => {
              const updatedPrices = document.querySelectorAll(".cart-total");
              updateFinalBill(updatedPrices, totalprice);
              if (event.target.value >= 11) {
                alert(
                  "(stock-limited) you can only order 10 items per product❤"
                );
                event.target.value = 1;
              } else {
                const parentRow = event.target.closest("tr");

                if (parentRow) {
                  let cartTotal = parentRow.querySelector(".cart-total");
                  let price = parseInt(
                    parentRow
                      .querySelector(".cart-pro-price")
                      .innerText.replace("$", "")
                  );

                  let numberOfItems = parseInt(event.target.value);

                  cartTotal.innerText = `$${getTotalPrice(
                    price,
                    numberOfItems
                  )}`;
                }
              }
            });
          });
        }
      });
    }, 1000);
  });

  let cartProducts = getLocalStorageItem("cart", []);
  let productElement;

  // Create HTML for a product if productImage is available
  if (localStorage.getItem("productImage") !== "empty") {
    productElement = `
      <tr>
        <td id="removebtn"><i class="far fa-times-circle"></i></td>
        <td>
          <div class="cart-img-container">
            <img id="cart-img" src="${localStorage.getItem(
              "productImage"
            )}" alt="Product Image" style="mix-blend-mode:darken;" />
          </div>
        </td>
        <td><span class="cart-pro-name">${localStorage.getItem(
          "productName"
        )}</span></td>
        <td><span style="color:#088178; font-weight:600;" class="cart-pro-price">${localStorage.getItem(
          "productPrice"
        )}</span></td>
        <td><input type="number" value="1" min="1" max="10" class="cart-quantity" /></td>
        <td  ><span class="cart-total"  style="color:#088178; font-weight:600;">$125</span></td>
      </tr>`;
  }

  // Clear localStorage entries for product data after use
  clearLocalStorageItems(["productImage", "productPrice", "productName"]);

  // Event listener for page load
  window.addEventListener("load", () => {
    if (productElement) {
      cartProducts.push(productElement);
    } else {
      console.log("Cannot push undefined into array");
    }
    updateCart(cartProducts);
    setLocalStorageItem("cart", cartProducts);
  });

  // Event listener to clear the cart when button is clicked

  // Function to update the cart display
  function updateCart(cartItems) {
    tableBody.innerHTML = cartItems.join("");
  }

  // Function to remove an element from an array at a specified index
  function removeElementFromArray(array, index) {
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
    } else {
      console.log("Index out of bounds");
    }
  }

  // Event listener for removing items from the cart
  window.addEventListener("load", () => {
    const productsAvailableInDOM = document.querySelectorAll("table tbody tr");

    productsAvailableInDOM.forEach((product, index) => {
      const removeButtonElement = product.querySelector("#removebtn");

      if (removeButtonElement) {
        removeButtonElement.addEventListener("click", () => {
          product.remove();
          removeElementFromArray(cartProducts, index);
          setLocalStorageItem("cart", cartProducts);
        });
      }
    });
  });
}

// Handle product clicks on other pages
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for adding products to the cart
  document.querySelectorAll(".cart").forEach((cartElement) => {
    cartElement.addEventListener("click", (event) => {
      const productElement = event.target.closest(".product");

      if (productElement) {
        const productImage = productElement.querySelector(
          ".product-image-container img"
        ).src;
        const productPrice = productElement.querySelector("h6 span").innerText;
        const productNameElement = productElement.querySelector("h6");

        // Remove <span> tag to get pure product name by using replace() method
        const productName = productNameElement.textContent
          .replace(
            productElement.querySelector("h6 span")?.textContent || "",
            ""
          )
          .trim();

        localStorage.setItem("productImage", productImage);
        localStorage.setItem("productPrice", productPrice);
        localStorage.setItem("productName", productName);

        window.location.href = "cart.html";
      }
    });
  });

  // Handle navbar link activation based on stored position
  const navbarLinks = document.querySelectorAll(".navbar-nav li a");
  const savedPosition = localStorage.getItem("position");

  if (savedPosition) {
    const activeLinkIndex = parseInt(savedPosition);
    if (navbarLinks[activeLinkIndex]) {
      navbarLinks[activeLinkIndex].setAttribute("id", "active");
    }
    localStorage.removeItem("position");
  }

  // Add click event listeners to navbar links
  navbarLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      localStorage.setItem("position", index.toString());
    });
  });

  // Handle clicks on product images
  document.querySelectorAll(".product").forEach((productElement) => {
    productElement.addEventListener("click", (event) => {
      if (event.target.matches("img")) {
        const clickedImageURL = event.target.src;
        const clickedImageId = event.target.getAttribute("id");
        localStorage.setItem("clickedImageURL", clickedImageURL);
        localStorage.setItem("clickedImageId", clickedImageId);

        const parentProductElement = event.target.closest(".product");

        if (parentProductElement) {
          const productPriceElement =
            parentProductElement.querySelector("#price");
          const productPrice = productPriceElement
            ? productPriceElement.textContent
            : "";

          const productNameElement = parentProductElement.querySelector("h6");
          const spanElement = productNameElement?.querySelector("span");

          if (spanElement) {
            spanElement.remove();
          }
          const productName = productNameElement?.textContent.trim() || "";

          if (productName && productPrice) {
            localStorage.setItem("clickedProductName", productName);
            localStorage.setItem("clickedProductPrice", productPrice);
          } else {
            console.log("Cannot find product elements");
          }
        }

        window.location.href = "singleproduct.html";
      }
    });
  });
});
