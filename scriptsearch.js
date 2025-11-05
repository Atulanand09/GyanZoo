document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const peopleSection = document.getElementById('people-section');
    const postsSection = document.getElementById('posts-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;

            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-white', 'text-black');
                btn.classList.add('bg-zinc-800', 'text-white');
            });
            e.target.classList.add('bg-white', 'text-black');
            e.target.classList.remove('bg-zinc-800', 'text-white');

            // Filter content
            if (filter === 'all') {
                peopleSection.style.display = 'block';
                postsSection.style.display = 'block';
            } else if (filter === 'posts') {
                peopleSection.style.display = 'none';
                postsSection.style.display = 'block';
            } else if (filter === 'people') {
                peopleSection.style.display = 'block';
                postsSection.style.display = 'none';
            }
        });
    });
});