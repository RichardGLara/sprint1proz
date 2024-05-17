// Função para atualizar o preço total e mostrar o pop-up
function updateTotal() {
  updateTotal(); // Atualizar o preço total
  const total = document.getElementById("total").innerText; // Obter o valor atualizado do total
}

// Função para mudar a quantidade de um produto
function changeQuantity(productId, change) {
  const quantityElement = document.getElementById(`quantity${productId}`);
  let quantity = parseInt(quantityElement.innerText);
  quantity += change;
  if (quantity < 0) {
    quantity = 0;
  }
  quantityElement.innerText = quantity;

  updateTotal(); // Atualizar o total
}

// Função para atualizar o preço total
function updateTotal() {
  let total = 0;
  for (let i = 0; i <= 10; i++) {
    const quantity = parseInt(
      document.getElementById(`quantity${i}`).innerText
    );
    const price = parseFloat(document.getElementById(`price${i}`).innerText);
    total += quantity * price;
  }
  const formattedTotal = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  document.getElementById("total").innerText = formattedTotal;
}

// Atualizar o total quando a página carregar
window.onload = function () {
  updateTotal();
};

// Contact

// Adicionar evento para mostrar modal após envio do formulário
$("#contactForm").submit(function (event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  var name = $("#name").val();
  var email = $("#email").val();
  var message = $("#message").val();
  var department = $("#department").val();
  var nameRegex = /^[a-zA-Z\s]+$/;
  var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  // Validar nome
  if (!nameRegex.test(name)) {
    $("#name").addClass("is-invalid");
    $("#nameError").text("Por favor, insira apenas letras e espaços.");
    event.preventDefault();
    return;
  } else {
    $("#name").removeClass("is-invalid");
    $("#nameError").text("");
  }

  // Validar email
  if (!emailRegex.test(email)) {
    $("#email").addClass("is-invalid");
    $("#emailError").text("Por favor, insira um endereço de e-mail válido.");
    event.preventDefault();
    return;
  } else {
    $("#email").removeClass("is-invalid");
    $("#emailError").text("");
  }

  // Validar mensagem
  if (!message.trim()) {
    $("#message").addClass("is-invalid");
    $("#messageError").text("Por favor, digite sua mensagem.");
    event.preventDefault();
    return;
  } else {
    $("#message").removeClass("is-invalid");
    $("#messageError").text("");
  }

  // Validar departamento
  if (!department) {
    $("#department").addClass("is-invalid");
    $("#departmentError").text("Por favor, selecione um departamento.");
    event.preventDefault();
    return;
  } else {
    $("#department").removeClass("is-invalid");
    $("#departmentError").text("");
  }

  // Se todos os campos forem válidos, exibir modal de confirmação
  $("#modalName").text(name);
  $("#modalEmail").text(email);
  $("#modalMessage").text(message);
  $("#modalDepartment").text($("#department option:selected").text()); // Obtenha o texto do option selecionado
  $("#confirmationModal").modal("show");

  // Se todos os campos forem válidos, exibir modal de confirmação
  $("#modalName").text(name);
  $("#modalEmail").text(email);
  $("#modalMessage").text(message);
  $("#modalDepartment").text($("#department option:selected").text()); // Obtenha o texto do option selecionado
  $("#confirmationModal").modal("show");

  // Limpar os campos do formulário
  $("#name").val("");
  $("#email").val("");
  $("#message").val("");
  $("#department").val("");
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Carrinho

function showCart() {
  const cartItems = document.querySelectorAll('.quantity-control');
  const cartContent = document.getElementById('cartContent');
  let cartTotal = 0;

  // Limpa o conteúdo anterior do carrinho
  cartContent.innerHTML = '';

  // Itera sobre os itens do carrinho
  cartItems.forEach((item, index) => {
      const quantity = parseInt(item.querySelector('.qtd').innerText);
      if (quantity > 0) {
          const productCard = item.closest('.card');
          const productName = productCard.querySelector('h5').innerText;
          const itemPrice = parseFloat(productCard.querySelector('.card-text.text-center span').innerText.replace('R$ ', '')); // Converte preço para float
          const productImageSrc = productCard.querySelector('img').src; // Obtém o src da imagem do produto

          // Calcula o total do item
          const itemTotal = quantity * itemPrice;

          // Atualiza o total do carrinho
          cartTotal += itemTotal;

          // Cria o item do carrinho e adiciona ao conteúdo do carrinho
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item d-flex align-items-center mb-3';

          const productImage = document.createElement('img');
          productImage.src = productImageSrc;
          productImage.style.width = '50px';
          productImage.style.height = '50px';
          productImage.style.marginRight = '10px';
          productImage.className = 'img-thumbnail';

          const productInfo = document.createElement('div');
          productInfo.className = 'flex-grow-1';
          productInfo.innerHTML = `<strong>${productName}</strong><br>${quantity} x R$ ${itemPrice.toFixed(2)} = R$ ${itemTotal.toFixed(2)}`;

          const quantityControl = document.createElement('div');
          quantityControl.className = 'ms-3';

          const decrementButton = document.createElement('button');
          decrementButton.className = 'btn btn-secondary btn-sm';
          decrementButton.innerText = '-';
          decrementButton.onclick = function() {
              changeCartItemQuantity(index, -1);
          };

          const quantityDisplay = document.createElement('span');
          quantityDisplay.className = 'mx-2';
          quantityDisplay.innerText = quantity;

          const incrementButton = document.createElement('button');
          incrementButton.className = 'btn btn-secondary btn-sm';
          incrementButton.innerText = '+';
          incrementButton.onclick = function() {
              changeCartItemQuantity(index, 1);
          };

          quantityControl.appendChild(decrementButton);
          quantityControl.appendChild(quantityDisplay);
          quantityControl.appendChild(incrementButton);

          const removeButton = document.createElement('button');
          removeButton.className = 'btn btn-danger btn-sm ms-3';
          removeButton.innerHTML = '<i class="bi bi-trash"></i>';
          removeButton.onclick = function() {
              removeItem(index);
          };

          cartItem.appendChild(productImage);
          cartItem.appendChild(productInfo);
          cartItem.appendChild(quantityControl);
          cartItem.appendChild(removeButton);
          cartContent.appendChild(cartItem);

          // Adicionar uma linha após cada item do carrinho
          const line = document.createElement('hr');
          cartContent.appendChild(line);
      }
  });

  // Adiciona o total do carrinho ao final
  const totalElement = document.createElement('div');
  totalElement.className = 'text-end';
  totalElement.style.fontWeight = 'bold';
  totalElement.style.marginTop = '10px';
  totalElement.innerHTML = `Total do Carrinho: R$ ${cartTotal.toFixed(2)}`;
  cartContent.appendChild(totalElement);
}

function changeCartItemQuantity(productId, change) {
  const quantityElement = document.getElementById(`quantity${productId}`);
  let quantity = parseInt(quantityElement.innerText);
  quantity += change;
  if (quantity < 0) {
      quantity = 0;
  }
  quantityElement.innerText = quantity;

  updateTotal(); // Atualiza o total
  showCart(); // Atualiza o conteúdo do carrinho
}

function clearCart() {
  const cartItems = document.querySelectorAll('.quantity-control .qtd');
  cartItems.forEach((item) => {
      item.innerText = '0';
  });

  // Limpa o conteúdo do carrinho no modal
  const cartContent = document.getElementById('cartContent');
  cartContent.innerHTML = '';

  // Atualiza o total
  updateTotal();
}

function removeItem(index) {
  const quantityElement = document.getElementById(`quantity${index}`);
  if (quantityElement) {
      quantityElement.innerText = '0';
      updateTotal(); // Atualiza o total
      showCart(); // Atualiza o conteúdo do carrinho
  }
}

// Mostra o modal de carrinho
function openCartModal() {
  showCart();
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}
