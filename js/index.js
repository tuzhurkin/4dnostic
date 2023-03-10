// <====================================================== Add Transitions
document.addEventListener('DOMContentLoaded', () => {
    setTimeout( () => { 
        document.body.classList.add('show-body');
    }, 500);

    if( document.querySelector('#color-calendar') ) {
        new Calendar({
            id: '#color-calendar',
            primaryColor: '#FF6600',
            weekdayDisplayType: 'short',
            monthDisplayType: 'short',
        });
    }
    
    // gsap.registerPlugin(ScrollTrigger);
})


// <====================================================== INLINE SVG
// > check if [data-inline-svg] contains *.svg source file
inlineSvgTypeCheck();

function inlineSvgTypeCheck() {
    const inlineSvgs = document.querySelectorAll('[data-inline-svg]');
    inlineSvgs.forEach( el => {
        if( !el.src.endsWith('.svg') ) {
            el.removeAttribute('data-inline-svg');
        }
    })
}

inlineSVG.init({ 
    svgSelector: '[data-inline-svg]', // the class attached to all images that should be inlined 
    initClass: 'js-inlinesvg', // class added to <html> 
}
// , function () { 
//     console.log('All SVGs inlined'); 
// }
);


// <====================================================== NATIVE SMOOTH SCROLLING
anchorSmoothScrolling();

function anchorSmoothScrolling() {
    let linkAnchors = document.querySelectorAll('[href^="#"]');

    for (let i = 0; i < linkAnchors.length; i++) {
        linkAnchors[i].addEventListener('click', function (e) {
            e.preventDefault();

            let scrollPage = window.pageYOffset,  // current scroll page
                hash = this.hash.replace('/^#/', '');
            if (!hash.length) return;
            let block = document.querySelector(hash);  // id block
            if (block === '' || block === null) return; // if not exist return
            let elTopScreen = block.getBoundingClientRect().top;  // position offset id

            animate({
                duration: 1500,
                timing(t) {
                    return 1 + (--t) * t * t * t * t;
                },
                draw(currentTime) {
                    let progress = scrollPage + elTopScreen * currentTime;
                    window.scrollTo(0, progress);
                }
            });
        });
    }
}

function animate({duration, timing, draw}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        let progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}


// <====================================================== CUSTOM SCROLLBAR SCROLLBOT
let customScrollArray = [];

let seoScrollBox = document.querySelectorAll('[data-scroll-box="seo"]');
let descrScrollBox = document.querySelectorAll('[data-scroll-box="descr"]');
let article1ScrollBox = document.querySelectorAll('[data-scroll-box="article-1"]');
let article2ScrollBox = document.querySelectorAll('[data-scroll-box="article-2"]');

if( seoScrollBox.length ) {
    let customScroll_seo = new Scrollbot('[data-scroll-box="seo"]', 3); // 2
    customScrollArray.push(customScroll_seo);
}
if( descrScrollBox.length ) {
    let customScroll_descr = new Scrollbot('[data-scroll-box="descr"]', 3); // 2
    customScrollArray.push(customScroll_descr);
}
if( article1ScrollBox.length ) {
    let customScroll_article1 = new Scrollbot('[data-scroll-box="article-1"]', 3); // 1
    customScrollArray.push(customScroll_article1);
}
if( article2ScrollBox.length ) {
    let customScroll_article2 = new Scrollbot('[data-scroll-box="article-2"]', 3); // 1
    customScrollArray.push(customScroll_article2);
}

customScrollArray.forEach( customScroll => {
    customScroll.setStyle({
            'background': '#FF6600',
            'border-radius': '8px',
            "z-index":"2"
            // 'width': '3px'
        },
        {
            "background":"rgba(0,0,0,0)"
            // 'background': '#B5B5B5',
            // 'width': '1px'
    })
    let pseudoScroll = document.createElement("div");
    pseudoScroll.style.cssText = "height:100%;width:1px;left:1.5px;background:#B5B5B5;position:absolute;z-index:1";
    customScroll.scrollBarHolder.appendChild(pseudoScroll);
})


// <====================================================== LANG SELECT ACTIVE
const langSelects = document.querySelectorAll('.lang-select');
langSelects.forEach( select => {
    langSelectActive(select);
})

function langSelectActive(select) {
    // const select = document.querySelector('.lang-select');
    if( ! select ) return;

    const selected = select.querySelector('.lang-select__selected');
    const optionsContainer = select.querySelector('.lang-select__options-container');
    const optionsWrapper = select.querySelector('.lang-select__options-wrapper');
    const optionsList = select.querySelectorAll('.lang-select__option');
    //
    let tempOption = null;

    selected.addEventListener('click', () => {
        if (optionsContainer.clientHeight) {
            optionsContainer.style.height = 0;
        } 
        else {
            optionsContainer.style.height = optionsWrapper.clientHeight + 'px';
        }
        select.classList.toggle('active');
    });

    optionsList.forEach(option => {
        option.addEventListener('click', () => {
            //
            tempOption = selected.innerHTML;
            selected.innerHTML = option.querySelector('.lang-select__item').innerHTML;
            option.querySelector('.lang-select__item').innerHTML = tempOption;
            //
            optionsContainer.style.height = 0;
            select.classList.remove('active');
        })
    })
    
    // close select if clicked outside of it
    window.addEventListener('click', (e) => {
        if ( e.target.closest('.lang-select') ) return;

        optionsContainer.style.height = 0;
        select.classList.remove('active');
    })

    //
    // close lang-select if header hides
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => { 
        if( header.classList.contains('header-hide') ) {
            optionsContainer.style.height = 0;
            select.classList.remove('active');
        }
    })
}


// <====================================================== TEL SELECT ACTIVE
const telSelects = document.querySelectorAll('.tel-select');
telSelects.forEach( select => {
    telSelectActive(select);
})

function telSelectActive(select) {
    if( ! select ) return;

    const selected = select.querySelector('.tel-select__selected');
    const optionsContainer = select.querySelector('.tel-select__options-container');
    const optionsWrapper = select.querySelector('.tel-select__options-wrapper');
    const optionsList = select.querySelectorAll('.tel-select__option');
    //
    let tempOption = null;

    selected.addEventListener('click', () => {
        if (optionsContainer.clientHeight) {
            optionsContainer.style.height = 0;
        } 
        else {
            optionsContainer.style.height = optionsWrapper.clientHeight + 'px';
        }
        select.classList.toggle('active');
    });

    optionsList.forEach(option => {
        option.addEventListener('click', () => {
            //
            tempOption = selected.innerHTML;
            selected.innerHTML = option.querySelector('.tel-select__item').innerHTML;
            option.querySelector('.tel-select__item').innerHTML = tempOption;
            //
            optionsContainer.style.height = 0;
            select.classList.remove('active');
        })
    })
    
    // close select if clicked outside of it
    window.addEventListener('click', (e) => {
        if ( e.target.closest('.tel-select') ) return;

        optionsContainer.style.height = 0;
        select.classList.remove('active');
    })

    //
    // close tel-select if header hides
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => { 
        if( header.classList.contains('header-hide') ) {
            optionsContainer.style.height = 0;
            select.classList.remove('active');
        }
    })
}


