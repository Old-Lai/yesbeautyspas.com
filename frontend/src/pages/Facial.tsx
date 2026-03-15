import { services } from "../api/services";
export default function Facial() {
  return (
    <div>
      <h1>This is Facial</h1>
      <button onClick={handleClick}>Get Facial</button>
    </div>
  );
}

async function handleClick() {
  console.log("clicked");
  console.log(await services.get.all());
}
