export interface Landmark {
  id: number
  name: string
  type: 'tower' | 'mountain' | 'temple' | 'bridge' | 'castle'
  x: number
  y: number
}

export const landmarks: Landmark[] = [
  { id: 1, name: "Tower", type: "tower", x: 10, y: 20 },
  { id: 2, name: "Mountain", type: "mountain", x: 28, y: 35 },
  { id: 3, name: "Temple", type: "temple", x: 50, y: 25 },
  { id: 4, name: "Bridge", type: "bridge", x: 72, y: 40 },
  { id: 5, name: "Castle", type: "castle", x: 88, y: 30 },
]
