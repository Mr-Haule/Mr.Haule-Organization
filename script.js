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
        requirements: [
            "Namba ya NIDA (Kitambulisho cha Taifa)",
            "Cheti cha kuzaliwa",
            "Picha za pasipoti (background nyeupe)",
            "Namba ya simu na barua pepe inayotumika"
        ],
        steps: [
            "Fungua tovuti ya Idara ya Uhamiaji (immigration.go.tz) na chagua huduma ya Passport Application",
            "Jaza fomu ya maombi kwa taarifa sahihi zinazofanana na NIDA yako",
            "Pakia picha na nyaraka zinazohitajika",
            "Lipa ada ya awali ili upate Control Number",
            "Chapisha fomu kisha nenda kituo cha uhamiaji ulichochagua kwa alama za vidole (biometrics)",
            "Subiri arifa kisha chukua pasipoti yako"
        ],
        tip: "Hakikisha jina lako kwenye fomu linafanana kabisa na NIDA ili kuepuka kuchelewa kwa maombi yako."
    },
    {
        title: "Jinsi ya Kuomba HESLB 2026/2027",
        category: "Education Applications",
        image: "images/blog/heslb-guide.jpg",
        excerpt: "Maelezo muhimu kwa ajili ya maombi ya mkopo wa HESLB. Usikose fursa hii ya elimu.",
        date: "Agosti 18, 2026",
        requirements: [
            "Namba ya NIDA",
            "Admission letter / confirmation ya chuo",
            "Fomu ya Mdhamini iliyothibitishwa",
            "Kitambulisho cha mdhamini",
            "Picha ya passport"
        ],
        steps: [
            "Fungua mfumo wa OLAS (olas.heslb.go.tz) na jisajili kwa akaunti mpya",
            "Jaza taarifa zako binafsi na za kifamilia",
            "Ongeza taarifa za chuo na kozi unayosoma",
            "Jaza taarifa za mdhamini na pakia nyaraka zinazohitajika",
            "Kagua maombi yako kisha uwasilishe kabla ya tarehe ya mwisho",
            "Fuatilia hali ya maombi yako mara kwa mara kwenye akaunti yako ya OLAS"
        ],
        tip: "Usisubiri siku za mwisho — mfumo hujaa watumiaji karibu na deadline na unaweza kukwama."
    },
    {
        title: "Jinsi ya Kupata Cheti cha Kuzaliwa",
        category: "RITA Services",
        image: "images/blog/cheti-guide.jpg",
        excerpt: "Hatua za kupata cheti cha kuzaliwa kwa haraka na urahisi kupitia mfumo wa RITA.",
        date: "Agosti 17, 2026",
        requirements: [
            "Taarifa ya kuzaliwa kutoka hospitali/kliniki",
            "Kitambulisho cha mzazi au mlezi",
            "Barua ya Mtaa (kama inahitajika)"
        ],
        steps: [
            "Kusanya taarifa za tukio la kuzaliwa (tarehe, mahali, wazazi)",
            "Fungua mfumo wa RITA (rita.go.tz) au tembelea ofisi ya RITA iliyo karibu",
            "Jaza fomu ya usajili wa kuzaliwa kwa taarifa sahihi",
            "Wasilisha nyaraka zinazohitajika kwa uhakiki",
            "Lipa ada inayotakiwa",
            "Chukua cheti chako baada ya kuthibitishwa"
        ],
        tip: "Usajili wa mapema (ndani ya siku 90 baada ya kuzaliwa) mara nyingi huwa haraka na rahisi zaidi."
    },
    {
        title: "Jinsi ya Kuomba Cheti cha Kifo",
        category: "RITA Services",
        image: "images/blog/cheti-kifo-guide.jpg",
        excerpt: "Mwongozo wa kuomba cheti cha kifo kwa njia sahihi na haraka.",
        date: "Agosti 16, 2026",
        requirements: [
            "Taarifa ya kifo kutoka hospitali au Mtendaji wa Mtaa/Kijiji",
            "Kitambulisho cha muombaji",
            "Uthibitisho wa uhusiano na marehemu"
        ],
        steps: [
            "Pata taarifa rasmi ya kifo kutoka hospitali au uongozi wa Mtaa",
            "Fungua mfumo wa RITA au fika ofisi ya RITA iliyo karibu nawe",
            "Jaza fomu ya usajili wa kifo",
            "Ambatanisha nyaraka zinazothibitisha tukio",
            "Lipa ada husika",
            "Pokea cheti baada ya uhakiki kukamilika"
        ],
        tip: "Vyeti vya kifo mara nyingi huhitajika kwa mirathi na masuala ya bima — hifadhi nakala salama."
    },
    {
        title: "RITA Verification: Jinsi Ya Kufanya",
        category: "RITA Services",
        image: "images/blog/rita-verification.jpg",
        excerpt: "Maelezo ya jinsi ya kufanya verification ya vyeti kupitia mfumo wa RITA.",
        date: "Agosti 15, 2026",
        requirements: [
            "Cheti halisi kinachohitaji uhakiki",
            "Kitambulisho cha muombaji",
            "Sababu ya uhakiki (mfano: kazi, masomo nje ya nchi)"
        ],
        steps: [
            "Peleka cheti chako kwa ofisi ya RITA au mfumo wao wa mtandaoni wa verification",
            "Jaza fomu ya maombi ya uhakiki",
            "Lipa ada ya huduma ya uhakiki",
            "RITA hukagua taarifa dhidi ya kumbukumbu zao za msingi",
            "Pokea cheti/barua ya uhakiki iliyosainiwa na kutiwa muhuri"
        ],
        tip: "Taasisi nyingi za kimataifa (kazi/masomo) huhitaji cheti kilichohakikiwa na RITA moja kwa moja, si nakala ya kawaida."
    },
    {
        title: "Makosa ya Kuepuka Wakati wa Online Applications",
        category: "Online Applications",
        image: "images/blog/mistakes-guide.jpg",
        excerpt: "Makosa ya kawaida yanayofanywa na watu wakati wa maombi ya mtandaoni na jinsi ya kuyakwepa.",
        date: "Agosti 14, 2026",
        requirements: [
            "Nyaraka zote muhimu ziwe tayari kabla ya kuanza",
            "Muunganisho mzuri wa intaneti",
            "Namba ya simu na email inayotumika kwa sasa"
        ],
        steps: [
            "Kutumia jina tofauti na lililopo kwenye NIDA au vyeti vingine",
            "Kupakia picha zisizo na ubora (giza, blurry, background isiyofaa)",
            "Kujaza namba za simu au email zisizo sahihi",
            "Kusubiri siku ya mwisho kuwasilisha maombi",
            "Kutohifadhi Control Number au namba ya kumbukumbu ya maombi",
            "Kutolipa ada kwa wakati baada ya kupata Control Number"
        ],
        tip: "Ukikwama popote, ni salama zaidi kuomba msaada mapema kuliko kurudia mchakato mzima tokea mwanzo."
    },
    {
        title: "Jinsi ya Kuomba AVN Number",
        category: "Online Applications",
        image: "images/blog/avn-guide.jpg",
        excerpt: "Maelezo mafupi ya AVN Number ni nini na jinsi ya kuipata bila usumbufu.",
        date: "Agosti 13, 2026",
        requirements: [
            "Namba ya NIDA",
            "Taarifa zako za kibinafsi ziwe sahihi na zinazofanana na NIDA"
        ],
        steps: [
            "Tuma taarifa zako kwetu (NIDA na majina kamili)",
            "Tunajaza maombi kwenye mfumo husika kwa niaba yako",
            "Unapata Control Number ya kiserikali ya TZS 15,000",
            "Unalipa Control Number hiyo pamoja na huduma yetu ya TZS 5,000 tu",
            "Tunakufuatilia hadi AVN Number yako ikamilike"
        ],
        tip: "Control Number (TZS 15,000) ni malipo ya kiserikali; malipo ya huduma yetu kwako ni TZS 5,000 tu — jumla ni TZS 20,000."
    },
    {
        title: "Huduma za Kidijitali Tunazotoa",
        category: "Digital Services",
        image: "images/blog/digital-guide.jpg",
        excerpt: "Kutoka website hadi graphics na matangazo — hivi ndivyo tunavyofanya kazi na wewe hatua kwa hatua.",
        date: "Agosti 12, 2026",
        requirements: [
            "Maelezo ya biashara au mradi wako",
            "Malengo yako (mfano: website, logo, matangazo, content)",
            "Mifano unayopenda, kama ipo"
        ],
        steps: [
            "Tueleze kupitia WhatsApp unachohitaji (website, logo, graphics, content au matangazo)",
            "Tunakupa makadirio ya gharama na muda wa kukamilisha",
            "Tunaanza kazi na tunakutumia maendeleo mara kwa mara",
            "Unapitia na kutoa maoni ya marekebisho",
            "Tunakukabidhi kazi ya mwisho iliyo tayari kutumika"
        ],
        tip: "Kadri unavyotupa maelezo mengi kuhusu biashara yako mwanzoni, ndivyo tunavyotengeneza kazi inayoendana zaidi na mahitaji yako."
    },
    {
        title: "Professional Support ni Nini?",
        category: "Professional Support",
        image: "images/blog/support-guide.jpg",
        excerpt: "Usipojua pa kuanzia na huduma yoyote kati ya hizi, hii ndiyo huduma inayokuongoza.",
        date: "Agosti 11, 2026",
        requirements: [
            "Eleza changamoto au swali lako kwa ufupi",
            "Nyaraka husika, kama zipo (si lazima kuanzia)"
        ],
        steps: [
            "Wasiliana nasi kueleza tatizo au lengo lako",
            "Tunakupa ushauri wa hatua sahihi za kufuata",
            "Tunakusaidia kutekeleza (kujaza fomu, kuwasiliana na taasisi husika, n.k.)",
            "Tunafuatilia hadi jambo lako likamilike"
        ],
        tip: "Huduma hii inafaa hasa kama huna uhakika ni huduma gani kati ya hizi zote inayokufaa — tutakuongoza."
    }
];

