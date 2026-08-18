// ========================================
// MR. HAULE DIGITAL SERVICES - Complete Script
// Email: hamanierasmuce@gmail.com
// ========================================

// ========================================
// 1. NAVIGATION TOGGLE (Mobile Menu)
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    });
});

// ========================================
// 2. NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// 3. ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 4. FILE UPLOAD HANDLER
// ========================================
const fileInput = document.getElementById('documents');
const fileList = document.getElementById('fileList');

if (fileInput) {
    fileInput.addEventListener('change', function() {
        fileList.innerHTML = '';
        const files = Array.from(this.files);
        
        if (files.length === 0) return;
        
        files.forEach(function(file, index) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span><i class="fas fa-file"></i> ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
                <span class="remove-file" data-index="${index}"><i class="fas fa-times"></i></span>
            `;
            fileList.appendChild(fileItem);
        });
        
        // Remove file handler
        document.querySelectorAll('.remove-file').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const dt = new DataTransfer();
                const files = Array.from(fileInput.files);
                files.splice(index, 1);
                files.forEach(function(file) {
                    dt.items.add(file);
                });
                fileInput.files = dt.files;
                this.parentElement.remove();
            });
        });
    });
}

// ========================================
// 5. APPLICATION FORM SUBMISSION - Updated with Email
// ========================================
const applicationForm = document.getElementById('applicationForm');
const formResponse = document.getElementById('formResponse');

if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const details = document.getElementById('details').value.trim();
        const contactMethod = document.querySelector('input[name="contact"]:checked');
        const selectedContact = contactMethod ? contactMethod.value : 'whatsapp';
        
        // Validate required fields
        if (!fullName) {
            alert('Tafadhali andika Jina Lako Kamili (*)');
            document.getElementById('fullName').focus();
            return;
        }
        
        if (!phone) {
            alert('Tafadhali andika Namba yako ya Simu (*)');
            document.getElementById('phone').focus();
            return;
        }
        
        if (!service) {
            alert('Tafadhali chagua Huduma (*)');
            document.getElementById('service').focus();
            return;
        }
        
        // Generate reference number
        const year = new Date().getFullYear();
        const random = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
        const refNumber = 'MH-' + year + '-' + random;
        document.getElementById('refNumber').textContent = refNumber;
        
        // Show success response
        applicationForm.style.display = 'none';
        formResponse.style.display = 'block';
        
        // Get service name for display
        const serviceSelect = document.getElementById('service');
        const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
        
        // Prepare WhatsApp message with Email
        const message = 
            '📋 *NEW APPLICATION* 📋%0A%0A' +
            '👤 *Jina:* ' + fullName + '%0A' +
            '📱 *Simu:* ' + phone + '%0A' +
            '📧 *Email:* ' + (email || 'hamanierasmuce@gmail.com') + '%0A' +
            '📌 *Huduma:* ' + serviceName + '%0A' +
            '📝 *Maelezo:* ' + (details || 'Hapana') + '%0A' +
            '🔢 *Rejea:* ' + refNumber + '%0A' +
            '💬 *Njia:* ' + selectedContact.toUpperCase() + '%0A%0A' +
            '_Taarifa zimetumwa kutoka website ya Mr. Haule_';
        
        // Open WhatsApp with the message
        const whatsappURL = 'https://wa.me/255656278661?text=' + message;
        window.open(whatsappURL, '_blank');
        
        // Also send email notification (using mailto as backup)
        const emailSubject = encodeURIComponent('📋 New Application: ' + serviceName);
        const emailBody = encodeURIComponent(
            'Jina: ' + fullName + '\n' +
            'Simu: ' + phone + '\n' +
            'Email: ' + (email || 'hamanierasmuce@gmail.com') + '\n' +
            'Huduma: ' + serviceName + '\n' +
            'Maelezo: ' + (details || 'Hapana') + '\n' +
            'Rejea: ' + refNumber + '\n' +
            'Njia: ' + selectedContact.toUpperCase()
        );
        
        // Uncomment below to also open email
        // window.open('mailto:hamanierasmuce@gmail.com?subject=' + emailSubject + '&body=' + emailBody, '_blank');
        
        // Log for debugging
        console.log('✅ Application submitted:', {
            fullName: fullName,
            phone: phone,
            email: email || 'hamanierasmuce@gmail.com',
            service: serviceName,
            details: details,
            refNumber: refNumber,
            contactMethod: selectedContact
        });
    });
}

// ========================================
// 6. RESET FORM FUNCTION
// ========================================
function resetForm() {
    if (applicationForm) {
        applicationForm.reset();
        applicationForm.style.display = 'block';
    }
    if (formResponse) {
        formResponse.style.display = 'none';
    }
    if (fileList) {
        fileList.innerHTML = '';
    }
    if (fileInput) {
        fileInput.value = '';
    }
    
    // Scroll to top of apply section
    const applySection = document.getElementById('apply');
    if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========================================
// 7. FAQ TOGGLE
// ========================================
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ========================================
// 8. BLOG POSTS - Dynamic Loading
// ========================================
const blogPosts = [
    {
        title: "Jinsi ya Kuomba Passport Tanzania",
        category: "Online Applications",
        image: "images/blog/passport-guide.jpg",
        excerpt: "Mwongozo kamili wa kuomba passport online. Jifunze hatua zote na vitu muhimu vilivyohitajika.",
        date: "Agosti 19, 2026",
        url: "blog/passport-application.html"
    },
    {
        title: "Jinsi ya Kuomba HESLB 2026/2027",
        category: "Education Applications",
        image: "images/blog/heslb-guide.jpg",
        excerpt: "Maelezo muhimu kwa ajili ya maombi ya mkopo wa HESLB. Usikose fursa hii ya elimu.",
        date: "Agosti 18, 2026",
        url: "blog/heslb-application.html"
    },
    {
        title: "Jinsi ya Kupata Cheti cha Kuzaliwa",
        category: "RITA Services",
        image: "images/blog/cheti-guide.jpg",
        excerpt: "Hatua za kupata cheti cha kuzaliwa kwa haraka na urahisi kupitia mfumo wa RITA.",
        date: "Agosti 17, 2026",
        url: "blog/cheti-cha-kuzaliwa.html"
    },
    {
        title: "Jinsi ya Kuomba Cheti cha Kifo",
        category: "RITA Services",
        image: "images/blog/cheti-kifo-guide.jpg",
        excerpt: "Mwongozo wa kuomba cheti cha kifo kwa njia sahihi na haraka.",
        date: "Agosti 16, 2026",
        url: "blog/cheti-cha-kifo.html"
    },
    {
        title: "RITA Verification: Jinsi Ya Kufanya",
        category: "RITA Services",
        image: "images/blog/rita-verification.jpg",
        excerpt: "Maelezo ya jinsi ya kufanya verification ya vyeti kupitia mfumo wa RITA.",
        date: "Agosti 15, 2026",
        url: "blog/rita-verification.html"
    },
    {
        title: "Makosa ya Kuepuka Wakati wa Online Applications",
        category: "Online Applications",
        image: "images/blog/mistakes-guide.jpg",
        excerpt: "Makosa ya kawaida yanayofanywa na watu wakati wa maombi ya mtandaoni na jinsi ya kuyakwepa.",
        date: "Agosti 14, 2026",
        url: "blog/mistakes-avoid.html"
    }
];

function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    blogPosts.forEach(function(post) {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        // Image with fallback
        const imageHtml = '<img src="' + post.image + '" alt="' + post.title + '" onerror="this.style.display=\'none\'">';
        
        card.innerHTML = 
            imageHtml +
            '<div class="blog-card-content">' +
                '<span class="blog-category">' + post.category + '</span>' +
                '<h3>' + post.title + '</h3>' +
                '<p>' + post.excerpt + '</p>' +
                '<div class="blog-meta">' +
                    '<span><i class="far fa-calendar-alt"></i> ' + post.date + '</span>' +
                    '<a href="' + post.url + '" class="blog-link">Soma Zaidi →</a>' +
                '</div>' +
            '</div>';
        
        blogGrid.appendChild(card);
    });
}

// ========================================
// 9. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 10. WHATSAPP CLICK TRACKING
// ========================================
document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
    link.addEventListener('click', function() {
        console.log('📱 WhatsApp clicked from:', this.textContent.trim());
    });
});

// ========================================
// 11. PHONE NUMBER CLICK TRACKING
// ========================================
document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
        console.log('📞 Phone number clicked:', this.textContent.trim());
    });
});

// ========================================
// 12. SOCIAL MEDIA CLICK TRACKING
// ========================================
document.querySelectorAll('.social-link').forEach(function(link) {
    link.addEventListener('click', function() {
        const platform = this.getAttribute('aria-label') || 'Social';
        console.log('🌐 Social media clicked:', platform);
    });
});

// ========================================
// 13. SCROLL TO TOP BUTTON
// ========================================
// Create scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 110px;
    right: 30px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--navy, #0A192F);
    color: white;
    border: 2px solid var(--gold, #D4AF37);
    font-size: 20px;
    cursor: pointer;
    z-index: 9998;
    display: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

// Add to page
document.body.appendChild(scrollBtn);

// Show/hide based on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

// Scroll to top on click
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 14. KEYBOARD ACCESSIBILITY
// ========================================
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
});

// ========================================
// 15. CONSOLE WELCOME MESSAGE - Updated with Email
// ========================================
console.log('🚀 MR. HAULE DIGITAL SERVICES');
console.log('📱 +255 656 278 661');
console.log('📧 hamanierasmuce@gmail.com');
console.log('🌐 https://mr-haule.github.io/Mr.Haule-Organization/');
console.log('💪 Built with ❤️ using free tools');

// ========================================
// 16. PAGE LOAD COMPLETE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Load blog posts
    loadBlogPosts();
    
    console.log('✅ Website loaded successfully!');
    console.log('📊 Total blog posts:', blogPosts.length);
});

// ========================================
// 17. WINDOW LOAD (All assets loaded)
// ========================================
window.addEventListener('load', function() {
    console.log('✅ All assets loaded!');
    console.log('📸 Images, CSS, and JS are ready.');
});

// ========================================
// 18. NETWORK STATUS CHECK
// ========================================
window.addEventListener('online', function() {
    console.log('🟢 Internet connection restored');
});

window.addEventListener('offline', function() {
    console.log('🔴 Internet connection lost');
});

// ========================================
// 19. FORM VALIDATION HELPERS
// ========================================
function validatePhone(phone) {
    // Remove spaces and special characters
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    // Check if it's a valid Tanzanian number (starts with 0 or +255)
    const pattern = /^(0|\+255)[0-9]{9}$/;
    return pattern.test(cleaned);
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// ========================================
// 20. COPYRIGHT YEAR AUTO-UPDATE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(function(el) {
        el.textContent = currentYear;
    });
});

console.log('✅ All scripts loaded successfully!');
console.log('📧 Email: hamanierasmuce@gmail.com');