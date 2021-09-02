// Start Javascript:
const booksContainer = document.getElementById('books-container');
const totalResult = document.getElementById('total-result');
const errorContainer = document.getElementById('error');
// Title Proverb:
const titleProverb = titleDisplay => {
        document.getElementById('title').style.display = titleDisplay;
}

// Spinner Loading:
const toggleSpinner = displayStyle => {
        document.getElementById('spinner').style.display = displayStyle;
}
const footer = document.getElementById('footer');
// Search Book:
const loadBooks = () => {
        toggleSpinner('block');
        titleProverb('none');
        footer.style.marginTop = '300px';
        // Clear Old Data
        totalResult.textContent = '';
        booksContainer.textContent = '';
        errorContainer.textContent = '';
        // Search Field
        const searchInput = document.getElementById('search-input');
        const searchText = searchInput.value;
        // Fetch Data:
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
                .then(res => res.json())
                .then(data => displayBooks(data.docs, data));

        searchInput.value = '';
};

// Display Books:
const displayBooks = (books, totalFound) => {
        // Error Message for didn't find any book:
        if (books.length === 0) {
                const div = document.createElement('div');
                div.innerHTML = `
                        <h4 class="text-center text-danger mt-5">No Book Found...</h4>
                        <h6 class="text-center text-success">Please Write a Book Name!</h6>
                `;
                errorContainer.appendChild(div);
                footer.style.marginTop = '300px';
        }
        else {
                // Total Book Results:
                const h5 = document.createElement('h5')
                h5.innerText = 'Result: found ' + books.length + ' book out of ' + totalFound.numFound;
                totalResult.appendChild(h5);
                // use forEach for every single book:
                books.forEach((book) => {
                        const div = document.createElement('div')
                        div.innerHTML = `
                        <div class="col book">
                                <div class="card h-100">
                                        <div class="pt-4 ps-4 pe-4">
                                                <img style="height:400px" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 8463228}-M.jpg" class="img-fluid border border-dark border-3 w-100" alt="...">
                                        </div>
                                        <div class="card-body" style="height: 150px; overflow: hidden">
                                                <h5 class="card-title text-success"> ${book.title}</h5>
                                                <h5 class="card-title">Author's Name: ${book.author_name ? book.author_name : 'Not Found'}</h5>
                                                <p class="card-text">Publishers: ${book.publisher ? book.publisher : 'Not Found'}</p>
                                        </div>
                                        <div class="card-footer">
                                                <small class="text-success">First Published: ${book.first_publish_year ? book.first_publish_year : 'Not Found'}</small>
                                        </div>
                                </div>
                        </div>
                `;
                        booksContainer.appendChild(div);
                        footer.style.marginTop = '0px';
                });
        }
        // Spinner Display None After Loading Data:
        toggleSpinner('none');
}
// Complete Javascript