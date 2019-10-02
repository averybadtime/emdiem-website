$(document).ready(function () {
  /** jQuery selectors */
  const
    body                      = $("body"),
    container                 = $("#container"),
    horizontalScrollContainer = $("#HorizontalScrollContainer"),
    verticalContainer         = $("#VerticalContainer")
  /** Variables */
  const
    getInitialContainerHeight = () => Math.round(horizontalScrollContainer.width() - body.width() + horizontalScrollContainer.height())
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
      }
    }
    /** Navigation */
    const nav = $("nav")
    if (parseInt(horizontalScrollContainer.css("left")) < -50) {
      nav.addClass("light-bg")
    } else {
      nav.removeClass("light-bg")
    }
    const projects = $("#Projects")
    const horizontalScrollContainerLeft = parseInt(horizontalScrollContainer.css("left")) * -1
    const verticalContainerTop = parseInt(verticalContainer.css("top")) * -1
    const total = horizontalScrollContainerLeft + verticalContainerTop
    const projectsHeight = $("#Projects").height()
    const middle = Math.round((projectsHeight / 16))
    // console.log(horizontalScrollContainerLeft, verticalContainerTop, documentScrollTop, middle)
    if (horizontalScrollContainerLeft + middle < documentScrollTop) {
      const number = (documentScrollTop - horizontalScrollContainerLeft - middle) * -1
      const device = $("#Projects .Projects__Item .project-device-with-shape.carnaval .device")
      const ok = parseInt(device.css("left")) + number
      console.log(ok)
      device.css("left", ok)
    }
  })
})