// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add click event listeners to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// Enhanced navbar background change on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(30, 60, 114, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Advanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for cards
            if (entry.target.classList.contains('service-card') || 
                entry.target.classList.contains('quick-card')) {
                const cards = entry.target.parentElement.children;
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.classList.add('fade-in');
        animateOnScroll.observe(card);
    });

    // Observe quick cards
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.classList.add('fade-in');
        animateOnScroll.observe(card);
    });

    // Observe other animated elements
    const animatedElements = document.querySelectorAll(
        '.contact-item, .feature, .about-card, .stat'
    );
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        animateOnScroll.observe(el);
    });
});

// Modal Functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
        
        // Auto-focus on first emergency button for accessibility
        setTimeout(() => {
            const firstBtn = modal.querySelector('.emergency-btn');
            if (firstBtn) firstBtn.focus();
        }, 300);
    }
}

function closeEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openSignupModal() {
    closeLoginModal();
    // Implement signup modal functionality
    showNotification('Signup functionality coming soon!', 'info');
}

// Close modals when clicking outside or pressing Escape
window.addEventListener('click', (e) => {
    const loginModal = document.getElementById('loginModal');
    const emergencyModal = document.getElementById('emergencyModal');
    
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === emergencyModal) {
        closeEmergencyModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLoginModal();
        closeEmergencyModal();
    }
});

// Enhanced emergency call function with confirmation and location
function callNumber(number) {
    // Vibrate if supported (mobile devices)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    // Show confirmation with additional options
    const confirmCall = confirm(
        `🚨 EMERGENCY CALL 🚨\n\nYou are about to call: ${number}\n\n` +
        `• This will connect you to emergency services\n` +
        `• Your location may be shared automatically\n` +
        `• Stay calm and speak clearly\n\n` +
        `Do you want to proceed with the call?`
    );
    
    if (confirmCall) {
        // Log the emergency call attempt
        logEmergencyCall(number);
        
        // Attempt to share location if available
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Location shared:', {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        emergency: number
                    });
                },
                (error) => {
                    console.log('Location sharing failed:', error);
                }
            );
        }
        
        // Make the call
        window.location.href = `tel:${number}`;
        
        // Show post-call guidance
        setTimeout(() => {
            showPostCallGuidance(number);
        }, 1000);
    }
}

// Log emergency calls for analytics (in real app, send to server)
function logEmergencyCall(number) {
    const callData = {
        number: number,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        location: 'pending'
    };
    
    // Store in localStorage for now (in real app, send to server)
    const emergencyCalls = JSON.parse(localStorage.getItem('emergencyCalls') || '[]');
    emergencyCalls.push(callData);
    localStorage.setItem('emergencyCalls', JSON.stringify(emergencyCalls));
    
    console.log('Emergency call logged:', callData);
}

// Show guidance after emergency call
function showPostCallGuidance(number) {
    let guidance = '';
    
    switch(number) {
        case '112':
        case '100':
            guidance = `📞 Police/Emergency Services Called\n\n` +
                      `✓ Stay on the line\n` +
                      `✓ Provide your exact location\n` +
                      `✓ Describe the emergency clearly\n` +
                      `✓ Follow operator instructions\n` +
                      `✓ Keep your phone charged`;
            break;
        case '102':
        case '108':
            guidance = `🚑 Medical Emergency Services Called\n\n` +
                      `✓ Stay with the patient\n` +
                      `✓ Provide exact location\n` +
                      `✓ Describe symptoms/injuries\n` +
                      `✓ Follow first aid instructions\n` +
                      `✓ Prepare for ambulance arrival`;
            break;
        case '101':
            guidance = `🚒 Fire Department Called\n\n` +
                      `✓ Evacuate if safe to do so\n` +
                      `✓ Provide exact location\n` +
                      `✓ Describe fire size/location\n` +
                      `✓ Stay away from smoke\n` +
                      `✓ Meet firefighters outside`;
            break;
        default:
            guidance = `📞 Emergency Services Called\n\n` +
                      `✓ Stay calm and speak clearly\n` +
                      `✓ Provide all requested information\n` +
                      `✓ Follow operator instructions\n` +
                      `✓ Keep your phone available`;
    }
    
    alert(guidance);
}

