const data =  JSON.parse(localStorage.getItem('arrayBooks'));
console.log(data)
let mainPage = document.querySelector('#wishlist');

if (mainPage) {
    mainPage.innerHTML += `
        <table class="box">
            <thead>
                <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
    // Select the tbody element correctly
    const tbody = document.querySelector('tbody');

    for (let i = 0; i < data.length; i++) {
        // Append the rows to tbody
        tbody.innerHTML += `
            <tr>
                <td><img src="${data[i].cover}" class="img"></td>
                <td><h3 class="title">${data[i].title}</h3></td>
                <td><p class="full-name-author">${data[i].author.fullname}</p></td>
                <td>
                    <button class="already-read" data-id=${i}>read </button>
                    <button class="delete-book">Delete</button>
                </td>
                <input type="hidden" value="${data[i].id-1}">
            </tr>
        `;
    }
}

let deleteBtn = document.querySelectorAll('.delete-book');

function deleteBook() {
    let deleteBtn = document.querySelectorAll('.delete-book');

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let title = btn.parentElement.parentElement.querySelector(".title").innerHTML;
            let id = btn.parentElement.parentElement.querySelector("input").value;
            let arrayBooks = JSON.parse(localStorage.getItem('arrayBooks'));
            const isClicked = JSON.parse(localStorage.getItem('wishlistClicked'));
            let arrayWishlist = [...arrayBooks];
            isClicked[id] = "false";

            for (let i = 0; i < arrayWishlist.length; i++) {
                if (arrayWishlist[i].title === title) {
                    arrayWishlist.splice(i, 1);
                    break; // Exit the loop once the book is found and removed
                }
            }
    
            /** Another way to remove from local storage
                // Find and remove the book with the matching title
                arrayWishlist = arrayWishlist.filter(book => book.title !== title.innerHTML);
            */
    
            // Update only the page's local storage (if you want to update it for this session)
            // You can either leave this part out if you don't want to modify localStorage here
            localStorage.setItem('arrayBooks', JSON.stringify(arrayWishlist));
            localStorage.setItem(`wishlistClicked`,JSON.stringify(isClicked));
            // Remove the HTML element from the DOM
            btn.parentElement.parentElement.remove();
        });
    });
}    

function readBook() {
    let readBtn = document.querySelectorAll('.already-read');

    readBtn.forEach(btn => {
        const itemId = btn.getAttribute('data-id');
        const isClicked = JSON.parse(localStorage.getItem('readBook'));

        // If the item was clicked before, style it as clicked
        if (isClicked[itemId] == 'true') {
            btn.style.backgroundColor = "#28a745";
            btn.innerHTML += "<span><i class='fa-solid fa-check'></i></span>";
        }

        btn.addEventListener('click', () => {
            const isClicked = JSON.parse(localStorage.getItem('readBook'));
            if (isClicked[itemId] == 'true') {
                // If already clicked, revert the changes
                btn.style.backgroundColor = "#fd7e14";
                btn.innerHTML = "read ";
                isClicked[itemId] = 'false';
            } else {
                // Change style to indicate clicked
                btn.style.backgroundColor = "#28a745";
                btn.innerHTML += "<span><i class='fa-solid fa-check'></i></span>";
                isClicked[itemId] = 'true';
            }

            // // If already clicked, do nothing
            // if (JSON.parse(localStorage.getItem('wishlistClicked'))[itemId] === 'true') return;
    
            // // Change style to appear clicked
            // btn.style.backgroundColor = "#28a745";
            // btn.innerHTML += "<span><i class='fa-solid fa-check'></i></span>";

            // isClicked[itemId] = "true";

            // Save the clicked state to localStorage
            localStorage.setItem(`readBook`, JSON.stringify(isClicked));
        });
    });
}

readBook();
deleteBook();