// <====================================================== BURGER MENU ACTIVE
burgerMenuActive();

function burgerMenuActive() {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');

    if( !burger ) return;

    burger.addEventListener('click', () => {
        document.body.classList.toggle('body-hidden');

        if( ! menu.classList.contains('menu-active') ) {
            document.body.classList.add('body-hidden');
            document.body.style.paddingRight = getScrollWidth() + 'px';
            header.style.paddingRight = getScrollWidth() + 'px';
            menu.style.paddingRight = getScrollWidth() + 'px';
        }
        else {
            document.body.classList.remove('body-hidden');
            document.body.style.paddingRight = 0;
            header.style.paddingRight = 0;
            menu.style.paddingRight = 0;
        }

        menu.classList.toggle('menu-active');
        burger.classList.toggle('burger-active');
        header.classList.toggle('menu-active');
    })
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


// <====================================================== FLOATING HEADER
headerActive();

function headerActive() {
    const header = document.querySelector('.header');
    const headerHeight = 88;
    const mobHeaderHeight = 72;
    let prevPos, curPos = 0;
    if( !header ) return;

    window.addEventListener('scroll', () => {
        prevPos = curPos;
        curPos = scrollY;

        if ( scrollY > 0 ) {
            if( scrollY > window.innerHeight ) {
                header.classList.add('header-float');
            }

            // if we scroll up
            if ( curPos <= prevPos ) {
                if ( scrollY > 0 ) {
                    header.classList.remove('header-hide');
                }
                // scrollRange.forEach( range => {
                //     if( scrollY > range.top && scrollY < range.bottom ) {
                //         header.classList.add('header-hide');
                //     }
                // })
            }
            // if we scroll down
            else {
                if ( scrollY > headerHeight / 5 ) {
                    header.classList.add('header-hide');
                }
            }
        }
        // when we scroll to the very top
        else {
            header.classList.remove('header-hide');
            header.classList.remove('header-float');
        }
    })
}


// <====================================================== ROTATING CARD ACTIVE ON EVENTS (INSTEAD OF CSS HOVER)
const pCards = document.querySelectorAll('.p-card');

if( pCards.length ) {
    cardRotateActive(pCards);
}
window.addEventListener('resize', () => {
    if( pCards.length ) {
        cardRotateActive(pCards);
    }
})

function cardRotateActive(cards) {
    // if( window.matchMedia('(hover: hover) and (pointer: fine)').matches ) {
    //     cards.forEach( card => {
    //         card.addEventListener('mouseenter', () => {
    //             card.classList.add('active');
    //         })
    //         card.addEventListener('mouseleave', () => {
    //             card.classList.remove('active');
    //         })
    //     })
    // }
    // else {
    if( ! window.matchMedia('(hover: hover) and (pointer: fine)').matches ) {
        cards.forEach( card => {
            const forwardRotateBtn = card.querySelector('[data-card-rotate="forward"]');
            const backRotateBtn = card.querySelector('[data-card-rotate="back"]');

            if( forwardRotateBtn ) {
                forwardRotateBtn.addEventListener('click', () => {
                    card.classList.add('active');
                })
            }
            if( backRotateBtn ) {
                backRotateBtn.addEventListener('click', () => {
                    card.classList.remove('active');
                })
            }
        })
    }
    else {
        cards.forEach( card => {
            card.classList.remove('active');
        })
    }
}


// <====================================================== REVEAL ON SCROLL [GSAP SCROLLTRIGGER]
setTimeout(() => {
    revealOnScrollTrigger('[data-reveal]');
}, 1000);

function revealOnScrollTrigger(target) {
    const reveals = document.querySelectorAll(target);

    gsap.registerPlugin(ScrollTrigger);

    reveals.forEach( reveal => {
        ScrollTrigger.create({
            trigger: reveal,
            toggleClass: 'reveal-active',
            start: 'top bottom',
            once: true,
        })
    })
}


// <====================================================== CUT CONTAINER ANIMATION
cutContainerAnimation();

function cutContainerAnimation() {
    const cutContainer = document.querySelector('.cut-container');
    if( !cutContainer ) return;

    gsap.registerPlugin(ScrollTrigger);

    const titlesEl = cutContainer.querySelectorAll('.cut-container__title');
    const titles = [...titlesEl];
    const oddTitles = titles.filter(function(element, index, array) {
        return (index % 2 === 0);
    });
    const evenTitles = titles.filter(function(element, index, array) {
        return (index % 2 === 1);
    });

    oddTitles.forEach( title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                scrub: true,
                start: "top 100%",
                end: "top 0%",
                // markers: true
            },
            translateX: "-20%", // "-25%", // "-50%",
            transformOrigin: "center", 
            ease: "none",
        })
    })
    evenTitles.forEach( title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                scrub: true,
                start: "top 100%",
                end: "top 0%",
                // markers: true
            },
            translateX: "20%", // "25%", // "50%",
            transformOrigin: "center", 
            ease: "none",
        })
    })
}


// <====================================================== CALENDAR PICKER ACTIVE
// calendarPickerActive();

// function calendarPickerActive() {
    
// }


// <====================================================== RATING ACTIVE [.reviews-container]
const ratings = document.querySelectorAll('.rating:not([data-form-rating])');
if( ratings.length ) {
    ratings.forEach( rating => {
        ratingActive(rating);
    })
}

function ratingActive(rating) {
    const sum = parseFloat( rating.querySelector('.rating__sum').innerHTML );
    const stars = rating.querySelectorAll('.rating__star');

    // reset stars
    stars.forEach( star => {
        star.innerHTML = 
                `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00001 0.775635L7.80001 4.40139L11.4 4.8546L8.92801 7.64643L9.60001 11.6529L6.00001 9.84001L2.40001 11.6529L3.07801 7.64643L0.600006 4.8546L4.20001 4.40139L6.00001 0.775635Z" fill="transparent" stroke="#FF6600"/>
                </svg>`;
    });

    // update stars
    stars.forEach( (star, i) => {
        if( (i + 1) <= Math.ceil(sum) ) {
            if( sum - i < 1 ) {
                star.innerHTML = 
                `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                    <linearGradient id="grad${(sum - i) * 100}">
                        <stop offset="${(sum - i) * 100}%" stop-color="#FF6600"/>
                        <stop offset="${100 - (sum - i) * 100}%" stop-color="transparent"/>
                    </linearGradient>
                    </defs>
                    <path d="M6.00001 0.775635L7.80001 4.40139L11.4 4.8546L8.92801 7.64643L9.60001 11.6529L6.00001 9.84001L2.40001 11.6529L3.07801 7.64643L0.600006 4.8546L4.20001 4.40139L6.00001 0.775635Z" stroke="#FF6600" fill="url(#grad${(sum - i) * 100})"/>
                </svg>`;
            }
            else {
                star.innerHTML = 
                `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                    <linearGradient id="grad">
                        <stop offset="100%" stop-color="#FF6600"/>
                        <stop offset="0%" stop-color="transparent"/>
                    </linearGradient>
                    </defs>
                    <path d="M6.00001 0.775635L7.80001 4.40139L11.4 4.8546L8.92801 7.64643L9.60001 11.6529L6.00001 9.84001L2.40001 11.6529L3.07801 7.64643L0.600006 4.8546L4.20001 4.40139L6.00001 0.775635Z" stroke="#FF6600" fill="url(#grad)"/>
                </svg>`;
            }
        }
    });
}


