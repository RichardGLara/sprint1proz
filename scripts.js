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
        const quantity = parseInt(document.getElementById(`quantity${i}`).innerText);
        const price = parseFloat(document.getElementById(`price${i}`).innerText);
        total += quantity * price;
    }
    const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
      $("#emailError").text(
        "Por favor, insira um endereço de e-mail válido."
      );
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

  // Login
