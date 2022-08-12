const linkForm = document.getElementById("link-form");
const input = document.getElementById("link-input");
const errMsg = document.getElementById("err-msg");

linkForm.addEventListener("submit", formSubmit);

const isValidUrl = urlString => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

// Create shorten link id
function makeId(length) {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => char[Math.floor(Math.random() * char.length)]
  ).join("");
}

function formSubmit(e) {
  // Prevent the page from refreshing on submit
  e.preventDefault();

  // @todo display to the DOM the shortened version
  function displayToDom(input) {
    // Values
    const value = input;
    const shortenedLink = `https://rel.ink/${makeId(6)}`;
    // Create DOM elements

    // Parent Container
    const shortenContainer = document.getElementById("shorten-container");
    // Containing div
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "bg-white",
      "justify-center",
      "items-center",
      "p-6",
      "rounded-lg",
      "space-y-1",
      "md:flex-row",
      "md:space-y-0",
      "md:justify-between"
    );

    // Right side div
    const divRightSide = document.createElement("div");
    divRightSide.classList.add("font-bold");
    divRightSide.innerText = value;

    // Left side
    const divLeftSide = document.createElement("div");
    divLeftSide.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "space-y-2",
      "md:flex-row",
      "md:space-y-0",
      "md:space-x-5"
    );

    // Left side inner elements
    const innerDivLeftSide = document.createElement("div");
    innerDivLeftSide.classList.add("font-bold", "text-cyan");
    innerDivLeftSide.innerText = shortenedLink;

    const innerBtnLeftSide = document.createElement("button");
    innerBtnLeftSide.classList.add(
      "px-8",
      "py-2",
      "bg-cyan",
      "text-white",
      "rounded-lg",
      "w-fit",
      "hover:bg-cyanLight"
    );
    innerBtnLeftSide.innerText = "Copy";
    divLeftSide.append(innerDivLeftSide, innerBtnLeftSide);

    div.append(divRightSide, divLeftSide);
    shortenContainer.prepend(div);
  }
  // Check if the url is valid
  isValidUrl(input.value)
    ? ((errMsg.innerText = ""),
      input.classList.remove("border-red"),
      displayToDom(input.value))
    : ((errMsg.innerText = "Please enter a valid URL"),
      input.classList.add("border-red"));
}
