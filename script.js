
/* ========================================
   BETWEEN THE PAGES
   Book Tracker Application
======================================== */

// DOM elements
const bookModal = document.getElementById("bookModal");
const bookForm = document.getElementById("bookForm");

const addBookButton = document.getElementById("addBookButton");
const emptyAddButton = document.getElementById("emptyAddButton");
const closeModalButton = document.getElementById("closeModalButton");
const cancelBookButton = document.getElementById("cancelBookButton");

const bookTitleInput = document.getElementById("bookTitle");
const bookAuthorInput = document.getElementById("bookAuthor");
const bookStatusInput = document.getElementById("bookStatus");

const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// Statistics elements
const totalBooksElement = document.getElementById("totalBooks");
const toReadBooksElement = document.getElementById("toReadBooks");
const readingBooksElement = document.getElementById("readingBooks");
const finishedBooksElement = document.getElementById("finishedBooks");

// Load saved books from localStorage
let books = [];

try {
    const savedBooks = localStorage.getItem("betweenThePagesBooks");

    if (savedBooks) {
        const parsedBooks = JSON.parse(savedBooks);

        if (Array.isArray(parsedBooks)) {
            books = parsedBooks.filter(book =>
                book &&
                typeof book.id === "string" &&
                typeof book.title === "string" &&
                typeof book.author === "string" &&
                ["To Read", "Reading", "Finished"].includes(book.status)
            );
        }
    }
} catch (error) {
    console.error("Unable to load saved books:", error);
}

// Open the add-book modal
function openBookModal() {
    bookModal.hidden = false;
    document.body.classList.add("modal-open");
    bookTitleInput.focus();
}

// Close the add-book modal
function closeBookModal() {
    bookModal.hidden = true;
    document.body.classList.remove("modal-open");
    bookForm.reset();
    clearValidationErrors();
}

// Clear validation messages
function clearValidationErrors() {
    titleError.textContent = "";
    authorError.textContent = "";

    bookTitleInput.removeAttribute("aria-invalid");
    bookAuthorInput.removeAttribute("aria-invalid");
}

// Validate the form fields
function validateBookForm(title, author) {
    let isValid = true;

    clearValidationErrors();

    if (!title) {
        titleError.textContent = "Please enter a book title.";
        bookTitleInput.setAttribute("aria-invalid", "true");
        isValid = false;
    }

    if (!author) {
        authorError.textContent = "Please enter the author's name.";
        bookAuthorInput.setAttribute("aria-invalid", "true");
        isValid = false;
    }

    if (!isValid) {
        if (!title) {
            bookTitleInput.focus();
        } else {
            bookAuthorInput.focus();
        }
    }

    return isValid;
}
// Save the current collection to localStorage
function saveBooks() {
    try {
        localStorage.setItem(
            "betweenThePagesBooks",
            JSON.stringify(books)
        );
    } catch (error) {
        console.error("Unable to save books:", error);
        alert("Your changes could not be saved. Check your browser storage.");
    }
}
// Update reading statistics
function updateStatistics() {
    const total = books.length;

    const toRead = books.filter(
        book => book.status === "To Read"
    ).length;

    const reading = books.filter(
        book => book.status === "Reading"
    ).length;

    const finished = books.filter(
        book => book.status === "Finished"
    ).length;

    totalBooksElement.textContent = total;
    toReadBooksElement.textContent = toRead;
    readingBooksElement.textContent = reading;
    finishedBooksElement.textContent = finished;
}

