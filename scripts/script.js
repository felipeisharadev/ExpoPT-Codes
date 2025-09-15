// Filtro por texto/tags
const searchInput = document.getElementById('search');
const cards = Array.from(document.querySelectorAll('.card'));

function normaliza(str){
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // remove acentos
}

function filtrarCards() {
  const termo = normaliza(searchInput.value.trim());
  cards.forEach(card => {
    const titulo = normaliza(card.querySelector('.card-title')?.innerText);
    const desc   = normaliza(card.querySelector('.card-desc')?.innerText);
    const tags   = normaliza(card.getAttribute('data-tags'));
    const match = [titulo, desc, tags].some(t => t.includes(termo));
    card.style.display = match ? '' : 'none';
  });
}

searchInput?.addEventListener('input', filtrarCards);

// Acesso via teclado: Enter no card foca o link
cards.forEach(card => {
  card.tabIndex = 0;
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const link = card.querySelector('.card-link, .card-title a');
      link?.focus();
    }
  });
});
