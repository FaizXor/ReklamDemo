const menuBtn = document.getElementById('menu-btn');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
  });

/*=====--- Filterable Gallery with Lightbox ---=====*/

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const galleryTabs = document.querySelectorAll('.gallery_tabs li');
    const galleryItems = document.querySelectorAll('.gallery_item');
    const galleryImgs = document.querySelectorAll('.gallery_item img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCloseBtn = document.querySelector('.lightbox_close');

    /*===== 01) Gallery Filtering functionality =====*/
    galleryTabs.forEach((currTab) => {
        currTab.addEventListener('click', (e) => {

            // Remove active classes from all tabs
            galleryTabs.forEach((tab) => {
                tab.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'active');
                tab.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            });

            // Add active classes to the clicked tab
            e.target.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'active');
            e.target.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');

            let filterValue = e.target.getAttribute('data-filter');

            // Show/Hide items based on category match
            galleryItems.forEach((currItem) => {
                let itemCategory = currItem.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    currItem.classList.remove('hidden');
                } else {
                    currItem.classList.add('hidden');
                }
            });
        });
    });

    /*===== 02) Lightbox functionality =====*/
    galleryImgs.forEach((currImg) => {
        currImg.addEventListener('click', (e) => {
            let imgSrc = e.target.getAttribute('src');
            
            // Find parent item to grab title and description text
            let parentItem = e.target.closest('.gallery_item');
            let title = parentItem ? parentItem.querySelector('h3')?.innerText : '';
            let desc = parentItem ? parentItem.querySelector('p')?.innerText : '';

            if (lightboxImg) lightboxImg.setAttribute('src', imgSrc);
            if (lightboxTitle) lightboxTitle.innerText = title;
            if (lightboxDesc) lightboxDesc.innerText = desc;

            // Open Lightbox
            if (lightbox) lightbox.classList.remove('hidden');
            body.classList.add('overflow-hidden');
        });
    });

    // Function for closing the Lightbox
    const lightboxClose = () => {
        if (lightbox) lightbox.classList.add('hidden');
        body.classList.remove('overflow-hidden');
    };

    // Close on clicking the close button (&times;)
    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', lightboxClose);
    }

    // Close on clicking outside of the wrapper (on the dark background backdrop)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox')) {
            lightboxClose();
        }
    });

    // Close on pressing the Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightboxClose();
        }
    });
});

document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop normal page reload

    // Your phone number with country code (e.g., 90 for Turkey + phone number)
    const phoneNumber = "905323947640"; 

    // Get input values
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Format the WhatsApp message text
    const formattedText = `*Yeni İletişim Formu Mesajı*%0A%0A` +
                          `*Ad:* ${encodeURIComponent(name)}%0A` +
                          `*Soyad:* ${encodeURIComponent(surname)}%0A` +
                          `*E-posta:* ${encodeURIComponent(email)}%0A` +
                          `*Mesaj:* ${encodeURIComponent(message)}`;

    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedText}`;

    // Open WhatsApp in a new tab / open app on mobile
    window.open(whatsappUrl, '_blank');
});