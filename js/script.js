/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

// Preloader js
$(window).on("load", function () {
  "use strict";
  $(".preloader").fadeOut(0);
});

(function ($) {
  "use strict";

  // tab
  $(".tab-content")
    .find(".tab-pane")
    .each(function (idx, item) {
      var navTabs = $(this).closest(".code-tabs").find(".nav-tabs"),
        title = $(this).attr("title");
      navTabs.append(
        '<li class="nav-item"><a class="nav-link" href="#">' +
          title +
          "</a></li>"
      );
    });

  $(".code-tabs ul.nav-tabs").each(function () {
    $(this).find("li:first").addClass("active");
  });

  $(".code-tabs .tab-content").each(function () {
    $(this).find("div:first").addClass("active");
  });

  $(".nav-tabs a").click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest(".code-tabs"),
      tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
    tabPanel.find(".active").removeClass("active");
    tab.addClass("active");
    tabPane.addClass("active");
  });

  // accordion-collapse
  $(".accordion-collapse").on("show.bs.collapse", function () {
    $(this).siblings(".accordion-header").addClass("active");
  });
  $(".accordion-collapse").on("hide.bs.collapse", function () {
    $(this).siblings(".accordion-header").removeClass("active");
  });

  //post slider
  $(".post-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: false,
    arrows: true,
    prevArrow:
      '<button type="button" class="prevArrow"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="nextArrow"><i class="fas fa-angle-right"></i></button>',
  });

  // videoPopupInit
  function videoPopupInit() {
    var $videoSrc;
    $(".video-play-btn").click(function () {
      $videoSrc = $(this).data("src");
    });
    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#showVideo").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });
    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#showVideo").attr("src", $videoSrc);
    });
  }
  videoPopupInit();

  // table of content
  new ScrollMenu("#TableOfContents a", {
    duration: 400,
    activeOffset: 40,
    scrollOffset: 10,
  });
})(jQuery);

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function createListComponent(taskInputText, checked = 0){
  // create li
  const task = document.createElement("li");
  task.className = checked == 1 ? "list-group-item border border-light rounded border-1 p-3 mb-2 checked" : "list-group-item border border-light rounded border-1 p-3 mb-2";
  
  // create input
  const taskCheckBox = document.createElement("input");
  taskCheckBox.type = "checkbox";
  taskCheckBox.className = "form-check-input";
  taskCheckBox.checked = checked == 1 ? true : false;
  taskCheckBox.addEventListener("change", completeTask); // add checkbox eventlistener

  // create name
  const taskName = document.createElement("span");
  taskName.className = "task-name";
  taskName.textContent = taskInputText;
  
  // create delete button
  const taskDeleteButton = document.createElement("button");
  taskDeleteButton.className = "btn btn-sm float-end btn-danger py-1";
  taskDeleteButton.textContent = "Delete";
  taskDeleteButton.addEventListener("click", deleteTask); // add delete eventlistener
  
  // add input, name, button to li. then append li to ul
  [taskCheckBox, taskName, taskDeleteButton].forEach((item) => task.appendChild(item));
  taskList.appendChild(task);
}

function setLocalStorageTasks() {
  const tasks = [];
  const taskItem = taskList.getElementsByClassName("task-name");
  
  
  for(let i = 0; i < taskItem.length; i++) {
    const taskItemData = {};
    taskItemData[taskItem[i].textContent] = taskItem[i].parentElement.classList.contains("checked") ? 1 : 0;
    tasks.push(taskItemData);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalStorageTasks(){
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach(index => {
      createListComponent(Object.keys(index)[0], Object.values(index)[0]);
    });
  }
}

function completeTask(event) {
  const task = event.target.parentElement;
  task.classList.toggle("checked");
  
  setLocalStorageTasks();
}

function deleteTask(event) {
  const task = event.target.parentElement;
  taskList.removeChild(task);

  setLocalStorageTasks();
}

function addTask() {
  const taskInputText = taskInput.value.trim();
  if (taskInputText !== ""){
    createListComponent(taskInputText);

    taskInput.value = "";

    setLocalStorageTasks();
  }
}

getLocalStorageTasks();