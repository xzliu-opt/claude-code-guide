// ==================== 导航栏功能 ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 汉堡菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // 汉堡图标动画
    hamburger.classList.toggle('active');
});

// 点击导航链接后关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== 导航栏滚动效果 ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        return;
    }

    if (currentScroll > lastScroll) {
        // 向下滚动 - 隐藏导航栏
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动 - 显示导航栏
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ==================== 回到顶部按钮 ====================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 滚动动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有需要动画的元素添加初始样式和观察
const animatedElements = document.querySelectorAll(
    '.research-card, .publication-item, .timeline-item, .stat-card, .achievement-item'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ==================== 打字效果（可选） ====================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // 页面加载后延迟启动打字效果
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// ==================== 表单提交处理 ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 这里可以添加实际的表单提交逻辑
        // 例如使用 FormSpree、EmailJS 或后端 API

        // 显示成功消息
        alert('感谢您的留言！我会尽快回复您。');
        contactForm.reset();
    });
}

// ==================== 活跃导航链接高亮 ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - navbar.offsetHeight - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== 添加活跃链接样式 ====================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ==================== 鼠标光标效果（可选） ====================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
});

// 在可点击元素上放大光标
const clickables = document.querySelectorAll('a, button, .research-card, .publication-item');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// ==================== 性能优化：防抖函数 ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 应用防抖到滚动事件
const debouncedScroll = debounce(() => {
    // 滚动相关的逻辑
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==================== 页面加载动画 ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 为 body 添加初始样式
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ==================== 深色模式切换（可选） ====================
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--shadow);
        font-size: 1.2rem;
        z-index: 999;
        transition: var(--transition);
    `;

    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');

        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// 取消注释以启用深色模式
// createDarkModeToggle();

console.log('🚀 个人网站加载完成！');
console.log('💡 提示：您可以自定义所有内容以符合您的个人信息。');
