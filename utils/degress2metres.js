export default (lon, lat) => {
	const x = lon * 20037508.34 / 180;
	let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
	y = y * 20037508.34 / 180;
	return [x, y]
}