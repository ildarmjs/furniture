// Проверка браузера на поддержку .webp изображений =================================================================================================================
export function isWebp() {
	// Проверка поддержки webp
	function testWebp(callback) {
		let webP = new Image()
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2)
		}
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebp(function (support) {
		let className = support === true ? 'webp' : 'no-webp'
		document.documentElement.classList.add(className)
	})
}

// Функция для фиксированной шапки при скролле =================================================================================================================

export function headerFixed() {
	const header = document.querySelector('.header')
	const callback = (entries, observer) => {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll')
		} else {
			header.classList.add('_scroll')
		}
	}

	const headerObserver = new IntersectionObserver(callback)
	headerObserver.observe(header)
}

// Функция плавной прокрутки к нужному разделу (якорь) =====================================================================================
export function anchor() {
	const menuLinks = document.querySelectorAll('._link[data-goto]')
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', onMenuLinkClick)
		})
	}
	function onMenuLinkClick(e) {
		const menuLink = e.target
		if (
			menuLink.dataset.goto &&
			document.querySelector(menuLink.dataset.goto)
		) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto)
			const gotoBlockValue =
				gotoBlock.getBoundingClientRect().top +
				pageYOffset -
				document.querySelector('header').offsetHeight

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth',
			})
			e.preventDefault()
		}
	}
}
