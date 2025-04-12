let clients = JSON.parse(localStorage.getItem('clients')) || [];

function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients(list = clients) {
  const tbody = document.getElementById('client-list');
  tbody.innerHTML = '';
  list.forEach(client => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${client.meter}</td>
      <td>${client.name}</td>
      <td>${client.address}</td>
      <td>${client.phone}</td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById('add-btn').onclick = () => {
  document.getElementById('client-modal').style.display = 'flex';
};

document.getElementById('cancel-btn').onclick = () => {
  document.getElementById('client-modal').style.display = 'none';
};

document.getElementById('save-btn').onclick = () => {
  const meter = document.getElementById('meter').value.trim();
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!meter || !name || !address || !phone) return alert('সব ঘর পূরণ করুন!');

  clients.push({ meter, name, address, phone });
  saveClients();
  renderClients();
  document.getElementById('client-modal').style.display = 'none';

  // Clear form
  document.getElementById('meter').value = '';
  document.getElementById('name').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';
};

document.getElementById('search').oninput = function () {
  const query = this.value.toLowerCase();
  const filtered = clients.filter(client =>
    Object.values(client).some(val => val.toLowerCase().includes(query))
  );
  renderClients(filtered);
};

// Initialize
renderClients();
