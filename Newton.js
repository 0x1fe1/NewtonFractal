// x[n+1] = x[n] - f(x[n]) / f'(x[n])

class Newton {
	constructor(p) {
		this.p = p
		this.dp = p.derivative()
		this.numSteps = 24
	}

	eval(x) {
		let output = x
		for (let i = 0; i < this.numSteps; i++) {
			output = output - this.p.eval(output) / this.dp.eval(output)
		}
		return round(output, 6)
	}
}
