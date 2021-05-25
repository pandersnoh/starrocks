// 검색창 기능 제어
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() { // input 요소에 마우스 포커스 되면 실행
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function() { // input 요소에 마우스 포커스 해제하면 실행
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
  searchInputEl.value = '';
});

const headerEl = document.querySelector('header');
window.addEventListener('scroll', _.throttle(function() {
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


// 카피라이트 연도 처리 (올해 연도 표기)
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); 