let currentScrollTop

$.fn.projects = function() {
  const _this = this
  document.addEventListener("scroll", function () {
    _this.each(function(index, element) {
      const $element = $(element)
      $element.children().each(function(childIndex, childElement) {
        const
          $childElement  = $(childElement),
          offset         = $childElement.offset().top - $(window).scrollTop() - 61,
          projectWrapper = $childElement.children(),
          projectFigures = projectWrapper.children()
        const
          shape  = projectWrapper.siblings(".project-device-with-shape"),
          device = projectFigures.closest("img.device, img.video"),
          figure = projectFigures.closest("img.figure"),
          figure2 = projectFigures.closest("img.figure-2"),
          superhero = projectFigures.closest("img.superhero"),
          sign   = $(shape).hasClass("enterFromRight") ? "+" : "-"

        const pull = offset > 0
        
        $(device).css("transform", pull ? `translateX(${sign}${offset/.75}px)` : "translateX(0)")
        $(figure).css("transform", pull ? `translateX(${sign}${offset/1.25}px)` : "translateX(0)")
        $(figure2).css("transform", pull ? `translateX(${sign}${offset/2.5}px)` : "translateX(0)")
        $(superhero).css("transform", pull ? `translateX(-${offset}px)` : "translateX(0)")

      
      })
    })
  })
  return this
}

$.fn.navigation = function() {
  const _this = this
  document.addEventListener("scroll", function() {
    const navigation = _this.find("ul.Navigation")
    navigation.children().each(function(index, element) {
      const $menuItem = $(element)
      const $anchor = $menuItem.children("a")
      const sectionName = $anchor.data("scroll-to")
      const sectionScrollTop = $(`#${sectionName}`)
      // console.log($(window).scrollTop(), Math.round(sectionScrollTop.offset().top), sectionScrollTop.offset().left)
    })
    return this
  })
}

$.fn.animatePlanets = function() {
  const _this = this
  document.addEventListener("scroll", function() {
    const scrollLeft = parseInt($("#HorizontalScrollContainer").css("left"))
    _this.each(function(index, element) {
      const
        $element         = $(element),
        offsetLeft       = Math.round($element.offset().left),
        far              = $element.hasClass("blur") ? true : false,
        translationValue = far ? 9 : 3
      $element.css("marginLeft", (offsetLeft / translationValue))
    })
  })
  return this
}

$.fn.animateServices = function() {
  const _this = this
  _this.css("opacity", 0)
  document.addEventListener("scroll", function() {        
    _this.each(function(index, element) {
      const
        $element     = $(element),
        offsetLeft   = Math.round($element.offset().left),
        onePageThird = Math.round($(window).width() / 3),
        windowWidth  = $(window).width()
      if (offsetLeft <= (windowWidth - onePageThird)) {
        element.classList.add("animated", "slideInRight")
        $element.css("opacity", 1)
      }
    })
  })
  return this
}

disableScroll = function() {
  const x = window.scrollX
  const y = window.scrollY
  window.onmousewheel = function() { window.scrollTo(x, y) }
  console.log("Stopping")
}

enableScroll = function() {
  window.onmousewheel = function() {}
  console.log("Starting")
}

$(document).ready(function () {
  $("#Projects").projects()
  $(".TopNav").navigation()
  $(".dot-planet, .random-planet").animatePlanets()
  $(".what-we-do__services .item").animateServices()
  /** jQuery selectors */
  const body                      = $("body")
  const container                 = $("#container")
  const horizontalScrollContainer = $("#HorizontalScrollContainer")
  const verticalContainer         = $("#VerticalContainer")
  /** Variables */
  const getInitialContainerHeight = () => Math.round(horizontalScrollContainer.width() - body.width() + horizontalScrollContainer.height())
  /** Document scroll */
  document.addEventListener("scroll", function() {
    const
      horizontalScrollContainerHeight = Math.round(horizontalScrollContainer.height()),
      documentScrollTop               = $(window).scrollTop(),
      containerHeight                 = getInitialContainerHeight()
    container.height(containerHeight)
    if (documentScrollTop + horizontalScrollContainerHeight <= containerHeight) {
      horizontalScrollContainer.css("left", Math.round((documentScrollTop * -1)))
      verticalContainer.css("top", 0)
    } else {
      horizontalScrollContainer.css("left", Math.round((containerHeight - horizontalScrollContainerHeight) * -1))
      if (documentScrollTop + horizontalScrollContainerHeight > containerHeight) {
        const pullVerticalContainerTop = ((documentScrollTop - Math.round(containerHeight - horizontalScrollContainerHeight)) * -1)
        verticalContainer.css("top", pullVerticalContainerTop)
        



        /** One page scroll simulation */
        // const bodyHeight = body.height()
        // const halfBodyHeight = Math.round(bodyHeight / 2)
        // if (currentScrollTop == null) {
        //   // console.log("scrolling", documentScrollTop)
        //   if (parseInt(verticalContainer.css("top")) < (halfBodyHeight * -1)) {
        //     currentScrollTop = documentScrollTop
        //     const left = parseInt(horizontalScrollContainer.css("left")) * -1
        //     const total = documentScrollTop + bodyHeight
        //     console.log
            
        //     disableScroll()

           
        //     console.log(documentScrollTop)

        //     $(document).animate({
        //       scrollTop: (total)
        //     }, 750, function() {
        //       enableScroll()
        //       currentScrollTop = null
        //     })
        //   }
        // }





      }
    }
    /** Navigation */
    const nav = $("nav")
    if (parseInt(horizontalScrollContainer.css("left")) < -50) {
      nav.addClass("light-bg")
    } else {
      nav.removeClass("light-bg")
    }
  })
  const background = $("#Index").children("img")
  const $element = $(background[4])
  const imageWidth = Math.round($element.width())
  const imageLeft = Math.round(parseInt($element.css("left")))
  const windowWidth = $(window).width()
  // TODO: Hacer esto pero en el evento resize
  $("#WhatWeDo").css("paddingLeft", imageWidth + imageLeft - windowWidth)
})