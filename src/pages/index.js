import axios from 'axios';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { TbTemperatureCelsius } from 'react-icons/tb'
import {
	IoMdSunny,
	IoMdRainy,
	IoMdCloudy,
	IoMdSnow,
	IoMdThunderstorm,
	IoMdSearch
} from 'react-icons/io'
import {
	BsCloudHaze2Fill,
	BsCloudDrizzleFill,
	BsEye,
	BsWater,
	BsThermometer,
	BsWind
} from 'react-icons/bs'


const inter = Inter({ subsets: ['latin'] })
const lang = 'ru'

export default function Home() {
	const apiKey = '243a539f310175bc8a187c9a25d535a5'
	const [data, setData] = useState(null)
	const [location, setLocation] = useState('Kharkiv')
	const [inputValue, setInputValue] = useState('')
	const [animate, setAnimate] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	const handleInput = (e) => {
		setInputValue(e.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue !== '') {
			setLocation(inputValue)
		}
		if (inputValue === '') {
			setAnimate(true);
			setTimeout(() => {
				setAnimate(false)
			}, 500);
		}
		setInputValue('')
	}

	useEffect(() => {
		setLoading(true)
		const response = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
		axios.get(response).then((res) => {
			setTimeout(() => {
				setData(res.data)
				setLoading(false)
			}, 1500);
			console.log(res.data);
		}).catch(err => {
			setLoading(false)
			setErrorMsg(err)
		})
	}, [location]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrorMsg('')
		}, 2000);
		return () => clearTimeout(timer)
	}, [errorMsg])

	if (!data) {
		return (
			<div className='w-full h-screen bg-gradientBg flex flex-col justify-center items-center'>
				<div>
					<ImSpinner8 className='text-5xl animate-spin text-white' />
				</div>
			</div>
		)
	}

	let icon;
	switch (data.weather[0].main) {
		case 'Clouds':
			icon = <IoMdCloudy />;
			break;
		case 'Haze':
			icon = <BsCloudHaze2Fill />;
			break;
		case 'Rain':
			icon = <IoMdRainy className='text-[#31cafb]' />;
			break;
		case 'Clear':
			icon = <IoMdSunny className='text-[#ffde33]' />;
			break;
		case 'Drizzle':
			icon = <BsCloudDrizzleFill className='text-[#31cafb]' />;
			break;
		case 'Snow':
			icon = <IoMdSnow className='text-[#31cafb]' />;
			break;
		case 'Thunderstorm':
			icon = <IoMdThunderstorm />;
			break;
	}

	const date = new Date()
	return (
		// <div className='w-full h-screen bg-gradientBg flex flex-col items-center justify-center px-4 lg:px-0'>
		// 	{errorMsg && (
		// 		<div className='w-full max-w-[90vh] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2
		// 		lg:top-10 p-4 capitalize rounded-md'>
		// 			{`${errorMsg.response.data.message}`}
		// 		</div>
		// 	)}
		// 	{/* form */}
		// 	<form
		// 		className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px]  rounded-full backdrop-blur-[32px] mb-8`}
		// 		action="#">
		// 		<div className='h-full relative flex items-center justify-between p-2'>
		// 			<input
		// 				onChange={handleInput}
		// 				className='flex-1 bg-transparent outline-none placeholder:text-white text-white
		// 				text-[15px] font-light pl-6 h-full'
		// 				type="text"
		// 				value={inputValue}
		// 				placeholder='Search by city country' />
		// 			<button
		// 				className='bg-[#dd793b] hover:bg-[#ed8f48] w-20 h-12 rounded-full flex justify-center items-center'
		// 				onClick={(e) => handleSubmit(e)}>
		// 				<IoMdSearch className='text-2xl text-white' />
		// 			</button>
		// 		</div>
		// 	</form>
		// 	{/* card */}
		// 	<div className='w-full max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px] 
		// 	rounded-[32px] bg-black/20 py-12 px-6'>
		// 		{loading ?
		// 			<div className='w-full h-full flex justify-center items-center'>
		// 				<ImSpinner8 className='text-white text-5xl animate-spin' />
		// 			</div>
		// 			:
		// 			<div>
		// 				{/* card top */}
		// 				<div className='bg-pink-100/30 flex items-center gap-x-5'>
		// 					{/* icon */}
		// 					<div className='text-[87px]'>{icon}</div>
		// 					<div>
		// 						{/* country name */}
		// 						<div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
		// 						{/* date */}
		// 						<div>{date.getUTCDate() >= 10 ? date.getUTCDate() : '0' + date.getUTCDate()}/
		// 							{date.getUTCMonth() >= 10 ? date.getUTCMonth() : '0' + date.getUTCMonth()}/
		// 							{date.getUTCFullYear()}</div>
		// 					</div>
		// 				</div>
		// 				{/* card body */}
		// 				<div className='my-20'>
		// 					<div className='flex justify-center items-center'>
		// 						{/* temp */}
		// 						<div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
		// 						{/* celsius icon */}
		// 						<div className='text-4xl'>
		// 							<TbTemperatureCelsius />
		// 						</div>
		// 					</div>
		// 					{/* weather description */}
		// 					<div className='capitalize text-center'>{data.weather[0].description}</div>
		// 				</div>
		// 				{/* card bottom */}
		// 				<div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
		// 					<div className='flex justify-between'>
		// 						<div className='flex items-center gap-x-2'>
		// 							{/* icon */}
		// 							<div className='text-[20px]'>
		// 								<BsEye />
		// 							</div>
		// 							<div>Visibility <span className='ml-2'>{data.visibility / 1000} km</span></div>
		// 						</div>
		// 						<div className='flex items-center gap-x-2'>
		// 							{/* icon */}
		// 							<div className='text-[20px]'>
		// 								<BsThermometer />
		// 							</div>
		// 							<div className='flex'>Feels like
		// 								<div className='flex ml-2'>{parseInt(data.main.feels_like)}</div>
		// 								<TbTemperatureCelsius />
		// 							</div>
		// 						</div>
		// 					</div>
		// 					<div className='flex justify-between'>
		// 						<div className='flex items-center gap-x-2'>
		// 							{/* icon */}
		// 							<div className='text-[20px]'>
		// 								<BsWater />
		// 							</div>
		// 							<div>Humidity
		// 								<span className='ml-2'>{data.main.humidity} %</span>
		// 							</div>
		// 						</div>
		// 						<div className='flex items-center gap-x-2'>
		// 							{/* icon */}
		// 							<div className='text-[20px]'>
		// 								<BsWind />
		// 							</div>
		// 							<div>Wind
		// 								<span className='ml-2'>{parseInt(data.wind.speed)} m/s</span>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		}
		// 	</div>
		// </div>
		<div className='w-full h-screen bg-gradientBg flex flex-col items-center justify-center px-4 lg:px-0'>
			{errorMsg && (
				<div className='w-full max-w-[90vh] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2
				lg:top-10 p-4 capitalize rounded-md'>
					{`${errorMsg.response.data.message}`}
				</div>
			)}
			{/* form */}
			<form
				className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px]  rounded-full backdrop-blur-[32px] mb-8`}
				action="#">
				<div className='h-full relative flex items-center justify-between p-2'>
					<input
						onChange={handleInput}
						className='flex-1 bg-transparent outline-none placeholder:text-white text-white
						text-[15px] font-light pl-6 h-full'
						type="text"
						value={inputValue}
						placeholder='Search by city country' />
					<button
						className='bg-[#dd793b] hover:bg-[#ed8f48] w-20 h-12 rounded-full flex justify-center items-center'
						onClick={(e) => handleSubmit(e)}>
						<IoMdSearch className='text-2xl text-white' />
					</button>
				</div>
			</form>
			{/* card */}
			<div className='w-full max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px] 
			rounded-[32px] bg-black/20 py-12 px-6'>
				{loading ?
					<div className='w-full h-full flex justify-center items-center'>
						<ImSpinner8 className='text-white text-5xl animate-spin' />
					</div>
					:
					<div>
						{/* card top */}
						<div className='flex items-center gap-x-5'>
							{/* icon */}
							<div className='text-[87px]'>{icon}</div>
							<div>
								{/* country name */}
								<div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
								{/* date */}
								<div>{date.getUTCDate() >= 10 ? date.getUTCDate() : '0' + date.getUTCDate()}/
									{date.getUTCMonth() >= 10 ? date.getUTCMonth() : '0' + date.getUTCMonth()}/
									{date.getUTCFullYear()}</div>
							</div>
						</div>
						{/* card body */}
						<div className='my-20'>
							<div className='flex justify-center items-center'>
								{/* temp */}
								<div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
								{/* celsius icon */}
								<div className='text-4xl'>
									<TbTemperatureCelsius />
								</div>
							</div>
							{/* weather description */}
							<div className='capitalize text-center'>{data.weather[0].description}</div>
						</div>
						{/* card bottom */}
						<div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
							<div className='flex justify-between'>
								<div className='flex items-center gap-x-2'>
									{/* icon */}
									<div className='text-[20px]'>
										<BsEye />
									</div>
									<div>Visibility <span className='ml-2'>{data.visibility / 1000} km</span></div>
								</div>
								<div className='flex items-center gap-x-2'>
									{/* icon */}
									<div className='text-[20px]'>
										<BsThermometer />
									</div>
									<div className='flex'>Feels like
										<div className='flex ml-2'>{parseInt(data.main.feels_like)}</div>
										<TbTemperatureCelsius />
									</div>
								</div>
							</div>
							<div className='flex justify-between'>
								<div className='flex items-center gap-x-2'>
									{/* icon */}
									<div className='text-[20px]'>
										<BsWater />
									</div>
									<div>Humidity
										<span className='ml-2'>{data.main.humidity} %</span>
									</div>
								</div>
								<div className='flex items-center gap-x-2'>
									{/* icon */}
									<div className='text-[20px]'>
										<BsWind />
									</div>
									<div>Wind
										<span className='ml-2'>{parseInt(data.wind.speed)} m/s</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}
