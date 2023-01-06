const menu = () => {
	window.onload = function () {
		document.addEventListener('click', documentActions)
		function documentActions(e) {
			const targetElement = e.target
			if (window.innerWidth > 300) {
				if (targetElement.classList.contains('menu__arrow')) {
					targetElement.closest('.menu__item').classList.toggle('_hover')
				}
				if (
					!targetElement.closest('.menu__item') &&
					document.querySelectorAll('.menu__item._hover').length > 0
				) {
				}
			}
			if (targetElement.classList.contains('search-form__icon')) {
				document.querySelector('.search-form').classList.toggle('_active')
			} else if (
				!targetElement.closest('.search-form') &&
				document.querySelector('.search-form._active')
			) {
				document.querySelector('.search-form').classList.remove('_active')
			}
			if (targetElement.classList.contains('actions-product__button')) {
				const productId = targetElement.closest('.item-product').dataset.pid
				addToCart(targetElement, productId)
				e.preventDefault()
			}
			if (
				targetElement.classList.contains('cart-header__icon') ||
				targetElement.closest('.cart-header__icon')
			) {
				if (document.querySelector('.cart-list').children.length > 0) {
					document.querySelector('.cart-header').classList.toggle('_active')
				}
				e.preventDefault()
			} else if (
				!targetElement.closest('.cart-header') &&
				!targetElement.classList.contains('actions-product__button')
			) {
				document.querySelector('.cart-header').classList.remove('_active')
			}

			if (targetElement.classList.contains('cart-list__delete')) {
				const productId =
					targetElement.closest('.cart-list__item').dataset.cartPid
				updateCart(targetElement, productId, false)
				e.preventDefault()
			}
		}
	}

	function addToCart(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold')
			productButton.classList.add('_fly')

			const cart = document.querySelector('.cart-header__icon')
			const product = document.querySelector(`[data-pid="${productId}"]`)
			const productImage = product.querySelector('.item-product__image')

			const productImageFly = productImage.cloneNode(true)

			const productImageFlyWidth = productImage.offsetWidth
			const productImageFlyHeight = productImage.offsetHeight
			const productImageFlyTop = productImage.getBoundingClientRect().top
			const productImageFlyLeft = productImage.getBoundingClientRect().left

			productImageFly.setAttribute('class', `_flyImage _ibg`)

			productImageFly.style.cssText = `
				left: ${productImageFlyLeft}px;
				top: ${productImageFlyTop}px;
				width: ${productImageFlyWidth}px;
				height: ${productImageFlyHeight}px;
			`

			document.body.append(productImageFly)

			const cartFlyLeft = cart.getBoundingClientRect().left
			const cartFlyTop = cart.getBoundingClientRect().top

			productImageFly.style.cssText = `
				left: ${cartFlyLeft}px;
				top: ${cartFlyTop}px;
				width: 0px;
				height: 0px;
				opacity: 0;
			`

			productImageFly.addEventListener('transitionend', () => {
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove()
					updateCart(productButton, productId)
					productButton.classList.remove('_fly')
				}
			})
			function updateCart(productButton, productId, productAdd = true) {
				const cart = document.querySelector('.cart-header')
				const cartIcon = cart.querySelector('.cart-header__icon')
				const cartQuantity = cartIcon.querySelector('span')
				const cartProduct = document.querySelector(
					`[data-cart-pid="${productId}"]`
				)
				const cartList = document.querySelector(`.cart-list`)

				if (productAdd) {
					if (cartQuantity) {
						cartQuantity.innerHTML = ++cartQuantity.innerHTML
					} else {
						cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>')
					}
					if (!cartProduct) {
						const product = document.querySelector(`[data-pid="${productId}"]`)
						const cartProductImage = product.querySelector(
							'.item-product__image'
						).innerHTML
						const cartProductTitle = product.querySelector(
							'.item-product__title'
						).innerHTML
						const cartProductContent = `
							<a href="" class="cart-list__image _ibg">
									${cartProductImage}
							</a>
							<div class="cart-list__body">
								<a href="" class="cart-list__title"
									>${cartProductTitle}</a>
								<div href="" class="cart-list__quantity"
									>Quatity: <span>1</span></div>
								<a href="" class="cart-list__delete"
									>Delete</a>
							</div>
						`
						cartList.insertAdjacentHTML(
							'beforeend',
							`<li data-cart-pid=${productId} class="cart-list__item">${cartProductContent}</li>`
						)
					} else {
						const cartProductQuantity = cartProduct.querySelector(
							'.cart-list__quantity span'
						)
						cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML
					}

					productButton.classList.remove('_hold')
				} else {
					const cartProductQuantity = cartProduct.querySelector(
						'.cart-list__quantity span'
					)
					cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML
					if (!parseInt(cartProductQuantity.innerHTML)) {
						cartProduct.remove()
					}

					const cartQuantityValue = --cartQuantity.innerHTML
					if (cartQuantityValue) {
						cartQuantity.innerHTML = cartQuantityValue
					} else {
						cartQuantity.remove()
						cart.classList.remove('_active')
					}
				}
			}
		}
	}

	const headers = document.querySelectorAll('[data-name="spoiler-title"]')
	headers.forEach(item => {
		item.addEventListener('click', headerClick)
		function headerClick() {
			this.nextElementSibling.classList.toggle('spoiler-list')
		}
	})

	const iconMenu = document.querySelector('.icon-menu')
	const menuBody = document.querySelector('.menu__body')
	if (iconMenu) {
		iconMenu.addEventListener('click', e => {
			document.body.classList.toggle('_lock')
			iconMenu.classList.toggle('_active')
			menuBody.classList.toggle('_active')
		})
	}

	let sliders = document.querySelectorAll('._swiper')
	if (sliders) {
		for (let i = 0; i < sliders.length; i++) {
			let slider = sliders[i]
			if (!slider.classList.contains('swiper-bild')) {
				let slider_items = slider.children
				if (slider_items) {
					for (let i = 0; i < slider_items.length; i++) {
						let el = slider_items[i]
						el.classList.add('swiper-slide')
					}
				}
				let slider_content = slider.innerHTML
				let slider_wrapper = document.createElement('div')
				slider_wrapper.classList.add('swiper-wrapper')
				slider_wrapper.innerHTML = slider_content
				slider.innerHTML = ''
				slider.appendChild(slider_wrapper)
				slider.classList.add('swiper-bild')

				if (slider.classList.contains('_swiper-scroll')) {
					let sliderScroll = document.createElement('div')
					sliderScroll.classList.add('swiper-scrollbar')
					slider.appendChild(sliderScroll)
				}
			}
			if (slider.classList.contains('_gallery')) {
				// slider.data('lightGallery).destroy(true)
			}
		}
		sliders_bild_callback()
	}
	function sliders_bild_callback(params) {}

	let sliderScrollItems = document.querySelectorAll('._swiper-scroll')
	if (sliderScrollItems.length > 0) {
		for (let i = 0; i < sliderScrollItems.length; i++) {
			const sliderScrollItem = sliderScrollItems[i]
			const sliderScrollBar =
				sliderScrollItem.querySelector('.swiper-scrollbar')
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: true,
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			})
			sliderScroll.scrollbar.updateSize()
		}
	}

	function sliders_bild_callback(params) {}

	if (document.querySelector('.slider-main__body')) {
		new Swiper('.slider-main__body', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 32,
			watchOverflow: true,
			speed: 800,
			loop: true,
			loopAdditionalSlides: 5,
			preloadImages: false,
			parallax: true,

			pagination: {
				el: '.controls-slider-main__dotts',
				clickable: true,
			},

			navigation: {
				nextEl: '.slider-main .slider-arrow_next',
				prevEl: '.slider-main .slider-arrow_prev',
			},
		})
	}

	if (document.querySelector('.slider-rooms__body')) {
		new Swiper('.slider-rooms__body', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 24,
			watchOverflow: true,
			speed: 800,
			loop: true,
			loopAdditionalSlides: 5,
			preloadImages: false,
			parallax: true,

			pagination: {
				el: '.slider-rooms__dotts',
				clickable: true,
			},

			navigation: {
				nextEl: '.slider-rooms .slider-arrow_next',
				prevEl: '.slider-rooms .slider-arrow_prev',
			},
		})
	}
	if (document.querySelector('.slider-tips__body')) {
		new Swiper('.slider-tips__body', {
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 32,
			watchOverflow: true,
			speed: 800,
			loop: true,

			pagination: {
				el: '.slider-tips__dotts',
				clickable: true,
			},

			navigation: {
				nextEl: '.slider-tips .slider-arrow_next',
				prevEl: '.slider-tips .slider-arrow_prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 32,
				},
			},
		})
	}

	// Фиксированная шапка
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

	const btn = document.querySelector('.products__more')
	async function getProducts() {
		// if (!button.classList.contains('_hold')) {
		// 	button.classList.add('_hold')
		// 	const file = 'json/products.json'
		// 	let response = await fetch(file, { method: 'GET' })
		// 	if (response.ok) {
		// 		let result = await response.json()
		// 		loadProducts(result)
		// 		button.classList.remove('_hold')
		// 		button.remove()
		// 	} else {
		// 		alert('Ошибка')
		// 	}
		// }
		const res = await fetch('json/products.json')
		const data = await res.json()
		console.log(data)
		data.products.forEach(item => {
			const productsItems = document.querySelector('.products__items')
			const itemResult = `<article data-pid="${item.id}" class="products__item item-product">
								<div class="item-product__labels">
									<div class="item-product__label item-product__label_${item.labels.type}">
										${item.labels.value}
									</div>
								</div>
								<a href="" class="item-product__image _ibg">
									<img src="images/products/${item.image}" alt="Product#1" />
								</a>
								<div class="item-product__body">
									<div class="item-product__content">
										<h5 class="item-product__title">${item.title}</h5>
										<div class="item-product__text">${item.text}</div>
									</div>
									<div class="item-product__prices">
										<div class="item-product__price">${item.price}</div>
										<div class="item-product__price item-product__price_old">
											${item.priceOld}
										</div>
									</div>
									<div class="item-product__actions actions-product">
										<div class="actions-product__body">
											<a href="" class="actions-product__button btn btn_white"
												>Add to cart</a
											>
											<a href="" class="actions-product__link _icon-share"
												>Share</a
											>
											<a href="" class="actions-product__link _icon-favorite2"
												>Like</a
											>
										</div>
									</div>
								</div>
							</article>`
			productsItems.insertAdjacentHTML('beforeend', itemResult)
		})
	}
	btn.addEventListener('click', e => {
		e.preventDefault()
		getProducts()
		btn.remove()
	})

	// getProducts()
	// function loadProducts(data) {
	// 	const productsItems = document.querySelector('.products__items')
	// 	data.products.forEach(item => {
	// const itemResult = `<article data-pid="${item.id}" class="products__item item-product">
	// 					<div class="item-product__labels">
	// 						<div class="item-product__label item-product__label_${item.labels.type}">
	// 							${item.labels.value}
	// 						</div>
	// 					</div>
	// 					<a href="" class="item-product__image _ibg">
	// 						<img src="images/products/${item.image}" alt="Product#1" />
	// 					</a>
	// 					<div class="item-product__body">
	// 						<div class="item-product__content">
	// 							<h5 class="item-product__title">${item.title}</h5>
	// 							<div class="item-product__text">${item.text}</div>
	// 						</div>
	// 						<div class="item-product__prices">
	// 							<div class="item-product__price">${item.price}</div>
	// 							<div class="item-product__price item-product__price_old">
	// 								${item.priceOld}
	// 							</div>
	// 						</div>
	// 						<div class="item-product__actions actions-product">
	// 							<div class="actions-product__body">
	// 								<a href="" class="actions-product__button btn btn_white"
	// 									>Add to cart</a
	// 								>
	// 								<a href="" class="actions-product__link _icon-share"
	// 									>Share</a
	// 								>
	// 								<a href="" class="actions-product__link _icon-favorite2"
	// 									>Like</a
	// 								>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</article>`
	// productsItems.insertAdjacentElement('beforeend', itemResult)
	// 	})
	// }
}

export default menu
