document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("KkQSfG62Jg8W8uies");
    
    // Load content from localStorage
    loadContent();
    
    // ====================
    // CAROUSEL FUNCTIONALITY
    // ====================
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    let currentSlide = 0;
    
    // Function to show slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
    }
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
    
    // Auto-rotate carousel every 10 seconds
    let slideInterval = setInterval(nextSlide, 10000);
    
    // Pause auto-rotation on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 10000);
    });
    
    // ====================
    // FAQ FUNCTIONALITY
    // ====================
    document.addEventListener('click', function(e) {
        if (e.target.closest('.faq-question')) {
            const item = e.target.closest('.faq-item');
            item.classList.toggle('active');
        }
    });
    
    // ====================
    // CONTACT FORM HANDLING
    // ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        const emailInput = document.querySelector('input[name="from_email"]');
        if (emailInput) {
            emailInput.addEventListener('input', validateEmail);
        }
    }
    
    // ====================
    // CONTENT MANAGEMENT
    // ====================
    
    // Listen for storage changes (for admin updates)
    window.addEventListener('storage', function(e) {
        if (e.key === 'barangayContent') {
            loadContent();
            showToast('Content updated successfully!', 'success');
        }
        // Listen for changes from the admin panel
        if (e.key === 'barangayData') {
            updateFooterFromAdminData();
            showToast('Footer updated from admin panel!', 'success');
        }
    });
    
    // Validate if email is Gmail
    function isValidGmail(email) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    }
    
    // Email validation function
    function validateEmail(e) {
        const email = e.target.value.trim();
        if (email && !isValidGmail(email)) {
            e.target.style.borderColor = 'var(--error)';
        } else {
            e.target.style.borderColor = 'var(--gray-border)';
        }
    }
    
    // Handle contact form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        const emailInput = e.target.from_email;
        const email = emailInput.value.trim();
        
        // Validate Gmail
        if (!isValidGmail(email)) {
            showToast('Please use a valid Gmail address (@gmail.com only)', 'error');
            emailInput.style.borderColor = 'var(--error)';
            return;
        }
        
        emailInput.style.borderColor = 'var(--gray-border)';
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Format timestamp
        const now = new Date();
        const formattedTime = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        // Save message to localStorage for admin panel
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        const newMessage = {
            id: Date.now(),
            from_name: e.target.from_name.value,
            from_email: e.target.from_email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
            timestamp: formattedTime,
            status: 'unread',
            emailSent: false
        };
        messages.push(newMessage);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Prepare EmailJS parameters
        const templateParams = {
            from_name: e.target.from_name.value,
            from_email: e.target.from_email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
            time: formattedTime,
            date: formattedTime
        };
        
        // Send email via EmailJS
        emailjs.send('service_upx49ro', 'template_4loo5dp', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                showToast('Message sent successfully!', 'success');
                
                // Update message status
                const updatedMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                const updatedMessageIndex = updatedMessages.findIndex(msg => msg.id === newMessage.id);
                if (updatedMessageIndex !== -1) {
                    updatedMessages[updatedMessageIndex].emailSent = true;
                    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                }
                
                // Reset form
                e.target.reset();
            })
            .catch((error) => {
                console.log('FAILED...', error);
                showToast('Message saved! We will contact you soon.', 'info');
                
                // Update message status
                const updatedMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                const updatedMessageIndex = updatedMessages.findIndex(msg => msg.id === newMessage.id);
                if (updatedMessageIndex !== -1) {
                    updatedMessages[updatedMessageIndex].emailSent = false;
                    updatedMessages[updatedMessageIndex].note = 'Email delivery failed - saved to database';
                    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                }
                
                // Reset form
                e.target.reset();
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        const toast = document.querySelector('.toast');
        if (toast) {
            const icon = type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
            toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
            
            // Set background color based on type
            if (type === 'success') {
                toast.style.background = 'var(--success)';
            } else if (type === 'error') {
                toast.style.background = 'var(--error)';
            } else {
                toast.style.background = 'var(--primary)';
            }
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    }
    
    // Update footer from admin panel data
    function updateFooterFromAdminData() {
        const adminData = JSON.parse(localStorage.getItem('barangayData'));
        if (!adminData || !adminData.footer) return;
        
        const footerData = adminData.footer;
        
        // Update footer title and description
        const footerTitle = document.getElementById('footer-title');
        const footerDescription = document.getElementById('footer-description');
        const copyrightText = document.getElementById('copyright-text');
        
        if (footerTitle) footerTitle.textContent = footerData.title || 'Barangay 118 Online System';
        if (footerDescription) footerDescription.textContent = footerData.description || 'Secure and efficient online services for Barangay 118. Connecting our community through technology.';
        if (copyrightText) copyrightText.innerHTML = footerData.copyright || '&copy; 2025 Barangay 118 Online System. All Rights Reserved.';
        
        // Update contact information
        if (footerData.contactInfo) {
            const addressLine1 = document.getElementById('footer-address-line1');
            const addressLine2 = document.getElementById('footer-address-line2');
            const phone = document.getElementById('footer-phone');
            const email = document.getElementById('footer-email');
            const officeHours = document.getElementById('footer-office-hours');
            
            if (addressLine1) addressLine1.textContent = footerData.contactInfo.addressLine1 || '402 2nd St, Grace Park East, Caloocan';
            if (addressLine2) addressLine2.textContent = footerData.contactInfo.addressLine2 || 'Metro Manila, Philippines';
            if (phone) phone.textContent = footerData.contactInfo.phone || '(02) 8123-4567';
            if (email) email.textContent = footerData.contactInfo.email || 'info@barangay118.gov.ph';
            if (officeHours) officeHours.textContent = footerData.contactInfo.officeHours || 'Mon–Fri: 8:00 AM – 5:00 PM';
        }
        
        // Update social media links
        if (footerData.socialMedia) {
            const facebookLink = document.getElementById('footer-facebook-link');
            const messengerLink = document.getElementById('footer-messenger-link');
            
            if (facebookLink) facebookLink.href = footerData.socialMedia.facebook || 'https://facebook.com/barangay118';
            if (messengerLink) messengerLink.href = footerData.socialMedia.messenger || 'https://m.me/barangay118';
        }
    }
    
    // Load content from localStorage
    function loadContent() {
        const content = JSON.parse(localStorage.getItem('barangayContent')) || getDefaultData();
        
        // Load admin panel data for footer
        updateFooterFromAdminData();
        
        // Helper function to set content
        function setContent(id, defaultValue, isAttribute = false, attrName = '') {
            const element = document.getElementById(id);
            if (element) {
                let value = getNestedValue(content, id) || defaultValue;
                
                if (isAttribute && attrName) {
                    element.setAttribute(attrName, value);
                } else if (element.tagName === 'IMG') {
                    element.src = value;
                } else if (element.tagName === 'A' && id.includes('link')) {
                    element.href = value;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = value;
                } else if (element.tagName === 'SPAN') {
                    element.textContent = value;
                } else {
                    element.textContent = value;
                }
            }
        }
        
        // Helper to get nested values from content object
        function getNestedValue(obj, path) {
            return path.split('.').reduce((current, key) => {
                return current && current[key] !== undefined ? current[key] : null;
            }, obj);
        }
        
        // System Name
        setContent('system-name', content.systemName || 'BARANGAY 118 ONLINE SYSTEM');
        
        // Hero Section
        setContent('about-hero-title', content.aboutUs?.hero?.title || 'Barangay Information');
        setContent('about-hero-description', content.aboutUs?.hero?.description || 'Learn about our barangay\'s mission, leadership, services, and commitment to the community.');
        
        // About Section
        setContent('about-story-title', content.aboutUs?.story?.title || 'Our Community Story');
        setContent('about-story-content-1', content.aboutUs?.story?.content1 || 'For over 62 years, Barangay 118 has stood as a pillar of public service — committed to delivering efficient, transparent, and accessible government services to our residents. Located in the heart of the city, our barangay is home to a vibrant community of families, businesses, and institutions working together for progress and unity.');
        setContent('about-story-content-2', content.aboutUs?.story?.content2 || 'Through the launch of our Online System, we are taking our commitment to the next level — providing 24/7 access to essential services from the comfort of your home. This digital transformation bridges the gap between the barangay administration and the people we serve, ensuring convenience and connectivity for all.');
        setContent('about-story-content-3', content.aboutUs?.story?.content3 || 'Behind every program and project is a dedicated team of officials and staff who serve with integrity, transparency, and compassion — ensuring that every resident feels heard, supported, and cared for.');
        setContent('about-barangay-image', content.aboutUs?.story?.image || 'Screen Shot 2025-11-23 at 10.35.19 AM.png');
        
        // Mission & Vision
        setContent('mission-title', content.aboutUs?.missionVision?.mission?.title || 'Our Mission');
        setContent('mission-description', content.aboutUs?.missionVision?.mission?.description || 'To provide efficient, transparent, and accessible government services to all residents through innovative digital solutions, fostering a connected and empowered community.');
        setContent('vision-title', content.aboutUs?.missionVision?.vision?.title || 'Our Vision');
        setContent('vision-description', content.aboutUs?.missionVision?.vision?.description || 'To be a model barangay known for excellent public service, community engagement, and technological innovation that improves the quality of life for all residents.');
        
        // Officials
        setContent('officials-subtitle', content.aboutUs?.officials?.subtitle || 'Meet the dedicated team serving our community');
        renderOfficials(content.aboutUs?.officials?.list || []);
        
        // Committees
        setContent('committees-subtitle', content.aboutUs?.committees?.subtitle || 'Our specialized committees addressing various community needs');
        renderCommittees(content.aboutUs?.committees?.list || []);
        
        // Documents
        setContent('documents-subtitle', content.aboutUs?.documents?.subtitle || 'Information about the documents you can request and their requirements');
        renderDocuments(content.aboutUs?.documents?.list || []);
        
        // Location Section
        setContent('location-title', content.aboutUs?.location?.title || 'Barangay Location');
        setContent('location-subtitle', content.aboutUs?.location?.subtitle || 'Find our barangay hall and important facilities');
        setContent('barangay-address', content.aboutUs?.location?.address || '402 2nd St, Grace Park East, Caloocan, Metro Manila');
        setContent('barangay-location', content.aboutUs?.location?.location || 'Barangay 118 Hall, Grace Park East, Caloocan');
        
        // Set Google Maps iframe src from data
        const mapIframe = document.getElementById('barangay-map-iframe');
        if (mapIframe && content.aboutUs?.location?.mapLink) {
            mapIframe.src = content.aboutUs.location.mapLink;
        }
        
        // Contact Section  
        setContent('contact-section-title', content.aboutUs?.contact?.title || 'Get In Touch');
        setContent('contact-address', content.aboutUs?.contact?.address || '402 2nd St, Grace Park East, Caloocan, Metro Manila');
        setContent('contact-email', content.aboutUs?.contact?.email || 'info@barangay118.gov.ph');
        setContent('contact-phone', content.aboutUs?.contact?.phone || '(02) 8123-4567');
        setContent('contact-hours-weekdays', content.aboutUs?.contact?.hours?.weekdays || 'Monday-Friday: 8:00 AM - 5:00 PM');
        setContent('contact-hours-saturday', content.aboutUs?.contact?.hours?.saturday || 'Saturday: 8:00 AM - 12:00 PM');
        setContent('map-link-text', content.aboutUs?.contact?.mapLinkText || 'View on Google Maps');
        
        // Set map link button href
        const mapLinkButton = document.querySelector('.map-link-button');
        if (mapLinkButton && content.aboutUs?.contact?.mapLink) {
            mapLinkButton.href = content.aboutUs.contact.mapLink;
        }
        
        // FAQs
        renderFAQs(content.aboutUs?.faqs?.list || []);
    }
    
    // Get default data structure
    function getDefaultData() {
        return {
            systemName: "BARANGAY 118 ONLINE SYSTEM",
            aboutUs: {
                hero: {
                    title: "Barangay Information",
                    description: "Learn about our barangay's mission, leadership, services, and commitment to the community"
                },
                story: {
                    title: "Our Community Story",
                    content1: "For over 62 years, Barangay 118 has stood as a pillar of public service — committed to delivering efficient, transparent, and accessible government services to our residents. Located in the heart of the city, our barangay is home to a vibrant community of families, businesses, and institutions working together for progress and unity.",
                    content2: "Through the launch of our Online System, we are taking our commitment to the next level — providing 24/7 access to essential services from the comfort of your home. This digital transformation bridges the gap between the barangay administration and the people we serve, ensuring convenience and connectivity for all.",
                    content3: "Behind every program and project is a dedicated team of officials and staff who serve with integrity, transparency, and compassion — ensuring that every resident feels heard, supported, and cared for.",
                    image: "Screen Shot 2025-11-23 at 10.35.19 AM.png"
                },
                missionVision: {
                    mission: {
                        title: "Our Mission",
                        description: "To provide efficient, transparent, and accessible government services to all residents through innovative digital solutions, fostering a connected and empowered community."
                    },
                    vision: {
                        title: "Our Vision", 
                        description: "To be a model barangay known for excellent public service, community engagement, and technological innovation that improves the quality of life for all residents."
                    }
                },
                officials: {
                    subtitle: "Meet the dedicated team serving our community",
                    list: [
                        { id: 1, avatar: 'J', name: 'Jerryllyn D. Bolo', position: 'Chairwoman', description: 'Leading Barangay 118 with dedication and commitment to community service.' },
                        { id: 2, avatar: 'J', name: 'Jeremy Abesamis', position: 'SK Chairman', description: 'Representing the youth of Barangay 118 and advocating for their needs.' },
                        { id: 3, avatar: 'R', name: 'Richard Rayos', position: 'Secretary', description: 'Managing barangay documentation and administrative processes.' },
                        { id: 4, avatar: 'C', name: 'Carolina T. Manabat', position: 'Treasurer', description: 'Overseeing barangay finances and budget management.' },
                        { id: 5, avatar: 'A', name: 'Annalyn Abesamis', position: 'Kagawad', description: 'Committee on Violence Against Women and Children.' },
                        { id: 6, avatar: 'J', name: 'Joemarie F. Dohinog', position: 'Kagawad', description: 'Committee on Infrastructure.' },
                        { id: 7, avatar: 'R', name: 'Ronald Allan Mateo', position: 'Kagawad', description: 'Committee on Public Safety.' },
                        { id: 8, avatar: 'L', name: 'Lucas Badilla', position: 'Kagawad', description: 'Committee on Health and Sanitation.' },
                        { id: 9, avatar: 'N', name: 'Novel Nolasco', position: 'Kagawad', description: 'Committee on Peace and Order.' },
                        { id: 10, avatar: 'M', name: 'Ma. Theresa Neri', position: 'Kagawad', description: 'Committee on Education.' },
                        { id: 11, avatar: 'A', name: 'Alex Bolo', position: 'Kagawad', description: 'Committee on Environmental.' }
                    ]
                },
                
                committees: {
                    subtitle: "Our specialized committees addressing various community needs",
                    list: [
                        { id: 1, icon: 'fas fa-shield-heart', name: 'Committee on Violence Against Women and Children', chairperson: 'Annalyn Abesamis', description: 'Addressing issues related to violence against women and children and providing support services. This committee ensures protection and empowerment for vulnerable groups in our community.' },
                        { id: 2, icon: 'fas fa-hammer', name: 'Committee on Infrastructure', chairperson: 'Joemarie F. Dohinog', description: 'Overseeing barangay infrastructure projects and maintenance of public facilities. This committee ensures our community has well-maintained roads, buildings, and public spaces.' },
                        { id: 3, icon: 'fas fa-user-shield', name: 'Committee on Public Safety', chairperson: 'Ronald Allan Mateo', description: 'Ensuring the safety and security of residents through various safety programs. This committee coordinates with local authorities to maintain a secure environment for all.' },
                        { id: 4, icon: 'fas fa-hand-holding-medical', name: 'Committee on Health and Sanitation', chairperson: 'Lucas Badilla', description: 'Promoting health programs and maintaining cleanliness in the community. This committee organizes medical missions and ensures proper waste management.' },
                        { id: 5, icon: 'fas fa-peace', name: 'Committee on Peace and Order', chairperson: 'Novel Nolasco', description: 'Maintaining peace and order within the barangay through community policing. This committee resolves disputes and promotes harmonious living.' },
                        { id: 6, icon: 'fas fa-graduation-cap', name: 'Committee on Education', chairperson: 'Ma. Theresa Neri', description: 'Supporting educational initiatives and programs for residents of all ages. This committee provides scholarships and organizes literacy programs.' },
                        { id: 7, icon: 'fas fa-leaf', name: 'Committee on Environmental', chairperson: 'Alex Bolo', description: 'Implementing environmental programs and sustainability initiatives. This committee promotes green spaces and environmental awareness campaigns.' }
                    ]
                },
                documents: {
                    subtitle: "Information about the documents you can request and their requirements",
                    list: [
                        { 
                            id: 1, 
                            name: 'Barangay Clearance', 
                            description: 'Required for various transactions including employment, business permits, and legal matters. This document certifies your good standing in the community.', 
                            requirements: ['Valid government-issued ID', 'Proof of Residency (utility bill or lease agreement)', 'Community Tax Certificate (cedula)'], 
                            processingTime: '10-15 minutes' 
                        },
                        { 
                            id: 2, 
                            name: 'Certificate of Residency', 
                            description: 'Proof of residency in Barangay 118 for various purposes such as school enrollment, loan applications, and government transactions.', 
                            requirements: ['Valid government-issued ID', 'Proof of Residency (utility bill or barangay ID)', 'Completed application form'], 
                            processingTime: 'Same day' 
                        },
                        { 
                            id: 3, 
                            name: 'Certificate of Indigency', 
                            description: 'For availing government assistance programs and benefits. This document certifies your eligibility for social welfare programs.', 
                            requirements: ['Valid ID', 'Proof of Income or Affidavit of No Income', 'Proof of Residency'], 
                            processingTime: '1-2 days' 
                        },
                        { 
                            id: 4, 
                            name: 'Barangay ID', 
                            description: 'Official identification card issued by Barangay 118. Valid for local transactions and as supplementary identification.', 
                            requirements: ['Valid ID (if available)', 'Proof of Residency', '1x1 ID Photo', 'Completed application form'], 
                            processingTime: '3-5 working days' 
                        },
                    ]
                },
                location: {
                    title: "Barangay Location",
                    subtitle: "Find our barangay hall and important facilities",
                    address: '402 2nd St, Grace Park East, Caloocan, Metro Manila',
                    location: 'Barangay 118 Hall, Grace Park East, Caloocan',
                    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.756058428442!2d120.98186107483958!3d14.617918276090184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5f6a5b2c8b1%3A0x3a5c6c3c3c3c3c3c!2s402%202nd%20St%2C%20Grace%20Park%20East%2C%20Caloocan%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph"
                },
                contact: {
                    title: "Get In Touch",
                    address: '402 2nd St, Grace Park East, Caloocan, Metro Manila',
                    email: 'info@barangay118.gov.ph',
                    phone: '(02) 8123-4567',
                    mapLink: "https://maps.app.goo.gl/vic9Xuyab5eZhxSaA",
                    hours: {
                        weekdays: 'Monday-Friday: 8:00 AM - 5:00 PM',
                        saturday: 'Saturday: 8:00 AM - 12:00 PM'
                    },
                    mapLinkText: "View on Google Maps"
                },
                faqs: {
                    list: [
                        { 
                            id: 1, 
                            question: 'What are the office hours of the barangay hall?', 
                            answer: 'Our barangay hall is open from Monday to Friday, 8:00 AM to 3:00 PM, and on Saturdays from 8:00 AM to 12:00 PM. We are closed on Sundays and holidays.' 
                        },
                        { 
                            id: 2, 
                            question: 'How can I request a Barangay Clearance?', 
                            answer: 'Required documents: Valid government-issued ID (driver\'s license, passport, voter\'s ID), proof of residency (utility bill, lease/rental contract), completed barangay clearance application form, Community Tax Certificate (cedula), and passport-size photo if required. Fees: Free (no payment required). Processing time: Usually issued immediately (10–15 minutes). Where & How to apply: Apply in person at Barangay 118 Hall, weekdays 8 AM–5 PM. Submit requirements and receive your clearance.' 
                        },
                        { 
                            id: 3, 
                            question: 'How can I request a Certificate of Residency?', 
                            answer: 'Required documents: Government-issued ID, proof of address (utility bill, lease, or cedula), and completed residency certificate form. Fees: Free (no payment required). Processing time: On the spot or same day. Where & How to apply: Apply at Barangay 118 Hall, weekdays 8 AM–5 PM. Present your documents and receive the certificate.' 
                        },
                        { 
                            id: 4, 
                            question: 'How can I request a Certificate of Indigency?', 
                            answer: 'Required documents: Government-issued ID, proof of residence (barangay ID, voter\'s record, or utility bill), supporting income documents if applicable, and purpose statement. Fees: Free. Processing time: Usually issued immediately. Where & How to apply: Submit request at Barangay 118 Hall, weekdays 8 AM–5 PM. The officer will review and issue the certificate.' 
                        },
                        { 
                            id: 5, 
                            question: 'How can I get a Barangay ID?', 
                            answer: 'Required documents: Valid ID (if any), proof of residency (utility bill, barangay certificate, or cedula), 1–2 passport-size photos, and completed application form. Fees: Free. Processing time: Usually issued on the same day. Where & How to apply: Apply at Barangay 118 Hall, weekdays 8 AM–5 PM. Submit your requirements and receive your Barangay ID.' 
                        },
                        { 
                            id: 6, 
                            question: 'How can I report a community concern?', 
                            answer: 'You can report concerns by visiting the Barangay 118 Hall, calling our office at (02) 8123-4567, or using the contact form on our website. For emergencies, contact proper emergency services first. You may also use the "Get In Touch" section on our site; our team will review and assist you accordingly.' 
                        }
                    ]
                }
            }
        };
    }
    
    // Render officials dynamically
    function renderOfficials(officials) {
        const container = document.getElementById('officials-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (officials.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray); grid-column: 1 / -1;">No officials information available.</p>';
            return;
        }
        
        officials.forEach(official => {
            const card = document.createElement('div');
            card.className = 'official-card';
            
            // Use avatar URL if available, otherwise use initial
            let avatarHTML = '';
            if (official.avatar && official.avatar.startsWith('http')) {
                avatarHTML = `<img src="${official.avatar}" alt="${official.name}" class="official-avatar-img">`;
                card.innerHTML = `
                    <div class="official-avatar" style="background: none; padding: 0;">
                        ${avatarHTML}
                    </div>
                    <div class="official-name">${official.name || 'Unnamed Official'}</div>
                    <div class="official-position">${official.position || 'Position not specified'}</div>
                    <p>${official.description || 'No description available.'}</p>
                    ${official.contact ? `<div class="official-contact"><i class="fas fa-phone"></i> ${official.contact}</div>` : ''}
                `;
            } else {
                card.innerHTML = `
                    <div class="official-avatar">${official.avatar || official.name.charAt(0)}</div>
                    <div class="official-name">${official.name || 'Unnamed Official'}</div>
                    <div class="official-position">${official.position || 'Position not specified'}</div>
                    <p>${official.description || 'No description available.'}</p>
                    ${official.contact ? `<div class="official-contact"><i class="fas fa-phone"></i> ${official.contact}</div>` : ''}
                `;
            }
            
            container.appendChild(card);
        });
    }
    
    // Render committees dynamically
    function renderCommittees(committees) {
        const container = document.getElementById('committees-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (committees.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray); width: 100%;">No committees information available.</p>';
            return;
        }
        
        committees.forEach(committee => {
            const card = document.createElement('div');
            card.className = 'committee-card';
            card.innerHTML = `
                <div class="committee-icon"><i class="${committee.icon || 'fas fa-users'}"></i></div>
                <div class="committee-name">${committee.name || 'Unnamed Committee'}</div>
                <div class="committee-chairperson">${committee.chairperson ? 'Chairperson: ' + committee.chairperson : 'No chairperson specified'}</div>
                <p>${committee.description || 'No description available.'}</p>
            `;
            container.appendChild(card);
        });
    }
    
    // Render documents dynamically
    function renderDocuments(documents) {
        const container = document.getElementById('documents-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (documents.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray); grid-column: 1 / -1;">No documents information available.</p>';
            return;
        }
        
        documents.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'document-card';
            
            // Format requirements list
            let requirementsHTML = '';
            if (doc.requirements && doc.requirements.length > 0) {
                requirementsHTML = `
                    <p><strong>Requirements:</strong></p>
                    <ul class="requirements-list">
                        ${doc.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                `;
            }
            
            // Format processing time
            let processingHTML = '';
            if (doc.processingTime) {
                processingHTML = `<div class="processing-time"><i class="fas fa-clock"></i> Processing Time: ${doc.processingTime}</div>`;
            }
            
            card.innerHTML = `
                <div class="document-icon"><i class="${doc.icon || 'fas fa-file-alt'}"></i></div>
                <div class="document-name">${doc.name || 'Unnamed Document'}</div>
                <div class="document-description">
                    <p>${doc.description || 'No description available.'}</p>
                    ${requirementsHTML}
                    ${processingHTML}
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    // Render FAQs dynamically
    function renderFAQs(faqs) {
        const container = document.getElementById('faq-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (faqs.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray);">No FAQs available.</p>';
            return;
        }
        
        faqs.forEach(faq => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <div class="faq-question">
                    <span>${faq.question || 'Question not available'}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${faq.answer || 'Answer not available'}</p>
                </div>
            `;
            container.appendChild(item);
        });
    }
});