document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Obter valores dos campos do formulário
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Construir objeto FormData com os dados do formulário
      const formData = {
        nome: nome,
        email: email,
        password: password
      };

      // Enviar dados para o endpoint de registro usando fetch API
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao fazer login');
        }
        return response.json();
      })
      .then(data => {
        alert('Login realizado com sucesso!');
        // Aqui você pode redirecionar o usuário para a página desejada após o login bem-sucedido
        if (data.role === 'cliente') {
          window.location.href = '/dashboard-client.html';
        } else if (data.role === 'advogado') {
          window.location.href = '/dashboard-advogado.html';
        } else {
          console.error('Tipo de usuário não suportado:', data.role);
          alert('Tipo de usuário não suportado. Contate o suporte.');
        }
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      });
      
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Obter valores dos campos do formulário
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Construir objeto FormData com os dados do formulário
      const formData = {
        email: email,
        password: password
      };

      // Enviar dados para o endpoint de login usando fetch API
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao fazer login');
        }
        return response.json();
      })
      .then(data => {
        alert('Login realizado com sucesso!');
        // Aqui você pode redirecionar o usuário para a página desejada após o login bem-sucedido
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      });
      
    });
  }
});