// <====================================================== RATING COUNT [data-popup-target="write"]
ratingCount();

function ratingCount() {
    const rating = document.querySelector('[data-form-rating]');
    if( !rating ) return;

    const value = rating.querySelector('[data-form-rating-value]');
    const stars = rating.querySelectorAll('.rating__star');

    // default state
    value.innerHTML = stars.length;
    stars.forEach( star => {
        star.classList.add('active');
    })

    stars.forEach( (star, i) => {
        star.addEventListener('click', () => {
            for( let j = 0; j <= i; j++ ) {
                stars[j].classList.add('active');
            }
            for( let j = stars.length - 1; j > i; j-- ) {
                stars[j].classList.remove('active');
            }

            value.innerHTML = i + 1;
            // console.log(`rating: ${i + 1}`);//
        })
    })
}



// <====================================================== EXPAND SHOW MORE BUTTON
expandShowMore();

function expandShowMore() {
    const expandBtns = document.querySelectorAll('[data-expand-button]');

    expandBtns.forEach( expandBtn => {
        expandBtn.addEventListener('click', () => {
            const expandName = expandBtn.dataset.expandButton;
            const expandTarget = document.querySelector(`[data-expand-target="${expandName}"]`);
            const expandChildren = expandTarget.children;

            for(let el of expandChildren) {
                el.classList.add('show-block');
            }
            expandBtn.classList.add('hide-block');
        })
    })
}


// <====================================================== SELECT
const selectCheckup = document.querySelector('.checkup-select');
const selectDate = document.querySelector('.date-select');
const selectTime = document.querySelector('.time-select');

if(selectCheckup) {
    selectActive(selectCheckup);
}
if(selectDate) {
    selectActive(selectDate);
}
if(selectTime) {
    selectActive(selectTime);
}

function selectActive(select) {
    const allSelects = document.querySelectorAll('.select');

    const selected = select.querySelector('.select__selected');
    const optionsContainer = select.querySelector('.select__options-container');
    const optionsWrapper = select.querySelector('.select__options-wrapper');
    // const optionsList = select.querySelectorAll('.select__option');
    const optionsList = select.querySelectorAll('.select__option:not(.disabled)');

    selected.addEventListener('click', () => {
        // check if this select was clicked before
        // in order to close all another selects when open the current one
        if( ! selected.closest('.select').classList.contains('thisSelect') ) {
            allSelects.forEach( anotherSelect => {
                if( anotherSelect.classList.contains('thisSelect') ) {
                    anotherSelect.classList.remove('thisSelect');

                    anotherSelect.querySelector('.select__options-container').style.height = 0;
                    //
                    anotherSelect.classList.remove('select-active');
                }
            })
        }
        selected.closest('.select').classList.add('thisSelect');
        //

        if (optionsContainer.clientHeight) {
            optionsContainer.style.height = 0;
        } 
        else {
            optionsContainer.style.height = optionsWrapper.clientHeight + 'px';
        }
        select.classList.toggle('select-active');
    });

    optionsList.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = option.innerHTML;
            optionsContainer.style.height = 0;
            //
            select.classList.remove('select-active');
        })
    })
    
    // close select if clicked outside of it
    window.addEventListener('click', (e) => {
        if ( e.target.closest('.select') ) return;

        optionsContainer.style.height = 0;
        //
        select.classList.remove('select-active');
    })
}


// <====================================================== DROPDOWN
dropdownActive();

function dropdownActive() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach( dropdown => {
        let showBtn = dropdown.querySelector('.dropdown__header');
        let content = dropdown.querySelector('.dropdown__content');
        let contentWrapper = dropdown.querySelector('.dropdown__wrapper');

        showBtn.addEventListener('click', () => {
            // check if this dropdown was clicked before
            // in order to close all another dropdowns when the current one is opened
            if( ! dropdown.classList.contains('thisDropdown') ) {
                dropdowns.forEach( anotherDropdown => {
                    if( anotherDropdown.classList.contains('thisDropdown') ) {
                        anotherDropdown.classList.remove('thisDropdown');
                        anotherDropdown.querySelector('.dropdown__content').style.height = 0;
                        anotherDropdown.classList.remove('dropdown-active');
                    }
                })
            }
            dropdown.classList.add('thisDropdown');
            //

            if (content.clientHeight) {
                content.style.height = 0;
                dropdown.classList.remove('dropdown-active');
            } 
            else {
                content.style.height = contentWrapper.clientHeight + 'px';
                dropdown.classList.add('dropdown-active');
            }
        })
    })
}

constructorDropdownActive();

function constructorDropdownActive() {
    const dropdowns = document.querySelectorAll('.c-dropdown');

    dropdowns.forEach( dropdown => {
        let showBtn = dropdown.querySelector('.c-dropdown__header');
        let content = dropdown.querySelector('.c-dropdown__content');
        let contentWrapper = dropdown.querySelector('.c-dropdown__wrapper');

        showBtn.addEventListener('click', () => {
            // check if this dropdown was clicked before
            // in order to close all another dropdowns when the current one is opened
            if( ! dropdown.classList.contains('thisDropdown') ) {
                dropdowns.forEach( anotherDropdown => {
                    if( anotherDropdown.classList.contains('thisDropdown') ) {
                        anotherDropdown.classList.remove('thisDropdown');
                        anotherDropdown.querySelector('.c-dropdown__content').style.height = 0;
                        anotherDropdown.classList.remove('c-dropdown-active');
                    }
                })
            }
            dropdown.classList.add('thisDropdown');
            //

            if (content.clientHeight) {
                content.style.height = 0;
                dropdown.classList.remove('c-dropdown-active');
            } 
            else {
                content.style.height = contentWrapper.clientHeight + 'px';
                dropdown.classList.add('c-dropdown-active');
            }
        })
    })
}


// <====================================================== CONSTRUCTOR CART WORKFLOW
let cartItemsData = [];

// > function that adds item to cart by click on the add button and updates the total price
addButtonClicked();

function addButtonClicked() {
    const addBtns = document.querySelectorAll('[data-add]');
    if( !addBtns.length ) return;

    addBtns.forEach( btn => {
        btn.addEventListener('click', () => {
            const constructorItem = btn.closest('[data-item-id]');
            let item = {};

            item.id = constructorItem.dataset.itemId;
            // check if item is in group
            if( constructorItem.closest('[data-items-group]') ) {
                item.title = constructorItem.closest('[data-items-group]').querySelector('[data-items-group-title]').innerHTML + ': ' + constructorItem.querySelector('[data-item-title]').innerHTML;
            }
            else {
                item.title = constructorItem.querySelector('[data-item-title]').innerHTML;
            }
            item.price = constructorItem.querySelector('[data-item-price]').innerHTML;

            // if item is not in the js 'database', add it there
            if ( !cartItemsData.some( el => el.id == item.id ) ) {
                cartItemsData.push(item);
                addCartItem(item);
                updateTotalPrice();
            }
            else {
                alert('Item is already in the cart!');
            }
        })
    })
}

