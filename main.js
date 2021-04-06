let user = "maketheweb";
const input_field_tag = document.getElementById("button-text");
const custom_button_tag = document.getElementById("custom-button");
const script_text_tag = document.getElementById("script-text");
const anchor_text_tag = document.getElementById("anchor-text");
//Set default values

let script_string = `&ltscript src="main.js"&gt&lt/script&gt`;
let button_value = input_field_tag.placeholder;
let href = `https://gum.co/demo/`;
let anchor_string = `&lta class="gumroad-button" href="${href}"&gt${button_value}&lt/a&gt`;

custom_button_tag.innerHTML = input_field_tag.placeholder;
anchor_text_tag.innerHTML = anchor_string;
script_text_tag.innerHTML = script_string;

//Checkboxes
const direct_payment = document.getElementById("payment");
const single_product = document.getElementById("single");
const show_button = document.getElementById("show-button");
let params = [];
let attributes = [];

input_field_tag.addEventListener("input", (e) => {
  button_value = e.target.value;

  console.log(button_value);
  if (button_value.length < 1) {
    custom_button_tag.innerHTML = input_field_tag.placeholder;
    anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
      href + params.join("")
    }"&gt${input_field_tag.placeholder}&lt/a&gt`;
  } else {
    custom_button_tag.innerHTML = button_value;
    anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
      href + params.join("")
    }"&gt${button_value}&lt/a&gt`;
  }
});

direct_payment.addEventListener("change", (e) => {
  if (e.target.checked) {
    //Insert into the element.
    params.push(`wanted?true`);
  } else {
    console.log("unchecked");
    params = params.filter((item) => item !== `wanted?true`);
  }
  anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
    href + params.join("")
  }"${attributes.join("")}&gt${button_value}&lt/a&gt`;
});

//Single payment set an attribute.
single_product.addEventListener("change", (e) => {
  if (e.target.checked) {
    //Insert into the element.
    attributes.push(` data-gumroad-single-product=true`);
  } else {
    console.log("unchecked");
    attributes = attributes.filter(
      (item) => item !== ` data-gumroad-single-product=true`
    );
  }
  anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
    href + params.join("")
  }"${attributes.join("")}&gt${button_value}&lt/a&gt`;
});

//Set custom url based on selected product.
product_select = document.getElementById("product");
product_select.addEventListener("change", (e) => {
  let curr_product = e.target.value;
  if (curr_product != "demo") {
    href = `https://${user}.gumroad.com/l/${curr_product}/`;
  } else {
    href = `https://gum.co/demo/`;
  }
  anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
    href + params.join("")
  }"${attributes.join("")}&gt${button_value}&lt/a&gt`;
});

//Embed the product intot the webpage itself.
embed = document.getElementById("embed");
embed.addEventListener("change", (e) => {
  if (e.target.checked) {
    attributes.push(` embed=true`);
    anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
      href + params.join("")
    }"${attributes.join("")}&gt${button_value}&lt/a&gt`;
  } else {
    attributes = attributes.filter((item) => item !== ` embed=true`);
    anchor_text_tag.innerHTML = `&lta class="gumroad-button" href="${
      href + params.join("")
    }"${attributes.join("")}&gt${button_value}&lt/a&gt`;
  }
});

//Get all tags that have links to gumroad products.
gumroad_buttons = document.querySelectorAll(".gumroad-button");
console.log(gumroad_buttons);

//Create iframe.
var base = document.createElement("div");
base.className = "iframe-containter";
base.style =
  "position:absolute;width:100%;height:100%;opacity:2.0;z-index:1;top:0; left:0";

iframe = document.createElement("iframe");
iframe.style =
  "position:relative; left:25%; top:25%; width:600px; height:600px;z-index:200; opacity:1";

//body
var body = document.getElementsByTagName("body")[0];
let hrefs = [];

gumroad_buttons.forEach((item, index) => {
  item.style =
    "padding: 10px; text-decoration:none; color:black; border: 1px solid black; border-radius: 3px";
  hrefs.push(item.getAttribute("href"));
  if (item.hasAttribute("embed")) {
    item.style = "display:none";
    var embed = document.createElement("embed");
    embed.style = "width:100%; height: 100vh";
    embed.setAttribute("src", hrefs[index]);
    body.appendChild(embed);
  } else {
    item.setAttribute("href", "#");
    item = item.addEventListener("click", () => {
      document.body.appendChild(base);
      iframe.setAttribute("src", hrefs[index]);
      base.appendChild(iframe);
    });
  }
});

console.log(hrefs);

base.addEventListener("click", () => {
  iframe.remove();
  base.remove();
});