const blogCategoryIcons = {
    "Online Applications": "fa-globe",
    "Education Applications": "fa-graduation-cap",
    "RITA Services": "fa-certificate",
    "Digital Services": "fa-laptop-code",
    "Professional Support": "fa-hands-helping"
};

function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    blogPosts.forEach(function(post, index) {
        const card = document.createElement('div');
        card.className = 'blog-card';

        const icon = blogCategoryIcons[post.category] || 'fa-file-alt';
        // Image with a premium blue/white fallback if the real photo isn't available yet
        const imageHtml = '<img src="' + post.image + '" alt="' + post.title + '" ' +
            'onerror="this.parentElement.innerHTML=\'<div class=&quot;blog-placeholder&quot;><i class=&quot;fas ' + icon + '&quot;></i></div>\'">';

        card.innerHTML =
            imageHtml +
            '<div class="blog-card-content">' +
                '<span class="blog-category">' + post.category + '</span>' +
                '<h3>' + post.title + '</h3>' +
                '<p>' + post.excerpt + '</p>' +
                '<div class="blog-meta">' +
                    '<span><i class="far fa-calendar-alt"></i> ' + post.date + '</span>' +
                    '<button type="button" class="blog-link" data-post-index="' + index + '">Soma Zaidi →</button>' +
                '</div>' +
            '</div>';

        blogGrid.appendChild(card);
    });

    blogGrid.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-post-index]');
        if (btn) {
            openBlogModal(parseInt(btn.getAttribute('data-post-index'), 10));
        }
    });
}