// > add item to the cart
function addCartItem(item) {
    const cart = document.querySelector('[data-cart]');
    if( !cart ) return;
    const cartContent = cart.querySelector('.cart__content');

    let cartItem = document.createElement('div');
    cartItem.classList.add('cart__item');
    const cartItemContent = 
        `<div class="cart-item" data-cart-item-id="${item.id}">
            <h3 class="cart-item__title" data-cart-item-title>${item.title}</h3>
            <div class="cart-item__price">
                <span data-cart-item-price>${item.price}</span>
                <span>$</span>
            </div>
            <div class="cart-item__button" data-remove>
                <img src="/img/svg/cart-item-cross.svg" alt="">
            </div>
        </div>`;
    cartItem.innerHTML = cartItemContent;
    cartContent.append(cartItem);
    
    if( cart.querySelectorAll('[data-cart-item-id]').length ) {
        cart.classList.add('active');
    }

    removeCartItem();
}

// > function that removes item from cart by click on the remove button and updates the total price
// removeCartItem();

function removeCartItem() {
    const cart = document.querySelector('[data-cart]');
    const popupCart = document.querySelector('[data-popup-cart]');
    const removeBtns = document.querySelectorAll('[data-remove]');
    if( !cart || !popupCart || !removeBtns.length ) return;

    removeBtns.forEach( btn => {
        btn.addEventListener('click', () => {
            const cartItem = btn.closest('[data-cart-item-id]');

            // if we removed it from the popup's cart, then remove it from basic cart too
            if( cartItem.closest('[data-popup-cart]')) {
                const itemToDelete = cart.querySelector(`[data-cart-item-id="${cartItem.dataset.cartItemId}"]`);
                itemToDelete.parentElement.remove();
            }
            cartItem.parentElement.remove();
            
            // remove from the js 'database'
            cartItemsData = cartItemsData.filter( el => el.id !== cartItem.dataset.cartItemId );

            updateTotalPrice();

            // if cart is empty, hide 'order' button
            if( !cart.querySelectorAll('[data-cart-item-id]').length ) {
                cart.classList.remove('active');
            }
        })
    })
}

// > function that counts total price at the very start if it exists
function updateTotalPrice() {
    const cart = document.querySelector('[data-cart]');
    const popupCart = document.querySelector('[data-popup-cart]');
    if( !cart || !popupCart ) return;

    const cartItems = cart.querySelectorAll('[data-cart-item-id]');
    const cartTotalPrice = cart.querySelector('[data-cart-total-price]');
    const popupCartTotalPrice = popupCart.querySelector('[data-cart-total-price]');
    if( !cartTotalPrice ) return;

    let totalPrice = 0;

    cartItems.forEach( item => {
        const itemPrice = item.querySelector('[data-cart-item-price]').innerHTML;
        totalPrice = Math.round( (parseFloat(totalPrice) + parseFloat(itemPrice)) * 100 ) / 100;
    })
    
    // update price in popup-cart too, if it exists (= if we removed item from popup-cart)
    cartTotalPrice.innerHTML = totalPrice;
    if( popupCartTotalPrice ) {
        popupCartTotalPrice.innerHTML = totalPrice;
    }
}

// > function that copies the cart from constructor to popup
popupCartActive();

function popupCartActive() {
    const cart = document.querySelector('[data-cart]');
    const popupCart = document.querySelector('[data-popup-cart]');
    if( !cart || !popupCart ) return;

    const orderBtn = document.querySelector('[data-popup-button="order"]');
    orderBtn.addEventListener('click', () => {
        popupCart.innerHTML = cart.innerHTML;

        removeCartItem();
    })
}


// <====================================================== TOGGLE STORAGE ON HOVER
menuBgHoverActive();

function menuBgHoverActive() {
    const menuBgBtns = document.querySelectorAll('[data-menu-bg-button]');
    const menuBgTargets = document.querySelectorAll('[data-menu-bg-target]');

    if( !menuBgBtns.length || !menuBgTargets.length ) return;
    
    menuBgBtns.forEach( btn => {
        btn.addEventListener('mouseenter', () => {
            let btnName = btn.dataset.menuBgButton;
            let activeTarget = document.querySelector(`[data-menu-bg-target="${btnName}"]`);
            
            menuBgTargets.forEach( target => {
                if( target.classList.contains('show-up') ) {
                    target.classList.remove('show-up');
                }
            })
            
            menuBgBtns.forEach( anotherBtn => {
                if( anotherBtn.classList.contains('active') ) {
                    anotherBtn.classList.remove('active');
                }
            })

            activeTarget.classList.add('show-up');
            btn.classList.add('active');
        })
        btn.addEventListener('mouseleave', () => {
            menuBgTargets.forEach( target => {
                if( target.classList.contains('show-up') ) {
                    target.classList.remove('show-up');
                }
            })
            
            menuBgBtns.forEach( anotherBtn => {
                if( anotherBtn.classList.contains('active') ) {
                    anotherBtn.classList.remove('active');
                }
            })
        })
    })
}


// <====================================================== TOGGLE STORAGE BLOCKS
const locationBtns = document.querySelectorAll('[data-location-button]');
const locationTargets = document.querySelectorAll('[data-location-target]');

const doctorBtns = document.querySelectorAll('[data-doctors-slider-button]');
const doctorTargets = document.querySelectorAll('[data-doctors-slider-target]');

const docBtns = document.querySelectorAll('[data-doctors-button]');
const docTargets = document.querySelectorAll('[data-doctors-target]');

const blogBtns = document.querySelectorAll('[data-blog-button]');
const blogTargets = document.querySelectorAll('[data-blog-target]');

const checkupGenderBtns = document.querySelectorAll('[data-checkup-gender-button]');
const checkupGenderTargets = document.querySelectorAll('[data-checkup-gender-target]');

const constructorGenderBtns = document.querySelectorAll('[data-constructor-gender-button]');
const constructorGenderTargets = document.querySelectorAll('[data-constructor-gender-target]');

if( locationBtns.length || locationTargets.length ) {
    toggleStorage(locationBtns, locationTargets);
}

if( doctorBtns.length || doctorTargets.length ) {
    toggleStorage(doctorBtns, doctorTargets);
}

if( docBtns.length || docTargets.length ) {
    toggleStorage(docBtns, docTargets);
}

if( blogBtns.length || blogTargets.length ) {
    toggleStorage(blogBtns, blogTargets);
}

if( checkupGenderBtns.length || checkupGenderTargets.length ) {
    toggleStorage(checkupGenderBtns, checkupGenderTargets);
}

if( constructorGenderBtns.length || constructorGenderTargets.length ) {
    toggleStorage(constructorGenderBtns, constructorGenderTargets);
}