// Enhanced location sharing with accuracy and error handling
function shareLocation() {
    if (!navigator.geolocation) {
        showNotification('Geolocation is not supported by this browser.', 'error');
        return;
    }
    
    showNotification('Getting your location...', 'info');
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            
            const locationData = {
                latitude: lat,
                longitude: lon,
                accuracy: accuracy,
                timestamp: new Date().toISOString()
            };
            
            // Store location for emergency services
            localStorage.setItem('lastKnownLocation', JSON.stringify(locationData));
            
            // Create shareable location URL
            const locationUrl = `https://maps.google.com/?q=${lat},${lon}`;
            const whatsappUrl = `https://wa.me/?text=🚨 EMERGENCY LOCATION 🚨%0A%0ALatitude: ${lat}%0ALongitude: ${lon}%0AAccuracy: ${Math.round(accuracy)}m%0A%0AGoogle Maps: ${encodeURIComponent(locationUrl)}%0A%0ATime: ${new Date().toLocaleString()}`;
            
            // Show location sharing options
            const shareOptions = confirm(
                `📍 Location Retrieved Successfully!\n\n` +
                `Latitude: ${lat.toFixed(6)}\n` +
                `Longitude: ${lon.toFixed(6)}\n` +
                `Accuracy: ${Math.round(accuracy)} meters\n\n` +
                `Click OK to share via WhatsApp, or Cancel to copy coordinates.`
            );
            
            if (shareOptions) {
                window.open(whatsappUrl, '_blank');
            } else {
                // Copy to clipboard
                const coordinates = `${lat}, ${lon}`;
                navigator.clipboard.writeText(coordinates).then(() => {
                    showNotification('Coordinates copied to clipboard!', 'success');
                }).catch(() => {
                    prompt('Copy these coordinates:', coordinates);
                });
            }
            
            showNotification('Location shared successfully!', 'success');
        },
        (error) => {
            let errorMessage = 'Unable to get location. ';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Please enable location permissions.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'Unknown error occurred.';
            }
            
            showNotification(errorMessage, 'error');
            console.error('Geolocation error:', error);
        },
        options
    );
}