// Create a book card
function createBookCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";

    const cover = document.createElement("div");
    cover.className = "book-cover";

    const coverLabel = document.createElement("span");
    coverLabel.className = "cover-label";
    coverLabel.textContent = "BETWEEN THE PAGES";

    const coverTitle = document.createElement("h3");
    coverTitle.className = "cover-title";
    coverTitle.textContent = book.title;

    const coverAuthor = document.createElement("p");
    coverAuthor.className = "cover-author";
    coverAuthor.textContent = book.author;

    cover.append(coverLabel, coverTitle, coverAuthor);

    const details = document.createElement("div");
    details.className = "book-details";

    const authorText = document.createElement("p");
    authorText.className = "book-author";
    authorText.textContent = book.author;

    const statusLabel = document.createElement("label");
    statusLabel.className = "book-status-label";
    statusLabel.textContent = "READING STATUS";

    const statusSelect = document.createElement("select");
    statusSelect.className = "book-status-select";
    statusSelect.setAttribute(
        "aria-label",
        `Reading status for ${book.title}`
    );

    const statuses = [
        { value: "To Read", label: "To Read" },
        { value: "Reading", label: "Currently Reading" },
        { value: "Finished", label: "Finished" }
    ];

    statuses.forEach(status => {
        const option = document.createElement("option");
        option.value = status.value;
        option.textContent = status.label;
        option.selected = status.value === book.status;
        statusSelect.appendChild(option);
    });

    statusSelect.addEventListener("change", () => {
    book.status = statusSelect.value;
    saveBooks();
    renderBooks();
});

    
// Delete button
const deleteButton = document.createElement("button");
deleteButton.className = "delete-book-button";
deleteButton.type = "button";
deleteButton.textContent = "Remove book";
deleteButton.setAttribute(
    "aria-label",
    `Remove ${book.title} from your library`
);

deleteButton.addEventListener("click", () => {
    const shouldDelete = confirm(
        `Remove "${book.title}" by ${book.author} from your library?`
    );

    if (!shouldDelete) {
        return;
    }

    books = books.filter(item => item.id !== book.id);

    saveBooks();
    renderBooks();
});

details.append(authorText, statusLabel, statusSelect, deleteButton);
card.append(cover, details);


    return card;
}

// Display books based on search and status filters
function renderBooks() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);

        const matchesStatus =
            selectedStatus === "all" ||
            book.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    bookGrid.replaceChildren();

    if (filteredBooks.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";

        const icon = document.createElement("span");
        icon.className = "empty-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = books.length === 0 ? "✳" : "⌕";

        const heading = document.createElement("h3");
        heading.textContent = books.length === 0
            ? "Your next favourite book belongs here."
            : "No books found.";

        const message = document.createElement("p");
        message.textContent = books.length === 0
            ? "Add your first book to start building your collection."
            : "Try a different search or reading-status filter.";

        emptyState.append(icon, heading, message);

        if (books.length === 0) {
            const button = document.createElement("button");
            button.className = "text-button";
            button.textContent = "Add your first book →";
            button.addEventListener("click", openBookModal);
            emptyState.appendChild(button);
        }

        bookGrid.appendChild(emptyState);
    } else {
        filteredBooks.forEach(book => {
            bookGrid.appendChild(createBookCard(book));
        });
    }

    updateStatistics();
}

// Add a new book
bookForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const status = bookStatusInput.value;

    if (!validateBookForm(title, author)) {
        return;
    }

    const newBook = {
        id: crypto.randomUUID(),
        title,
        author,
        status,
        createdAt: Date.now()
    };

   // Add newest books at the beginning
books.unshift(newBook);
saveBooks();

    // Clear search and filter so the new book is visible
    searchInput.value = "";
    statusFilter.value = "all";

    renderBooks();
    closeBookModal();
});

// Modal controls
addBookButton.addEventListener("click", openBookModal);
emptyAddButton.addEventListener("click", openBookModal);

closeModalButton.addEventListener("click", closeBookModal);
cancelBookButton.addEventListener("click", closeBookModal);

// Close when clicking outside the form
bookModal.addEventListener("click", event => {
    if (event.target === bookModal) {
        closeBookModal();
    }
});

// Close the modal with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !bookModal.hidden) {
        closeBookModal();
    }
});

// Search and filter controls
searchInput.addEventListener("input", renderBooks);
statusFilter.addEventListener("change", renderBooks);

// Initial dashboard
renderBooks();
