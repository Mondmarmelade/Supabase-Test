const supabaseUrl = "https://ykkkmxqmnjbzcsgqwmph.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra2tteHFtbmpiemNzZ3F3bXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1MzY1NjYsImV4cCI6MTk2MzExMjU2Nn0.V1kNRTZf-tSQDGwftoTSD_UAOin6IV06DBqXN43_NXU";

var supabase = supabase.createClient(supabaseUrl, supabaseKey);

const contentDiv = document.querySelector(".content");
const input = document.getElementById("input");
const input_something = document.querySelector(".input_something");

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

async function getRow() {
  let { data: Data, error } = await supabase.from("Data").select("*");
  Data.forEach((data) => {
    renderContent(data);
  });
}

async function writeData() {
  event.preventDefault();
  if (input.value == "") {
    return (input_something.style.color = "red");
  }
  newData = input.value;
  const { data, error } = await supabase
    .from("Data")
    .insert([{ content: newData }]);
  input.value = "";
  location.reload();
}

function renderContent(data) {
  let div = document.createElement("div");
  let title = document.createElement("p");
  let date = document.createElement("p");

  div.setAttribute("class", "item");
  title.textContent = data.content;
  date.textContent = formatDate(data.created_at);

  div.appendChild(title);
  div.appendChild(date);

  contentDiv.appendChild(div);
}

getRow();
