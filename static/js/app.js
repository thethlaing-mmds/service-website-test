const model = {
    init() {
        this.sections = [];
        this.previousScrollTop = 0;

        const domSections = document.querySelectorAll("body>section");
        let start = 0;
        for (const section of domSections) {
            const top = start;
            const bottom = start + section.scrollHeight;
            this.sections.push([top, bottom]);
            start = bottom + 1;
        }
    }
}


const homePage = {
    init() {
        model.init();
        view.init();
        this.startSliders();
        setInterval(view.startAnimation, 500);
        //document.addEventListener('scroll', (event) => this.scrollEvent(event));
        const buttons = document.querySelectorAll('.scrollTo');
        this.whoweare_section = document.querySelector("#who-we-are");

        document.addEventListener('scroll', e => {
            this.currentDisplayCheck();
            this.whoweare_scroll_event();
        })
        this.attachScrollToEvents(buttons);
    },
    currentDisplayCheck() {        
        if (Utility.isInViewport(homePage.whoweare_section)) {
            
        }
    },
    whoweare_scroll_event() {
        const leftSection = document.querySelector("#who-we-are .left-section");
        const distance = this.whoweare_section.getBoundingClientRect();
        const top = -distance.top;
        //desktop screen check
        if(document.documentElement.clientWidth >= 1200){
            if (distance.top > 611){
                leftSection.style.transform = `translate(0px,-600px)`;
            }
            else if (distance.top < 610 && distance.top > -10) {
                
                leftSection.style.transform = `translate(0px,${top}px)`;
    
            }
        }
        

    },
    startSliders() {
        this.swiper1 = new Swiper('.swiper-container.our-culture', {
            speed: 400,
            lazy: true,
            spaceBetween: 100,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        this.culture_vertical_sliders = new Swiper('.swiper-container-v', {
            direction: 'vertical',
            azy: true,
            spaceBetween: 50,
            pagination: {
                el: '.swiper-pagination-v',
                clickable: true,
            },
        });
        this.slider_whoweare = new Swiper('.who-we-are-slider', {
            speed: 500,
            spaceBetween: 800,
            // effect: 'flip',
            lazy: true,
            uniqueNavElements: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
        });

        this.swiper3 = new Swiper('.why-we-exist-slider', {
            speed: 1000,
            effect: 'cube',
            lazy: true,
            spaceBetween: 300,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    },
    attachScrollToEvents(inputs) {
        if (inputs.length > 0) {
            inputs.forEach(el => {
                el.addEventListener('click', event => {
                    this.smoothScrollEvent(event)
                });
            })
        }
    },
    smoothScrollEvent(event) {
        event.preventDefault();
        const scrollTarget = document.querySelector(event.target.dataset.to);
        Utility.scrollTo(scrollTarget.offsetTop);
    }

}



const view = {
    init() {
        this.animationElements = document.querySelectorAll('.animate');
    },
    startAnimation() {
        for (const ele of view.animationElements) {
            ele.classList.add('start');
        }
    }
}

const Utility = {
    isScrollDown(previous, current) {
        if (previous < current) {
            return true;
        }

        return false;
    },
    scrollTo(to) {
        window.scroll({
            top: to,
            left: 0,
            behavior: 'smooth'
        });
    },
    isInViewport(el) {
        const scroll = window.scrollY || window.pageYOffset
        const boundsTop = el.getBoundingClientRect().top + scroll
        
        const viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }
        
        const bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
        }
        
        return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom ) 
            || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
    }
    
}


document.addEventListener('DOMContentLoaded', function () {
    homePage.init()
});