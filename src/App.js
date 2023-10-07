import React, { useCallback, useEffect, useState, useRef } from 'react'
// import './App.css';

function App() {
	const [password, setPassword] = useState("")
	const [length, setLength] = useState(8)
	const [charAllowed, setCharAllowed] = useState(false)
	const [numAllowed, setNumAllowed] = useState(false)

	const passwordRef = useRef(null)

	const passwordGenerator = useCallback(() => {
		let pass = ""
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
		if (numAllowed) str += "0123456789"
		if (charAllowed) str += "!@#$%^&*()_+{}=`"
		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1)
			pass += str.charAt(char)
		}
		setPassword(pass)
	}, [length, numAllowed, charAllowed])

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select()
		// passwordRef.current?.setSelectionRange(0,3)
		window.navigator.clipboard.writeText(password)
	}, [password])
	useEffect(() => {
		passwordGenerator()
	}, [length, numAllowed, charAllowed, passwordGenerator])
	return (
		<div className="App container p-5">
			<div className='row'>
				<div className='col-sm-3'></div>
				<div className='col-sm-6'>
					<h1>Password Generator</h1>
					<div className='input-group'>
						<input type='text' className='form-control' readOnly value={password} ref={passwordRef} />
						<button className='btn btn-success' onClick={copyPasswordToClipboard}>Copy</button>
					</div>

					<div className='row mt-3'>
						<div className='col-sm-2'>Length</div>
						<div className='col-sm-10'><input type="range" min={8} max={20} value={length} onChange={(e) => setLength(e.target.value)} /></div>
					</div>

					<div className='row'>
						<div className='col-sm-3'>Numbers</div>
						<div className='col-sm-9'><input type='checkbox' onChange={() => { setNumAllowed((prev) => !prev) }} /></div>
					</div>
					<div className='row'>
						<div className='col-sm-3'>Symbols</div>
						<div className='col-sm-9'><input type='checkbox' onChange={() => { setCharAllowed((prev) => !prev) }} /></div>
					</div>

					<div className='input-group mt-3'>

					</div>

				</div>
				<div className='col-sm-3'></div>
			</div>

		</div>
	);
}

export default App;
