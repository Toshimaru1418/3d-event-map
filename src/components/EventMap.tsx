'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Booth {
  id: number
  position: [number, number, number]
  size: [number, number, number]
  name: string
  description: string
  link: string
  image: string
  image2: string
}

const booths: Booth[] = [
  // 上段（12ブース）
  { id: 12, position: [-22, 0, -34], size: [4, 1.5, 2], name: "株式会社井ゲタ竹内", description: "産直産地沖縄県恩納村産のモズクを通して、海を守り育む活動を皆さんと行っています。ブースでは試食の他に、サンゴの苗となる基台へのメッセージ描きを行います。是非、お越しください。", link: "https://www.igetatakeuchi.co.jp/", image: "/images/booth12-1.png?height=100&width=100", image2: "/images/booth12-2.jpg?height=100&width=100" },
  { id: 11, position: [-17, 0, -34], size: [2, 1.5, 2], name: "株式会社カジノヤ", description: "「ふっくら柔らか大豆の味がわかる納豆」造りを目指し、過度に量を求めず時間をかけ大豆を蒸し、ゆっくり発酵さ造っています。昭和21年創業、約80年間納豆の製造・販売のみ行ってきた「カジノヤ納豆」を是非お試し下さい。", link: "https://www.kajinoya.co.jp/", image: "/images/booth11-1.jpg?height=100&width=100", image2: "/images/booth11-2.png?height=100&width=100" },  
  { id: 10, position: [-14, 0, -34], size: [2, 1.5, 2], name: "株式会社中村商店", description: "株式会社中村商店", link: "https://example.com/booth3", image: "/images/booth10-1.jpg?height=100&width=100", image2: "/images/booth10-2.jpg?height=100&width=100" },  
  { id: 9, position: [-11, 0, -34], size: [2, 1.5, 2], name: "グリンリーフ株式会社", description: "グリンリーフ株式会社", link: "https://example.com/booth4", image: "/images/booth9-1.jpg?height=100&width=100", image2: "/images/booth9-2.jpg?height=100&width=100" },  
  { id: 8, position: [-8, 0, -34], size: [2, 1.5, 2], name: "株式会社河村屋", description: "株式会社河村屋", link: "https://example.com/booth5", image: "/images/booth8-1.jpg?height=100&width=100", image2: "/images/booth8-2.jpg?height=100&width=100" },  
  { id: 7, position: [-5, 0, -34], size: [2, 1.5, 2], name: "株式会社ふくれん", description: "株式会社ふくれん", link: "https://example.com/booth6", image: "/images/booth7-1.jpg?height=100&width=100", image2: "/images/booth7-2.jpg?height=100&width=100" },  
  { id: 6, position: [-2, 0, -34], size: [3, 1.5, 2], name: "お魚食べようブース", description: "お魚食べようブース", link: "https://example.com/booth7", image: "/images/booth6-1.jpg?height=100&width=100", image2: "/images/booth6-2.jpg?height=100&width=100" },  
  { id: 5, position: [1, 0, -34], size: [2, 1.5, 2], name: "平田産業有限会社", description: "平田産業有限会社", link: "https://example.com/booth8", image: "/images/booth5-1.jpg?height=100&width=100", image2: "/images/booth5-2.jpg?height=100&width=100" },  
  { id: 4, position: [4, 0, -34], size: [2, 1.5, 2], name: "北海道漁業協同組合連合会", description: "北海道漁業協同組合連合会", link: "https://example.com/booth9", image: "/images/booth4-1.jpg?height=100&width=100", image2: "/images/booth4-2.jpg?height=100&width=100" },  
  { id: 3, position: [7, 0, -34], size: [2, 1.5, 2], name: "水宗園本舗", description: "水宗園本舗", link: "https://example.com/booth10", image: "/images/booth3-1.jpg?height=100&width=100", image2: "/images/booth3-2.jpg?height=100&width=100" },  
  { id: 2, position: [10, 0, -34], size: [2, 1.5, 2], name: "JPホームサプライ株式会社", description: "JPホームサプライ株式会社", link: "https://example.com/booth11", image: "/images/booth2-1.jpg?height=100&width=100", image2: "/images/booth2-2.jpg?height=100&width=100" },  
  { id: 1, position: [15, 0, -34], size: [6, 1.5, 2], name: "ヱスケー石鹸株式会社", description: "ヱスケー石鹸株式会社", link: "https://example.com/booth12", image: "/images/booth1-1.jpg?height=100&width=100", image2: "/images/booth1-2.jpg?height=100&width=100" },
    
  // 左列（5ブース）
  { id: 13, position: [-27, 0, -28], size: [2, 1.5, 6], name: "株式会社スクロール", description: "株式会社スクロール", link: "https://example.com/booth13", image: "/images/booth13-1.jpg?height=100&width=100", image2: "/images/booth13-2.jpg?height=100&width=100" },  
  { id: 90, position: [-27, 0, -22], size: [2, 1.5, 3], name: "まとめ袋ヒツジ", description: "まとめ袋ヒツジ", link: "https://example.com/booth14", image: "/images/booth90-1.jpg?height=100&width=100", image2: "/images/booth90-2.jpg?height=100&width=100" },  
  { id: 91, position: [-27, 0, -18], size: [2, 1.5, 3], name: "リサイクル探し", description: "リサイクル探し", link: "https://example.com/booth15", image: "/images/booth91-1.jpg?height=100&width=100", image2: "/images/booth91-2.jpg?height=100&width=100" },  
  { id: 92, position: [-27, 0, -14], size: [2, 1.5, 3], name: "エコ活どれだ？", description: "エコ活どれだ？", link: "https://example.com/booth16", image: "/images/booth92-1.jpg?height=100&width=100", image2: "/images/booth92-2.jpg?height=100&width=100" },  
  { id: 93, position: [-27, 0, -10], size: [2, 1.5, 3], name: "射的deSDGs", description: "射的deSDGs", link: "https://example.com/booth17", image: "/images/booth93-1.jpg?height=100&width=100", image2: "/images/booth93-2.jpg?height=100&width=100" },

  // 中央セクション（1列目：12ブース）
  { id: 25, position: [-21, 0, -20], size: [2, 1.5, 2], name: "三菱食品㈱", description: "三菱食品㈱", link: "https://example.com/booth18", image: "/images/booth25-1.jpg?height=100&width=100", image2: "/images/booth25-2.jpg?height=100&width=100" },  
  { id: 24, position: [-18, 0, -20], size: [2, 1.5, 2], name: "日東富士製粉株式会社", description: "日東富士製粉株式会社", link: "https://example.com/booth19", image: "/images/booth24-1.jpg?height=100&width=100", image2: "/images/booth24-2.jpg?height=100&width=100" },  
  { id: 23, position: [-15, 0, -20], size: [2, 1.5, 2], name: "21世紀コーヒー株式会社", description: "21世紀コーヒー株式会社", link: "https://example.com/booth20", image: "/images/booth23-1.jpg?height=100&width=100", image2: "/images/booth23-2.jpg?height=100&width=100" },  
  { id: 22, position: [-12, 0, -20], size: [2, 1.5, 2], name: "共生食品株式会社", description: "共生食品株式会社", link: "https://example.com/booth21", image: "/images/booth22-1.jpg?height=100&width=100", image2: "/images/booth22-2.jpg?height=100&width=100" },  
  { id: 21, position: [-9, 0, -20], size: [2, 1.5, 2], name: "千葉県漁業協同組合連合会", description: "千葉県漁業協同組合連合会", link: "https://example.com/booth22", image: "/images/booth21-1.jpg?height=100&width=100", image2: "/images/booth21-2.jpg?height=100&width=100" },  
  { id: 20, position: [-6, 0, -20], size: [2, 1.5, 2], name: "株式会社にんべんフーズ", description: "株式会社にんべんフーズ", link: "https://example.com/booth23", image: "/images/booth20-1.jpg?height=100&width=100", image2: "/images/booth20-2.jpg?height=100&width=100" },  
  { id: 19, position: [-3, 0, -20], size: [2, 1.5, 2], name: "ホクレン農業協同組合連合会", description: "ホクレン農業協同組合連合会", link: "https://example.com/booth24", image: "/images/booth19-1.jpg?height=100&width=100", image2: "/images/booth19-2.jfif?height=100&width=100" },  
  { id: 18, position: [2, 0, -20], size: [2, 1.5, 2], name: "デイリーフーズ東京販売㈱", description: "デイリーフーズ東京販売㈱", link: "https://example.com/booth25", image: "/images/booth18-1.jpg?height=100&width=100", image2: "/images/booth18-2.jpg?height=100&width=100" },  
  { id: 17, position: [5.5, 0, -20], size: [4.5, 1.5, 2], name: "株式会社パルブレッド", description: "株式会社パルブレッド", link: "https://example.com/booth26", image: "/images/booth17-1.jpg?height=100&width=100", image2: "/images/booth17-2.jpg?height=100&width=100" },  
  { id: 16, position: [11, 0, -20], size: [2, 1.5, 2], name: "興真乳業株式会社", description: "興真乳業株式会社", link: "https://example.com/booth27", image: "/images/booth16-1.jpg?height=100&width=100", image2: "/images/booth16-2.jpg?height=100&width=100" },  
  { id: 15, position: [14, 0, -20], size: [2, 1.5, 2], name: "株式会社高山", description: "株式会社高山", link: "https://example.com/booth28", image: "/images/booth15-1.jpg?height=100&width=100", image2: "/images/booth15-2.jpg?height=100&width=100" },  
  { id: 14, position: [17, 0, -20], size: [2, 1.5, 2], name: "株式会社東京コールドチェーン", description: "株式会社東京コールドチェーン", link: "https://example.com/booth29", image: "/images/booth14-1.jpg?height=100&width=100", image2: "/images/booth14-2.jpg?height=100&width=100" },
  
  // 中央セクション（2列目：10ブース）
  { id: 34, position: [-18, 0, -16], size: [2, 1.5, 2], name: "全国漁業協同組合連合会", description: "ハンドメイドレザーグッズ", link: "https://example.com/booth30", image: "/images/booth34-1.jpg?height=100&width=100", image2: "/images/booth34-2.jpg?height=100&width=100" },  
  { id: 33, position: [-15, 0, -16], size: [2, 1.5, 2], name: "マルハニチロ㈱", description: "アーティザンパスタ", link: "https://example.com/booth31", image: "/images/booth33-1.jpg?height=100&width=100", image2: "/images/booth33-2.jpg?height=100&width=100" },  
  { id: 32, position: [-12, 0, -16], size: [2, 1.5, 2], name: "山菱水産", description: "グルメスパイスブレンド", link: "https://example.com/booth32", image: "/images/booth32-1.jpg?height=100&width=100", image2: "/images/booth32-2.jpg?height=100&width=100" },  
  { id: 31, position: [-9, 0, -16], size: [2, 1.5, 2], name: "エム・シーシー食品株式会社", description: "地元の新鮮卵", link: "https://example.com/booth33", image: "/images/booth31-1.jpg?height=100&width=100", image2: "/images/booth31-2.jpg?height=100&width=100" },  
  { id: 30, position: [-6, 0, -16], size: [2, 1.5, 2], name: "株式会社オルター・トレード・ジャパン", description: "ハンド石鹸", link: "https://example.com/booth34", image: "/images/booth30-1.jpg?height=100&width=100", image2: "/images/booth30-2.jpg?height=100&width=100" },  
  { id: 29, position: [-3, 0, -16], size: [2, 1.5, 2], name: "パルシスム連合会畜産課", description: "アーティザンブレッド", link: "https://example.com/booth35", image: "/images/booth29-1.jpg?height=100&width=100", image2: "/images/booth29-2.jpg?height=100&width=100" },  
  { id: 28, position: [4, 0, -16], size: [6, 1.5, 2], name: "パルシスム連合会産直事業本部青果・果物", description: "地元の蜂蜜バラエティ", link: "https://example.com/booth36", image: "/images/booth28-1.jpg?height=100&width=100", image2: "/images/booth28-2.jpg?height=100&width=100" },  
  { id: 27, position: [11, 0, -16], size: [2, 1.5, 2], name: "株式会社ウィルミナ", description: "手作りジャム", link: "https://example.com/booth37", image: "/images/booth27-1.jpg?height=100&width=100", image2: "/images/booth27-2.jpg?height=100&width=100" },  
  { id: 26, position: [14, 0, -16], size: [2, 1.5, 2], name: "榛名直販株式会社", description: "オーガニック化粧品", link: "https://example.com/booth38", image: "/images/booth26-1.jpg?height=100&width=100", image2: "/images/booth26-2.jpg?height=100&width=100" },

// 中央下段セクション（1ブース）
{ id: 39, position: [0, 0, -8], size: [5.5, 1.5, 2], name: "リサイクルトレー回収", description: "オーガニック野菜スタンド", link: "https://example.com/booth40", image: "/images/booth39-1.jpg?height=100&width=100", image2: "/images/booth39-2.jpg?height=100&width=100" },

// 下段（8ブース）
{ id: 38, position: [-20, 0, -2], size: [3, 1.5, 2], name: "パルシスム連合会産直事業本部米穀", description: "アーティザンチーズ試食", link: "https://example.com/booth41", image: "/images/booth38-1.jpg?height=100&width=100", image2: "/images/booth38-2.jpg?height=100&width=100" },
{ id: 37, position: [-16, 0, -2], size: [3, 1.5, 2], name: "㈱パル・ミート", description: "地元ワイナリーショーケース", link: "https://example.com/booth42", image: "/images/booth37-1.jpg?height=100&width=100", image2: "/images/booth37-2.jpg?height=100&width=100" },
{ id: 36, position: [-12, 0, -2], size: [3, 1.5, 2], name: "株式会社ニチレイフレッシュ", description: "グルメフードトラック", link: "https://example.com/booth43", image: "/images/booth36-1.jpg?height=100&width=100", image2: "/images/booth36-2.jpg?height=100&width=100" },
{ id: 35, position: [-8, 0, -2], size: [2, 1.5, 2], name: "大洋香料株式会社", description: "クラフトビアガーデン", link: "https://example.com/booth44", image: "/images/booth35-1.jpg?height=100&width=100", image2: "/images/booth35-2.jpg?height=100&width=100" },
{ id: 94, position: [0, 0, -2], size: [5.5, 1.5, 2], name: "ゴミ分別ブース", description: "地元ミュージシャンステージ", link: "https://example.com/booth45", image: "/images/booth94-1.jpg?height=100&width=100", image2: "/images/booth94-2.jpg?height=100&width=100" },
{ id: 40, position: [10, 0, -2], size: [3, 1.5, 2], name: "仲間づくりブース", description: "手作りアクセサリー", link: "https://example.com/booth46", image: "/images/booth40-1.jpg?height=100&width=100", image2: "/images/booth40-2.jpg?height=100&width=100" },
{ id: 95, position: [15, 0, -2], size: [6, 1.5, 4], name: "ステージ", description: "オーガニックコーヒー", link: "https://example.com/booth47", image: "/images/booth95-1.jpg?height=100&width=100", image2: "/images/booth95-2.jpg?height=100&width=100" },
{ id: 41, position: [20, 0, -2], size: [3, 1.5, 2], name: "群馬産直協議会「めぐるんま」", description: "ハンドメイドスカーフと帽子", link: "https://example.com/booth48", image: "/images/booth41-1.jpg?height=100&width=100", image2: "/images/booth41-2.jpg?height=100&width=100" },

// 右列（4ブース）
{ id: 44, position: [25, 0, -28], size: [2, 1.5, 2], name: "総合案内", description: "地元の蜂蜜生産者", link: "https://example.com/booth49", image: "/images/booth44-1.jpg?height=100&width=100", image2: "/images/booth44-2.jpg?height=100&width=100" },
{ id: 43, position: [25, 0, -20], size: [2, 1.5, 2], name: "商品アンテナブース", description: "アーティザンチョコレート職人", link: "https://example.com/booth50", image: "/images/booth43-1.jpg?height=100&width=100", image2: "/images/booth43-2.jpg?height=100&width=100" },
{ id: 42, position: [25, 0, -16], size: [2, 1.5, 2], name: "共済ブース", description: "ハンドクラフト木製食器", link: "https://example.com/booth51", image: "/images/booth42-1.jpg?height=100&width=100", image2: "/images/booth42-2.jpg?height=100&width=100" },
{ id: 96, position: [25, 0, -6], size: [2, 1.5, 2], name: "東毛酪農ブース", description: "アーティザンジュエリー", link: "https://example.com/booth52", image: "/images/booth96-1.jpg?height=100&width=100", image2: "/images/booth96-2.jpg?height=100&width=100" },
]

