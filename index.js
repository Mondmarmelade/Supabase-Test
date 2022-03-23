const supabaseUrl = "https://ykkkmxqmnjbzcsgqwmph.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra2tteHFtbmpiemNzZ3F3bXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1MzY1NjYsImV4cCI6MTk2MzExMjU2Nn0.V1kNRTZf-tSQDGwftoTSD_UAOin6IV06DBqXN43_NXU";

var supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function getRow() {
  let { data: Data, error } = await supabase.from("Data").select("*");
  console.log(Data);
}

async function writeData() {
  event.preventDefault();
  const input = document.getElementById("input");
  newData = input.value;
  console.log(input.value);
  const { data, error } = await supabase
    .from("Data")
    .insert([{ content: newData }]);
  input.value = "";
}

const Data = supabase
  .from("Data")
  .on("*", (payload) => {
    console.log("Change received!", payload);
  })
  .subscribe();

getRow();
