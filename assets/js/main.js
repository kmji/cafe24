$(function(){
    var popSwiper = new Swiper(".popSwiper", {
        loop:true,
        autoplay:{
            delay:5000,
        },
        effect:'fade',
        pagination:{
            el:".pagination",
            clickable: true,
        }
    });

    $('.pop-close').click(function(){
        $('body').removeClass('pop');
    })

    //메뉴 노출
    $('.menu-wrap .menu-item').mouseenter(function(){
        $(this).children('.sub-list').addClass('active');
    })
    $('.menu-wrap .menu-item').mouseleave(function(){
        $(this).children('.sub-list').removeClass('active');
    })
    //모바일 메뉴 노출
    $('.mo-menu').click(function(){
        $('.menu-wrap').addClass('active');
    })
    $('.mo-menu-close').click(function(){
        $('.menu-wrap').removeClass('active');
    })
    $('.menu-wrap .menu-item').click(function(){
        $(this).children('.sub-list').toggleClass('active');
        $(this).toggleClass('active');
    })

    //언어선택
    $('.lang-btn').click(function(){
        $('.language-area').toggleClass('active');
    })

    const progressCircle = document.querySelector(".ui-pieChart svg");

    var visualSwiper = new Swiper(".visualSwiper", {
        slidesPerView: 1,
        effect:"fade",
        autoplay: {    
            delay: 3500, 
            disableOnInteraction: false,
        },
        loop:true,
        navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
        },
        on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            }
        }
    });

    //sc2
    var sc2Swiper = new Swiper(".sc2Swiper", {
        effect:"fade",
        autoplay: {    
            delay: 3500, 
            disableOnInteraction: false,
        },
        loop:true,
        pagination:{
            el:".pagination",
            clickable: true,
        }
        
    });

    //sc3
    var sc3Swiper = new Swiper(".sc3Swiper", {
        slidesPerView: "auto",
        spaceBetween: 200,
        centeredSlides: true,
        touchRatio: 0,
        pagination:{
            el: ".swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
        },
        on: {
            activeIndexChange : function() {
              if (this.realIndex == 0) {
                $('.sc3 .btn-prev .swiper-btn').css({"background-position":"-40px 0"});
                
              } else {
                $('.sc3 .btn-prev .swiper-btn').css({"background-position":"-120px 0"});
              }
              if (this.realIndex == 3) {
                $('.sc3 .btn-next .swiper-btn').css({"background-position":"0 0"});
                
              } else {
                $('.sc3 .btn-next .swiper-btn').css({"background-position":"-80px 0"});
              }
            }
        },
        breakpoints:{
            1300 : {
                spaceBetween : 208,
            },
            1024 : {
                spaceBetween : 40,
                initialSlide : 1,
            },
            767 : {
                slidesPerView: 1,
                
            },
            320 : {
            }
        }
    });


    //sc4
    gsap.to("#rect", {
        duration: 5, 
        repeat: 12,
        repeatDelay: 3,
        yoyo: true,
        ease: "power1.inOut",
        motionPath:{
            path: "#path",
            align: "#path",
            autoRotate: true,
            alignOrigin: [0.5, 0.9]
        }
    });

    //숫자 카운트
    function numberCounter(target_frame, target_number) {
        this.count = 0; this.diff = 0;
        this.target_count = parseInt(target_number);
        this.target_frame = document.getElementById(target_frame);
        this.timer = null;
        this.counter();
      };
      numberCounter.prototype.counter = function() {
        var self = this;
        this.diff = this.target_count - this.count;
         
        if(this.diff > 0) {
            self.count += Math.ceil(this.diff / 5);
        }
         
        this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
         
        if(this.count < this.target_count) {
            this.timer = setTimeout(function() { self.counter(); }, 20);
        } else {
            clearTimeout(this.timer);
        }
      };


    //스크롤
    let lastScroll = 0;
    let numberFlag = 0;
    let sc3Flag = 0;

    $(window).scroll(function(){
        curr=$(this).scrollTop();
        sc3 = $('.sc3').offset().top;
        sc4 = $('.sc4').offset().top;
        sc7 = $('.sc7').offset().top;
        ft = $('footer').offset().top;

        if(curr >= (sc3 - 150)){
            if(sc3Flag == 0){
                $('.sc3 .title').addClass('on');
                sc3Flag == 1;
            }
        }


        if(curr >= (sc4 - 150)){
            if(numberFlag == 0){
                $('.sc4 .inner').addClass('on');
               new numberCounter("num1", 7);
               new numberCounter("num2", 6200);
               new numberCounter("num3", 3000);

                numberFlag = 1;
            }
        } 
        
        //top버튼
        $('.quick').click(function(e){
            e.preventDefault();
            window.scrollTo({top:0,behavior:"smooth"})
        })
        if(curr == 0){
            $('.quick').removeClass('active');
        }
        else{
            $('.quick').addClass('active');
        }
        if(curr >= ft - window.innerHeight){
            $('.quick').addClass('fix');
        }
        else{
            $('.quick').removeClass('fix')
        }

        lastScroll = curr;
    })
    //sc6

    menuArr = ['통합관리' ,'상품관리' ,'주문관리' ,'재고관리' ,'업무효율' ,'쉬운입점' ,'해외배송' ,'카테고리']
    icoArr = ['all' ,'item' ,'order' ,'inventory' ,'work' ,'store' ,'overseas' ,'category']

    var sc6Slide = new Swiper(".sc6-slide", {
        effect:'fade',
        pagination: {
            el: ".sc6 .nav-pagination",
            clickable: true,
            renderBullet: function (index, className) {
            return `<span class="${className}"><i class="ico-${icoArr[index]}"></i>${menuArr[index]}</span>`;
            },
        },
    });
    var sc6ChildSlide = new Swiper(".child-slide", {
        nested: true,
        effect:'fade',
        pagination: {
            el: ".child-slide .child-pagination",
            clickable: true,
        },
    });

    //sc7
    document.querySelectorAll('.sc7 .right-wrap .sticky').forEach(element => {
        target = element.dataset.target;
        
        ScrollTrigger.create({
            trigger:element,
            start:"0% 50%",
            end:"100% -100%",
            // markers:true,
            toggleClass: {targets: `.left-wrap ${target}`, className: "active"}
        })

    });


    //sc8
    var sc8Swiper = new Swiper(".sc8Swiper", {
        effect:"fade",
        loop:true,
        pagination:{
            el:".pagination",
            clickable: true,
        }
    });

    //footer
    $('.family-btn').click(function(e){
        e.preventDefault();
        $(this).toggleClass('active');
    })
})