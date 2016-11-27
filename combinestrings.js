var testStarter = ["first", "second", "third", "last"]


function combineStrings(testStarter) {

	var n = 0
	var testNew = [testStarter[n]]

	for (i = 0; i < testStarter.length; i++) {
		
		n = n + 1
		testNew.push(testStarter[n])
		console.log(testNew)
	}
	return testNew


}