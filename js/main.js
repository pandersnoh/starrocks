// 검색창 기능 제어
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
const memberMenu = document.querySelector('menu');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() { // input 요소에 마우스 포커스 되면 실행
  memberMenu.classList.add('hidden');
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function() { // input 요소에 마우스 포커스 해제하면 실행
  memberMenu.classList.remove('hidden');
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
  searchInputEl.value = '';
});

// 스크롤 시 우측 뱃지 제어
const headerEl = document.querySelector('header');
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function() {
  console.log(window.pageYOffset);
  if(window.pageYOffset > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, 0.5, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기
    gsap.to(toTopEl, 0.2, {
      x: 1
    }); 


  } else {
    // 배지 보이기
    gsap.to(badgeEl, 0.5, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x: 100
    });
  }
  if(window.scrollY > 140) { // header 메뉴 배경색 반투명처리
    headerEl.classList.add('header-fix');
    gsap.to(headerEl, 0.5, {
      backgroundColor: 'rgba(246, 245, 240, 0.7)'
    });
  } else {
    headerEl.classList.remove('header-fix');
    gsap.to(headerEl, 0.5, {
      backgroundColor: 'rgba(246, 245, 240, 1)'
    });    
  }
}, 300)); 
// 화면 스크롤 시 0.3초 단위로 부하를 줘서 함수가 과도하게 실행되는 것을 막아줌
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function(){
  gsap.to(window, 0.7, {
    scrollTo: 0
  });
});

// Visual 애니메이션 제어
const fadeEls = document.querySelectorAll('.visual .fade-in');

for(let i=0; i<fadeEls.length; i++) {
  gsap.to(fadeEls[i], 1, {
    delay: (i + 1) * 0.7, // 0.7초, 1.4초, 2.1초, 2.8초 뒤에 순차적으로 재생
    opacity: 1
  });
}


// 공지사항 swiper
// new Swiper (선택자, 옵션)
const noticeEl = new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
  delay: 1200
});

// 프로모션 배너 swiper
const promotionSlideEl = new Swiper('.promotion .swiper-container', {
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true,
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 5000 // 기본값: 3000 (3초)
  },
  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

const awardSlideEl = new Swiper('.awards .swiper-container', {
  slidesPerView: 5,
  spaceBetween: 30,
  direction: 'horizontal',
  autoplay: true,
  loop: true,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }  
});

// 프로모션 버튼 토글
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion; // 반대의 값으로 반환함 (true)
  if(isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
    promotionToggleBtn.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');    
    promotionToggleBtn.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to (요소, 시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1,
    yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생하는 속성
    ease: Power1.easeInOut,
    delay: random(0, delay) // 애니메이션 몇초 뒤에 실행하겠다는 지연시간을 지정하는 것
  });
}
floatingObject('.floating1', 1, 15); // 요소, 딜레이, 위아래로 움직이는 범위
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

// 스크롤 매직 (스크롤 위치 계산 애니메이션)
const spyEls = document.querySelectorAll('section.scroll-spy');

Array.prototype.forEach.call(spyEls, function(spyEl) {
  new ScrollMagic
  .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: 0.8, // 뷰포트 상에서 스크롤매직이 실행될 스크롤 위치
  })
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller());
});

// 카피라이트 연도 처리 (올해 연도 표기)
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); 