// dashboard.js

// Função para carregar dados do cliente no dashboard
function loadClientData() {
    // Simular dados do cliente (substitua com sua lógica real)
    const clientData = {
        nome: "Giovana Costa",
        email: "giovana.costa@example.com",
        documentosPendentes: 3,
        processosAtivos: 5,
        atividadesRecentes: [
            "Reunião com cliente X",
            "Preparação de contrato Y",
            "Consulta jurídica para Z"
        ]
    };

    // Atualizar elementos na página com os dados do cliente
    document.getElementById('clientName').textContent = clientData.nome;
    document.getElementById('clientEmail').textContent = clientData.email;
    document.getElementById('pendingDocuments').textContent = clientData.documentosPendentes;
    document.getElementById('activeCases').textContent = clientData.processosAtivos;

    // Atualizar atividades recentes
    const recentActivitiesList = document.getElementById('recentActivities');
    recentActivitiesList.innerHTML = '';
    clientData.atividadesRecentes.forEach(atividade => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = atividade;
        recentActivitiesList.appendChild(li);
    });
}

// Função para fazer requisição GET para rota protegida (dashboard)
function fetchDashboardData() {
    fetch('/auth/recurso-protegido', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao acessar recurso protegido');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos da rota protegida (dashboard):', data);
        // Atualizar interface do usuário com os dados recebidos (exemplo)
        document.getElementById('clientName').textContent = data.cliente.nome;
        document.getElementById('clientEmail').textContent = data.cliente.email;
        document.getElementById('pendingDocuments').textContent = data.documentosPendentes;
        document.getElementById('activeCases').textContent = data.processosAtivos;

        // Atualizar atividades recentes
        const recentActivitiesList = document.getElementById('recentActivities');
        recentActivitiesList.innerHTML = '';
        data.atividadesRecentes.forEach(atividade => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = atividade;
            recentActivitiesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao acessar rota protegida (dashboard):', error);
        // Trate o erro de forma adequada, por exemplo, exibindo uma mensagem de erro na interface do usuário
    });
}

// Carregar dados do cliente quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    loadClientData(); // Carrega dados do cliente no dashboard
    fetchDashboardData(); // Faz a requisição para obter dados protegidos do servidor
});
