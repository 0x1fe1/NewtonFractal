class Polynomial {
	constructor(coefficients) {
		if (coefficients == null) console.error('polynomial error', this, arguments)
		// c[0] * x^0 + c[1] * x^1 + c[2] * x^2 + ...
		this.c = coefficients
	}

	set(coefficients) {
		if (coefficients == null) console.error('polynomial error', this, arguments)
		// c[0] * x^0 + c[1] * x^1 + c[2] * x^2 + ...
		this.c = coefficients
	}

	eval(x) {
		if (typeof x == 'number') {
			let output = 0
			for (let i = 0; i < this.c.length; i++) {
				output += this.c[i] * x ** i
			}
			return output
		}

		if (x instanceof Complex) {
			let output = new Complex(0, 0)
			for (let i = 0; i < this.c.length; i++) {
				output.add(x.copy().raiseToPower(i).mult(this.c[i]))
			}
			return output
		}
	}

	derivative() {
		const dc = []
		for (let i = 1; i < this.c.length; i++) {
			dc.push(this.c[i] * i)
		}
		return new Polynomial(dc)
	}

	print(input = '') {
		let output = ``
		for (let i = 0; i < this.c.length; i++) {
			if (this.c[i] === 0) continue
			if (output.length > 0) output += '+ '
			const c = round(this.c[i], 3)
			if (i === 0) output += `${c} `
			if (i > 0) output += `${c === 1 ? '' : `${c}*`}x${i > 1 ? `^${i}` : ''} `
		}
		if (output === '') output = '0'
		console.log(`%c${input} ${output}`, 'font-size: 1rem; color: lightSkyBlue')
		console.log(this)
	}
}
