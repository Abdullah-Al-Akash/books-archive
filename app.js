// Search Book:
document.getElementById('search-btn').addEventListener('click', function () {
        const searchInput = document.getElementById('search-input');
        const searchText = searchInput.value;

        // Fetch Data:
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
                .then(res => res.json())
                .then(data => displayBooks(data.docs));
        searchInput.value = '';
})

const displayBooks = (books) => {
        // console.log(books);
        const booksContainer = document.getElementById('books-container');
        books.forEach((book) => {
                console.log(book);
                const div = document.createElement('div');
                div.innerHTML = `
                        <div class="col book">
                                <div class="card h-100">
                                        <div class="p-5">
                                                <img style="height:400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid border border-dark border-3" alt="...">
                                        </div>
                                        <div class="card-body">
                                                <h5 class="card-title">${book.title}</h5>
                                                <p class="card-text">This is a wider card with supporting text
                                                        below as a natural lead-in to additional content. This
                                                        content is a little bit longer.</p>
                                        </div>
                                </div>
                        </div>
                `;
                booksContainer.appendChild(div);
        })
}