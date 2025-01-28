document.getElementById("fetch-orders").addEventListener("click", () => {
    const orders = JSON.parse(localStorage.getItem("amazonOrders") || "[]");
    document.getElementById("output").textContent = JSON.stringify(orders, null, 2);
  });
  