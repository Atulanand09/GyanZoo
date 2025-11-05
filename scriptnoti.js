document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notificationItems = document.querySelectorAll('.notification-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('text-white', 'border-white');
                btn.classList.add('text-zinc-500', 'border-transparent');
            });
            button.classList.add('text-white', 'border-white');
            button.classList.remove('text-zinc-500', 'border-transparent');

            // Filter notifications
            notificationItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(`type-${filter}`)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});