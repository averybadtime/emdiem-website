$(document).ready(function () {
  /** jQuery selectors */
  const BODY                        = $("body")
  const CONTAINER                   = $("#container")
  const HORIZONTAL_SCROLL_CONTAINER = $(".HorizontalScrollContainer")
  const BASE                        = $(".base")
  const PORTAL_GUY_IN               = $(".Page.Page__Portal.in .Portal-guy")
  const PORTAL_GUY_OUT              = $(".Page.Page__Portal.out .Portal-guy")
  const FADE_PROJECTS_FIXED_TEXT = _ => {
    const lastProjectContainer = $("#Projects").height()
    const scrollTop = $(document).scrollTop()
    if ((lastProjectContainer - window.outerHeight) < scrollTop) {
      $(".projects-title").css({
        height: 0,
        opacity: 0
      })
    } else {
      $(".projects-title").css({
        height: "100%",
        opacity: .65
      })
    }
  }
  /** Variables */
  const GET_INITIAL_CONTAINER_HEIGHT = () =>
    Math.round(HORIZONTAL_SCROLL_CONTAINER.width() - BODY.width() + HORIZONTAL_SCROLL_CONTAINER.height())
  /** Document scroll */
  document.addEventListener("scroll", function (ev) {
    const FULLPAGE_HEIGHT     = HORIZONTAL_SCROLL_CONTAINER.height()
    const DOCUMENT_SCROLL_TOP = $(window).scrollTop()
    const CONTAINER_HEIGHT    = GET_INITIAL_CONTAINER_HEIGHT()
    CONTAINER.height(CONTAINER_HEIGHT)
    if (DOCUMENT_SCROLL_TOP + FULLPAGE_HEIGHT <= CONTAINER_HEIGHT) {
      HORIZONTAL_SCROLL_CONTAINER.css("left", (DOCUMENT_SCROLL_TOP * -1))
    } else {
      HORIZONTAL_SCROLL_CONTAINER.css("left", (CONTAINER_HEIGHT - FULLPAGE_HEIGHT) * -1)
    }
    if (window.location.pathname != "/projects.html") {
      /** Navbar */
      const TOP_NAV = $(".TopNav")
      if (parseInt(HORIZONTAL_SCROLL_CONTAINER.css("left")) <= -50) {
        TOP_NAV.addClass("light-bg")
      } else {
        TOP_NAV.removeClass("light-bg")
      }
    }
    BASE.css("top", CONTAINER_HEIGHT)
    // const LIMIT                = FULLPAGE_HEIGHT + DOCUMENT_SCROLL_TOP
    // if (LIMIT >= CONTAINER_HEIGHT) {
    //   $(".in .Portal-guy").addClass("animate__Portal-guy__in")
    //   setTimeout(function () { $(".out .Portal-guy").addClass("animate__Portal-guy__out") }, 1000)
    // } else {
    //   $(".in .Portal-guy").removeClass("animate__Portal-guy__in")
    //   $(".out .Portal-guy").removeClass("animate__Portal-guy__out")
    //   BODY.removeClass("animated")
    // }
  })
  /** Space guy - Projects view */
  const PATH_NAME = window.location.pathname
  if (PATH_NAME == "/projects.html") {
    PORTAL_GUY_OUT.addClass("animate__Portal-guy__out")
    // document.addEventListener("scroll", FADE_PROJECTS_FIXED_TEXT)
    // document.addEventListener("onload", FADE_PROJECTS_FIXED_TEXT)
  }
})