function toggleStorage(btns, targets) {
    let buttonDatasetName = btns[0].attributes[1].name;
    let targetDatasetName = targets[0].attributes[1].name;
    
    btns.forEach( btn => {
        btn.addEventListener('click', () => {
            let btnName = btn.getAttribute(buttonDatasetName);
            let activeTarget = document.querySelector(`[${targetDatasetName}="${btnName}"]`);
            
            if( activeTarget ) {
                targets.forEach( target => {
                    if( target.classList.contains('show-block') ) {
                        target.classList.remove('show-block');
                    }
                })
                activeTarget.classList.add('show-block');
            }

            btns.forEach( anotherBtn => {
                if( anotherBtn.classList.contains('active') ) {
                    anotherBtn.classList.remove('active');
                }
            })
            btn.classList.add('active');
        })
    })
}


// <====================================================== REVIEW POPUP ACTIVE
reviewPopupActive();

function reviewPopupActive() {
    const reviewPopupBtns = document.querySelectorAll('[data-popup-button="review"]');
    const reviewPopupTarget = document.querySelector('[data-popup-target="review"]');
    if( !reviewPopupBtns.length || !reviewPopupTarget ) return;

    const popupTitle = reviewPopupTarget.querySelector('[data-review-target="title"]');
    const popupDate = reviewPopupTarget.querySelector('[data-review-target="date"]');
    const popupRating = reviewPopupTarget.querySelector('[data-review-target="rating"]');
    const popupDescription = reviewPopupTarget.querySelector('[data-review-target="description"]');

    const popupRatingToUpdate = reviewPopupTarget.querySelector('.rating');

    reviewPopupBtns.forEach( btn => {
        btn.addEventListener('click', () => {            
            const review = btn.closest('[data-review]');

            const reviewTitle = review.querySelector('[data-review-button="title"]');
            const reviewDate = review.querySelector('[data-review-button="date"]');
            const reviewRating = review.querySelector('[data-review-button="rating"]');
            const reviewDescription = review.querySelector('[data-review-button="description"]');

            popupTitle.innerHTML = reviewTitle.innerHTML;
            popupDate.innerHTML = reviewDate.innerHTML;
            popupRating.innerHTML = reviewRating.innerHTML;
            popupDescription.innerHTML = reviewDescription.innerHTML;

            // update rating's star-box
            ratingActive(popupRatingToUpdate);
        })
    })
}

// <====================================================== PLAY VIDEO
videoWorkflow();

// poster frame click event
function videoWorkflow() {
    const videoPlayBtns = document.querySelectorAll('[data-video-play-button]');

    videoPlayBtns.forEach( btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let wrapper = e.target.closest('.video');
            videoPlay(wrapper);
        })
    })
}

// play the targeted video (and hide the poster frame)
function videoPlay(wrapper) {
    let iframe = wrapper.querySelector('.video__video');
    let caption = wrapper.querySelector('.video__caption');
    let src = iframe.dataset.videoSrc;
    // hide poster
    caption.classList.add('hide-video-caption');
    // add iframe src in, starting the video
    iframe.setAttribute('src', src);
}


// <====================================================== POPUP VIDEO
popupVideoActive();

function popupVideoActive() {
    let popupBtns = document.querySelectorAll('[data-popup-button="video"]');
    let popup = document.querySelector('[data-popup-target="video"]');
    
    popupBtns.forEach( btn => {
        btn.addEventListener('click', () => {
            let video = btn.closest('[data-video-button]');
            let videoSrc = video.innerHTML;
            let popupSrc = popup.querySelector('[data-video-target]');
            popupSrc.innerHTML = videoSrc;
            //
            // replace [data-popup-button="video"] with [data-video-play-button]
            let playBtn = popupSrc.querySelector('[data-popup-button="video"]');
            playBtn.removeAttribute('data-popup-button');
            playBtn.setAttribute('data-video-play-button', '');

            videoWorkflow();
        })
    })

}

function stopPopupVideo(videoWrapper) {
    let video = videoWrapper.querySelector('.video__video');
    video.src = ''; // videoSrc;
}


// <====================================================== SLIDERS INIT
const headTitleSlider = new Swiper('.head-title-slider', {
    direction: 'vertical', // 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,

    grabCursor: true,
    simulateTouch: true,
    touchRatio: 1,
    speed: 1500,
    centeredSlides: true,
    // loop: true,

    breakpoints: {
        320: {
            direction: 'horizontal'
        },
        768: {
            direction: 'vertical'
        }
    },
    
    on: {
        slideChange: function () {
            headBgSlider.slideTo(headTitleSlider.activeIndex);
            headDescriptionSlider.slideTo(headTitleSlider.activeIndex);
        },
    },
})
const headDescriptionSlider = new Swiper('.head-description-slider', {
    direction: 'vertical', // 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,

    grabCursor: true,
    simulateTouch: true,
    touchRatio: 1,
    speed: 1500,
    // loop: true, // doesn't work with slideTo

    breakpoints: {
        320: {
            direction: 'horizontal'
        },
        768: {
            direction: 'vertical'
        }
    },
    
    on: {
        slideChange: function () {
            headBgSlider.slideTo(headDescriptionSlider.activeIndex);
            headTitleSlider.slideTo(headDescriptionSlider.activeIndex);
        },
    }
})
const headBgSlider = new Swiper('.head-bg-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,

    grabCursor: true,
    simulateTouch: true,
    touchRatio: 1,
    speed: 1500,
    // loop: true,
    
    on: {
        slideChange: function () {
            headTitleSlider.slideTo(headBgSlider.activeIndex);
            headDescriptionSlider.slideTo(headBgSlider.activeIndex);
        },
    },

    pagination: {
        el: '.head-slider-pagination',
        type: 'bullets',
        clickable: true,

        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-bullet-active',
        bulletElement: 'div',

        renderBullet: function (index, className) {
            return `<div class="${className}"></div>`;
        }
    },
})

