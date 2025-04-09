
(() =>{
    const vh = window.innerHeight * 0.01; //모바일 vh이슈
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const container = document.body;
    const btnMenu = document.querySelector('.btn-menu');
    const leftMenu = document.querySelector('.lnb');
    const lnbClose = document.querySelector('.lnb .btn-back');
    const gnb = document.querySelector('.menu');

    const cardList = document.querySelector('.card-list');
    const cardMenuGroup = document.querySelectorAll('.card-more-menu');
    const btnHeartGroup = document.querySelectorAll('.btn-like ul');

    const dropDownGroup = document.querySelectorAll('.dropdown');
    const btnReset = document.querySelector('.btn-reset');
    const search = document.querySelector('.search-box');
    const board = document.querySelector('.board-list');
    const fileBox = document.querySelector('.fileBox'); 
    const accordion = document.querySelector('.accordion');
    let imgUploadWrap = document.querySelector('.file-input-wrap');
    let selected = null;
    let prevTab = null;

    container.addEventListener('click', function(e){
        let target = e.target;
        let dropdown = target.closest('.dropdown');
        let cardPostDetail = target.closest('.performe-pop');
        let cardReviewDetail = target.closest('.review-pop');
        let cardHappyDetail = target.closest('.detail-pop');

        if(target.classList.contains('btn-close')) { //팝업 닫기
            const popup = target.closest('.popup');
            popup.style.display = 'none';
        } 

        if(target.classList.contains('reset')) {  //비밀번호 보이기,숨기기
            let pwd = target.parentNode.querySelector('input');
            pwd.type = (pwd.type === 'password') ? 'text' : 'password';
            target.classList.toggle('visible');
        } 

        if(target.classList.contains('btn-card-more')) {  //카드 더보기메뉴
            let target = e.target.closest('.btn-more');
            target.querySelector('.card-more-menu').classList.toggle('show');
        } else if(cardList) {
            cardMenuGroup.forEach(item => {
                item.classList.remove('show');
            });
        }
        if(target.classList.contains('btn-heart')) {  //카드 공감버튼
            let target = e.target.closest('.btn-like');
            target.querySelector('ul').classList.toggle('show');
        } else if(cardList) {
            btnHeartGroup.forEach(item => {
                item.classList.remove('show');
            });
        }

        if(!cardPostDetail && document.querySelector('.performe-pop')) { //행복수행 카드상세
            document.querySelector('.performe-pop').closest('.popup').style.display = 'none';
        }
        
        if(!cardReviewDetail && document.querySelector('.review-pop')) { //오늘수업후기 카드상세
            document.querySelector('.review-pop').closest('.popup').style.display = 'none';
        }
        
        if(!cardHappyDetail && document.querySelector('.detail-pop')) { //참여 >  카드상세
            document.querySelector('.detail-pop').closest('.popup').style.display = 'none';
        }
        
        if(dropdown && !dropdown.classList.contains('disable')) {   //드롭다운
            e.preventDefault();
            dropdown.classList.toggle('show');
        } else if(!dropdown) {
            dropDownGroup.forEach(item => {
                item.classList.remove('show');
            });
        }
        if(target.classList.contains('option')) {  //드롭다운리스트
            let currentSelect = dropdown.querySelector('.placeholder');
            currentSelect.textContent = target.textContent;
            currentSelect.classList.add('active');
            dropdown.querySelector('.dropdown-list li.select')?.classList.remove('select');
            target.classList.add('select');
        }

        if(target.classList.contains('tab-btn')) { //탭
            const currentTab = target.dataset.tab;
            const tabGroup = target.closest('section');
            showTab(currentTab, tabGroup);
            prevTab =  currentTab;
        }
    });

    function showTab(tab, group) {
        const currentTab = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
        if(tab == 'all') {   //검색결과 & 자주묻는 질문 전체탭일때
            group.querySelectorAll('.tab-content').forEach(item => {
                item.classList.add('active');
                item.querySelector('hr')?.classList.add('active'); //검색결과 게시판별 구분선 표시
            });
        } else {
            group?.querySelectorAll('.tab-content').forEach(item => {
                item.classList.remove('active');
                group.querySelector('hr')?.classList.remove('active');
            });            
        }
        if(group) { //group 한페이지에 탭이 1개 이상일 경우 
            group.querySelector('.tab-title li.active')?.classList.remove('active');
            group.querySelector('.tab-content.active')?.classList.remove('active');
        } else {
            document.querySelector('.tab-title li.active').classList.remove('active');
            document.querySelector('.tab-content.active').classList.remove('active');
        }
        currentTab.classList.add('active');
        document.querySelector(`#${tab}`)?.classList.add('active');
        document.querySelector(`#${tab} hr`)?.classList.remove('active');  
    }

    function slideUpDown(target) {
        if(selected && selected !== target){
            selected.classList.remove('active');
        }
        target.classList.toggle('active');
        selected = target;
    }
    
    imgUploadWrap?.addEventListener('change', function(e) {  //연습(실천)에 이미지 첨부
        let targetBox = e.target.closest('.file-input');
        if(e.target.files.length > 0) {
            let imgSrc = URL.createObjectURL(e.target.files[0]);
            let addImage = document.createElement('div');
            addImage.classList.add('add-image');
            addImage.style = 'background-image: url('+imgSrc+')';
            targetBox.appendChild(addImage);
            targetBox.classList.add('show');
            //targetBox.querySelector('.btn-del').style.display = 'block';
        }
    });

    fileBox?.addEventListener('change', function(e){   //일대일문의 첨부파일
        document.querySelector('.file-name').innerText = e.target.files[0].name;
        document.querySelector('.file-dp').classList.add('active');
    });

    btnMenu?.addEventListener('click', function(){  //햄버거메뉴
        leftMenu?.classList.add('active');
    });
    lnbClose?.addEventListener('click', function(){
        leftMenu?.classList.remove('active');
    });
    gnb?.addEventListener('click', (e) => {  
        let target = e.target.closest('li');
        slideUpDown(target);
    });

    btnReset?.addEventListener('click', function(){  //검색창 텍스트 지움
        this.style.display = 'none';
        this.parentNode.querySelector('input').value = '';
    });
    search?.addEventListener('keydown', function(){
        btnReset.style.display = 'block';
    });

    board?.addEventListener('click', function(e){
        let target = e.target.closest('dl');
        slideUpDown(target);
    });
    
    accordion?.addEventListener('click', (e) => {  //진행자진행관리 아코디언
        let target = e.target.closest('.card-title');
        target.closest('dl').classList.toggle('active');
    });

    const attendPwdInput = document.querySelector('.pwd-input-group'); //진행자격교육 출석비밀번호 입력
    attendPwdInput?.addEventListener('input', function(e){
        // if(e.target != "INPUT") {console.log('input not'); }
        e.target.classList.add('on');
        if(e.target.value == '') {e.target.classList.remove('on');}
    });


    /****** 슬라이드들 ******/
    let emotionSwiper = new Swiper(".emotion-slide", {  //감정아이콘 팝업 슬라이드
        spaceBetween:10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //오늘의수업후기 베스트 & history & 소식 & 메인 수업후기 슬라이드
    let bestSwiper = new Swiper(".best-slide", {
        loop:true,  
        spaceBetween:40,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //행복수행 슬라이드
    let practiceSwiper = new Swiper(".practice-slide", {
        spaceBetween:40,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
    });

    let graphSwiper = new Swiper(".graph-slide", { //메인 그래프 슬라이드
        loop:true,  
        spaceBetween:40,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //카드상세팝업에 슬라이드
    let cardPopSwiper = new Swiper(".cardpop-slide", {
        slidesPerView: 2,
        spaceBetween:10,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    let myBannSwiper = new Swiper(".my-bann", {  //마이페이지 & 행복특강 배너 슬라이드
        spaceBetween:10,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    let mainBannSwiper = new Swiper(".main-bann", {  //메인 배너 슬라이드
        spaceBetween:10,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    let tabSwiper = new Swiper(".tabNav", { //신청하기 탭 슬라이드1
        slidesPerView: "auto",
        slideToClickedSlide:true,
        //allowTouchMove: false,
        //mousewheel:true,
        //slidesOffsetBefore:20,
        slidesOffsetAfter:40,
        //centeredSlides: true,
    });

    let tabSwiper2 = new Swiper(".tabNav2", { //신청하기 탭 슬라이드2
        slidesPerView: "auto",
        slideToClickedSlide: true,
        slidesOffsetAfter:40,
    });

    let tabSwiper3 = new Swiper(".tabNavLine", { //라인 들어간 탭 슬라이드
        slidesPerView: "auto",
        slideToClickedSlide: true,
        //centeredSlides: true,
        //slidesOffsetBefore:20,
        //slidesOffsetAfter:-20,
    });
    let mindSwiper = new Swiper(".mind-slide", { //참여 행복연습&행복실천 마음표현
        loop:true, 
        direction: "vertical",
        slidesPerView: 3,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        }, 
    });

    let exerciseThumbs = new Swiper(".exercise-thumbs", {  // 참여 행복연습&행복실천 행복연습
        direction: "vertical",
        slideToClickedSlide: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    let exerciseSwiper = new Swiper(".exercise-slide", { 
        direction: "horizontal",
        spaceBetween: 10,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false
        },
        thumbs: {
            swiper: exerciseThumbs
        }
    });

    let mainSwiper = new Swiper(".main-slide", {  //메인 비주얼 슬라이드
        loop:true,
        spaceBetween: 30,
        autoplay: {
            delay:4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    let sw = 0;
    const btnPause = document.querySelector('.main-slide .btn-pause');
    btnPause?.addEventListener('click', function(){
        if(sw == 0) {
            btnPause.classList.add('active');
            mainSwiper.autoplay.stop();
            sw = 1;
        } else {
            btnPause.classList.remove('active');
            mainSwiper.autoplay.start();
            sw = 0;
        }
    });    

    let talkImgSwiper = new Swiper(".talk-img", {  // 메인에 진행자참가자이야기 슬라이드
        centeredSlides: true,
        //spaceBetween: 10,
        slideToClickedSlide: true,
        slidesPerView: 5,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
    let talkSwiper = new Swiper(".talk-slide", { 
        //spaceBetween: 15,
    });
    talkSwiper.controller.control = talkImgSwiper;
    talkImgSwiper.controller.control = talkSwiper;

    let videoThumb = new Swiper(".video-thumbs", { //메인 유튜브 슬라이드
        spaceBetween:10,
        slidesPerView: 2.15,
        freeMode: true,
        watchSlidesProgress: true,
        scrollbar : {
            el: ".swiper-scrollbar",
            draggable:true,
        },
    });
    let videoSwiper = new Swiper(".video-slide", {
        spaceBetween:20,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        thumbs: {
            swiper: videoThumb,
        },
    });

    let alarmSwiper = new Swiper(".main-alarm", { //메인 알림 슬라이드
        loop:true,
        direction: "vertical",
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
    });

    let myclassSwiper = new Swiper(".main-myclass", { //메인 내교실 슬라이드 
        spaceBetween:-30,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
    });

    //메인 오늘 하루 그만보기 팝업 슬라이드
    let mainPopSwiper = new Swiper(".main-pop-slide", {
        loop:true,  
        spaceBetween:40,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    const mainPop = document.querySelector('.main-pop');
    function setCookie(name, value, expireDays) {
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expireDays);
        document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';'
        console.log('cookie', document.cookie)
    }
    function getCookie() {
        let cookieData = document.cookie;
        if(cookieData.indexOf('todayCookie=done') < 0) {
            document.querySelector('.main-pop').style.display = 'block';
        } else {
            document.querySelector('.main-pop').style.display = 'none';
        }
    }
    mainPop?.addEventListener('click', function(e) {
        let target = e.target;
        if(target.classList.contains('btn-today-close')) {
            this.style.display = 'none';
        }
        if(target.classList.contains('btn-today')) {
            setCookie('todayCookie', 'done', 1);
            getCookie();
        }
    });

    
    //메인 유튜브 버튼 커스텀이 안되서 섬네일 이미지로
    const youtubeSlide = document.querySelector('.video-slide > .swiper-wrapper');
    youtubeSlide?.addEventListener('click', function(e) {
        let target = e.target.closest('.video-container');
        target.querySelector('figure').classList.add('hide');
        target.querySelector('iframe').src += '?autoplay=1';
        //자동재생 안됨...?
    });
    
    //참여 공동수행에 현재 동참 % 표시
    const progressBar = document.querySelector('.progress-bar');
    let currentPercentage = progressBar?.dataset.bar; 
    if(progressBar) {
        progressBar.style.width = currentPercentage + '%';
        progressBar.querySelector('em').textContent = currentPercentage;
    }

    // 마이페이지 행복수행에 명상시간 표시
    const markBox = document.querySelector('.mark');
    const circleTimeBar = document.querySelector('.circle-time-wrap .time-bar');
    const timeValue = document.querySelector('.circle-time-wrap .time-input input');
    const timeBtnSet = document.querySelector('.circle-time-wrap .btn-mark');
    
    let RADIUS = 95;
    let CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    
    function timeDisplay(time) {
        let per = 0;
        let currentTimeNumber = 0;
        let timeBtnPos = 0;
        if(time > 0 && time < 6 ) {
            per = 0.1 * time / 2 + 0.05;
        } else if(time > 9) { 
            per = (time / 100 ) + 0.3;
        }        
        let dashoffset = CIRCUMFERENCE * (1 - per);
        timeValue.value = time;
        circleTimeBar.style.strokeDashoffset = dashoffset;
        currentTimeNumber = Math.floor(per * 10 + 1);
        timeBtnPos = (currentTimeNumber - 1) * 36 + 1;
        markBox.querySelector('.number.active')?.classList.remove('active');
        markBox.querySelector(`.number:nth-child(${currentTimeNumber})`)?.classList.add('active');
        timeBtnSet.style.transform = `rotate(${timeBtnPos}deg)`; //끝에 하트
        timeBtnSet.querySelector('span').style.transform = `rotate(-${timeBtnPos}deg)`;
    }
    timeValue?.addEventListener('change', function(e){
        if(e.target.value > 61) return;
        timeDisplay(e.target.value);
    });
    if(markBox) {
        timeDisplay(1); //명상시간 초기값 1분
    }

    //메인 원형그래프 슬라이드
    function graphInit() {
        let graphGroupBox = document.querySelector('.happy-graph .graph-slide .swiper-slide-active');
        const progressCircle = graphGroupBox.querySelector('.circle-time');
        const circleProgressBar = graphGroupBox.querySelector('.time-bar');
        const circleBarBg = graphGroupBox.querySelector('.bar-bg');
        const circleBarEnd = graphGroupBox.querySelector('.circle-inner');
        const counter = graphGroupBox.querySelector('.counter');
        let currentNum = counter?.querySelector('.current').dataset.target;
        let targetNum = counter?.querySelector('.target').dataset.target;
        circleProgress(currentNum, targetNum, circleProgressBar, circleBarBg, circleBarEnd);
    }
    function circleProgress(currentNum, targetNum, circleProgressBar, circleBarBg, circleBarEnd) {
        let per = currentNum / targetNum;
        let progress = 1 - per;
        let dashoffset = 330 * progress;
        let circleEndPos = -102 + (20 * per * 10) + 2 * (per * 10 / 5) ;        
        let keyframes= [
            {strokeDashoffset : 330},
            {strokeDashoffset : dashoffset},
        ];
        let rotatekeyframes = [
            {transform : 'rotate(-105deg)'},
            {transform : `rotate(${circleEndPos}deg)`},
        ];
        let keyframeOptions = {
            duration:4500,
            easing:'linear',
            fill:'forwards'
        };
        circleProgressBar.animate(keyframes, keyframeOptions);
        circleBarBg.animate(keyframes, keyframeOptions);
        circleBarEnd.animate(rotatekeyframes, keyframeOptions);
        circleProgressBar.style.strokeDashoffset = dashoffset;
        circleBarBg.style.strokeDashoffset = dashoffset;
        circleBarEnd.style.transform = `rotate(${circleEndPos}deg)`;
    }
    graphSwiper.on('slideChangeTransitionEnd', function(){
        graphInit();
    }); 
    if(document.querySelector('.graph-slide')) {
        graphInit();
    }

 
    /****** 인터랙션 효과 ******/

    const counters = document.querySelectorAll('.counter-up');  //숫자 카운팅 효과
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                //counter.classList.add('visible');
                const target = +counter.dataset.target;
                let count = 0;
                const increment = target / 100;

                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = formatNumber(Math.ceil(count));
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = formatNumber(target);
                        observer.unobserve(counter);
                    }
                };
                requestAnimationFrame(updateCounter);
            }
        });
    }, { threshold: 0.5 });
    function formatNumber(number) {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber;
    }
    counters.forEach(counter => countObserver.observe(counter));


    const aniItem = document.querySelectorAll('.ani');  //애니메이션 효과
    const options = {
        root : null,
        rootMargin:'0px',
        threshold: .6,
    }
    const observer = new IntersectionObserver((entires, observer) => {
        entires.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); 
            }        
        });
    }, options);
    aniItem.forEach(el => observer.observe(el));

})()
