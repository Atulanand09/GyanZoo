document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');
    const contentCards = document.querySelectorAll('.content-card');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const filter = e.target.dataset.filter;

            // Remove active styles from all links
            categoryLinks.forEach(item => {
                item.classList.remove('text-white', 'border-white');
                item.classList.add('text-zinc-500', 'border-transparent');
            });
            
            // Add active styles to the clicked link
            e.target.classList.remove('text-zinc-500', 'border-transparent');
            e.target.classList.add('text-white', 'border-white');

            // Filter the content cards
            contentCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});