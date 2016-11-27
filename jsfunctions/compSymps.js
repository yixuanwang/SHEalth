function compareSymptoms(symps1, symps2) {
	var matches = 0;
	for (int i = 0; i < symps1.length; i++) {
		if (symps1[i] === symps2[i] === 1) {
			matches++;
		}
	}
	return matches;
}