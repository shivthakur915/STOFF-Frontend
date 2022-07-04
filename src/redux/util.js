export const sum =(arr)=>{
	let total=0;
	arr.map((val)=>{
		total+=(val.price*val.quantity);
	})
	return total;
}