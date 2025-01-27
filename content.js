// 检查用户是否登录
function isUserLoggedIn() {
    const accountInfo = document.querySelector("#nav-link-accountList");
    return accountInfo && accountInfo.textContent.includes("Account");
  }
  const isLoggedIn = isUserLoggedIn();
localStorage.setItem("isUserLoggedIn", JSON.stringify(isLoggedIn));

  
// 執行檢查並打印結果到 console
if ( isUserLoggedIn()) {
    console.log("User is logged in.");
  } else {
    console.log("User is not logged in.");
  }

  // 获取订单信息
  function getOrderInfo() {
    const orders = [];
   
    const orderElements = document.querySelectorAll('[data-component="default"]');
    orderElements.forEach(order => {
        
      const orderNumber = order.querySelector(".a-column.a-span9.a-spacing-top-mini span:nth-child(2) > bdi");
      console.log("Order ID:", orderNumber.textContent.trim());
      const orderDate = order.querySelector(".a-column.a-span9.a-spacing-top-mini span:first-child");
      console.log("Order Date:", orderDate.textContent.trim());
      const totalAmount = order.querySelector("#od-subtotals .a-column.a-span5.a-text-right.a-span-last");
      console.log("totalAmount:", totalAmount.textContent.trim());
  
      const linkElement = document.querySelector("#attn-required-order .a-fixed-left-grid .yohtmlc-item a");
      const link = linkElement ? linkElement.href : "Link not found"; // 获取 href 属性
      console.log("link:", link);

      const recipientInfo = order.querySelector(".displayAddressFullName");
      console.log("recipientInfo:", recipientInfo.textContent.trim());

      paymentInfo = order.querySelector(".pmts-payments-instrument-details span.a-color-base");
      console.log("paymentInfo:", paymentInfo.textContent.trim());
      //const  name: product.querySelector(".product-title").textContent.trim(),
      //const  quantity: product.querySelector(".quantity").textContent.trim(),
      //const  price: product.querySelector(".price").textContent.trim()
  
  
      //
     // const 
  
      orders.push({
        orderNumber,
        orderDate,
        totalAmount,
        link
        /*,
        products,
        recipientInfo,
        paymentInfo*/
      });
    });
    console.log(orderElements);
    return orders;
  }
  
  // 保存到 localStorage
  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem("amazonOrders", JSON.stringify(orders));
  }
    
  

  // 主逻辑
  if (isUserLoggedIn()) {
    const orders = getOrderInfo();
    saveOrdersToLocalStorage(orders);
    console.log("Orders saved to localStorage:", orders);// 等待 3 秒
  } else {
    console.log("User not logged in.");
  }
