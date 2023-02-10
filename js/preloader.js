// <<<<<===== PRELOADER ON FIRST PAGE VISIT =====>>>>>
document.addEventListener('DOMContentLoaded', () => {
    // loadPreloader();
    
    let preloader = getCookie('preloader');
    if (preloader == '' || preloader == null) {
        loadPreloader();

        setCookie('preloader', 'true', 2);
    }
    else {
        hidePreloader();
    }
})

function loadPreloader() {
    let preloaderAnimation = lottie.loadAnimation({
        container: document.getElementById('preloader'),
        path: '/files/preloader/preloader1(orange).json',
        renderer: 'svg',
        loop: false,
        autoplay: true,
        name: 'preloader',
    })
    let wrapper = document.querySelector('.preloader-wrapper');

    document.body.style.paddingRight = getScrollWidth() + 'px';   // set padding-right for body to avoid window shift
    wrapper.style.paddingRight = getScrollWidth() + 'px';         // set padding-right for preloare to avoid window shift

    preloaderAnimation.addEventListener("complete", () => {     // when preloader animation is complete
        wrapper.classList.add('bg-color-fade');                 // then hide preloader 
        document.body.classList.remove('body-hidden');          // then reveal scrollbar
        document.body.style.paddingRight = '0';                   // and remove padding-right from body
        wrapper.style.paddingRight = '0';                       // and remove padding-right from preloader
    })
}

function hidePreloader() {
    const wrapper = document.querySelector('.preloader-wrapper');
    if( wrapper ) {
        wrapper.style.backgroundColor = '#ffffff';
        wrapper.style.transition = 'none';
        wrapper.classList.add('bg-color-fade');
        document.body.classList.remove('body-hidden');
    }
}

function getScrollWidth() {
    let _divCreate = document.createElement('div');
    let scrollWidth = 0;

    _divCreate.style.overflowY = 'scroll';
    _divCreate.style.width = '50px';
    _divCreate.style.height = '50px';
    _divCreate.style.visibility = 'hidden';
    document.body.appendChild(_divCreate);

    scrollWidth = _divCreate.offsetWidth - _divCreate.clientWidth;
    document.body.removeChild(_divCreate);
    return scrollWidth;
}


// <<<<<===== SAVE PRELOADER TO THE COOKIES =====>>>>>
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // 
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
  
function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

// function deleteCookie(cname) {   
//     document.cookie = cname + '=; Max-Age=-99999999;';  
// }
  
// function checkCookie() {
//     let preloader = getCookie('preloader');
//     if (preloader != '') {
//         // alert("Welcome again " + preloader);
//     } 
//     else {
//         if (preloader != '' && preloader != null) {
//             setCookie('preloader', preloader, 2);
//         }
//     }
// }