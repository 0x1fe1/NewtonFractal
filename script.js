//#region // *** Basics *** //
const cnv = document.querySelector('.cnv')
const ctx = cnv.getContext('2d', { alpha: false })
const width = 800
const height = 800
cnv.width = width
cnv.height = height
let doLoop = true
let time = 0
const delta = 1 / 60
//#endregion

//#region // *** Variables *** //

// const z = new Complex(0, 1)
// z.print('z:')
// const w = new Complex(0, 1)
// w.print('w:')

// let p = new Polynomial([-4, 0, 1])
const p = new Polynomial(new Array(10).fill().map(() => round(random([random(-1, 1), 0]), 3)))
p.print('p:')

const n = new Newton(p)

const plane = new Plane({ x: 0, y: 0 }, { x: width, y: height }, { x: 4, y: 4 })
//#endregion

//#region // *** Setup *** //
function setup() {
	translate(width * 0.5, height * 0.5)
	loop()
}
//#endregion

//#region // *** Update *** //
function update(t) {
	// p.c = p.c.map((c, i) => c + getNoise(t, i, c) * 0.001)
}
//#endregion

//#region // *** Render *** //
function render() {
	background('hsla(210, 0%, 20%, 1)')

	plane.render(false)
	plane.graph(p)
}
//#endregion

//#region // *** Loop *** //
setup()
function loop() {
	update((time += delta))
	render()
		; (doLoop && setTimeout(loop, delta * 1000)) || console.log(`%c${'loop ended'}`, 'font-size: 1rem; color: lightblue')
}
//#endregion
