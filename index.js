let allProducts = []; 
let currentPage = 1;
const itemsPerPage = 8;

const box = document.getElementById('box');
const paginationContainer = document.getElementById('pagination');

function renderProducts(products) {
    box.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = products.slice(startIndex, endIndex);

    paginatedItems.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-box';
        div.innerHTML = `
            <img src="${product.thumbnail || product.images[0]}">
            <h2>${product.title}</h2>
            <div class="price">$${product.price}</div>
        `;
        
        div.addEventListener('click', () => {
            saveToViewHistory(product);
            window.location.href = `./product_detail.html?id=${product.id}`;
        });
        box.appendChild(div);
    });

    renderPaginationControls(products.length);
}

function renderPaginationControls(totalItems) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return;

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Prev';
    prevBtn.className = 'page-btn';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        currentPage--;
        renderProducts(allProducts);
        window.scrollTo(0, 0);
    };
    paginationContainer.appendChild(prevBtn);

    // Page X of Y Info
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
    paginationContainer.appendChild(pageInfo);

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.className = 'page-btn';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        renderProducts(allProducts);
        window.scrollTo(0, 0);
    };
    paginationContainer.appendChild(nextBtn);
}

