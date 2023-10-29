import { useState, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = () => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numSet = "0123456789";
    const charSet = "!@#$%&*";
    numberAllow ? (string += numSet) : null;
    charAllow ? (string += charSet) : null;

    for (let i = 1; i <= length; i++) {
      const charIndx = Math.floor(Math.random() * string.length);
      pass += string[charIndx];
    }
    setPassword(pass);
  };
  const copyPassword = ()=>{
    // window.navigator.clipboard.writeText(password);
    // alert("Password has been copied.");
    passRef.current.select();
    document.execCommand("copy");
  }

  useEffect(() => passwordGenerator(), [length, numberAllow, charAllow]);

  return (
    <>
      <div className="w-full rounded-sm p-6 flex justify-center ">
        <div className="flex flex-col items-center p-3">
          <div className="mb-1 text-md sm:text-lg lg:text-2xl lg:mb-3">
            <h1>Random Password Generator</h1>
          </div>
          <div className="bg-zinc-700 shadow-lg shadow-black p-4 max-[400px]:p-2 max-[400px]:max-w-[280px] max-[500px]:max-w-[380px]  max-w-[600px] lg:min-w-[800px] rounded-md flex flex-col items-center justify-center">
            <div className="flex">
              <input
                type="text"
                placeholder="password"
                value={password}
                className="px-3 rounded-l-xl max-[400px]:w-[200px] max-[500px]:w-[300px] w-[400px] lg:min-w-[600px] text-black font-semibold outline-none"
                readOnly
                ref={passRef}
              ></input>
              <button className="max-[400px]:text-sm p-3 max-[400px]:p-0 bg-blue-700 rounded-r-xl shrink-0"
              onClick={copyPassword}
              >
                Copy
              </button>
            </div>
            <div className="p-2 flex max-[400px]:flex-col flex-row justify-between text-orange-400 font-semibold lg:min-w-[600px]">
              <div>
                <input
                  type="range"
                  min={6}
                  max={25}
                  id="range"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                ></input>
                <label htmlFor="range" className="pr-3">
                  Length: {length}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={numberAllow}
                  id="num"
                  onChange={() => setNumberAllow((prev) => !prev)}
                ></input>
                <label htmlFor="num" className="pr-3">
                  Numbers
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={charAllow}
                  id="char"
                  onChange={() => setCharAllow((prev) => !prev)}
                ></input>
                <label htmlFor="char">Special characters</label>
              </div>
            </div>
            <button
              className="bg-orange-600 px-2 rounded-lg shadow-lg shadow-red-500 m-2"
              onClick={passwordGenerator}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