export default function Component() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
  
        // テキストを作るための関数を追加
        function createTextSprite(message) {
        const canvas = document.createElement('canvas'); // キャンバスを作成
        const context = canvas.getContext('2d'); // 2D描画用のコンテキストを取得
    
        // テキストの設定
        context.font = '18px Arial';
        context.fillStyle = 'White'; // テキストの色
        context.fillText(message, 0, 24); // テキストを描く
    
        // キャンバスをテクスチャに変換
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true; // テクスチャを更新
    
        // テキストを表示するためのSpriteMaterialを作成
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 5, 1); // テキストの大きさを設定
    
        return sprite; // テキストのスプライトを返す
      }
    
    // シーンのセットアップ
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    mountRef.current.appendChild(renderer.domElement)

    // Environment map
    const loader = new THREE.TextureLoader()
    const texture = loader.load('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/toshimaru8232_Illustration_style_a_scene_like_an_outdoor_mark_ce02ea25-f490-4a71-8dd9-ede204c5bdb6_1-Us3JdrzwW4UfM4pNORTBo6sRgZR2Ic.png', () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
      rt.fromEquirectangularTexture(renderer, texture)
      scene.background = rt.texture
    })

    // ライティング
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 200, 100)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // 地面
    const groundGeometry = new THREE.PlaneGeometry(100, 100)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF, 
      roughness: 0.8,
      transparent: true,
      opacity: 0.6
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // 青色のエリアを作成（position: [25, 0, -28] の南側）
    const blueAreaGeometry = new THREE.PlaneGeometry(3, 3)
    const blueAreaMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000FF,
      transparent: true,
      opacity: 0.5
    })
    const blueArea = new THREE.Mesh(blueAreaGeometry, blueAreaMaterial)
    blueArea.rotation.x = -Math.PI / 2
    blueArea.position.set(28.5, 0.01, -24.5) // 南側に配置
    scene.add(blueArea)
 
    // 赤色のエリアを作成（position: [7, 0, -2] の西側）
    const redAreaGeometry = new THREE.PlaneGeometry(3, 3)
    const redAreaMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF0000,
      transparent: true,
      opacity: 0.5
    })
    const redArea = new THREE.Mesh(redAreaGeometry, redAreaMaterial)
    redArea.rotation.x = -Math.PI / 2
    redArea.position.set(5.5, 0.01, 1) // 西側に配置
    scene.add(redArea)
 

    // ブース
    const defaultBoothMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00 });
    const pinkBoothMaterial = new THREE.MeshPhongMaterial({ color: 0xFFC0CB });
    const greenBoothMaterial = new THREE.MeshPhongMaterial({ color: 0x90EE90 });
    const brownBoothMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D }); 
    const boothObjects: THREE.Mesh[] = [];

    booths.forEach((booth) => {
      const boothGeometry = new THREE.BoxGeometry(booth.size[0], booth.size[1], booth.size[2])
      let boothMaterial = defaultBoothMaterial
      if ([39, 90, 91, 92, 93, 94].includes(booth.id)) {
        boothMaterial = pinkBoothMaterial;
      } else if ([40, 41, 42, 43, 96].includes(booth.id)) {
        boothMaterial = greenBoothMaterial;
      } else if (booth.id === 95) {
        boothMaterial = brownBoothMaterial; 
      }
      
      const boothMesh = new THREE.Mesh(boothGeometry, boothMaterial)
      boothMesh.position.set(...booth.position)
      boothMesh.castShadow = true
      boothMesh.receiveShadow = true
      boothMesh.userData = { id: booth.id }
      scene.add(boothMesh)
      boothObjects.push(boothMesh)
    
      // ここにテキストスプライトを追加します
      const textSprite = createTextSprite(booth.name) // ブース名をテキストとして作成
      textSprite.position.set(booth.position[0], booth.position[1] + booth.size[1] + 2, booth.position[2]) // ブースの上に配置
      scene.add(textSprite) // シーンにテキストスプライトを追加
    })
    

    // 壁を追加
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC, transparent: true, opacity: 0.5 })
    const wallHeight = 3
    const wallThickness = 0.5

    // 北壁
    const northWallGeometry = new THREE.BoxGeometry(57, wallHeight, wallThickness)
    const northWall = new THREE.Mesh(northWallGeometry, wallMaterial)
    northWall.position.set(-1.5, wallHeight / 2, -36)
    scene.add(northWall)

    // 南壁（狭い出口付き）
    const southWallGeometry1 = new THREE.BoxGeometry(33, wallHeight, wallThickness);
    const southWall1 = new THREE.Mesh(southWallGeometry1, wallMaterial);
    southWall1.position.set(-13, wallHeight / 2, 0);
    scene.add(southWall1);

    const southWallGeometry2 = new THREE.BoxGeometry(20, wallHeight, wallThickness);
    const southWall2 = new THREE.Mesh(southWallGeometry2, wallMaterial);
    southWall2.position.set(17, wallHeight / 2, 0);
    scene.add(southWall2);

    // 東壁（入口付き）
    const eastWallGeometry1 = new THREE.BoxGeometry(wallThickness, wallHeight, 10)
    const eastWall1 = new THREE.Mesh(eastWallGeometry1, wallMaterial)
    eastWall1.position.set(27, wallHeight / 2, -31)
    scene.add(eastWall1)

    const eastWallGeometry2 = new THREE.BoxGeometry(wallThickness, wallHeight, 22)
    const eastWall2 = new THREE.Mesh(eastWallGeometry2, wallMaterial)
    eastWall2.position.set(27, wallHeight / 2, -10.5)
    scene.add(eastWall2)

    // 西壁
    const westWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 36)
    const westWall = new THREE.Mesh(westWallGeometry, wallMaterial)
    westWall.position.set(-30, wallHeight / 2, -18)
    scene.add(westWall)

    // 特定のブースの周りに壁を追加する関数
    function addWallsAroundBooth(booth: Booth, directions: string[]) {
      const [x, y, z] = booth.position
      const [width, height, depth] = booth.size
      const wallMargin = 0.5 // 壁とブースの間の距離

      directions.forEach(direction => {
        let wallGeometry: THREE.BoxGeometry | undefined;
        let wallPosition: [number, number, number] | undefined; // タプル型を指定
      
        switch (direction) {
          case 'north':
            wallGeometry = new THREE.BoxGeometry(width + 2 * wallMargin, wallHeight, wallThickness);
            wallPosition = [x, wallHeight / 2, z - depth / 2 - wallMargin];
            break;
          case 'east':
            wallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, depth + 2 * wallMargin);
            wallPosition = [x + width / 2 + wallMargin, wallHeight / 2, z];
            break;
          case 'west':
            wallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, depth + 2 * wallMargin);
            wallPosition = [x - width / 2 - wallMargin, wallHeight / 2, z];
            break;
        }
      
        // タプル型の配列として扱うために、適切な型チェックを行う
        if (wallGeometry && wallPosition) {
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(...wallPosition); // スプレッド構文をそのまま使用
          scene.add(wall);
        }
      });
    }

    // id39を囲む壁を追加
    const booth39 = booths.find(booth => booth.id === 39)
    if (booth39) {
      addWallsAroundBooth(booth39, ['north', 'east', 'west'])
    }

    // id94の東と西に壁を追加
    const booth94 = booths.find(booth => booth.id === 94)
    if (booth94) {
      addWallsAroundBooth(booth94, ['east', 'west'])
    }

    // id43の北側に壁を追加（拡張版）
    const booth43 = booths.find(booth => booth.id === 43)
    if (booth43)

 {
      const [x, y, z] = booth43.position
      const [width, height, depth] = booth43.size
      const wallMargin = 0.5
      const extensionLength = 3 // 西への延長の長さ
      const verticalLength = 4 // 北への延長の長さ

      // 水平部分の壁を作成
      const horizontalWallGeometry = new THREE.BoxGeometry(width + 2 * wallMargin + extensionLength, wallHeight, wallThickness)
      const horizontalWall = new THREE.Mesh(horizontalWallGeometry, wallMaterial)
      horizontalWall.position.set(x - extensionLength / 2, wallHeight / 2, z - depth / 2 - wallMargin)
      scene.add(horizontalWall)

      // 垂直部分の壁を作成
      const verticalWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, verticalLength)
      const verticalWall = new THREE.Mesh(verticalWallGeometry, wallMaterial)
      verticalWall.position.set(x - width / 2 - wallMargin - extensionLength, wallHeight / 2, z - depth / 2 - wallMargin - verticalLength / 2)
      scene.add(verticalWall)
    }

    // 南壁の下に画像を追加
    const imageLoader = new THREE.TextureLoader()
    imageLoader.load('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/event-fLW4bFziSy5Ei47NahUtoIiuKDWlrp.jpg', (texture) => {
      const imageAspect = texture.image.width / texture.image.height
      const planeWidth = 40
      const planeHeight = planeWidth / imageAspect
      const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
      const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
      const imagePlane = new THREE.Mesh(planeGeometry, planeMaterial)
      imagePlane.rotation.x = -Math.PI / 2
      imagePlane.position.set(0, 0.01, 26)
      scene.add(imagePlane)
    })

    // カメラの位置
    camera.position.set(0, 30, 40)
    camera.lookAt(0, 0, 0)

    // コントロール
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2 - 0.1

    // ブース選択のためのレイキャスター
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function onMouseClick(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(boothObjects)

      if (intersects.length > 0) {
        const selectedBoothId = intersects[0].object.userData.id
        const booth = booths.find(b => b.id === selectedBoothId)
        if (booth) {
          setSelectedBooth(booth)
        }
      } else {
        setSelectedBooth(null)
      }
    }

    window.addEventListener('click', onMouseClick)

    // アニメーションループ
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // レスポンシブデザイン
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize)

    // クリーンアップ
    return () => {
      window.removeEventListener('click', onMouseClick)
      window.removeEventListener('resize', onWindowResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
  
      {selectedBooth && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          maxWidth: '300px'
        }}>
          <img src={selectedBooth.image} alt={selectedBooth.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
          <img src={selectedBooth.image2} alt={`${selectedBooth.name} - 追加画像`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
          <h3>{selectedBooth.name}</h3>
          <p>{selectedBooth.description}</p>
          <a href={selectedBooth.link} target="_blank" rel="noopener noreferrer">注文する</a>
        </div>
      )}
  
      {/* ここにリンクボタンを追加します */}
      <a href="https://www.palsystem-gunma.coop/" target="_blank" style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        すべてのメーカーブース詳細はこちら
      </a>
    </div>
  )
  
}