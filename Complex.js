class Complex {
	constructor(a, b) {
		this.a = a
		this.b = b
	}

	getMagSq() {
		return this.a ** 2 + this.b ** 2
	}

	getMag() {
		return sqrt(this.a ** 2 + this.b ** 2)
	}

	getPolar() {
		const r = this.getMag()
		const t = atan2(this.a, this.b) // angle Theta
		return [r, t]
	}

	add(z) {
		if (!(z instanceof Complex)) return console.error('Complex add error', this, arguments)
		this.a += z.a
		this.b += z.b
		return this
	}

	sub(z) {
		if (!(z instanceof Complex)) return console.error('Complex sub error', this, arguments)
		this.a -= z.a
		this.b -= z.b
		return this
	}

	mult(z) {
		if (typeof z === 'number') {
			this.a *= z
			this.b *= z
			return this
		}
		if (!(z instanceof Complex)) return console.error('Complex mult error', this, arguments)
		this.a = round(this.a * z.a - this.b * z.b, 9)
		this.b = round(this.a * z.b + this.b * z.a, 9)
		return this
	}

	div(z) {
		if (typeof z === 'number') {
			this.a /= z
			this.b /= z
			return this
		}
		if (!(z instanceof Complex)) return console.error('Complex div error', this, arguments)

		const w = z.getInverse()
		this.a = round(this.a * w.a - this.b * w.b, 9)
		this.b = round(this.a * w.b + this.b * w.a, 9)
		return this
	}

	raiseToPower(n) {
		const z = this.copy()
		const [r, t] = z.getPolar()
		this.a = round(r ** n * cos(t * n), 9)
		this.b = round(r ** n * sin(t * n), 9)
		return this
	}

	getInverse() {
		const rSq = this.a ** 2 + this.b ** 2
		return new Complex(this.a / rSq, -this.b / rSq)
	}

	set(a, b) {
		this.a = a
		this.b = b
	}

	print(input) {
		const output = `${this.a} + ${this.b === 1 ? '' : this.b + '*'}i `
		console.log(`%c${input} ${output}`, 'font-size: 1rem; color: lightSeaGreen')
		console.log(this)
	}

	isNaN() {
		return isNaN(this.a) || isNaN(this.b)
	}

	round(p = 3) {
		return new Complex(round(this.a, p), round(this.b, p))
	}

	copy() {
		return new Complex(this.a, this.b)
	}
}
