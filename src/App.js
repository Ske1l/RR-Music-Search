import { useEffect, useState, Fragment } from 'react'
import Gallery from './components/Gallery'
import Searchbar from './components/Searchbar'
import { DataContext } from './context/DataContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if (search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])

	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<DataContext.Provider value={data}>
			<div>
				{message}
				<Router>
					<Routes>
						<Route path="/" element={
							<Fragment>
								<Searchbar handleSearch={handleSearch} />
								<Gallery data={data} />
							</Fragment>
						} />
						<Route path="/album/:id" element={<AlbumView />} />
						<Route path="/artist/:id" element={<ArtistView />} />
					</Routes>
				</Router>
			</div>

		</DataContext.Provider>
	);
}

export default App;
