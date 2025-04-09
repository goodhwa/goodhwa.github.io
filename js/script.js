<<<<<<< HEAD
const mainVisual = document.querySelector('.index-header');
let lastScrollY = 0;

const cursor = document.querySelector('.cursor');
const titleList = document.querySelectorAll('.title');
const articleList = document.querySelectorAll('section article');

const colorTheme = document.querySelector('.btn-mode');
const themeIcon = document.querySelector('.btn-mode i');
const btnTop = document.querySelector('.btn-top');
const btnClose = document.querySelector('.page-close');

window.addEventListener('scroll', function(){
    let currentScrollY = window.scrollY;
    (lastScrollY > currentScrollY) || (currentScrollY < 100) ? mainVisual?.classList.add('active') : mainVisual?.classList.remove('active');
    (currentScrollY > 50) ? mainVisual?.classList.add('active') : mainVisual?.classList.remove('active');
    (currentScrollY > window.innerHeight) ? btnTop.classList.add('active') : btnTop.classList.remove('active');
    
    lastScrollY = currentScrollY;
});

document.documentElement.setAttribute('color-theme','light');
colorTheme?.addEventListener('click', (e)=> {
    let mode = document.documentElement.getAttribute('color-theme');
    if(mode === 'light') {
        document.documentElement.setAttribute('color-theme','dark');
        themeIcon.className = 'xi-night';
    } else {
        document.documentElement.setAttribute('color-theme','light');
        themeIcon.className = 'xi-sun-o';
    } 
});

btnTop.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
    //document.querySelector('header').scrollIntoView({behavior:'smooth'});
});

window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    cursor.setAttribute('data-fromTop', cursor.offsetTop - scrollY);
});
window.addEventListener('scroll', (e) => {
    const fromTop = cursor.getAttribute('data-fromTop');
    cursor.style.top = scrollY + parseInt(fromTop) +'px';    
});
window.addEventListener('mouseover', (e)=> {
    if(e.target.closest('a') || e.target.closest('button')) {
        cursor.classList.add('cursor-grow');
    } else {
        cursor.classList.remove('cursor-grow');
    }
});

//각 요소 애니메이션 효과
const options = {
    root : null,
    rootMargin:'0px',
    threshold: .12,
}
const observer = new IntersectionObserver((entires, observer) => {
    entires.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); 
        }        
    });
}, options);

titleList.forEach(el => observer.observe(el));
articleList.forEach(el => observer.observe(el));

btnClose?.addEventListener('click', function(){
    window.location.href = 'index.html';
=======
const mainVisual = document.querySelector('.index-header');
let lastScrollY = 0;

const cursor = document.querySelector('.cursor');
const titleList = document.querySelectorAll('.title');
const articleList = document.querySelectorAll('section article');

const colorTheme = document.querySelector('.btn-mode');
const themeIcon = document.querySelector('.btn-mode i');
const btnTop = document.querySelector('.btn-top');
const btnClose = document.querySelector('.page-close');

window.addEventListener('scroll', function(){
    let currentScrollY = window.scrollY;
    (lastScrollY > currentScrollY) || (currentScrollY < 100) ? mainVisual?.classList.add('active') : mainVisual?.classList.remove('active');
    (currentScrollY > 50) ? mainVisual?.classList.add('active') : mainVisual?.classList.remove('active');
    (currentScrollY > window.innerHeight) ? btnTop.classList.add('active') : btnTop.classList.remove('active');
    
    lastScrollY = currentScrollY;
});

document.documentElement.setAttribute('color-theme','light');
colorTheme?.addEventListener('click', (e)=> {
    let mode = document.documentElement.getAttribute('color-theme');
    if(mode === 'light') {
        document.documentElement.setAttribute('color-theme','dark');
        themeIcon.className = 'xi-night';
    } else {
        document.documentElement.setAttribute('color-theme','light');
        themeIcon.className = 'xi-sun-o';
    } 
});

btnTop.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
    //document.querySelector('header').scrollIntoView({behavior:'smooth'});
});

window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    cursor.setAttribute('data-fromTop', cursor.offsetTop - scrollY);
});
window.addEventListener('scroll', (e) => {
    const fromTop = cursor.getAttribute('data-fromTop');
    cursor.style.top = scrollY + parseInt(fromTop) +'px';    
});
window.addEventListener('mouseover', (e)=> {
    if(e.target.closest('a') || e.target.closest('button')) {
        cursor.classList.add('cursor-grow');
    } else {
        cursor.classList.remove('cursor-grow');
    }
});

//각 요소 애니메이션 효과
const options = {
    root : null,
    rootMargin:'0px',
    threshold: .12,
}
const observer = new IntersectionObserver((entires, observer) => {
    entires.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); 
        }        
    });
}, options);

titleList.forEach(el => observer.observe(el));
articleList.forEach(el => observer.observe(el));

btnClose?.addEventListener('click', function(){
    window.location.href = 'index.html';
>>>>>>> 35f2448 (추가)
});