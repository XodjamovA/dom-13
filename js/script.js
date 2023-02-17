let btns1 = document.querySelectorAll('button[data-modal]')
let closebtns = document.querySelectorAll('[data-close]')
let modal = document.querySelector('.modal')

btns1.forEach(btn => {
    btn.onclick = () => {
        modal.classList.remove('hide')
        modal.classList.add('show', 'fade')
    }

});
closebtns.forEach(btn => {
    btn.onclick = () => {
        modal.classList.remove('show', 'fade')
        modal.classList.add('hide')
    }

});

let inpNeeds = document.querySelectorAll('.order__input')
let form = document.forms.reg
let allInps = document.querySelectorAll('form input')
let inpNeeds_2 = document.querySelectorAll('.calculating__choose_medium input')

let regex = {
    name: /^[a-z ,.'-]+$/g,
    phone: /^998[012345789][0-9]{8}$/g
}

form.onsubmit = (event) => {
    event.preventDefault();
    let errorss = 0

    inpNeeds.forEach(inp => {
        inp.classList.remove('invalid')
        if (inp.value.length < 1) {
            inp.classList.add('invalid')
            errorss++
        }
    })


    if (errorss > 0) {
        console.log('error');
    } else {
        submit(form)
    }

}

let slide = document.querySelectorAll('.offer__slide')
let close = document.querySelector('.offer__slider-prev')
let next = document.querySelector('.offer__slider-next')
let text = document.querySelector('#current')
let total = document.querySelector('#total')


let slide_next = 0

close.onclick = () => {
    slide_next--
    shou_slide(slide_next)
}


next.onclick = () => {
    slide_next++
    shou_slide(slide_next)
}


function shou_slide(nc) {
    if (nc >= slide.length) {
        slide_next = 0
    }

    if (nc == -1) {
        slide_next = slide.length - 1
    }
    slide.forEach((slide) => {
        slide.style.display = "none"
        slide.classList.remove('fade')
    })
    slide[slide_next].classList.add('fade')
    slide[slide_next].style.display = "block"

    text.innerHTML = '0' + (slide_next + 1)
}

shou_slide()


let tabcontents = document.querySelectorAll('.tabcontent')
let btns = document.querySelectorAll('.tabheader__item')

showTabs()

function showTabs(n = 0) {
    tabcontents.forEach(element => {
        element.style.display = "none"
        element.classList.remove('fade')
    });
    tabcontents[n].classList.add('fade')
    tabcontents[n].style.display = "block"
}


btns.forEach((btn, index) => {
    btn.onclick = () => {
        btns.forEach(el => el.classList.remove('tabheader__item_active'))

        btn.classList.add('tabheader__item_active')
        showTabs(index)
    }
})

let deadline = "2023-02-18 00:00"

function remainingDate(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor((t / 1000) / 60 / 60 / 24),
        hours = Math.floor(((t / 1000) / 60 / 60) % 24),
        minutes = Math.floor(((t / 1000) / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        t,
        days,
        hours,
        minutes,
        seconds
    }
}


function setTime(endTime, selector) {
    let t = document.querySelector(selector),
        days = t.querySelector('#days'),
        hours = t.querySelector('#hours'),
        minutes = t.querySelector('#minutes'),
        seconds = t.querySelector('#seconds'),
        updateTime = setInterval(showTime, 1000);

    function showTime() {
        let t = remainingDate(endTime)
        days.innerHTML = t.days
        hours.innerHTML = t.hours
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds

        if (t.t <= 0) {
            clearInterval(updateTime)
        }
    }
}

setTime(deadline, '.timer')


// kkal
let gens = document.querySelectorAll('#gender .calculating__choose-item')
let inputs = document.querySelectorAll('.calculating__choose_medium input')
let actBtns = document.querySelectorAll('.calculating__choose_big [data-act]')
let resultView = document.querySelector('#result')

let userData = {
    gender: "woman",
}


gens.forEach(btn => {
    btn.onclick = () => {
        gens.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

        let g = btn.getAttribute('data-g')

        userData.gender = g

        actBtns.forEach(btn => {
            actBtns.forEach(el => el.classList.remove('calculating__choose-item_active'))
            resultView.innerHTML = 0
        })
    }
})

inputs.forEach(inp => {
    inp.onkeyup = () => {
        let key = inp.id
        let val = inp.value

        userData[key] = val
    }
})


actBtns.forEach(btn => {
    btn.onclick = () => {
        actBtns.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

        let activeCount = btn.getAttribute('data-act')
        let { active, gender, weight, height, age } = userData

        active = activeCount

        if (gender === 'woman') {
            let res = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;

            resultView.innerHTML = Math.round(res * active)
        } else {
            let res = 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age
            resultView.innerHTML = Math.round(res * active)
        }

        inpNeeds_2.forEach(inp => {
            inp.classList.remove('invalid')
            if (inp.value.length < 1) {
                inp.classList.add('invalid')
                resultView.innerHTML = 0
            }
        })
    }
})