// ========================================
// 8b. BLOG ARTICLE MODAL — "Soma Zaidi" detail view
// ========================================
function renderBlogModal(post) {
    const reqItems = (post.requirements || []).map(function(item) {
        return '<li><i class="fas fa-check-circle"></i>' + item + '</li>';
    }).join('');

    const stepItems = (post.steps || []).map(function(item) {
        return '<li>' + item + '</li>';
    }).join('');

    document.getElementById('blogModalCategory').textContent = post.category;
    document.getElementById('blogModalTitle').textContent = post.title;
    document.getElementById('blogModalBody').innerHTML =
        (reqItems ? '<div class="blog-modal-section-title"><i class="fas fa-folder-open"></i> Vitu Muhimu</div>' +
            '<ul class="blog-modal-list requirements">' + reqItems + '</ul>' : '') +
        (stepItems ? '<div class="blog-modal-section-title"><i class="fas fa-list-ol"></i> Hatua Kwa Hatua</div>' +
            '<ul class="blog-modal-list steps">' + stepItems + '</ul>' : '') +
        (post.tip ? '<div class="blog-modal-tip"><i class="fas fa-lightbulb"></i>' + post.tip + '</div>' : '') +
        '<div class="blog-modal-cta">' +
            '<a href="https://wa.me/255656278661?text=' + encodeURIComponent('Naomba msaada wa: ' + post.title) +
            '" target="_blank" rel="noopener" class="btn-primary" style="text-decoration:none;">' +
            '<i class="fab fa-whatsapp"></i> Tusaidie na Hii Huduma</a>' +
        '</div>';
}

function openBlogModal(index) {
    const post = blogPosts[index];
    if (!post) return;
    renderBlogModal(post);
    const overlay = document.getElementById('blogModalOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const overlay = document.getElementById('blogModalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('blogModalOverlay');
    const closeBtn = document.getElementById('blogModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeBlogModal);
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeBlogModal();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeBlogModal();
    });
});

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

// ========================================
// 21. SCROLL REVEAL — cards & sections animate in as you scroll
// ========================================
(function () {
    const revealSelectors = [
        '.section-header',
        '.service-card',
        '.portfolio-item',
        '.testimonial-card',
        '.faq-item',
        '.contact-card',
        '.apply-info-card',
        '.apply-form',
        '.blog-card',
        '.about-image-wrapper',
        '.about-text'
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(','));

    // Stagger items that sit inside the same grid/row
    const groupCounters = {};
    revealEls.forEach(function (el) {
        const parentKey = el.parentElement ? el.parentElement.className : 'root';
        groupCounters[parentKey] = (groupCounters[parentKey] || 0) + 1;
        const indexInGroup = groupCounters[parentKey] - 1;
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(indexInGroup * 90, 360) + 'ms';
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: no IntersectionObserver support, just show everything
        revealEls.forEach(function (el) {
            el.classList.add('reveal-visible');
        });
    }
})();

// ========================================
// 22. ANIMATED STAT COUNTERS (50+, 98%, 5+ in the hero)
// ========================================
(function () {
    const statEls = document.querySelectorAll('.stat-number');
    if (!statEls.length) return;

    function animateCount(el) {
        const raw = el.textContent.trim();
        const match = raw.match(/^(\d+)(.*)$/); // e.g. "50" + "+", "98" + "%"
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = match[2] || '';
        const duration = 1200;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target + suffix;
            }
        }
        requestAnimationFrame(tick);
    }

    let counted = false;
    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    statEls.forEach(animateCount);
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.4 });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }
})();