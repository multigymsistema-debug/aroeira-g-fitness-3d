import * as THREE from 'three';
export function createWorld(scene,world,interactive){const mat={wall:new THREE.MeshStandardMaterial({color:0x383b3d,roughness:.86}),floor:new THREE.MeshStandardMaterial({color:0x686966,roughness:.92}),dark:new THREE.MeshStandardMaterial({color:0x111416,metalness:.5,roughness:.35}),gold:new THREE.MeshStandardMaterial({color:0xc9983e,metalness:.55,roughness:.3}),glass:new THREE.MeshStandardMaterial({color:0x99a7aa,metalness:.25,roughness:.18,transparent:true,opacity:.72}),rubber:new THREE.MeshStandardMaterial({color:0x151719,roughness:.96})};
const box=(x,y,z,w,h,d,m,coll=true)=>{let o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);if(coll)world.add(x,z,w,d);return o};
// Retângulo principal da referência: fachada na frente, fundo técnico ao norte.
box(0,-.08,0,12,.16,28,mat.floor,false);box(-6,1.45,0,.24,2.9,28,mat.wall);box(6,1.45,0,.24,2.9,28,mat.wall);box(0,1.45,-14,12,2.9,.24,mat.wall);box(-3.8,1.45,14,4.4,2.9,.24,mat.wall);box(5.0,1.45,14,2,2.9,.24,mat.wall);
// Entrada frontal ampla, com dois pilares e vão real para a rua.
box(-5.45,1.45,14,.8,2.9,.25,mat.wall);box(5.45,1.45,14,1.1,2.9,.25,mat.wall);box(3.15,.12,14.65,2.7,.24,.38,mat.dark,false);box(3.15,.3,15.2,3.2,.18,.3,mat.dark,false);
for(let i=-5;i<=5;i+=.7){let bush=new THREE.Mesh(new THREE.SphereGeometry(.22,7,5),new THREE.MeshStandardMaterial({color:0x315b35,roughness:1}));bush.position.set(i,.2,14.65);scene.add(bush)}
// Banheiro e pequeno ambiente de apoio no canto posterior esquerdo, conforme a planta.
box(-3.9,1.45,-11.5,4.0,2.9,.18,mat.wall);box(-5.85,1.45,-12.7,.18,2.9,2.6,mat.wall);box(-1.95,1.45,-12.7,.18,2.9,2.6,mat.wall);box(-3.9,1.45,-13.8,4.0,2.9,.18,mat.wall);addDoor(scene,world,interactive,-3.9,-12.7,'Banheiro');
// Parede divisória longitudinal central: separa musculação (esquerda) do salão aberto (direita).
// Ela desce desde o fundo até a área central inferior, deixando a passagem livre na frente.
box(0,1.45,-2.7,.24,2.9,22.2,mat.wall);
// Escada verdadeira no lado direito da área central/inferior, junto à parede externa.
for(let i=0;i<7;i++){let z=5.7-i*.42;box(4.55,.12+i*.19,z,2.0,.24+i*.38,.42,mat.wall);world.add(4.55,z,2.0,.42)}
box(5.52,1.15,4.35,.08,1.55,3.0,mat.gold,false);box(3.58,1.15,4.35,.08,1.55,3.0,mat.gold,false);
// Luminárias lineares distribuídas no teto.
for(let x=-4.5;x<=4.5;x+=2.25)for(let z=-10;z<=11;z+=4.2){let l=new THREE.Mesh(new THREE.BoxGeometry(1.35,.04,.2),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:1.8}));l.position.set(x,2.82,z);scene.add(l);let p=new THREE.PointLight(0xfaf4df,.48,7);p.position.set(x,2.65,z);scene.add(p)}
// Equipamentos concentrados na faixa lateral esquerda, mantendo corredores livres no centro.
bench(scene,world,-4.45,-8,'SUPINO RETO');bench(scene,world,-4.4,-4.9,'BANCO INCLINADO');cable(scene,world,-4.25,-1.7,'ESTAÇÃO DE CABOS');leg(scene,world,-4.25,2.1,'APARELHO DE PERNAS');bench(scene,world,-4.35,6,'BANCO DE SUPINO');dumbbells(scene,world,-4.4,9.5,'PESOS LIVRES');
// Cardio alinhado na frente/direita da planta.
treadmill(scene,world,3.0,10.0,'ÁREA DE CARDIO');treadmill(scene,world,4.55,10.0,'ÁREA DE CARDIO');bike(scene,world,4.05,8.0,'BICICLETAS');bike(scene,world,5.1,8.0,'BICICLETAS');
return {mat}}
function addDoor(scene,world,interactive,x,z,name){let d=new THREE.Mesh(new THREE.BoxGeometry(1.3,2.3,.12),new THREE.MeshStandardMaterial({color:0x76502b,roughness:.5}));d.position.set(x,1.15,z);d.userData={name,closed:true};scene.add(d);world.add(x,z,1.3,.2);interactive.push(d);return d}
function base(scene,world,x,z,w=1.5,d=.8){let o=new THREE.Group();o.position.set(x,0,z);let metal=new THREE.MeshStandardMaterial({color:0x6c747c,metalness:.75,roughness:.27}),black=new THREE.MeshStandardMaterial({color:0x14171a,roughness:.75});let post=new THREE.Mesh(new THREE.BoxGeometry(.12,1.5,.12),metal);post.position.y=.75;o.add(post);let seat=new THREE.Mesh(new THREE.BoxGeometry(w,.16,d),black);seat.position.set(.25,.7,0);o.add(seat);scene.add(o);world.add(x,z,w,d);return o}
function bench(s,w,x,z,n){let o=base(s,w,x,z,1.8,.75);o.rotation.y=.15;name(o,n)}function cable(s,w,x,z,n){let o=base(s,w,x,z,1.1,1);let top=new THREE.Mesh(new THREE.BoxGeometry(1.3,1.4,.1),new THREE.MeshStandardMaterial({color:0x30363c,metalness:.7}));top.position.y=1.7;o.add(top);name(o,n)}function leg(s,w,x,z,n){let o=base(s,w,x,z,1.6,1);o.rotation.y=-.25;name(o,n)}function dumbbells(s,w,x,z,n){for(let i=-2;i<=2;i++){let o=base(s,w,x+i*.45,z,.32,.55);name(o,n)}}function treadmill(s,w,x,z,n){let o=base(s,w,x,z,1.1,2);let belt=new THREE.Mesh(new THREE.BoxGeometry(1,.12,1.7),new THREE.MeshStandardMaterial({color:0x090a0b,roughness:1}));belt.position.y=.5;o.add(belt);name(o,n)}function bike(s,w,x,z,n){let o=base(s,w,x,z,.7,.9);let wheel=new THREE.Mesh(new THREE.TorusGeometry(.35,.05,8,16),new THREE.MeshStandardMaterial({color:0x252a2d,metalness:.7}));wheel.rotation.x=Math.PI/2;wheel.position.set(0,.35,.35);o.add(wheel);name(o,n)}function name(o,n){o.userData.name=n;o.userData.desc='Equipamento da Aroeira G Fitness'}
