export default (current, destination) => {
	const earthRadius = 6371; // earth radius
	let φ1 = deg2rad(parseFloat(current.latitude)),
			φ2 = deg2rad(parseFloat(destination.latitude)),
			Δλ = deg2rad(parseFloat(destination.longitude) - parseFloat(current.longitude)),
			R = 6371e3; // gives d in metres
	var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R
	return (d*0.001).toFixed(2)
}
const deg2rad = (deg) => {
	return deg * (Math.PI/180);
}