const allDoctorSlider = new Swiper('.all-doctor-slider', {
    direction: 'horizontal',
    slidesPerView: 2.5,
    spaceBetween: 32,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    watchSlidesProgress: true, // prevents from switching slides while clicking on <button>

    breakpoints: {
        320: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 1.4,
            spaceBetween: 32,
        },
        1280: {
            slidesPerView: 2.5,
            spaceBetween: 32,
        }
    },
    
    navigation: {
        nextEl: '.all-doctor-slider-arrow-next',
        prevEl: '.all-doctor-slider-arrow-prev'
    },

    pagination: {
        el: '.all-doctor-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

const reviewSlider = new Swiper('.review-slider', {
    direction: 'horizontal',

    slidesPerView: 3,
    grid: {
        rows: 2,
    },
    slidesPerColumn: 2,
    slidesPerGroup: 3,
    spaceBetween: 32,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    breakpoints: {
        320: {
            slidesPerView: 1,
            grid: {
                rows: 2,
            },
            slidesPerColumn: 2,
            slidesPerGroup: 1,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 2,
            grid: {
                rows: 3,
            },
            slidesPerColumn: 3,
            slidesPerGroup: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            grid: {
                rows: 2,
            },
            slidesPerColumn: 2,
            slidesPerGroup: 3,
            spaceBetween: 32,
        }
    },

    navigation: {
        nextEl: '.review-slider-arrow-next',
        prevEl: '.review-slider-arrow-prev'
    },

    pagination: {
        el: '.review-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

const aboutQuoteSlider = new Swiper('.about-quote-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 16,

    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,
    
    on: {
        slideChange: function () {
            aboutTextSlider.slideTo(aboutQuoteSlider.activeIndex);
            aboutImageSlider.slideTo(aboutQuoteSlider.activeIndex);
        },
    }
})
const aboutTextSlider = new Swiper('.about-text-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 16,

    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,
    
    on: {
        slideChange: function () {
            aboutQuoteSlider.slideTo(aboutTextSlider.activeIndex);
            aboutImageSlider.slideTo(aboutTextSlider.activeIndex);
        },
    },

    navigation: {
        nextEl: '.about-slider-arrow-next',
        prevEl: '.about-slider-arrow-prev'
    },

    pagination: {
        el: '.about-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})
const aboutImageSlider = new Swiper('.about-image-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 16,

    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,
    
    on: {
        slideChange: function () {
            aboutQuoteSlider.slideTo(aboutImageSlider.activeIndex);
            aboutTextSlider.slideTo(aboutImageSlider.activeIndex);
        },
    },
})

const docProfileSlider = new Swiper('.doc-profile-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 16,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,
    
    navigation: {
        nextEl: '.doc-profile-slider-arrow-next',
        prevEl: '.doc-profile-slider-arrow-prev'
    },

    pagination: {
        el: '.doc-profile-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

const imageSlider = new Swiper('.image-slider', {
    direction: 'horizontal',
    slidesPerView: 2.4, // 3.2,
    spaceBetween: 0, // 32,

    loop: true,
    centeredSlides: true,
    // centeredSlidesBounds: true,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    breakpoints: {
        320: {
            slidesPerView: 1.1,
            spaceBetween: 12,
        },
        768: {
            slidesPerView: 1.8,
            spaceBetween: 8, // 32,
        },
        1280: {
            slidesPerView: 2.54, // 3.2,
            spaceBetween: 0, // 32,
        },
        1440: {
            slidesPerView: 2.4, // 3.2,
            spaceBetween: 0, // 32,
        }
    },
    
    navigation: {
        nextEl: '.image-slider-arrow-next',
        prevEl: '.image-slider-arrow-prev'
    },

    pagination: {
        el: '.image-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})
const locationSlider = new Swiper('.location-slider', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 32,

    // loop: true,
    // centeredSlides: true,
    // centeredSlidesBounds: true,

    observer: true,
    observeParents: true,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    breakpoints: {
        320: {
            slidesPerView: 1.1,
            spaceBetween: 8,
        },
        768: {
            slidesPerView: 1.6,
            spaceBetween: 24, // 32,
        },
        1280: {
            slidesPerView: 2.2, // 3,
            spaceBetween: 32,
        }
    },
    
    navigation: {
        nextEl: '.location-slider-arrow-next',
        prevEl: '.location-slider-arrow-prev'
    },

    pagination: {
        el: '.location-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

const otherSlider = new Swiper('.other-slider', {
    direction: 'horizontal',
    slidesPerView: 1.2,
    spaceBetween: 32,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    breakpoints: {
        320: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 1.2,
            spaceBetween: 32,
        }
    },
    
    navigation: {
        nextEl: '.other-slider-arrow-next',
        prevEl: '.other-slider-arrow-prev'
    },

    pagination: {
        el: '.other-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

const featSlider = new Swiper('.feat-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 32,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    updateOnWindowResize: true,//

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 32,
        }
    },
    
    navigation: {
        nextEl: '.feat-slider-arrow-next',
        prevEl: '.feat-slider-arrow-prev'
    },

    pagination: {
        el: '.feat-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

const pCardSlider = new Swiper('.p-card-slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 32,
    
    simulateTouch: true,
    touchRatio: 1,
    speed: 1000,

    updateOnWindowResize: true,//

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 32,
        }
    },
    
    navigation: {
        nextEl: '.p-card-slider-arrow-next',
        prevEl: '.p-card-slider-arrow-prev'
    },

    pagination: {
        el: '.p-card-slider-fraction',
        type: 'fraction',
        currentClass: 'slider-fraction__current',
        totalClass: 'slider-fraction__total',

        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
})

// disable on mob - enable on pc
if( window.innerWidth < 767.5 ) {
    allDoctorSlider.disable();
    otherSlider.disable();

    if( featSlider ) {
        featSlider.enable();
        // featSlider.update();
    }
    if( pCardSlider ) {
        pCardSlider.enable();
        // pCardSlider.update();
    }
}
else {
    allDoctorSlider.enable();
    otherSlider.enable();

    if( featSlider ) {
        featSlider.disable();
    }
    if( pCardSlider ) {
        pCardSlider.disable();
    }
}
window.addEventListener('resize', () => {
    if( window.innerWidth < 767.5 ) {
        allDoctorSlider.disable();
        otherSlider.disable();

        if( featSlider ) {
            featSlider.enable();
            // featSlider.update();
        }
        if( pCardSlider ) {
            pCardSlider.enable();
            // pCardSlider.update();
        }
    }
    else {
        allDoctorSlider.enable();
        otherSlider.enable();

        if( featSlider ) {
            featSlider.disable();
        }
        if( pCardSlider ) {
            pCardSlider.disable();
        }
    }
})

// <====================================================== SLIDER ARROWS
const allDoctorSliderArrowPrev = document.querySelector('.all-doctor-slider-arrow-prev');
const allDoctorSliderArrowNext = document.querySelector('.all-doctor-slider-arrow-next');

const reviewSliderArrowPrev = document.querySelector('.review-slider-arrow-prev');
const reviewSliderArrowNext = document.querySelector('.review-slider-arrow-next');

const aboutSliderArrowPrev = document.querySelector('.about-slider-arrow-prev');
const aboutSliderArrowNext = document.querySelector('.about-slider-arrow-next');

const docProfileSliderArrowPrev = document.querySelector('.doc-profile-slider-arrow-prev');
const docProfileSliderArrowNext = document.querySelector('.doc-profile-slider-arrow-next');

const imageSliderArrowPrev = document.querySelector('.image-slider-arrow-prev');
const imageSliderArrowNext = document.querySelector('.image-slider-arrow-next');

const locationSliderArrowPrev = document.querySelector('.location-slider-arrow-prev');
const locationSliderArrowNext = document.querySelector('.location-slider-arrow-next');

const otherSliderArrowPrev = document.querySelector('.other-slider-arrow-prev');
const otherSliderArrowNext = document.querySelector('.other-slider-arrow-next');

const featSliderArrowPrev = document.querySelector('.feat-slider-arrow-prev');
const featSliderArrowNext = document.querySelector('.feat-slider-arrow-next');

const pCardSliderArrowPrev = document.querySelector('.p-card-slider-arrow-prev');
const pCardSliderArrowNext = document.querySelector('.p-card-slider-arrow-next');

if( allDoctorSliderArrowPrev && allDoctorSliderArrowNext ) {
    sliderArrows(allDoctorSlider, allDoctorSliderArrowPrev, allDoctorSliderArrowNext);
}

if( reviewSliderArrowPrev && reviewSliderArrowNext ) {
    sliderArrows(reviewSlider, reviewSliderArrowPrev, reviewSliderArrowNext);
}

if( aboutSliderArrowPrev && aboutSliderArrowNext ) {
    sliderArrows(aboutTextSlider, aboutSliderArrowPrev, aboutSliderArrowNext);
}

if( docProfileSliderArrowPrev && docProfileSliderArrowNext ) {
    sliderArrows(docProfileSlider, docProfileSliderArrowPrev, docProfileSliderArrowNext);
}

if( imageSliderArrowPrev && imageSliderArrowNext ) {
    sliderArrows(imageSlider, imageSliderArrowPrev, imageSliderArrowNext);
}

if( locationSliderArrowPrev && locationSliderArrowNext ) {
    sliderArrows(locationSlider, locationSliderArrowPrev, locationSliderArrowNext);
}

if( otherSliderArrowPrev && otherSliderArrowNext ) {
    sliderArrows(otherSlider, otherSliderArrowPrev, otherSliderArrowNext);
}

if( featSliderArrowPrev && featSliderArrowNext ) {
    sliderArrows(featSlider, featSliderArrowPrev, featSliderArrowNext);
}

if( pCardSliderArrowPrev && pCardSliderArrowNext ) {
    sliderArrows(pCardSlider, pCardSliderArrowPrev, pCardSliderArrowNext);
}

function sliderArrows(sliderSwiper, sliderArrowPrev, sliderArrowNext) {
    // when move towards the end of the slider - keep arrow colors
    sliderSwiper.on('slideNextTransitionStart', () => {
        sliderArrowPrev.classList.remove('swap-to-next');
        sliderArrowNext.classList.remove('swap-to-prev');

        // when reached the end of the slider - swap arrow colors
        if(sliderArrowNext.classList.contains('swiper-button-disabled')) {
            sliderArrowPrev.classList.add('swap-to-next');
            sliderArrowNext.classList.add('swap-to-prev');
        }
    })

    // when move towards the beginning of the slider - swap arrow colors
    sliderSwiper.on('slidePrevTransitionStart', () => {
        sliderArrowPrev.classList.add('swap-to-next');
        sliderArrowNext.classList.add('swap-to-prev');

        // when reached the beginning of the slider - keep arrow colors
        if(sliderArrowPrev.classList.contains('swiper-button-disabled')) {
            sliderArrowPrev.classList.remove('swap-to-next');
            sliderArrowNext.classList.remove('swap-to-prev');
        }
    })
}


// <====================================================== MULTISTEP FORM
multiStepFormActive();

function multiStepFormActive() {
    const multiStepForm = document.querySelector('[data-multistep-form]');
    if( !multiStepForm ) return;

    const formSteps = [...multiStepForm.querySelectorAll('[data-form-step]')];
    let currentStep = formSteps.findIndex( step => {
        return step.classList.contains('active');
    })

    // if there is no active step, then assign 'active' to the first one
    if( currentStep < 0 ) {
        currentStep = 0;
        formSteps[currentStep].classList.add('active');
    }
    // assign 'hide-block' to the rest of the steps
    formSteps.forEach( step => {
        if( !step.classList.contains('active') ) {
            step.classList.add('hide-block');
        }
    })

    multiStepForm.addEventListener('click', (e) => {
        let incrementor = null;

        if( e.target.closest('[data-next]') ) {
            incrementor = 1;
        }
        else if( e.target.closest('[data-previous]') ) {
            incrementor = -1;
        }

        if( incrementor == null ) return;

        // validate form before going to the next step
        let error = formValidate(formSteps[currentStep]);
        if( error === 0 ) {
            currentStep += incrementor;
            showCurrentStep(formSteps, currentStep);
        }
    })

    formSteps.forEach( step => {
        step.addEventListener('animationend', (e) => {
            formSteps[currentStep].classList.remove('hide-block');
            
            step.classList.toggle('hide-block', !step.classList.contains('active'));
            // e.target.classList.toggle('hide-block', !e.target.classList.contains('active'));
        })
    })
}

function showCurrentStep(formSteps, currentStep) {
    formSteps.forEach( (step, index) => {
        step.classList.toggle('active', index === currentStep)
    })
}



// <====================================================== WIDGET
const openWidgetBtns = document.querySelectorAll('[data-widget-button]');
const closeWidgetBtns = document.querySelectorAll('[data-widget-close]');

widgetActive();

function widgetActive() {
    if( openWidgetBtns.length > 0 ) {
        openWidgetBtns.forEach( btn => {
            btn.addEventListener('click', () => {
                const widgetName = btn.dataset.widgetButton;
                const widgetTarget = document.querySelector(`[data-widget-target=${widgetName}]`);

                widgetOpen(widgetTarget);
            })
        })
    }

    if( closeWidgetBtns.length > 0 ) {
        closeWidgetBtns.forEach( btn => {
            btn.addEventListener('touchstart', () => {
                widgetClose(btn.closest('.widget'));
            })
        })
    }
}
function widgetOpen(widget) {
    if( widget && unlock ) {
        // close all active widgets if they exist
        const widgetActive = document.querySelector('.widget.widget-active');
        if( widgetActive ) {
            widgetClose(widgetActive, false);
        }
        else {
            bodyLock();
        }
        // 
        widget.classList.add('widget-active');

        // close popup if the user clicked outside of it
        widget.addEventListener('click', (e) => {
            if( !e.target.closest('.widget__content') && e.target.closest('.widget') ) {
                widgetClose(e.target.closest('.widget'));
            }
        })
    }
}
function widgetClose(widget, doUnlock = true) {
    if( unlock ) {
        widget.classList.remove('widget-active');
        if( doUnlock ) {
            bodyUnlock();
        }
    }
}


// <====================================================== HIDE WIDGET ON FOOTER SCROLLING
if( window.innerWidth < 767.5 ) {
    widgetHideOnScroll();
}
window.addEventListener('resize', () => {
    if( window.innerWidth < 767.5 ) {
        widgetHideOnScroll();
    }
})

function widgetHideOnScroll() {
    let prevPos, curPos = 0;
    const widgetBtn = document.querySelector('.widget-btn');
    const footer = document.querySelector('.footer');
    if( ! widgetBtn || ! footer ) return;

    const top = scrollY + footer.getBoundingClientRect().top;
    const bottom = scrollY + footer.getBoundingClientRect().bottom;
    const height = footer.getBoundingClientRect().height;

    // console.log(`top: ${top}`);
    // console.log(`bottom: ${bottom}`);

    window.addEventListener('scroll', () => {
        prevPos = curPos;
        curPos = scrollY;

        // if bottom of footer is in the field of view
        // if( scrollY > (scrollY + footer.getBoundingClientRect().top) && scrollY < (scrollY + footer.getBoundingClientRect().bottom + footer.getBoundingClientRect().height) ) {
        if( scrollY > top && scrollY < bottom + height ) {
            widgetBtn.classList.add('widget-btn-hide');
        }
        else {
            widgetBtn.classList.remove('widget-btn-hide');
        }
    })
}


// <====================================================== POPUP

const openPopupBtns = document.querySelectorAll('[data-popup-button]');
const closePopupBtns = document.querySelectorAll('[data-popup-close]');
const body = document.querySelector('body');
const bodyWrapper = document.querySelector('.body-wrapper');
const lockPaddingTargets = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 1000; // must be equal to the transition-duration of .popup

popupActive();

function popupActive() {
    if( openPopupBtns.length > 0 ) {
        openPopupBtns.forEach( btn => {
            btn.addEventListener('click', () => {
                const popupName = btn.dataset.popupButton;
                const popupTarget = document.querySelector(`[data-popup-target=${popupName}]`);

                popupOpen(popupTarget);
            })
        })
    }

    if( closePopupBtns.length > 0 ) {
        closePopupBtns.forEach( btn => {
            btn.addEventListener('click', () => {
                popupClose(btn.closest('.popup'));
            })
        })
    }
}
function popupOpen(popup) {
    if( popup && unlock ) {
        // close all active popups if they exist
        const popupActive = document.querySelector('.popup.popup-active');
        if( popupActive ) {
            popupClose(popupActive, false);
        }
        else {
            bodyLock();
        }
        // 
        popup.classList.add('popup-active');

        // close popup if the user clicked outside of it
        popup.addEventListener('click', (e) => {
            if( !e.target.closest('.popup__content') && e.target.closest('.popup') ) {
                popupClose(e.target.closest('.popup'));
            }
        })
    }
}
function popupClose(popup, doUnlock = true) {
    if( unlock ) {
        popup.classList.remove('popup-active');
        if( doUnlock ) {
            bodyUnlock();
        }

        //---stop all videos when close popup
        if( popup.querySelector('[data-video-target]') ) {
            stopPopupVideo(popup.querySelector('[data-video-target]'));
        }
        //
    }
}
function bodyLock() {
    let lockPaddingValue = 0;
    if( !bodyWrapper ) {
        lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px';
    }
    else {
        lockPaddingValue = window.innerWidth - document.querySelector('.body-wrapper').offsetWidth + 'px';
    }

    if( lockPaddingTargets.length > 0 ) {
        lockPaddingTargets.forEach( target => {
            target.style.paddingRight = lockPaddingValue;
        })
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('body-hidden');

    unlock = false;
    setTimeout( () => {
        unlock = true;
    }, timeout);

}
function bodyUnlock() {
    setTimeout( () => {
        if( lockPaddingTargets.length > 0 ) {
            lockPaddingTargets.forEach( target => {
                target.style.paddingRight = '0px';
            })
        }
        body.style.paddingRight = '0px';
        body.classList.remove('body-hidden');
    }, timeout);

    unlock = false;
    setTimeout( () => {
        unlock = true;
    }, timeout);
}


// <====================================================== TELEPHONE MASK
const telInputs = document.querySelectorAll('input[type="tel"]');
let inputMask = new Inputmask('+38 (999) 999-99-99');
inputMask.mask(telInputs);


// <====================================================== FORM VALIDATION AND SENDING
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach( form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();             // ?????????????????? ?????????????????????? ???????????????? ??????????
    
            let error = formValidate(form);
            let formData = new FormData(form);
    
            if (error === 0) {
                form.classList.add('_sending');            // ?????????????????? loader, ???????? ???????????????????????? ??????????
                let response = await fetch('../mail/sendmail.php', {   // fetches 'sendmail.php' for every form
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);                          // ?????????? ???????????? ?????????? 
                    form.reset();
                    form.classList.remove('_sending');
                }
                else {
                    alert('Error! The form failed to send.');
                    form.classList.remove('_sending');
                }
            }
            else {
                // alert('Fill the necessary fiels!');
            }
        });
    })
})
    
function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._required');

    for(let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);
        
        if( input.classList.contains('_email') ) {
            if(input.value === '') {
                formAddError(input, 'empty');
                error++;    
            }    
            else if( !emailCheck(input) ) {
                formAddError(input, 'incorrect');
                error++;
            }
        }
        else if( input.classList.contains('_tel') ) {
            if(input.value === '') {
                formAddError(input, 'empty');
                error++;    
            }    
            else if( !telCheck(input) ) {
                formAddError(input, 'incorrect');
                error++;
            }
        }
        else if( input.classList.contains('_checkbox') ) {
            if( ! input.checked ) {
                formAddError(input, 'notChecked');
                error++;
            }
        }
        else if( input.classList.contains('_file') ) {
            let filename = input.value; // input.dataset.filename;

            if (filename === '') {
                formAddError(input, 'emptyFile');
                error++;
            }
            else if( !fileCheck(filename) ) {
                formAddError(input, 'incorrectFile');
                error++;
            }
        }
        else {
            if(input.value === '') {
                formAddError(input, 'empty');
                error++;    
            }        
        }
    }

    return error;
}
function formAddError(input, errorType) {
    // checkbox error add
    if(errorType === 'notChecked') {
        input.closest('.checkbox').classList.add('_error');
        return;
    }
    //

    let formInput = input.closest('[data-input]');
    let errorMessage = formInput.querySelector('.failure__text');
    
    if(errorType === 'emptyFile') {
        errorMessage.innerHTML = messageEmpty;
        input.previousElementSibling.classList.add('_error');
    }
    if(errorType === 'incorrectFile') {
        errorMessage.innerHTML = messageIncorrectFile;
        input.previousElementSibling.classList.add('_error');
    }
    if(errorType === 'incorrect') {
        errorMessage.innerHTML = messageIncorrect;
    }
    if(errorType === 'empty') {
        errorMessage.innerHTML = messageEmpty;
    }

    input.closest('[data-input]').querySelector('.failure').classList.add('_error');   // _error ?????? "?????????????????? ????????" / "???????????????????? ????????"
    formInput.classList.add('_error');                                                // _error ?????? ????????????
}
function formRemoveError(input) {
    // checkbox error remove
    if(input.classList.contains('_checkbox')) {
        input.closest('.checkbox').classList.remove('_error');
        return;
    }
    //
    // common input field error remove
    input.closest('[data-input]').querySelector('.failure').classList.remove('_error');    
    input.closest('[data-input]').classList.remove('_error');
    //
    // file field error remove
    if (input.previousElementSibling !== null && input.previousElementSibling.classList.contains('_error')) {
        input.previousElementSibling.classList.remove('_error');
    }
}
// ???????????????????? ?????????????????? ?????? ???????????????? ???????????????????????? email
function emailCheck(input) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(input.value);  
}
// ???????????????????? ?????????????????? ?????? ???????????????? ???????????????????????? telephone
function telCheck(input) {
    // return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9,11}(\s*)?$/.test(input.value);
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,13}(\s*)?$/.test(input.value);
}
// ???????????????? ???????????????????????? ??????????
function fileCheck(input) {
    let fileType = input.substr(input.lastIndexOf('.') + 1);    // get the type of the file

    return (fileType == 'pdf' || fileType == 'doc' || fileType == 'docx' || fileType == input) ? true : false; 
}