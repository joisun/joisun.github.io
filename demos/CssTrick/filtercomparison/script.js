function handleInput(el) {
  let unit = "%";
  if (el.name === "blur") {
    unit = "px";
  } else if (el.name === "hue-rotate") {
    unit = "deg";
  }
  document
    .querySelector(":root")
    .style.setProperty(`--${el.name}`, el.value + unit);
  // let r = document.querySelector(":root").style.getPropertyValue(`--${el.name}`);
  el.parentNode.children[0].textContent = `${el.name}(${el.value}${unit})`;
}