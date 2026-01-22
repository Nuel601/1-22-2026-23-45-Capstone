const barangayData = {
    systemName: "BARANGAY 118 ONLINE SYSTEM",
    hero: {
        title: "Barangay 118 Online Management System",
        description: "Digital service for a faster, smoother, and more connected community."
    },
    welcomeSection: {
        backgroundImage: "8055825756095.png",
        title: "Welcome to Barangay 118",
        subtitle: "A Community of Unity and Progress",
        logo: "308673009_177778618128931_642779678020875763_n.png"
    },
    footer: {
        title: "Barangay 118 Online System",
        description: "Secure and efficient online services for Barangay 118. Connecting our community through technology.",
        contactInfo: {
            addressLine1: "402 2nd St, Grace Park East, Caloocan",
            addressLine2: "Metro Manila, Philippines",
            phone: "(02) 8123-4567",
            email: "info@barangay118.gov.ph",
            officeHours: "Mon–Fri: 8:00 AM – 5:00 PM"
        },
        socialMedia: {
            facebook: "https://facebook.com/barangay118",
            messenger: "https://m.me/barangay118"
        },
        copyright: "&copy; 2025 Barangay 118 Online System. All Rights Reserved."
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    updateUI();

    window.addEventListener('storage', function(e) {
        if (e.key === 'barangayData') {
            loadData();
        }
    });
});

