//c = 0

i//f firstArray[x] = = secondArray[x] add1 to counter —> c = c+1

//takes in 2 arrays and checks pairs of fields 
// c represents the numbers of matches between the arrays

function compare(firstA, secondA) {

		var n = 0
		var c = 0

	for (i = 0; i < firstA.length; i++) {
		
		if ( firstA[n] == secondA[n] ) { 
			var c = c + 1 }

		else { 
			var n = n + 1 }


	}
	return c / firstA.length 
}

	//if c / either.length > 80% return 


function match(object1, object2) {

	if (compare(object1.resultsBin, object1.resultsBin) > 0.75 ) {
		//1 is match 0 no match
		return 1
	}
	else {return 0}


}