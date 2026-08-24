import * as THREE from 'three';
export class CollisionWorld{constructor(){this.boxes=[]}add(x,z,w,d){this.boxes.push({x,z,w:w/2,d:d/2})}test(p){let r=.34;return this.boxes.some(b=>Math.abs(p.x-b.x)<b.w+r&&Math.abs(p.z-b.z)<b.d+r)}}
