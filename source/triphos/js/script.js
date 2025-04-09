const header = document.querySelector('#header');
const menuAll = document.querySelector('.btn-menuall');
const menuGnb = document.querySelector('.gnb');
const subMenu = document.querySelector('#sub-menu');
const mainVisual = document.querySelector('.main-visual');
const subVisual = document.querySelector('.sub-visual');
const subVisualList = document.querySelectorAll('.sub-visual');
let lastScrollY = 0;

const yearBtn = document.querySelector('.year');
const yearList = document.querySelectorAll('.year button');
const historyList = document.querySelectorAll('.history-section');
let selectedYear = document.querySelectorAll('.year button')[0];
let selectedGroup = document.querySelectorAll('.history-section')[0];

const cursor = document.querySelector('.cursor');
const titleList = document.querySelectorAll('.title');
const subTitleList = document.querySelectorAll('.sub-title');
const articleList = document.querySelectorAll('section article');
const tabTitle = document.querySelector('.tab-title');
let selectedTab = document.querySelectorAll('.tab-title > *')[0];

const btnTop = document.querySelector('.btn-top');
const siList = document.querySelector('.si .case-wrap');
const btnClose = document.querySelector('.popup .btn-close');
const popUp = document.querySelector('.popup-wrap');


menuAll.addEventListener('click', function(){  
    this.classList.toggle('active');
    header.classList.toggle('sitemap');
});

window.addEventListener('scroll', function(){
    let currentScrollY = window.scrollY;
    const fromTop = cursor.getAttribute('data-fromTop');

    cursor.style.top = scrollY + parseInt(fromTop) +'px';

    if((lastScrollY > currentScrollY) || (currentScrollY < 100)) {
        header.classList.add('active');
        subMenu && subMenu.classList.add('active');
        mainVisual && mainVisual.classList.add('active');
    } else {
        header.classList.remove('active');
        subMenu && subMenu.classList.remove('active');
        mainVisual && mainVisual.classList.remove('active');
        subVisual && subVisual.classList.add('active');
    }
    if(currentScrollY > 50) {
        mainVisual && mainVisual.classList.add('active');
        subVisual && subVisual.classList.add('active')
    } else {
        mainVisual && mainVisual.classList.remove('active');
        subVisual && subVisual.classList.remove('active');
    }
    currentScrollY > window.innerHeight ? btnTop.classList.add('active') : btnTop.classList.remove('active');
    lastScrollY = currentScrollY;
});
window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    cursor.setAttribute('data-fromTop', cursor.offsetTop - scrollY);
});
window.addEventListener('mouseover', (e)=> {
    if(e.target.closest('a') || e.target.closest('button')) {
        cursor.classList.add('cursor-grow');
    } else {
        cursor.classList.remove('cursor-grow');
    }
});


//메인 이미지 슬라이드
let swiper = new Swiper(".visualSwiper", {
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});
//메인 고객사
let clientList = new Swiper(".clientSwiper", {
    autoplay: {
        delay: 0,        
        disableOnInteraction:false,
    },
    slidesPerView:'auto',
    speed:20000,
    loop:true,
    loopAdditionalSlides:1,
});


btnTop.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
});


yearBtn && yearBtn.addEventListener('click', function(e){    
    let currentYear = e.target.dataset.group;
    
    selectedYear.classList.remove('active');    
    e.target.classList.add('active');
    
    document.querySelector(`#${currentYear}`).scrollIntoView({behavior:'smooth'});
    
    selectedGroup.classList.remove('active');
    document.querySelector(`#${currentYear}`).classList.add('active');

    selectedYear = e.target;
    selectedGroup = document.querySelector(`#${currentYear}`);
});

tabTitle && tabTitle.addEventListener('click', function(e){
    let currentID = e.target.dataset.tab;
    let selectedID = selectedTab.dataset.tab;

    selectedTab.classList.remove('active');
    e.target.classList.add('active');
    document.querySelector(`#${selectedID}`).classList.remove('active');
    document.querySelector(`#${currentID}`).classList.add('active');

    selectedTab = e.target;
});

siList && siList.addEventListener('click', function(e){
    if(e.target.closest('article')) {
        popUp.classList.add('active');
    }
});

btnClose && btnClose.addEventListener('click', function(){ 
    if(this.closest('.popup-wrap')) {
        this.closest('.popup-wrap').classList.remove('active');
    }
});


const options = {
    root : null,
    rootMargin:'0px',
    threshold: .5,
}
const history = new IntersectionObserver(entires => {
    entires.forEach(entry => {
        if(entry.isIntersecting) {
            const groupID = entry.target.id;
            yearList.forEach(button => {
                if(button.getAttribute('data-group') === groupID) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
    });
}, options);
const observer = new IntersectionObserver((entires, observer) => {
    entires.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); 
        }        
    });
}, options);

historyList.forEach(el => history.observe(el));
titleList.forEach(el => observer.observe(el));
subTitleList.forEach(el => observer.observe(el));
articleList.forEach(el => observer.observe(el));
