$(function () {

    // 스크롤 위치에 따라 헤더에 클래스 'on' 토글 (예: 배경색 변경)
    $(window).on('scroll', function () {
        const sct = $(window).scrollTop();
        if (sct > 0) {
            $('.Header').addClass('on');
        } else {
            $('.Header').removeClass('on');
        }
    });

    // 메인 슬라이드 초기화 (Swiper)
    const MainSlide = new Swiper('.main_slide', {
        loop: true,                // 무한 반복
        parallax: true,            // 패럴랙스 효과 활성화
        speed: 1600,               // 슬라이드 전환 속도 (ms)
        autoplay: {                // 자동 재생 설정
            delay: 2500,           // 슬라이드 간 간격 (ms)
            disableOnInteraction: false, // 사용자가 조작해도 자동 재생 유지
        },
        on: {
            slideChangeTransitionStart: function () {
                // 슬라이드가 바뀌기 시작할 때 현재 슬라이드 인덱스 기준으로
                // 하단 점(dot) UI에 'on' 클래스 토글
                $('.MainVisual .dots li')
                    .eq(this.realIndex)
                    .addClass('on')
                    .siblings()
                    .removeClass('on');
            }
        }
    });

    // 메인 슬라이드 좌우 화살표 클릭 이벤트
    $('.MainVisual .arrows .left').on('click', function () {
        MainSlide.slidePrev(); // 이전 슬라이드로 이동
    });
    $('.MainVisual .arrows .right').on('click', function () {
        MainSlide.slideNext(); // 다음 슬라이드로 이동
    });

    // 메인 슬라이드 하단 점(dot) 클릭 시 해당 슬라이드로 이동
    $('.MainVisual .dots li').on('click', function () {
        const idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        MainSlide.slideTo(idx);
    });

    // 아이템 슬라이드 초기화 (Swiper)
    const ItmSlide = new Swiper('.itm_slide', {
        loop: true,            // 무한 반복
        slidesPerView: 1,      // 한 화면에 보여줄 슬라이드 개수
        spaceBetween: 0,       // 슬라이드 간 간격 (px)
        speed: 900,            // 슬라이드 전환 속도 (ms)
        autoplay: {            // 자동 재생 설정
            delay: 4000,       // 슬라이드 간 간격 (ms)
            disableOnInteraction: false,
        },
        breakpoints: {         // 반응형 설정 (화면 너비에 따라 달라짐)
            768: {
                slidesPerView: 2,
                spaceBetween: 400,
            }
        }
    });

    // 아이템 슬라이드 좌우 화살표 클릭 이벤트
    $('.MainItm .arrows a.left').on('click', function (e) {
        e.preventDefault(); // a 태그 기본 이동 막기
        ItmSlide.slidePrev(); // 이전 슬라이드로 이동
    });

    $('.MainItm .arrows a.right').on('click', function (e) {
        e.preventDefault();
        ItmSlide.slideNext(); // 다음 슬라이드로 이동
    });

    // 모바일 메뉴 버튼 클릭 시 메뉴 토글
    $('.mobile_btn').on('click', function () {
        $(this).toggleClass('on'); // 버튼 활성화 상태 토글
        $('.Gnb').toggleClass('on'); // 메뉴 표시 토글
    });

    // 모바일 메뉴 서브 메뉴 열기 (아코디언 효과)
    $('.Gnb>ul>li>a').on('click', function (e) {
        e.preventDefault();          // 링크 기본 기능 막기
        $(this).next().stop().slideDown(); // 서브 메뉴 열기
        $(this).parent().siblings().find('.snb').stop().slideUp(); // 다른 서브 메뉴 닫기
    });

    // 창 크기 변경 시 서브 메뉴 인라인 스타일 제거 (초기화)
    $(window).on('resize', function () {
        $('.Gnb .snb').removeAttr('style');
    });

});