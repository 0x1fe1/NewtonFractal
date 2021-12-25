class Plane {
	constructor(center, size, dim) {
		this.pos = center // position of the center of the plane { x, y }
		this.size = size // screen size { x, y }
		this.dim = dim // range of values for x-axis and y-axis { x, y }
	}

	graph(p) {
		const step = this.dim.x / this.size.x
		const points = []
		for (let x = -this.dim.x; x < this.dim.x; x += step) {
			const y = p.eval(x)
			if (abs(y) > this.dim.y) continue
			points.push({ x: x / 2, y: y / 2 })
		}
		stroke('lightgreen')
		strokeWidth(3)
		for (let i = 0; i < points.length - 1; i++) {
			this.plotLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
		}
	}

	plotPoint(x, y, r) {
		const screenX = (x / this.dim.x) * this.size.x + this.pos.x
		const screenY = (y / this.dim.y) * this.size.y + this.pos.y

		point(screenX, screenY, r)
	}

	plotLine(x1, y1, x2, y2) {
		const screenX1 = (x1 / this.dim.x) * this.size.x + this.pos.x
		const screenY1 = (y1 / this.dim.y) * this.size.y + this.pos.y

		const screenX2 = (x2 / this.dim.x) * this.size.x + this.pos.x
		const screenY2 = (y2 / this.dim.y) * this.size.y + this.pos.y

		line(screenX1, screenY1, screenX2, screenY2)
	}

	render(isComplex) {
		fill('black')
		rectMode('CENTER')
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
		ctx.fill()
		ctx.font = `1.5rem Fira Code`
		ctx.textAlign = 'right'

		const xStep = this.size.x / (2 * this.dim.x)
		const yStep = this.size.y / (2 * this.dim.y)

		for (let x = 0; x < this.dim.x; x++) {
			const screenX = this.pos.x + x * xStep

			stroke('hsla(210, 60%, 60%, 1)')

			for (let dx = 0; dx < 1; dx += 0.5) {
				const screenDX = screenX + dx * xStep

				strokeWidth(0.5)
				line(screenDX, this.pos.y - this.size.y / 2, screenDX, this.pos.y + this.size.y / 2)
				line(-screenDX, this.pos.y - this.size.y / 2, -screenDX, this.pos.y + this.size.y / 2)
			}

			strokeWidth(1.5)
			line(screenX, this.pos.y - this.size.y / 2, screenX, this.pos.y + this.size.y / 2)
			line(-screenX, this.pos.y - this.size.y / 2, -screenX, this.pos.y + this.size.y / 2)

			fill('hsla(0, 0%, 80%, 1)')
			text(`${x}`, screenX - 5, -25)
			text(`${x === 0 ? '' : -x}`, -screenX - 5, -25)
		}

		fill('hsla(0, 0%, 80%, 1)')
		text(`${this.dim.x}`, this.pos.y + this.dim.y * yStep - 5, -25)

		for (let y = 0; y < this.dim.y; y++) {
			const screenY = this.pos.y + y * yStep

			stroke('hsla(210, 60%, 60%, 1)')

			for (let dy = 0; dy < 1; dy += 0.5) {
				const screenDY = screenY + dy * yStep

				strokeWidth(0.5)
				line(this.pos.x - this.size.x / 2, screenDY, this.pos.x + this.size.x / 2, screenDY)
				line(this.pos.x - this.size.x / 2, -screenDY, this.pos.x + this.size.x / 2, -screenDY)
			}

			strokeWidth(1.5)
			line(this.pos.x - this.size.x / 2, screenY, this.pos.x + this.size.x / 2, screenY)
			line(this.pos.x - this.size.x / 2, -screenY, this.pos.x + this.size.x / 2, -screenY)

			if (y === 0) continue
			fill('hsla(0, 0%, 80%, 1)')
			if (y === 1) {
				text(`${isComplex ? 'i' : '1'}`, -5, screenY - 25)
				text(`${isComplex ? '-i' : '-1'}`, -5, -screenY - 25)
				continue
			} else {
				text(`${isComplex ? y + 'i' : y}`, -5, screenY - 25)
				text(`${isComplex ? -y + 'i' : -y}`, -5, -screenY - 25)
			}
		}

		fill('hsla(0, 0%, 80%, 1)')
		text(`${this.dim.y}${isComplex ? 'i' : ''}`, -5, this.pos.y + this.dim.y * yStep - 25)

		stroke('hsla(0, 0%, 80%, 1)')
		strokeWidth(2)
		line(this.pos.x - this.size.x / 2, this.pos.y, this.pos.x + this.size.x / 2, this.pos.y)
		line(this.pos.x, this.pos.y - this.size.y / 2, this.pos.x, this.pos.y + this.size.y / 2)
	}
}
