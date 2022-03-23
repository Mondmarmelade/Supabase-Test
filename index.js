const supabaseUrl = secrets.SUPABASE_URL;
const supabaseKey = secrets.SUPABASE_KEY;

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
