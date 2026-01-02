// import { useState } from "react";
import "./App.css";
import { getPosition } from "./Position.tsx";
import { getKey } from "./getShopLists.ts";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>myfirstapp</h1>
      <button onClick={getPosition}>位置情報を取得する</button>
      <p>
        位置情報を取得するボタンをクリックすると、現在地の緯度と経度が表示されます。
      </p>
      <button onClick={getKey}>店舗情報を取得する</button>
    </>
  );
}

export default App;
