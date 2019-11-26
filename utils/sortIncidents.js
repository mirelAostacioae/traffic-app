import moment from 'moment';
import severity from '../constants/severity';

export default ( a, b, field) =>  {
	let itemA = a[field];
	let itemB = b[field];
	const reverse = (itemA, itemB) => {
		if ( itemA > itemB ){
			return -1;
		}
		if ( itemA < itemB ){
			return 1;
		}
		return 0;
	}

	if ( field === 'severity' ){
		itemA = severity[a[field]].value;
		itemB = severity[b[field]].value;
		return reverse(itemA, itemB);
	}
	
	if ( field === 'lastUpdate' ){
		itemA = moment(a[field]);
		itemB = moment(b[field]);
		return reverse(itemA, itemB);
	}

	if ( itemA < itemB ){
		return -1;
	}
	if ( itemA > itemB ){
		return 1;
	}
	return 0;
}