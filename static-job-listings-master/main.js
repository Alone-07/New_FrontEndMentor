"use strict";
import { container } from "./container.js";

let body = document.body;
let filterContainer = document.querySelector(".filterContainer");
let filteredTags = document.querySelector(".filteredtags");
let clear = document.querySelector(".clear");
let count = 0;

async function data() {
  let response = await fetch("./data.json");
  let value =
    response.status == 200
      ? await response.json()
      : Error("Can't fetch the data");

  if (value) {
    return value.forEach((v) => {
      body.insertAdjacentHTML("beforeend", container(v));
    });
  }
  throw Error("Can't fetch data");
}

let filtered = (value) => {
  return `
    <div class="filteredtag">
      <span> ${value} </span>
      <button type="button" class="remove" data-value ="${value}">
        <img src="./images/icon-remove.svg" alt="remove">
      </button>
    </div>`;
};

data()
  .then(() => {
    let tags = document.querySelectorAll(".tags");
    let selectedTagList = [];

    tags.forEach((tag) =>
      tag.addEventListener("click", (e) => {
        if (e.target.tagName != "LI") return;

        let txt = e.target.textContent;
        let bool = selectedTagList.some((e) => e == txt); // to prevent duplicate in selected tags

        if (selectedTagList.length == 0 ? true : !bool) {
          filteredTags.insertAdjacentHTML("beforeend", filtered(txt));
          filterContainer.style.display = "flex";
          selectedTagList.push(txt);
          filter(selectedTagList);
          Array.from(filteredTags.children).forEach(
            (elem) =>
              (elem.lastElementChild.onclick = (e) =>
                remove(e.currentTarget, selectedTagList))
          );
        }

        return "";
      })
    );

    //clear button in filterContainer
    clear.addEventListener("click", (e) => {
      selectedTagList = [];
      filter();
      e.currentTarget.parentElement.style.display = "none";
    });
  })
  .catch(console.log); // to add container to body

function remove(elem, array) {
  if (elem.parentElement.parentElement.children.length == 1) {
    elem.parentElement.parentElement.parentElement.style.display = "none";
    array.length = 0;
    elem.parentElement.remove();
    return filter();
  }
  array = array.filter((arr) => arr != elem.dataset.value);
  filter(array);
  return elem.parentElement.remove();
}

function filter(array = null) {
  let tags = document.querySelectorAll(".tags");
  if (array == null) {
    return tags.forEach((tag) => (tag.parentElement.style.display = "flex"));
  }
  for (let tag of tags) {
    let lis = Array.from(tag.children);

    let n = array.every((list) => {
      return lis.some((li) => (li.textContent == list ? true : false));
    });
    if (!n) {
      tag.parentElement.style.display = "none";
      continue;
    }

    tag.parentElement.style.display = "flex";
  }
}
