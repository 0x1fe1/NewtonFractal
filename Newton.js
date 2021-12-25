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
		const steps = []
		let output = x
		for (let i = 0; i < numSteps; i++) {
			const step = this.p.eval(output) / this.dp.eval(output)
			steps.push(step)
			output = output - step
		}
		if (badSteps(steps)) return NaN
		return round(output, 3)
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


function badSteps(s) {
	let out = false
	const ds = []
	for (let i = 0; i < s.length-1; i++) {
		ds.push(s[i+1]-s[i])
	}

	for (let i = 0; i < ds.length-1; i++) {
		if (Math.abs(ds[i+1]) > Math.abs(ds[i])) out = true
	}

	return out
}