// Service details function with enhanced content
function showDetails(category) {
    const details = {
        women: {
            title: '👩 Women Safety Services',
            content: `
                <div class="detail-content">
                    <h3>🆘 24/7 Women Safety Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Women Helpline:</strong> <a href="tel:1091">1091</a>
                            <p>24/7 emergency assistance for women in distress</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Women in Distress:</strong> <a href="tel:181">181</a>
                            <p>Support for domestic violence and harassment</p>
                        </div>
                        <div class="helpline-item">
                            <strong>One Stop Centre:</strong> <a href="tel:181">181</a>
                            <p>Integrated support services for women</p>
                        </div>
                    </div>
                    
                    <h4>🛡️ Services Available:</h4>
                    <ul class="service-list">
                        <li>Emergency rescue and assistance</li>
                        <li>Domestic violence support and counseling</li>
                        <li>Legal aid and court assistance</li>
                        <li>Shelter and rehabilitation services</li>
                        <li>Medical assistance and support</li>
                        <li>Psychological counseling</li>
                        <li>Economic empowerment programs</li>
                    </ul>
                    
                    <h4>📱 Safety Apps:</h4>
                    <div class="app-links">
                        <a href="#" class="app-link">Himmat Plus (Delhi Police)</a>
                        <a href="#" class="app-link">Shakti (UP Police)</a>
                        <a href="#" class="app-link">SOS (Kerala Police)</a>
                    </div>
                    
                    <h4>🌐 Online Resources:</h4>
                    <p><strong>Website:</strong> <a href="https://wcd.nic.in" target="_blank">wcd.nic.in</a></p>
                    <p><strong>NCW Portal:</strong> <a href="https://ncw.nic.in" target="_blank">ncw.nic.in</a></p>
                </div>
            `
        },
        cyber: {
            title: '💻 Cyber Crime Support',
            content: `
                <div class="detail-content">
                    <h3>🔒 Cyber Crime Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Cyber Crime Helpline:</strong> <a href="tel:1930">1930</a>
                            <p>Report cyber crimes and online fraud</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Banking Fraud:</strong> <a href="tel:155260">155260</a>
                            <p>Report banking and financial fraud</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Digital Payment Fraud:</strong> <a href="tel:14416">14416</a>
                            <p>UPI and digital payment related fraud</p>
                        </div>
                    </div>
                    
                    <h4>🌐 Online Reporting:</h4>
                    <div class="portal-links">
                        <a href="https://cybercrime.gov.in" target="_blank" class="portal-link">
                            <strong>National Cyber Crime Portal</strong>
                            <p>cybercrime.gov.in</p>
                        </a>
                        <a href="https://www.rbi.org.in" target="_blank" class="portal-link">
                            <strong>RBI Complaint Portal</strong>
                            <p>Report banking fraud</p>
                        </a>
                    </div>
                    
                    <h4>⚠️ Common Cyber Crimes:</h4>
                    <ul class="service-list">
                        <li>Online financial fraud and phishing</li>
                        <li>Social media crimes and harassment</li>
                        <li>Cyber bullying and stalking</li>
                        <li>Identity theft and data breach</li>
                        <li>Email and account hacking</li>
                        <li>Online shopping fraud</li>
                        <li>Fake job and lottery scams</li>
                    </ul>
                    
                    <h4>🛡️ Prevention Tips:</h4>
                    <ul class="prevention-tips">
                        <li>Never share OTP, passwords, or bank details</li>
                        <li>Verify before making online payments</li>
                        <li>Use strong, unique passwords</li>
                        <li>Keep software and apps updated</li>
                        <li>Be cautious of suspicious links and emails</li>
                        <li>Use secure Wi-Fi networks</li>
                    </ul>
                </div>
            `
        },
        medical: {
            title: '🏥 Medical Emergency Services',
            content: `
                <div class="detail-content">
                    <h3>🚑 Medical Emergency Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Ambulance Service:</strong> <a href="tel:102">102</a>
                            <p>Free ambulance service across India</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Medical Emergency:</strong> <a href="tel:108">108</a>
                            <p>Emergency medical response service</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Blood Bank:</strong> <a href="tel:104">104</a>
                            <p>Blood bank information and services</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Poison Control:</strong> <a href="tel:1066">1066</a>
                            <p>Poison control and toxicology help</p>
                        </div>
                    </div>
                    
                    <h4>🏥 Services Available:</h4>
                    <ul class="service-list">
                        <li>Emergency ambulance service (free)</li>
                        <li>First aid guidance over phone</li>
                        <li>Hospital information and bed availability</li>
                        <li>Blood bank services and donor information</li>
                        <li>Poison control and antidote guidance</li>
                        <li>Medical emergency consultation</li>
                        <li>Organ transplant coordination</li>
                    </ul>
                    
                    <h4>🆘 Emergency Procedures:</h4>
                    <ol class="procedure-list">
                        <li>Stay calm and assess the situation</li>
                        <li>Call 102 or 108 immediately</li>
                        <li>Provide exact location and landmarks</li>
                        <li>Describe the medical emergency clearly</li>
                        <li>Follow operator's first aid instructions</li>
                        <li>Keep patient comfortable and conscious</li>
                        <li>Prepare for ambulance arrival</li>
                    </ol>
                    
                    <h4>📱 Health Apps:</h4>
                    <div class="app-links">
                        <a href="#" class="app-link">Aarogya Setu</a>
                        <a href="#" class="app-link">eSanjeevani</a>
                        <a href="#" class="app-link">AIIMS Delhi</a>
                    </div>
                </div>
            `
        },
        child: {
            title: '👶 Child Protection Services',
            content: `
                <div class="detail-content">
                    <h3>🛡️ Child Protection Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Child Helpline:</strong> <a href="tel:1098">1098</a>
                            <p>24/7 child protection and assistance</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Missing Child:</strong> <a href="tel:1094">1094</a>
                            <p>Report missing children</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Child Abuse Reporting:</strong> <a href="tel:1098">1098</a>
                            <p>Report child abuse and neglect</p>
                        </div>
                    </div>
                    
                    <h4>👨‍👩‍👧‍👦 Services Available:</h4>
                    <ul class="service-list">
                        <li>Child protection and rescue services</li>
                        <li>Missing child assistance and tracking</li>
                        <li>Child abuse reporting and intervention</li>
                        <li>Counseling and psychological support</li>
                        <li>Legal support and court assistance</li>
                        <li>Shelter and rehabilitation services</li>
                        <li>Educational support and sponsorship</li>
                        <li>Medical assistance for children</li>
                    </ul>
                    
                    <h4>🚨 When to Call:</h4>
                    <ul class="when-to-call">
                        <li>Child in immediate physical danger</li>
                        <li>Suspected child abuse or neglect</li>
                        <li>Missing child report</li>
                        <li>Child needs protection from family</li>
                        <li>Street children requiring assistance</li>
                        <li>Child trafficking suspicions</li>
                        <li>Child labor exploitation</li>
                    </ul>
                    
                    <h4>🌐 Online Resources:</h4>
                    <p><strong>NCPCR:</strong> <a href="https://ncpcr.gov.in" target="_blank">ncpcr.gov.in</a></p>
                    <p><strong>Childline India:</strong> <a href="https://childlineindia.org" target="_blank">childlineindia.org</a></p>
                </div>
            `
        },
        mental: {
            title: '🧠 Mental Health Support',
            content: `
                <div class="detail-content">
                    <h3>💚 Mental Health Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>KIRAN Helpline:</strong> <a href="tel:18005990019">1800-599-0019</a>
                            <p>24/7 mental health support</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Suicide Prevention:</strong> <a href="tel:9152987821">9152987821</a>
                            <p>Crisis intervention and support</p>
                        </div>
                        <div class="helpline-item">
                            <strong>NIMHANS:</strong> <a href="tel:08046110007">080-46110007</a>
                            <p>Professional psychiatric consultation</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Vandrevala Foundation:</strong> <a href="tel:9999666555">9999666555</a>
                            <p>Free counseling and support</p>
                        </div>
                    </div>
                    
                    <h4>🤝 Services Available:</h4>
                    <ul class="service-list">
                        <li>24/7 crisis counseling and support</li>
                        <li>Suicide prevention and intervention</li>
                        <li>Mental health consultation</li>
                        <li>Emotional support and guidance</li>
                        <li>Referral to mental health professionals</li>
                        <li>Family counseling and support</li>
                        <li>Addiction counseling and rehabilitation</li>
                        <li>Stress and anxiety management</li>
                    </ul>
                    
                    <h4>🆘 When to Seek Help:</h4>
                    <ul class="when-to-call">
                        <li>Feeling overwhelmed or hopeless</li>
                        <li>Thoughts of self-harm or suicide</li>
                        <li>Persistent sadness or depression</li>
                        <li>Severe anxiety or panic attacks</li>
                        <li>Substance abuse problems</li>
                        <li>Relationship or family issues</li>
                        <li>Work or academic stress</li>
                        <li>Grief and loss support</li>
                    </ul>
                    
                    <h4>🧘‍♀️ Self-Care Tips:</h4>
                    <ul class="self-care-tips">
                        <li>Practice deep breathing and meditation</li>
                        <li>Maintain regular sleep schedule</li>
                        <li>Exercise regularly and eat healthy</li>
                        <li>Stay connected with friends and family</li>
                        <li>Limit alcohol and avoid drugs</li>
                        <li>Engage in hobbies and activities you enjoy</li>
                    </ul>
                </div>
            `
        },
        senior: {
            title: '👴 Senior Citizens Support',
            content: `
                <div class="detail-content">
                    <h3>🏠 Senior Citizens Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Elder Helpline:</strong> <a href="tel:14567">14567</a>
                            <p>Dedicated support for elderly citizens</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Senior Citizen Helpline:</strong> <a href="tel:1291">1291</a>
                            <p>General assistance and support</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Elder Abuse:</strong> <a href="tel:1090">1090</a>
                            <p>Report elder abuse and neglect</p>
                        </div>
                    </div>
                    
                    <h4>🤝 Services Available:</h4>
                    <ul class="service-list">
                        <li>Emergency assistance for elderly</li>
                        <li>Health and medical support</li>
                        <li>Elder abuse reporting and intervention</li>
                        <li>Legal aid and pension assistance</li>
                        <li>Emotional support and counseling</li>
                        <li>Home care services information</li>
                        <li>Social security and welfare schemes</li>
                    </ul>
                </div>
            `
        },
        disaster: {
            title: '🌪️ Disaster Management',
            content: `
                <div class="detail-content">
                    <h3>⚡ Disaster Management Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Disaster Management:</strong> <a href="tel:108">108</a>
                            <p>Emergency disaster response</p>
                        </div>
                        <div class="helpline-item">
                            <strong>NDRF Helpline:</strong> <a href="tel:01126701700">011-26701700</a>
                            <p>National Disaster Response Force</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Earthquake Helpline:</strong> <a href="tel:01124363260">011-24363260</a>
                            <p>Earthquake emergency response</p>
                        </div>
                    </div>
                    
                    <h4>🌊 Disaster Types Covered:</h4>
                    <ul class="service-list">
                        <li>Earthquakes and seismic activities</li>
                        <li>Floods and water logging</li>
                        <li>Cyclones and severe weather</li>
                        <li>Fire emergencies and explosions</li>
                        <li>Building collapses and accidents</li>
                        <li>Chemical and industrial disasters</li>
                        <li>Landslides and avalanches</li>
                    </ul>
                </div>
            `
        },
        railway: {
            title: '🚂 Railway Emergency',
            content: `
                <div class="detail-content">
                    <h3>🚄 Railway Emergency Helplines</h3>
                    <div class="helpline-grid">
                        <div class="helpline-item">
                            <strong>Railway Helpline:</strong> <a href="tel:139">139</a>
                            <p>General railway assistance and inquiry</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Railway Security:</strong> <a href="tel:182">182</a>
                            <p>Railway Protection Force (RPF)</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Medical Emergency:</strong> <a href="tel:138">138</a>
                            <p>Railway medical emergency</p>
                        </div>
                        <div class="helpline-item">
                            <strong>Accident Helpline:</strong> <a href="tel:1072">1072</a>
                            <p>Railway accident emergency response</p>
                        </div>
                    </div>
                    
                    <h4>🚨 Services Available:</h4>
                    <ul class="service-list">
                        <li>Railway safety and security assistance</li>
                        <li>Medical emergency on trains</li>
                        <li>Accident reporting and response</li>
                        <li>Lost luggage and theft reporting</li>
                        <li>Passenger assistance and support</li>
                        <li>Train delay and cancellation info</li>
                        <li>Platform and station emergencies</li>
                    </ul>
                </div>
            `
        }
    };

    const detail = details[category];
    if (detail) {
        createDetailModal(detail);
    }
}

