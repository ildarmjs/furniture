// import Swiper from 'swiper'

// const slider = () => {
// 	let sliders = document.querySelectorAll('._swiper')
// 	if (sliders) {
// 		for (let i = 0; i < sliders.length; i++) {
// 			let slider = sliders[i]
// 			if (!slider.classList.contains('swiper-bild')) {
// 				let slider_items = slider.children
// 				if (slider_items) {
// 					for (let i = 0; i < slider_items.length; i++) {
// 						let el = slider_items[i]
// 						el.classList.add('swiper-slide')
// 					}
// 				}
// 				let slider_content = slider.innerHTML
// 				let slider_wrapper = document.createElement('div')
// 				slider_wrapper.classList.add('swiper-wrapper')
// 				slider_wrapper.innerHTML = slider_content
// 				slider.innerHTML = ''
// 				slider.appendChild(slider_wrapper)
// 				slider.classList.add('swiper-bild')

// 				if (slider.classList.contains('_swiper-scroll')) {
// 					let sliderScroll = document.createElement('div')
// 					sliderScroll.classList.add('swiper-scrollbar')
// 					slider.appendChild(sliderScroll)
// 				}
// 			}
// 			if (slider.classList.contains('_gallery')) {
// 				// slider.data('lightGallery).destroy(true)
// 			}
// 		}
// 		sliders_bild_callback()
// 	}
// 	function sliders_bild_callback(params) {}

// 	let sliderScrollItems = document.querySelectorAll('._swiper-scroll')
// 	if (sliderScrollItems.length > 0) {
// 		for (let i = 0; i < sliderScrollItems.length; i++) {
// 			const sliderScrollItem = sliderScrollItems[i]
// 			const sliderScrollBar =
// 				sliderScrollItem.querySelector('.swiper-scrollbar')
// 			const sliderScroll = new Swiper(sliderScrollItem, {
// 				observer: true,
// 				observeParents: true,
// 				direction: 'vertical',
// 				slidesPerView: 'auto',
// 				freeMode: true,
// 				scrollbar: {
// 					el: sliderScrollBar,
// 					draggable: true,
// 					snapOnRelease: false,
// 				},
// 				mousewheel: {
// 					releaseOnEdges: true,
// 				},
// 			})
// 			sliderScroll.scrollbar.updateSize()
// 		}
// 	}

// 	function sliders_bild_callback(params) {}

// 	if (document.querySelector('.slider-main__body')) {
// 		new Swiper('.slider-main__body', {
// 			observer: true,
// 			observeParents: true,
// 			slidesPerView: 1,
// 			spaceBetween: 32,
// 			watchOverflow: true,
// 			speed: 800,
// 			loop: true,
// 			loopAdditionalSlides: 5,
// 			preloadImages: false,
// 			parallax: true,

// 			pagination: {
// 				el: '.controls-slider-main__dotts',
// 				clickable: true,
// 			},

// 			navigation: {
// 				nextEl: '.slider-main .slider-arrow_next',
// 				prevEl: '.slider-main .slider-arrow_prev',
// 			},
// 		})
// 	}
// }
// export default slider
