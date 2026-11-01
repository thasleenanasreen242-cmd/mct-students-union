"use client";

import type * as THREE from "three";
import { useEffect, useRef, useState } from "react";

type Landmark = "bench" | "counsel" | "witness" | "gallery";

const landmarkCopy: Record<Landmark, { title: string; detail: string }> = {
  bench: { title: "The Judge's Bench", detail: "The elevated bench represents the court's authority and the responsibility to hear each side impartially." },
  counsel: { title: "Counsel Tables", detail: "Counsel tables are where advocates organise submissions, examine records and present arguments." },
  witness: { title: "Witness Box", detail: "The witness box is where testimony is given and carefully tested through examination." },
  gallery: { title: "Public Gallery", detail: "The public gallery reflects the open-court principle and the public's right to observe proceedings, subject to legal restrictions." },
};

export default function VirtualCourtroom() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Landmark>("bench");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let frame = 0;
    let cleanup = () => {};
    const mount = mountRef.current;
    if (!mount) return;

    const build = async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        if (disposed) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#101f30");
        scene.fog = new THREE.Fog("#101f30", 15, 34);
        const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
        camera.position.set(0, 5.8, 13.5);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        mount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 2.5, -1);
        controls.enableDamping = true;
        controls.dampingFactor = 0.055;
        controls.minDistance = 5;
        controls.maxDistance = 19;
        controls.maxPolarAngle = Math.PI * 0.48;
        controls.minPolarAngle = 0.35;
        controls.enablePan = true;
        controls.panSpeed = 0.55;
        controls.rotateSpeed = 0.55;
        controls.zoomSpeed = 0.8;
        renderer.domElement.style.touchAction = "none";

        scene.add(new THREE.HemisphereLight("#dce8f3", "#302116", 2.1));
        const warm = new THREE.DirectionalLight("#ffe2b1", 3.2);
        warm.position.set(-5, 11, 7);
        warm.castShadow = true;
        warm.shadow.mapSize.set(1024, 1024);
        scene.add(warm);
        const fill = new THREE.PointLight("#d6e7ff", 24, 22);
        fill.position.set(5, 6, -5);
        scene.add(fill);

        const materials = {
          wall: new THREE.MeshStandardMaterial({ color: "#243c53", roughness: 0.88 }),
          wood: new THREE.MeshStandardMaterial({ color: "#603b28", roughness: 0.38 }),
          woodLight: new THREE.MeshStandardMaterial({ color: "#986c42", roughness: 0.4 }),
          gold: new THREE.MeshStandardMaterial({ color: "#c9a768", metalness: 0.62, roughness: 0.3 }),
          stone: new THREE.MeshStandardMaterial({ color: "#b9ae99", roughness: 0.68 }),
          floor: new THREE.MeshStandardMaterial({ color: "#4b3a31", roughness: 0.55 }),
          dark: new THREE.MeshStandardMaterial({ color: "#172838", roughness: 0.8 }),
          leather: new THREE.MeshStandardMaterial({ color: "#3b2521", roughness: 0.72 }),
        };
        const box = (w:number,h:number,d:number,mat:THREE.Material,x:number,y:number,z:number) => {
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
          mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh); return mesh;
        };
        const cylinder = (rt:number,rb:number,h:number,mat:THREE.Material,x:number,y:number,z:number) => {
          const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,24),mat);
          mesh.position.set(x,y,z); mesh.castShadow=true; scene.add(mesh); return mesh;
        };

        box(22,.35,24,materials.floor,0,-.22,-2);
        box(22,8,.45,materials.wall,0,4,-13);
        box(.45,8,24,materials.wall,-11,4,-2);
        box(.45,8,24,materials.wall,11,4,-2);
        box(22,.35,24,materials.dark,0,8,-2);
        // Rear wall panelling and judicial crest
        for(let x=-9;x<=9;x+=3) box(.09,6,.12,materials.gold,x,4.3,-12.72);
        box(3.2,.12,.18,materials.gold,0,6.2,-12.68);
        box(3.2,.12,.18,materials.gold,0,2.2,-12.68);
        const crest = new THREE.Mesh(new THREE.TorusGeometry(.72,.055,12,64),materials.gold);
        crest.position.set(0,5.15,-12.55); scene.add(crest);
        const crestBar=box(.08,1.15,.08,materials.gold,0,5.15,-12.5);
        crestBar.rotation.z=Math.PI/8;
        // Classical columns on either side
        for(const x of [-9.1,9.1]) {
          cylinder(.42,.5,6.4,materials.stone,x,3.2,-9.5);
          cylinder(.68,.68,.22,materials.gold,x,6.45,-9.5);
          cylinder(.68,.68,.22,materials.gold,x,.1,-9.5);
        }
        // Raised judicial dais, bench and high-backed chair
        box(8,.42,3.1,materials.woodLight,0,.25,-9.4);
        box(7.8,1.05,1.2,materials.wood,0,1,-10.35);
        box(7.9,.12,1.3,materials.gold,0,1.58,-10.35);
        box(5.5,1.15,.35,materials.leather,0,2.25,-11.1);
        box(5.8,.13,.42,materials.gold,0,1.72,-11.1);
        // Judge's chair
        box(1.65,2.6,.5,materials.leather,0,3.1,-11.6);
        box(1.9,.16,.58,materials.gold,0,4.38,-11.6);
        // Counsel tables, chairs and lecterns
        for(const x of [-4.5,4.5]) {
          box(3.6,.22,1.8,materials.wood,x,1.05,-4.7);
          box(3.5,.12,1.72,materials.woodLight,x,1.2,-4.7);
          for(const dx of [-1.35,1.35]) {
            box(.12,.85,.12,materials.wood,x+dx,.52,-5.25);
            box(.12,.85,.12,materials.wood,x+dx,.52,-4.15);
          }
          for(const cx of [-1,0,1]) {
            box(.72,.18,.72,materials.leather,x+cx*1.15,.65,-2.55);
            box(.72,.9,.16,materials.wood,x+cx*1.15,1.12,-2.85);
          }
        }
        // Witness box in the centre
        box(2.2,1.1,1.6,materials.wood,0,.75,-1.2);
        box(2.3,.13,1.7,materials.gold,0,1.35,-1.2);
        box(.12,1.2,.12,materials.wood, -1,.8,-.45);
        box(.12,1.2,.12,materials.wood, 1,.8,-.45);
        box(2.1,.1,.12,materials.gold,0,1.38,-.45);
        // Public gallery seating in rows
        for(let row=0;row<3;row++) {
          for(let col=-3;col<=3;col++) {
            const z=2.1+row*2.15;
            box(1.05,.22,.72,materials.woodLight,col*1.35,.72,z);
            box(1.05,.9,.16,materials.leather,col*1.35,1.18,z+.28);
          }
        }
        // Warm pendant lights
        for(const x of [-5,0,5]) {
          cylinder(.035,.035,1.2,materials.gold,x,7.2,-5);
          const lamp=new THREE.PointLight("#ffdda7",18,9);
          lamp.position.set(x,6.3,-5); scene.add(lamp);
          const shade=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),new THREE.MeshStandardMaterial({color:"#ffe2a6",emissive:"#b77b35",emissiveIntensity:1.2}));
          shade.position.set(x,6.15,-5); scene.add(shade);
        }
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const hitTargets: { mesh:THREE.Object3D; key:Landmark }[] = [];
        const addTarget=(key:Landmark,x:number,y:number,z:number)=>{
          const marker=new THREE.Mesh(new THREE.SphereGeometry(.22,20,20),new THREE.MeshStandardMaterial({color:"#e3c17b",emissive:"#9b7135",emissiveIntensity:.75}));
          marker.position.set(x,y,z); marker.userData.landmark=key; scene.add(marker); hitTargets.push({mesh:marker,key});
        };
        addTarget("bench",0,2.7,-10.7);
        addTarget("counsel",-4.5,1.9,-4.7);
        addTarget("witness",0,1.8,-1.2);
        addTarget("gallery",0,1.7,5.8);
        const onClick=(event:PointerEvent)=>{
          const rect=renderer!.domElement.getBoundingClientRect();
          pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
          pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
          raycaster.setFromCamera(pointer,camera);
          const hit=raycaster.intersectObjects(hitTargets.map(t=>t.mesh),false)[0];
          if(hit?.object.userData.landmark) window.dispatchEvent(new CustomEvent("courtroom-landmark",{detail:hit.object.userData.landmark}));
        };
        renderer.domElement.addEventListener("click",onClick);
        const resize=()=>{
          if(!mount || !renderer) return;
          const width=mount.clientWidth, height=mount.clientHeight;
          if(!width||!height) return;
          camera.aspect=width/height; camera.updateProjectionMatrix(); renderer.setSize(width,height,false);
        };
        const observer=new ResizeObserver(resize); observer.observe(mount); resize();
        const animate=()=>{ if(disposed)return; frame=requestAnimationFrame(animate); controls.update(); renderer!.render(scene,camera); };
        animate();
        cleanup=()=>{ observer.disconnect(); renderer?.domElement.removeEventListener("click",onClick); controls.dispose(); scene.traverse(o=>{const m=o as THREE.Mesh;if(m.geometry)m.geometry.dispose();if(Array.isArray(m.material))m.material.forEach(v=>v.dispose());else if(m.material)m.material.dispose();}); };
        setReady(true);
      } catch (e) { console.error("Courtroom 3D could not initialise",e); setError(true); }
    };
    void build();
    return ()=>{disposed=true;cancelAnimationFrame(frame);cleanup();if(renderer){renderer.dispose();if(renderer.domElement.parentElement===mount)mount.removeChild(renderer.domElement);}};
  }, []);

  useEffect(()=>{
    const listener=(event:Event)=>setActive((event as CustomEvent<Landmark>).detail);
    window.addEventListener("courtroom-landmark",listener);
    return ()=>window.removeEventListener("courtroom-landmark",listener);
  },[]);

  const moveTo=(key:Landmark)=>{
    setActive(key);
    const targets:Record<Landmark,string>={bench:"bench",counsel:"counsel",witness:"witness",gallery:"gallery"};
    window.dispatchEvent(new CustomEvent("courtroom-focus",{detail:targets[key]}));
  };

  return (
    <section className="courtroom-section section-space" id="courtroom">
      <div className="site-container courtroom-immersive">
        <div className="courtroom-heading">
          <div className="eyebrow eyebrow-light"><span /> EXPERIENCE THE LAW</div>
          <h2>Enter the <em>moot courtroom.</em></h2>
          <p>Explore a navigable 3D courtroom. Drag to look around, scroll or pinch to move closer, and select a destination to explore.</p>
        </div>
        <div className="courtroom-viewport-shell">
          <div className="courtroom-viewport" ref={mountRef} aria-label="Interactive 3D virtual moot courtroom" role="application">
            {!ready && !error && <div className="courtroom-loading">Preparing your virtual courtroom…</div>}
            {error && <div className="courtroom-loading">3D view is unavailable on this device. Please try a WebGL-enabled browser.</div>}
            <div className="courtroom-hud"><span>LIVE 3D ENVIRONMENT</span><span>DRAG · ZOOM · EXPLORE</span></div>
          </div>
          <div className="courtroom-destinations">
            {(["bench","counsel","witness","gallery"] as Landmark[]).map((key,index)=>(
              <button type="button" key={key} className={active===key?"active":""} onClick={()=>moveTo(key)}><span>0{index+1}</span>{landmarkCopy[key].title}</button>
            ))}
          </div>
        </div>
        <div className="courtroom-detail" aria-live="polite"><span>NOW EXPLORING</span><strong>{landmarkCopy[active].title}</strong><p>{landmarkCopy[active].detail}</p></div>
      </div>
    </section>
  );
}
