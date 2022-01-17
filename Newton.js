// x[n+1] = x[n] - f(x[n]) / f'(x[n])

class Newton {
	constructor(p) {
		this.p = p
		this.dp = p.derivative()
		this.numRoots = p.c.length - 1
		this.roots = []
	}

	eval(x) {
		const numSteps = 100
		return this.getStep(x, numSteps)
	}

	getStep(x, n) {
		if (typeof x === 'number') {
			const numSteps = n
			const steps = []
			let output = x
			for (let i = 0; i < numSteps; i++) {
				const step = this.p.eval(output) / this.dp.eval(output)
				steps.push(step)
				output -= step
			}
			if (abs(output) > plane.dim.x * plane.dim.y) return NaN
			return round(output, 3)
		}

		if (x instanceof Complex) {
			const numSteps = n
			const steps = []
			let output = x.copy()
			for (let i = 0; i < numSteps; i++) {
				const step = this.p.eval(output).copy().div(this.dp.eval(output))
				output.sub(step)
			}
			if (output.getMag() > plane.dim.x * plane.dim.y) return NaN
			return output.round(3)
		}

		return console.error('error in getStep', x, n)
	}

	getRoots(a, b, c) {
		const tempRoots = []
		there: for (let x = a; x < b; x += c) {
			if (tempRoots.length >= this.numRoots) break there
			const root = this.eval(x)
			if (isNaN(root) || Math.abs(root) > 1000) continue
			if (tempRoots.includes(root)) continue
			tempRoots.push(root)
		}
		this.roots = tempRoots
		return this.roots
	}
}
