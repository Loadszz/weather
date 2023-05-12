// export default async function handler(req, res) {
// 	const { location } = req.query
// 	const apiKey = '243a539f310175bc8a187c9a25d535a5'

// 	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
// 	const data = await response.json()

// 	res.status(200).json(data)
// }