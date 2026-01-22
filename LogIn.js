import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth(app);

   
   
   function initializeDefaultAccounts() {
        const storedUsers = JSON.parse(localStorage.getItem('barangayUsers')) || [];
        const storedAdmins = JSON.parse(localStorage.getItem('barangayAdmins')) || [];
            

const accounts = [
    // Admin accounts
    { id: 1, email: "superadmin@barangay118.gov.ph", password: "superadmin123", role: "super_admin", name: "Primary Administrator", status: "active", registered: new Date().toLocaleDateString() },
    { id: 2, email: "superadmin2@barangay118.gov.ph", password: "superadmin123", role: "super_admin", name: "Chief Administrator", status: "active", registered: new Date().toLocaleDateString() },
    { id: 3, email: "admin1@barangay118.gov.ph", password: "admin123", role: "admin", name: "Records Administrator", status: "active", registered: new Date().toLocaleDateString() },
    { id: 4, email: "admin2@barangay118.gov.ph", password: "admin123", role: "admin", name: "Operations Administrator", status: "active", registered: new Date().toLocaleDateString() },
    { id: 5, email: "admin3@barangay118.gov.ph", password: "admin123", role: "admin", name: "Logistics Administrator", status: "active", registered: new Date().toLocaleDateString() },

    // Users
    { id: 6, email: "almanzor_jhlox@barangay118.gov.ph", password: "user123", role: "user", name: "Jhlox De Guzman ALMANZOR", status: "active", registered: new Date().toLocaleDateString() },
    { id: 7, email: "andaya_zantrix@barangay118.gov.ph", password: "user123", role: "user", name: "Zantrix Geoff Dandoy ANDAYA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 8, email: "aranas_john@barangay118.gov.ph", password: "user123", role: "user", name: "John Aezer Fajardo ARANAS", status: "active", registered: new Date().toLocaleDateString() },
    { id: 9, email: "argallon_ezekiel@barangay118.gov.ph", password: "user123", role: "user", name: "Ezekiel Lazaro ARGALLON", status: "active", registered: new Date().toLocaleDateString() },
    { id: 10, email: "badilla_carl@barangay118.gov.ph", password: "user123", role: "user", name: "Carl John Henry Smith BADILLA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 11, email: "bag-id_alvin@barangay118.gov.ph", password: "user123", role: "user", name: "Alvin Evangelista BAG-ID", status: "active", registered: new Date().toLocaleDateString() },
    { id: 12, email: "blanco_zidane@barangay118.gov.ph", password: "user123", role: "user", name: "Zidane Punzalan BLANCO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 13, email: "burgos_alfred@barangay118.gov.ph", password: "user123", role: "user", name: "Alfred BURGOS", status: "active", registered: new Date().toLocaleDateString() },
    { id: 14, email: "canlas_chester@barangay118.gov.ph", password: "user123", role: "user", name: "Chester Jon Guttierez CANLAS", status: "active", registered: new Date().toLocaleDateString() },
    { id: 15, email: "castro_jomar@barangay118.gov.ph", password: "user123", role: "user", name: "Jomar Santino Novilla CASTRO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 16, email: "catimbang_john@barangay118.gov.ph", password: "user123", role: "user", name: "John Mark Toledo CATIMBANG", status: "active", registered: new Date().toLocaleDateString() },
    { id: 17, email: "cruz_jezrel@barangay118.gov.ph", password: "user123", role: "user", name: "Jezrel Villa CRUZ", status: "active", registered: new Date().toLocaleDateString() },
    { id: 18, email: "espino_rance@barangay118.gov.ph", password: "user123", role: "user", name: "Rance Ego Soliman ESPINO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 19, email: "fernandez_mico@barangay118.gov.ph", password: "user123", role: "user", name: "Mico Palencia FERNANDEZ", status: "active", registered: new Date().toLocaleDateString() },
    { id: 20, email: "flores_calvin@barangay118.gov.ph", password: "user123", role: "user", name: "Calvin Brent Ardonza FLORES", status: "active", registered: new Date().toLocaleDateString() },
    { id: 21, email: "galibo_gemanuel@barangay118.gov.ph", password: "user123", role: "user", name: "Gemanuel Pedoche GALIBO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 22, email: "garcia_john@barangay118.gov.ph", password: "user123", role: "user", name: "John Cedric Rias GARCIA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 23, email: "gatmaitan_renz@barangay118.gov.ph", password: "user123", role: "user", name: "Renz Albert Acab GATMAITAN", status: "active", registered: new Date().toLocaleDateString() },
    { id: 24, email: "honradez_zacchary@barangay118.gov.ph", password: "user123", role: "user", name: "Zacchary Angeles HONRADEZ", status: "active", registered: new Date().toLocaleDateString() },
    { id: 25, email: "judaya_aedrick@barangay118.gov.ph", password: "user123", role: "user", name: "Aedrick John Cabales JUDAYA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 26, email: "lingan_andres@barangay118.gov.ph", password: "user123", role: "user", name: "Andres Lei Aguilar LINGAN", status: "active", registered: new Date().toLocaleDateString() },
    { id: 27, email: "mahilum_shcem@barangay118.gov.ph", password: "user123", role: "user", name: "Shcem Yae Pagador MAHILUM", status: "active", registered: new Date().toLocaleDateString() },
    { id: 28, email: "manalo_carlos@barangay118.gov.ph", password: "user123", role: "user", name: "Carlos Sebastian Lagatuz MANALO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 29, email: "mendina_john@barangay118.gov.ph", password: "user123", role: "user", name: "John Paul Magnaye MENDINA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 30, email: "moldez_john@barangay118.gov.ph", password: "user123", role: "user", name: "John Paul Agotipac MOLDEZ", status: "active", registered: new Date().toLocaleDateString() },
    { id: 31, email: "ortega_danny@barangay118.gov.ph", password: "user123", role: "user", name: "Danny King Mendoza ORTEGA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 32, email: "pangco_miguel@barangay118.gov.ph", password: "user123", role: "user", name: "Miguel Adriel Gallo PANGCO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 33, email: "pontilan_neo@barangay118.gov.ph", password: "user123", role: "user", name: "Neo Angelo Degamon PONTILAN", status: "active", registered: new Date().toLocaleDateString() },
    { id: 34, email: "pozon_david@barangay118.gov.ph", password: "user123", role: "user", name: "David Bryant Peralta POZON", status: "active", registered: new Date().toLocaleDateString() },
    { id: 35, email: "pozon_john@barangay118.gov.ph", password: "user123", role: "user", name: "John Patrick Peralta POZON", status: "active", registered: new Date().toLocaleDateString() },
    { id: 36, email: "quindoza_mark@barangay118.gov.ph", password: "user123", role: "user", name: "Mark Raymond Sia QUINDOZA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 37, email: "saflor_jillian@barangay118.gov.ph", password: "user123", role: "user", name: "Jillian Gidayawan SAFLOR", status: "active", registered: new Date().toLocaleDateString() },
    { id: 38, email: "sandiego_mark@barangay118.gov.ph", password: "user123", role: "user", name: "Mark Ehnzo Tesorio SAN DIEGO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 39, email: "solis_jacob@barangay118.gov.ph", password: "user123", role: "user", name: "Jacob Emmanuel Hetigan SOLIS", status: "active", registered: new Date().toLocaleDateString() },
    { id: 40, email: "sy_aarondave@barangay118.gov.ph", password: "user123", role: "user", name: "Aaron Dave Ariegado SY", status: "active", registered: new Date().toLocaleDateString() },
    { id: 41, email: "vasquez_terrence@barangay118.gov.ph", password: "user123", role: "user", name: "Terrence Keil Guese VASQUEZ", status: "active", registered: new Date().toLocaleDateString() },
    { id: 42, email: "villarosa_kris@barangay118.gov.ph", password: "user123", role: "user", name: "Kris Jarred Maravilla VILLAROSA", status: "active", registered: new Date().toLocaleDateString() },

    // Female
    { id: 43, email: "carlos_aaliyah@barangay118.gov.ph", password: "user123", role: "user", name: "Aaliyah Alyssa Nicole Macasanas CARLOS", status: "active", registered: new Date().toLocaleDateString() },
    { id: 44, email: "limbo_jewel@barangay118.gov.ph", password: "user123", role: "user", name: "Jewel Hyacinth LIMBO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 45, email: "magampo_celestine@barangay118.gov.ph", password: "user123", role: "user", name: "Celestine Isabelle Salud MAGAMPO", status: "active", registered: new Date().toLocaleDateString() },
    { id: 46, email: "ong_clariza@barangay118.gov.ph", password: "user123", role: "user", name: "Clariza Claire Dela Cruz ONG", status: "active", registered: new Date().toLocaleDateString() },
    { id: 47, email: "orpilla_jemilhyn@barangay118.gov.ph", password: "user123", role: "user", name: "Jemilhyn Frances Ong ORPILLA", status: "active", registered: new Date().toLocaleDateString() },
    { id: 48, email: "ruiz_angel@barangay118.gov.ph", password: "user123", role: "user", name: "Angel Rosales RUIZ", status: "active", registered: new Date().toLocaleDateString() }
];

            if (storedUsers.length === 0) {
                const userAccounts = accounts.filter(acc => acc.role === 'user');
                localStorage.setItem('barangayUsers', JSON.stringify(userAccounts));
            }
            
            if (storedAdmins.length === 0) {
                const adminAccounts = accounts.filter(acc => acc.role === 'admin' || acc.role === 'super_admin');
                localStorage.setItem('barangayAdmins', JSON.stringify(adminAccounts));
            }

            const systemLogs = JSON.parse(localStorage.getItem('systemLogs')) || [];
            if (systemLogs.length === 0) {
                const initialLog = {
                    timestamp: new Date().toLocaleString(),
                    user: "System",
                    action: "SYSTEM_STARTED",
                    details: "Login system initialized with default accounts",
                    type: "system",
                    ip: "127.0.0.1"
                };
                systemLogs.push(initialLog);
                localStorage.setItem('systemLogs', JSON.stringify(systemLogs));
            }
        }

        // Default content structure
        const defaultLoginContent = {
            heroTitle: "Login to Your Account",
            heroDescription: "Enter your credentials to access the system.",
            welcomeTitle: "Welcome Back",
            welcomeDescription: "Access your barangay services and stay connected with your community through our secure online portal.",
            features: [
                { id: 1, text: "Quick document requests", icon: "✓", active: true },
                { id: 2, text: "Request Processing Overview", icon: "✓", active: true },
                { id: 3, text: "Community announcements", icon: "✓", active: true },
                { id: 4, text: "Secure and private", icon: "✓", active: true }
            ]
        };

        document.addEventListener('DOMContentLoaded', function() {
            initializeDefaultAccounts();
            setupEventListeners();
            checkRememberedUser();
            loadLoginContent();
        });

        // Load login page content from localStorage
        function loadLoginContent() {
            const savedContent = localStorage.getItem('loginPageContent');
            const content = savedContent ? JSON.parse(savedContent) : defaultLoginContent;
        
            document.getElementById('hero-title').textContent = content.heroTitle;
            document.getElementById('hero-description').textContent = content.heroDescription;
            document.getElementById('welcome-title').textContent = content.welcomeTitle;
            document.getElementById('welcome-description').textContent = content.welcomeDescription;
            renderFeatures(content.features);
        }

        // Render features dynamically
        function renderFeatures(features) {
            const container = document.getElementById('features-container');
            container.innerHTML = '';
            
            features.forEach(feature => {
                if (feature.active) {
                    const featureItem = document.createElement('div');
                    featureItem.className = 'feature-item';
                    featureItem.innerHTML = `
                        <span class="feature-icon">${feature.icon}</span>
                        <span>${feature.text}</span>
                    `;
                    container.appendChild(featureItem);
                }
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
            document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
            document.getElementById('email').addEventListener('input', validateEmail);
            document.getElementById('password').addEventListener('input', validatePassword);
            document.getElementById('home-logo').addEventListener('click', function() {
            window.location.href = 'index.html';
            });
        }

        // Handle login form submission
        function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.disabled = true;
            loginBtn.classList.add('loading');
            loginBtn.textContent = 'Signing In...';
            
            // Simulate API call
            setTimeout(() => {
                // Check credentials against all accounts
                const user = authenticateUser(email, password);
                
                if (user) {
                    if (rememberMe) {
                        localStorage.setItem('rememberedEmail', email);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }
                    
                    // Store user session
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                    sessionStorage.setItem('userRole', user.role);
                    sessionStorage.setItem('userName', user.name);
                    
                    // Update user status for online tracking
                    const userStatus = JSON.parse(localStorage.getItem('userStatus')) || {};
                    userStatus[email] = {
                        online: true,
                        lastLogin: new Date().toISOString()
                    };
                    localStorage.setItem('userStatus', JSON.stringify(userStatus));
                    
                    // Log the login activity
                    const systemLogs = JSON.parse(localStorage.getItem('systemLogs')) || [];
                    systemLogs.push({
                        timestamp: new Date().toLocaleString(),
                        user: user.name,
                        action: "USER_LOGIN",
                        details: `User ${user.name} logged in successfully`,
                        type: "login",
                        ip: "192.168.1." + Math.floor(Math.random() * 255)
                    });
                    localStorage.setItem('systemLogs', JSON.stringify(systemLogs));
                    
                    showToast('Login successful! Redirecting to dashboard...', 'success');
                    
                    // Redirect to appropriate dashboard based on role
                    setTimeout(() => {
                        redirectBasedOnRole(user.role, email);
                    }, 2000);
                    
                } else {
                    // Failed login
                    loginBtn.disabled = false;
                    loginBtn.classList.remove('loading');
                    loginBtn.textContent = 'Sign In';
                    
                    showToast('Invalid email or password. Please try again.', 'error');
                    document.getElementById('password-error').textContent = 'Invalid email or password';
                    document.getElementById('password-error').style.display = 'block';
                }
            }, 1500);
        }

        function authenticateUser(email, password) {
            // Check localStorage first (from Admin Control)
            const storedUsers = JSON.parse(localStorage.getItem('barangayUsers')) || [];
            const storedAdmins = JSON.parse(localStorage.getItem('barangayAdmins')) || [];
            const allStoredAccounts = [...storedUsers, ...storedAdmins];
            const storedUser = allStoredAccounts.find(account => 
                account.email === email && account.password === password
            );
            
            if (storedUser) {
                return storedUser;
            }
            
            const accounts = [
                // Admin accounts
                { email: "superadmin@barangay118.gov.ph", password: "superadmin123", role: "super_admin", name: "Primary Administrator" },
                { email: "superadmin2@barangay118.gov.ph", password: "superadmin123", role: "super_admin", name: "Chief Administrator" },
                { email: "admin1@barangay118.gov.ph", password: "admin123", role: "admin", name: "Records Administrator" },
                { email: "admin2@barangay118.gov.ph", password: "admin123", role: "admin", name: "Operations Administrator" },
                { email: "admin3@barangay118.gov.ph", password: "admin123", role: "admin", name: "Logistics Administrator" }
            ];
            
            const hardcodedUser = accounts.find(account => 
                account.email === email && account.password === password
            );
            
            return hardcodedUser || null;
        }

        // Redirect user based on their role
        function redirectBasedOnRole(role, email) {
            const panelAdminEmails = [
                "admin1@barangay118.gov.ph",
                "admin2@barangay118.gov.ph", 
                "admin3@barangay118.gov.ph"
            ];
            
            switch(role) {
                case "super_admin":
                    window.location.href = "PanelAdminView.html";
                    break;
                case "admin":
                    if (panelAdminEmails.includes(email)) {
                        window.location.href = "PanelAdminView.html";
                    } else {
                        window.location.href = "LogAdminControl.html";
                    }
                    break;
                case "user":
                default:
                    window.location.href = "MainPage.html";
                    break;
            }
        }

        // Validate entire form
        function validateForm() {
            const emailValid = validateEmail();
            const passwordValid = validatePassword();
            
            return emailValid && passwordValid;
        }

        // Validate email
        function validateEmail() {
            const email = document.getElementById('email').value.trim();
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                emailError.textContent = 'Please enter your email address';
                emailError.style.display = 'block';
                return false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                return false;
            } else {
                emailError.style.display = 'none';
                return true;
            }
        }

        // Validate password
        function validatePassword() {
            const password = document.getElementById('password').value;
            const passwordError = document.getElementById('password-error');
            
            if (!password) {
                passwordError.textContent = 'Please enter your password';
                passwordError.style.display = 'block';
                return false;
            } else if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                passwordError.style.display = 'block';
                return false;
            } else {
                passwordError.style.display = 'none';
                return true;
            }
        }

        // Toggle password visibility
        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('password');
            const toggleButton = document.getElementById('togglePassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleButton.textContent = type === 'password' ? 'Show' : 'Hide';
        }

        // Check for remembered user
        function checkRememberedUser() {
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            if (rememberedEmail) {
                document.getElementById('email').value = rememberedEmail;
                document.getElementById('rememberMe').checked = true;
            }
        }

        // Show toast notification
        function showToast(message, type = 'info') {
            const existingToasts = document.querySelectorAll('.toast');
            existingToasts.forEach(toast => toast.remove());
            
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.className = `toast ${type}`;
            
            document.body.appendChild(toast);
            
            // Animate in
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
                toast.style.opacity = '1';
            }, 10);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 5000);
        }