// Create enhanced detail modal
function createDetailModal(detail) {
    const modal = document.createElement('div');
    modal.className = 'modal detail-modal';
    modal.innerHTML = `
        <div class="modal-content detail-modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">&times;</span>
            <div class="detail-header">
                <h2>${detail.title}</h2>
            </div>
            <div class="detail-body">
                ${detail.content}
            </div>
            <div class="detail-footer">
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">
                    <i class="fas fa-check"></i> Got It
                </button>
            </div>
        </div>
    `;
    
    // Add styles for detail modal
    const style = document.createElement('style');
    style.textContent = `
        .detail-modal-content {
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .detail-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            margin: -2rem -2rem 2rem -2rem;
        }
        
        .detail-body {
            padding: 0 1rem;
        }
        
        .helpline-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .helpline-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        
        .helpline-item strong {
            color: #2c3e50;
        }
        
        .helpline-item a {
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
        }
        
        .helpline-item p {
            margin: 0.5rem 0 0 0;
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        .service-list, .when-to-call, .prevention-tips, .self-care-tips, .procedure-list {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .service-list li, .when-to-call li, .prevention-tips li, .self-care-tips li {
            margin-bottom: 0.5rem;
            color: #2c3e50;
        }
        
        .app-links, .portal-links {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .app-link, .portal-link {
            background: #667eea;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .app-link:hover, .portal-link:hover {
            background: #764ba2;
            transform: translateY(-2px);
        }
        
        .portal-link {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
            padding: 1rem;
            border-radius: 8px;
            display: block;
            text-align: center;
        }
        
        .portal-link strong {
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .detail-footer {
            text-align: center;
            padding: 2rem 1rem 1rem;
            border-top: 1px solid #e9ecef;
            margin-top: 2rem;
        }
    `;
    
    if (!document.querySelector('.detail-modal-styles')) {
        style.className = 'detail-modal-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Enhanced contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const type = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !message || !type) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
                
                // Log submission (in real app, send to server)
                console.log('Contact form submitted:', {
                    name, email, phone, type, message,
                    timestamp: new Date().toISOString()
                });
            }, 2000);
        });
    }
});

// Enhanced login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            // Simulate login (replace with actual authentication)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                showNotification('Login functionality will be implemented soon!', 'info');
                closeLoginModal();
            }, 1500);
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 3000;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid #667eea;
            }
            
            .notification-success { border-left-color: #2ecc71; }
            .notification-error { border-left-color: #e74c3c; }
            .notification-warning { border-left-color: #f39c12; }
            .notification-info { border-left-color: #3498db; }
            
            .notification i {
                font-size: 1.5rem;
            }
            
            .notification-success i { color: #2ecc71; }
            .notification-error i { color: #e74c3c; }
            .notification-warning i { color: #f39c12; }
            .notification-info i { color: #3498db; }
            
            .notification span {
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #7f8c8d;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                background: #f8f9fa;
                color: #2c3e50;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('notification-hiding');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    function createRipple(event) {
        const button = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple effect if not already added
    if (!document.querySelector('.ripple-styles')) {
        const style = document.createElement('style');
        style.className = 'ripple-styles';
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('UrgentCall Emergency Website initialized');
});