
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = "☀️ Light Mode";
        } else {
            themeToggle.innerHTML = "🌓 Dark Mode";
        }
    });
}


const servingsInput = document.getElementById('servings');
const basePrepTime = 15;
const baseCookTime = 20;
const baseTotalTime = 35;

if (servingsInput) {
    servingsInput.addEventListener('input', () => {
        let nbPersonnes = parseInt(servingsInput.value);
        if (isNaN(nbPersonnes) || nbPersonnes < 1) {
            nbPersonnes = 1;
        }

        
        const scale = nbPersonnes / 4;

        const prepElement = document.getElementById('prep-time');
        const cookElement = document.getElementById('cook-time');
        const totalElement = document.getElementById('total-time');

        if (prepElement) prepElement.innerText = Math.round(basePrepTime * scale);
        if (cookElement) cookElement.innerText = Math.round(baseCookTime * scale);
        if (totalElement) totalElement.innerText = Math.round(baseTotalTime * scale);

        const qtyBadges = document.querySelectorAll('.qty-badge');
        qtyBadges.forEach(badge => {
            const baseQty = parseFloat(badge.getAttribute('data-base-qty'));
            const unit = badge.getAttribute('data-unit');
            if (!isNaN(baseQty)) {
            
                const newQty = Math.round(baseQty * scale * 10) / 10;
                badge.innerText = `${newQty} ${unit}`;
            }
        });

        
        let calculatedTotalPrice = 0;
        const priceBadges = document.querySelectorAll('.price-badge');
        
        priceBadges.forEach(badge => {
            const basePrice = parseFloat(badge.getAttribute('data-base-price'));
            if (!isNaN(basePrice)) {
                const newPrice = Math.round(basePrice * scale);
                badge.innerText = `${newPrice} DZD`;
                calculatedTotalPrice += newPrice; 
            }
        });

        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.innerText = calculatedTotalPrice;
        }
    });
}
