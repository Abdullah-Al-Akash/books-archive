const totalResult = document.getElementById('total-result');
const booksContainer = document.getElementById('books-container');
const errorContainer = document.getElementById('error');

// Title Proverb:
const titleProverb = titleDisplay => {
        document.getElementById('title').style.display = titleDisplay;
}

// Spinner Loading:
const toggleSpinner = displayStyle => {
        document.getElementById('spinner').style.display = displayStyle;
}
// Search Book:
document.getElementById('search-btn').addEventListener('click', function () {
        toggleSpinner('block');
        titleProverb('none');
        // Clear Old Data
        totalResult.textContent = '';
        booksContainer.textContent = '';
        errorContainer.textContent = '';

        const searchInput = document.getElementById('search-input');
        const searchText = searchInput.value;
        // Fetch Data:
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
                .then(res => res.json())
                .then(data => displayBooks(data.docs));
        searchInput.value = '';
})

// Display Books:
const displayBooks = (books) => {
        // Total Book Results:
        const h6 = document.createElement('h6')
        h6.innerText = 'found ' + books.length + ' books';
        totalResult.appendChild(h6);

        // Error Message for didn't find any book:
        if (books.length === 0) {
                totalResult.classList.add('d-none');
                const div = document.createElement('div');
                div.innerHTML = `
                        <h4 class="text-center text-danger mt-5">No Book Found...</h4>
                `;
                errorContainer.appendChild(div);
        }

        // use forEach for every single book:
        books.forEach((book) => {
                const div = document.createElement('div')
                div.innerHTML = `
                        <div class="col book">
                                <div class="card h-100">
                                        <div class="pt-4 ps-4 pe-4">
                                                <img style="height:400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid border border-dark border-3 w-100" alt="...">
                                        </div>
                                        <div class="card-body" style="height: 150px; overflow: hidden">
                                                <h5 class="card-title text-success"> ${book.title}</h5>
                                                <h5 class="card-title">Author's Name: ${book.author_name}</h5>
                                                <p class="card-text">Publishers: ${book.publisher}</p>
                                        </div>
                                        <div class="card-footer">
                                                <small class="text-success">First Published: ${book.first_publish_year}</small>
                                        </div>
                                </div>
                        </div>
                `;
                booksContainer.appendChild(div);
        })
        toggleSpinner('none')
}