function loadData() {
    try {
        const savedData = localStorage.getItem('barangayData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);

            Object.keys(parsedData).forEach(key => {
                if (Array.isArray(parsedData[key])) {
                    barangayData[key] = parsedData[key];
                } else if (typeof parsedData[key] === 'object' && parsedData[key] !== null) {
                    Object.assign(barangayData[key], parsedData[key]);
                } else {
                    barangayData[key] = parsedData[key];
                }
            });

            console.log('Data loaded from local storage');
        } else {
            console.log('Using default data');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }

    updateUI();
}

function saveData() {
    try {
        localStorage.setItem('barangayData', JSON.stringify(barangayData));
        console.log('Data saved to local storage');
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

function updateUI() {
    try {
        if (document.getElementById('system-name')) {
            document.getElementById('system-name').textContent = barangayData.systemName;
        }

        if (document.getElementById('hero-title')) {
            document.getElementById('hero-title').textContent = barangayData.hero.title;
        }
        if (document.getElementById('hero-description')) {
            document.getElementById('hero-description').textContent = barangayData.hero.description;
        }

        const welcomeBackground = document.getElementById('welcome-background');
        if (welcomeBackground && barangayData.welcomeSection.backgroundImage) {
            welcomeBackground.style.backgroundImage = `url(${barangayData.welcomeSection.backgroundImage})`;
        }

        if (document.getElementById('welcome-title')) {
            document.getElementById('welcome-title').textContent = barangayData.welcomeSection.title;
        }
        if (document.getElementById('welcome-subtitle')) {
            document.getElementById('welcome-subtitle').textContent = barangayData.welcomeSection.subtitle;
        }

        const barangayLogo = document.getElementById('barangay-logo-img');
        if (barangayLogo && barangayData.welcomeSection.logo) {
            barangayLogo.src = barangayData.welcomeSection.logo;
        }

        renderFooter();
        console.log('UI updated successfully');
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

function renderFooter() {
    // Footer Title and Description
    if (document.getElementById('footer-title')) {
        document.getElementById('footer-title').textContent = barangayData.footer.title;
    }
    if (document.getElementById('footer-description')) {
        document.getElementById('footer-description').textContent = barangayData.footer.description;
    }

    // Contact Info - Individual Elements
    if (document.getElementById('footer-address-line1') && barangayData.footer.contactInfo) {
        document.getElementById('footer-address-line1').textContent = barangayData.footer.contactInfo.addressLine1;
    }
    if (document.getElementById('footer-address-line2') && barangayData.footer.contactInfo) {
        document.getElementById('footer-address-line2').textContent = barangayData.footer.contactInfo.addressLine2;
    }
    if (document.getElementById('footer-phone') && barangayData.footer.contactInfo) {
        document.getElementById('footer-phone').textContent = barangayData.footer.contactInfo.phone;
    }
    if (document.getElementById('footer-email') && barangayData.footer.contactInfo) {
        document.getElementById('footer-email').textContent = barangayData.footer.contactInfo.email;
    }
    if (document.getElementById('footer-office-hours') && barangayData.footer.contactInfo) {
        document.getElementById('footer-office-hours').textContent = barangayData.footer.contactInfo.officeHours;
    }

    // Social Media Links
    const facebookLink = document.getElementById('footer-facebook-link');
    if (facebookLink && barangayData.footer.socialMedia) {
        facebookLink.href = barangayData.footer.socialMedia.facebook;
        // Update text if needed
        const facebookText = document.getElementById('footer-facebook-text');
        if (facebookText) {
            facebookText.textContent = barangayData.footer.socialMedia.facebook
                .replace('https://', '')
                .replace('facebook.com/', '');
        }
    }

    const messengerLink = document.getElementById('footer-messenger-link');
    if (messengerLink && barangayData.footer.socialMedia) {
        messengerLink.href = barangayData.footer.socialMedia.messenger;
        // Update text if needed
        const messengerText = document.getElementById('footer-messenger-text');
        if (messengerText) {
            messengerText.textContent = barangayData.footer.socialMedia.messenger
                .replace('https://', '')
                .replace('m.me/', '');
        }
    }

    // Copyright
    if (document.getElementById('copyright-text')) {
        document.getElementById('copyright-text').innerHTML = barangayData.footer.copyright;
    }
}

function setupEventListeners() {
    // You can add any event listeners here if needed
}

function updateSystemName(newName) {
    barangayData.systemName = newName;
    saveData();
    updateUI();
}

function updateHeroSection(title, description) {
    barangayData.hero.title = title;
    barangayData.hero.description = description;
    saveData();
    updateUI();
}

function updateWelcomeSection(backgroundImage, title, subtitle, logo) {
    barangayData.welcomeSection.backgroundImage = backgroundImage;
    barangayData.welcomeSection.title = title;
    barangayData.welcomeSection.subtitle = subtitle;
    barangayData.welcomeSection.logo = logo;
    saveData();
    updateUI();
}

function updateFooter(newFooter) {
    barangayData.footer = newFooter;
    saveData();
    updateUI();
}

// Helper function to update specific footer properties
function updateFooterProperty(section, property, value) {
    if (barangayData.footer[section] && barangayData.footer[section][property] !== undefined) {
        barangayData.footer[section][property] = value;
        saveData();
        updateUI();
        return true;
    }
    return false;
}

// Update contact info individually
function updateContactInfo(address1, address2, phone, email, hours) {
    barangayData.footer.contactInfo = {
        addressLine1: address1,
        addressLine2: address2,
        phone: phone,
        email: email,
        officeHours: hours
    };
    saveData();
    updateUI();
}

// Update social media links
function updateSocialLinks(facebook, messenger) {
    barangayData.footer.socialMedia = {
        facebook: facebook,
        messenger: messenger
    };
    saveData();
    updateUI();
}

function manualSave() {
    const success = saveData();
    if (success) {
        showNotification('Changes saved successfully!', 'success');
    } else {
        showNotification('Error saving changes', 'error');
    }
}

function resetToDefault() {
    if (confirm('Are you sure you want to reset to default data?')) {
        const defaultData = {
            systemName: "BARANGAY 118 ONLINE SYSTEM",
            hero: {
                title: "Barangay 118 Online Management System",
                description: "Empowering our community through smart and efficient digital services."
            },
            welcomeSection: {
                backgroundImage: "/Users/nuel/Desktop/Capstone2/received_32392388620408695_edit_2410797689912.png",
                title: "Welcome to Barangay 118",
                subtitle: "A Community of Unity and Progress",
                logo: "308673009_177778618128931_642779678020875763_n.png"
            },
            footer: {
                title: "Barangay 118 Online System",
                description: "Secure and efficient online services for Barangay 118. Connecting our community through technology.",
                contactInfo: {
                    addressLine1: "402 2nd St, Grace Park East, Caloocan",
                    addressLine2: "Metro Manila, Philippines",
                    phone: "(02) 8123-4567",
                    email: "info@barangay118.gov.ph",
                    officeHours: "Mon–Fri: 8:00 AM – 5:00 PM"
                },
                socialMedia: {
                    facebook: "https://facebook.com/barangay118",
                    messenger: "https://m.me/barangay118"
                },
                copyright: "&copy; 2025 Barangay 118 Online System. All Rights Reserved."
            }
        };

        Object.keys(defaultData).forEach(key => {
            barangayData[key] = defaultData[key];
        });

        saveData();
        updateUI();
        showNotification('Reset to default data successful!', 'success');
    }
}

function showNotification(message, type = 'info') {
    const existingNotification = document.getElementById('custom-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; padding: 15px 20px; border-radius: 8px; color: white; font-weight: 600; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 10px; max-width: 400px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    const notificationDiv = notification.querySelector('div');
    notificationDiv.style.backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 3000);
}

window.barangayAdmin = {
    updateSystemName: function(newName) {
        barangayData.systemName = newName;
        manualSave();
        updateUI();
    },
    updateHeroSection: function(title, description) {
        barangayData.hero.title = title;
        barangayData.hero.description = description;
        manualSave();
        updateUI();
    },
    updateWelcomeSection: function(backgroundImage, title, subtitle, logo) {
        barangayData.welcomeSection.backgroundImage = backgroundImage;
        barangayData.welcomeSection.title = title;
        barangayData.welcomeSection.subtitle = subtitle;
        barangayData.welcomeSection.logo = logo;
        manualSave();
        updateUI();
    },
    updateFooter: function(newFooter) {
        barangayData.footer = newFooter;
        manualSave();
        updateUI();
    },
    updateContactInfo: function(address1, address2, phone, email, hours) {
        updateContactInfo(address1, address2, phone, email, hours);
    },
    updateSocialLinks: function(facebook, messenger) {
        updateSocialLinks(facebook, messenger);
    },
    updateFooterProperty: function(section, property, value) {
        return updateFooterProperty(section, property, value);
    },
    getData: () => barangayData,
    saveData: manualSave,
    loadData: loadData,
    manualSave: manualSave,
    resetToDefault: resetToDefault
};

console.log('Barangay Admin System Connected - Ready for Admin Panel Integration');