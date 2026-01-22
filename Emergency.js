// Initialize emergency page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       TAB SWITCHING
       =============================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            button.classList.add('active');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.style.display = 'block';
            }
        });
    });

    /* ===============================
       ACCORDION (CONTACTS)
       =============================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.accordion-item');

            document.querySelectorAll('.accordion-item.active').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            currentItem.classList.toggle('active');
        });
    });

    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
    }

    /* ===============================
       🔒 DISABLE BROWSER AUTO PHONE DETECTION (JS ONLY)
       =============================== */
    document.querySelectorAll('.call-number, .contact-number').forEach(el => {
        let text = el.textContent.trim();

        // target landline formats like (02) xxxx-xxxx
        if (/\(\d+\)/.test(text)) {
            // insert zero-width space to break browser detection
            el.textContent = text.replace(')', ')\u200B');
        }
    });

    /* ===============================
       CLICK-TO-CALL (CONTROLLED)
       =============================== */
    const phoneNumbers = document.querySelectorAll('.call-number, .contact-number');

    phoneNumbers.forEach(number => {
        const rawText = number.textContent || number.innerText;
        const phone = rawText.replace(/[^\d+]/g, '');

        if (phone.length >= 7) {
            number.style.cursor = 'pointer';

            number.addEventListener('click', e => {
                e.stopPropagation();

                const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

                if (isMobile) {
                    window.location.href = `tel:${phone}`;
                } else {
                    if (confirm(`Call ${rawText.trim()}?`)) {
                        window.location.href = `tel:${phone}`;
                    }
                }
            });
        }
    });

});
