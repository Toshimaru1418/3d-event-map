'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { TextureLoader } from 'three';

function Instructions({ onShowMap }: { onShowMap: () => void }) {
  const [loading, setLoading] = useState(false);

  const loadMapResources = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)); 
  };

  useEffect(() => {
    loadMapResources(); // コンポーネントマウント時にリソースを読み込む
  }, []);

  const handleShowMap = () => {
    setLoading(true);
    // マップが準備完了になるまで待つ処理
    setTimeout(() => {
      onShowMap(); // 3Dマップを表示
      setLoading(false); // ローディングが完了したらfalseに
    }, 3000); // 3秒の遅延（必要に応じて調整）
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <div className="loading-indicator">
          <p>マップを読み込み中...</p>
          {/* ローディングスピナーやアニメーションを追加 */}
        </div>
      ) : (
        <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg max-w-2xl">
          <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-900 tracking-wide">
            マップ利用の注意事項
          </h1>
          <ul className="list-disc pl-5 mb-6 space-y-3 text-lg text-gray-700">
            <li>このマップは3D表示です。ドラッグして視点を変更できます。</li>
            <li>ブースをクリックすると、各ブースの商品情報が表示されます。</li>
            <li>各ブースの商品情報から、気に入った商品を3種類（各1点）までご注文いただけます。</li>
            <li>ピンチイン・ピンチアウトまたはスクロールで拡大・縮小できます。</li>
            <li>3D表示が重い場合は、ブラウザを再起動してください。</li>
          </ul>
          <button onClick={handleShowMap} className="map-button">
            マップへGO
          </button>
        </div>
      )}
    </div>
  );
}


interface Booth {
  id: number;
  position: [number, number, number];
  size: [number, number, number];
  name: string;
  description: string;
  link?: string;  // リンクが存在する場合のみオプショナルに設定
  hasLink: boolean;  // リンクが必要かどうかを示すフラグ
  image: string;
  image2: string;
}

const booths: Booth[] = [
// 上段（12ブース）
{ id: 12, position: [-22, 0, -34], size: [4, 1.5, 2], name: "㈱井ゲタ竹内", description: "産直産地沖縄県恩納村産のモズクを通して、海を守り育む活動を皆さんと行っています。恩納村産の糸もずくの中から、特にヌメリの強い原藻を選別して使用。2024年からはぶどう糖果糖液糖不使用にリニューアルいたしました。ブースでは試食の他に、サンゴの苗となる基台へのメッセージ描きを行います。。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth12-1.webp?height=100&width=100", image2: "/images/booth12-2.webp?height=100&width=100" },
{ id: 11, position: [-17, 0, -34], size: [2, 1.5, 2], name: "㈱カジノヤ", description: "せいきょう納豆（中粒、たれ・からし付）は、昨年10月発売以来大好評の納豆です。「中粒なのに柔らかくちゃんと大豆の味がする」時間をかけ、じっくり納豆造りをしているから頂けた感想だと思います。小粒も美味しいですが、大豆本来の味が感じられる「中粒」も楽しんで下さい。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth11-1.webp?height=100&width=100", image2: "/images/booth11-2.webp?height=100&width=100" },  
{ id: 10, position: [-14, 0, -34], size: [2, 1.5, 2], name: "㈱中村商店", description: "本品はナトリウム石けんを配合することで、固形の化粧石けんに近い感触で使いやすい液体のボディソープ。洗顔ソープに使用されるミリスチン酸を贅沢に使用、クリーミーな泡立ちを実現しました。石けん初心者に最適です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth10-1.webp?height=100&width=100", image2: "/images/booth10-2.webp?height=100&width=100" },  
{ id: 9, position: [-11, 0, -34], size: [2, 1.5, 2], name: "グリンリーフ㈱", description: "産直野菜で作った糖しぼり大根は、産直大根を砂糖塩米酢で漬けたお漬物です。お漬物が苦手なお子さんでも食べられる甘い浅漬けです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth9-1.webp?height=100&width=100", image2: "/images/booth9-2.webp?height=100&width=100" },  
{ id: 8, position: [-8, 0, -34], size: [2, 1.5, 2], name: "㈱河村屋", description: "白菜は標高1000mにある信州望月高原のグループ会社圃場で収穫された白菜を使用。柔らかい葉の白菜は生育が難しく数が多く採れません。その稀少な白菜に、秘伝のヤンニョムを混ぜ、しっかりと熟成して旨味を引き出したキムチとなっております。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth8-1.webp?height=100&width=100", image2: "/images/booth8-2.webp?height=100&width=100" },  
{ id: 7, position: [-5, 0, -34], size: [2, 1.5, 2], name: "㈱ふくれん", description: "北海道音更産の産直ユキホマレ大豆を使用した無調整豆乳です。原材料は大豆と水のみのため、ユキホマレ大豆本来のほんのりとした甘みが味わえます。組合員さんの「小さいサイズが欲しい!」とのお声に応えて9月から200mlサイズが発売となりました", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth7-1.webp?height=100&width=100", image2: "/images/booth7-2.webp?height=100&width=100" },  
{ id: 6, position: [-2, 0, -34], size: [3, 1.5, 2], name: "お魚食べようブース", description: "ブースでは「さかなっつハイ！」をご紹介！いわしを砂糖などで味付けしてゴマをまぶし、アーモンドと小粒ピーナツをミックスしています。景品でもらってお魚食べよう！", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth6-1.webp?height=100&width=100", image2: "/images/booth6-2.webp?height=100&width=100" },  
{ id: 5, position: [1, 0, -34], size: [2, 1.5, 2], name: "平田産業㈲", description: "国際産直産地は南オーストラリア州カンガルー島の非遺伝子組換え菜種のみを使用したこだわりの菜種油です。製法も圧搾一番搾りを湯洗い製法で行っておりますので、化学溶剤は一切使用しておりません。揚げ物はカラッと揚がり、胸やけしにくいのが特徴です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth5-1.webp?height=100&width=100", image2: "/images/booth5-2.webp?height=100&width=100" },  
{ id: 4, position: [4, 0, -34], size: [2, 1.5, 2], name: "北海道漁業協同組合連合会", description: "産直産地野付漁協のほたては大きくて甘味があるのが特徴です。世界遺産知床半島沖の栄養豊富な水が、野付と国後島の狭い野付水道に流れ込むことにより、大きく甘いほたてが育ちます。プリプリ食感ととろける甘味をご堪能いただけます。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth4-1.webp?height=100&width=100", image2: "/images/booth4-2.webp?height=100&width=100" },
{ id: 3, position: [7, 0, -34], size: [2, 1.5, 2], name: "㈱水宗園本舗", description: "「うまか有機銘茶会」が土づくりからこだわって育てた有機茶葉を使用。素材の持ち味を生かした深いうまみとコク、美しいお茶の色をお楽しみください。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth3-1.webp?height=100&width=100", image2: "/images/booth3-2.webp?height=100&width=100" },  
{ id: 2, position: [10, 0, -34], size: [2, 1.5, 2], name: "JPホームサプライ㈱", description: "シングル品は130m、ダブル品は65mと一般的なトイレットペーパーより長巻です。また、シングル品は太穴タイプと細穴タイプがございます。組合員様宅より出された牛乳パック等を原料として製造しております。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth2-1.webp?height=100&width=100", image2: "/images/booth2-2.webp?height=100&width=100" },  
{ id: 1, position: [15, 0, -34], size: [6, 1.5, 2], name: "ヱスケー石鹸㈱", description: "パルシステム群馬の組合員が開発に協力！洗浄力が高い “衣類用部分洗い石けんです。「子どもからおとなまで楽しく使える！」をテーマに、成分や香り、石けんのサイズや形状にまでこだわりを詰め込みました。 固形石けんを使ったことのない方も、この商品からぜひお試しください。環境にも人にもやさしい洗濯が楽しくなる石けんです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth1-1.webp?height=70&width=70", image2: "/images/booth1-2.webp?height=70&width=70" },

// 左列（5ブース）
{ id: 13, position: [-27, 0, -28], size: [2, 1.5, 6], name: "㈱スクロール", description: "スクロールは全国の生協様に衣料品・靴、バッグといった服飾雑貨商品を販売しているアパレルメーカーです！当日は普段触れないお洋服の展示はもちろん、親子で楽しめるオリジナルエコバッグ作り体験を実施いたします！", hasLink: true, link: "https://www.scroll-fan.com/", image: "/images/booth13-1.webp?height=100&width=100", image2: "/images/booth13-2.webp?height=100&width=100" },
{ id: 90, position: [-27, 0, -22], size: [2, 1.5, 3], name: "マトメブクロヒツジを救え!", description: "来場者のみなさんがご持参いただいた「商品まとめ袋」で、マトメブクロヒツジをモコモコにしよう！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth90-1.webp?height=100&width=100", image2: "/images/booth90-2.webp?height=100&width=100" },
{ id: 91, position: [-27, 0, -18], size: [2, 1.5, 3], name: "リサイクル探し", description: "ブースの中に隠れる、リサイクルできるものとできないものを“5つ”探すゲームです。ぜひチャレンジしてみてね!", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth91-1.webp?height=100&width=100", image2: "/images/booth91-2.webp?height=100&width=100" },
{ id: 92, position: [-27, 0, -14], size: [2, 1.5, 3], name: "エコ活ど～れだ", description: "街の風景からエコな活動をしているところを探してみよう！君はいくつ見つけられるかな？", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth92-1.webp?height=100&width=100", image2: "/images/booth92-2.webp?height=100&width=100" },
{ id: 93, position: [-27, 0, -10], size: [2, 1.5, 3], name: "射的 de SDGs", description: "「S」「D」「Gs」の的を狙ってshoot!的をたおして、SDGsを完成させよう!", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth93-1.webp?height=100&width=100", image2: "/images/booth93-2.webp?height=100&width=100" },

// 中央セクション（1列目：12ブース）
{ id: 25, position: [-21, 0, -20], size: [2, 1.5, 2], name: "三菱食品㈱", description: "産直豚肉、産直キャベツを使い、飽きの来ないシンプルな味付けで組合員様から長年愛されている「餃子にしよう!」。来年で発売から20年を迎える人気商品です。当日会場で焼き立てを是非お召し上がりください。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth25-1.webp?height=100&width=100", image2: "/images/booth25-2.webp?height=100&width=100" },
{ id: 24, position: [-18, 0, -20], size: [2, 1.5, 2], name: "日東富士製粉㈱", description: "北海道産の産直小麦を使用したホットケーキミックスです。ふっくらとしたやわらかい食感と、優しい甘さのシンプルな配合が好評のロングセラー商品です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth24-1.webp?height=100&width=100", image2: "/images/booth24-2.webp?height=100&width=100" },
{ id: 23, position: [-15, 0, -20], size: [2, 1.5, 2], name: "21世紀コーヒー㈱", description: "パルシステム群馬の組合員のみなさまにも大変ご好評をいただいている定番のブレンドコーヒーです。20g2個組で毎日使いに便利です。味と価格のバランスを追求したロングセラー（20年以上継続販売）商品です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth23-1.webp?height=100&width=100", image2: "/images/booth23-2.webp?height=100&width=100" },
{ id: 22, position: [-12, 0, -20], size: [2, 1.5, 2], name: "共生食品㈱", description: "産直大豆の旨味をギュッと閉じ込めました。冷奴はもちろん、もめん豆腐を使って麻婆豆腐や肉豆腐を作れば、ご飯のおかずにぴったりな1品が出来上がります。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth22-1.webp?height=100&width=100", image2: "/images/booth22-2.webp?height=100&width=100" },
{ id: 21, position: [-9, 0, -20], size: [2, 1.5, 2], name: "千葉県漁業協同組合連合会", description: "脂の乗ったノルウェー産さばを骨取り加工し、独自に開発した大根入りたれで煮付けました。ほうれん草と共に盛り付けると彩り豊かになり格別です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth21-1.webp?height=100&width=100", image2: "/images/booth21-2.webp?height=100&width=100" },
{ id: 20, position: [-6, 0, -20], size: [2, 1.5, 2], name: "㈱にんべんフーズ", description: "「もっとだしの風味を活かした白だしを」という開発メンバーの思いから、試行錯誤を重ねて開発された「素材がいきる白だし」。だし素材には、国内製造の3種類の魚節の混合だしと、北海道産の3種類の昆布だしを合わせ、だしを約65%以上配合した上品な風味の白だしに仕上げました。淡色で穏やかな風味にしてありますので、素材の持ち味を引き立て、料理の味に深みを加える万能調味料です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth20-1.webp?height=100&width=100", image2: "/images/booth20-2.webp?height=100&width=100" },
{ id: 19, position: [-3, 0, -20], size: [2, 1.5, 2], name: "ホクレン農業協同組合連合会", description: "北海道根釧地区の生乳だけを、新鮮なうちにパック。パックした翌々日に組合員のもとへ届きます。HTST殺菌法（72℃・15秒殺菌）で生乳本来の風味やコクを大切にした牛乳です。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth19-1.webp?height=100&width=100", image2: "/images/booth19-2.webp?height=100&width=100" },
{ id: 18, position: [2, 0, -20], size: [2, 1.5, 2], name: "デイリーフーズ東京販売㈱", description: "PB商品のジャムやフルーツソースの中でも一番の人気となっているのが“いちごジャム（プレザーブ）”。果実含有量は最終商品として70%以上となっております。特徴は果肉を残したプレザーブスタイルで十二分にいちごの果実感を味わえます。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth18-1.webp?height=100&width=100", image2: "/images/booth18-2.webp?height=100&width=100" },
{ id: 17, position: [5.2, 0, -20], size: [4, 1.5, 2], name: "㈱パルブレッド", description: "生地に自家製の湯種と自然発酵種を配合し、しっとりもっちりとした食感に仕上げた角食パンです。口溶けが良く、そのままでも美味しくお召し上がりいただけます。幅広い世代層の方に。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth17-1.webp?height=100&width=100", image2: "/images/booth17-2.webp?height=100&width=100" },
{ id: 16, position: [9, 0, -20], size: [2, 1.5, 2], name: "興真乳業㈱", description: "発売から長年ご愛顧を頂いているロングセラー商品です。原料は、シンプルに生乳、コーヒー、砂糖のみ。弊社の工場がある、千葉県の新鮮な生乳を50%使用した濃厚で飲みごたえのあるカフェオレです。ぜひ、ご賞味ください。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth16-1.webp?height=100&width=100", image2: "/images/booth16-2.webp?height=100&width=100" },
{ id: 15, position: [12, 0, -20], size: [2, 1.5, 2], name: "㈱高山", description: "産直小麦をはじめ国産原料のみで焼き上げ、シンプルなおいしさを追求。パルシステム埼玉商品開発チームの「自分たちが知っている原材料だけのカステラがほしい」という願いのもと、添加物の力に頼らないカステラができました。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth15-1.webp?height=100&width=100", image2: "/images/booth15-2.webp?height=100&width=100" },
{ id: 14, position: [15, 0, -20], size: [2, 1.5, 2], name: "㈱東京コールドチェーン", description: "フィリピン産のマンゴーを一口サイズにカットしました。忙しい朝のフルーツデザート、お子様のおやつなど、いろいろな場面でいつでもすぐに準備いらずに食べることができます。凍ったまま牛乳とミキサーにかければマンゴースムージーに！乳製品との相性も良くオススメです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth14-1.webp?height=100&width=100", image2: "/images/booth14-3.webp?height=100&width=100" },
  
// 中央セクション（2列目：10ブース）
{ id: 34, position: [-18, 0, -16], size: [2, 1.5, 2], name: "全国漁業協同組合連合会", description: "国産さばを使用。頭、内臓等を取り除き、骨付きのまま高圧スチーム加熱を行い、骨までやわらかく食べられるよう加工した後、唐揚げにし、自社製造の甘酢たれと一緒にパックしました。解凍するだけで、骨まで丸ごと全部食べられる商品です。お子様にも食べやすい酸味を抑えた甘口タイプです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth34-1.webp?height=100&width=100", image2: "/images/booth34-2.webp?height=100&width=100" },
{ id: 33, position: [-15, 0, -16], size: [2, 1.5, 2], name: "マルハニチロ㈱", description: "産直たけのこの食感と国産しいたけのうまみを生かしたしゅうまい。豚肉、鶏肉、玉ねぎ、しょうがは国産。皮には産直小麦を使用。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth33-1.webp?height=100&width=100", image2: "/images/booth33-2.webp?height=100&width=100" },
{ id: 32, position: [-12, 0, -16], size: [2, 1.5, 2], name: "山菱水産㈱", description: "まぐろは「魚の王様」と呼ばれる特別な魚。味わいと美しさで多くの方に愛されています。弊社は半世紀にわたりまぐろを専門に扱い、より安全でおいしいまぐろをお届けするために日々取り組んでおります。加熱することでとろける食感になるまぐろの腹身をぜひご賞味ください。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth32-1.webp?height=100&width=100", image2: "/images/booth32-2.webp?height=100&width=100" },
{ id: 31, position: [-9, 0, -16], size: [2, 1.5, 2], name: "エム・シーシー食品㈱", description: "産直バジルのジェノベーゼソースは、朝摘み・手摘みにこだわった香りと彩りのよいバジルを使用し、シンプルかつ味わい深く仕上げたこだわりのパスタソースです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth31-1.webp?height=100&width=100", image2: "/images/booth31-2.webp?height=100&width=100" },
{ id: 30, position: [-6, 0, -16], size: [2, 1.5, 2], name: "㈱オルター・トレード・ジャパン", description: "フィリピンの生産者たちの暮らしを応援する民衆交易のバナナ。「バランゴン」はフィリピンに自生する品種で、ほんのりとした酸味と甘みが調和したコクのある味わいです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth30-1.webp?height=100&width=100", image2: "/images/booth30-2.webp?height=100&width=100" },
{ id: 29, position: [-3, 0, -16], size: [2, 1.5, 2], name: "連合会 畜産課(産直たまご)", description: "太陽の光と自然の風が入る鶏舎で飼育。また、飼料の大半を占めるトウモロコシと大豆は遺伝子組換え作物が混ざらないよう分別生産流通管理されたものに限定し、さらにトウモロコシは収穫後農薬不使用です。食べたものが卵の質につながるからこそ、飼料の安全性にもこだわっています。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth29-1.webp?height=100&width=100", image2: "/images/booth29-2.webp?height=100&width=100" },
{ id: 28, position: [4, 0, -16], size: [6, 1.5, 2], name: "連合会 青果・果物", description: "つくる人と食べる人がともに健康で安心そして持続可能なくらしを実現するために情報共有の場を創り、産直青果の推進に取り組んでいます。日々生産者が、手間ひまかけて大切に育てた産直青果をぜひお試し下さい。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth28-1.webp?height=100&width=100", image2: "/images/booth28-2.webp?height=100&width=100" },
{ id: 27, position: [9, 0, -16], size: [2, 1.5, 2], name: "㈱ウィルミナ", description: "ナチュライス 純米こうじ配合化粧液は、リニューアル時購入点数・パルシステム化粧品No.1!開発の原点は、組合員の肌悩みや『家事と育児で時間がない』というお悩みから。産直産地「JA新潟かがやき」のお米からつくった米こうじエキス配合の化粧液は、スーッと浸透して、うるおいに満ちたハリ肌へと導きます。1本でスキンケアが済むオールインワン機能で時短美容も叶います。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth27-1.webp?height=100&width=100", image2: "/images/booth27-2.webp?height=100&width=100" },
{ id: 26, position: [12, 0, -16], size: [2, 1.5, 2], name: "榛名直販㈱", description: "群馬県産の生乳を使用した、生乳70%の飲むヨーグルト。余計なものは使用せず、生乳、砂糖、脱脂粉乳のみを使用した、安心して毎日でも飲みたい飲むヨーグルトです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth26-1.webp?height=100&width=100", image2: "/images/booth26-2.webp?height=100&width=100" },

// 中央下段セクション（1ブース）
{ id: 97, position: [0, 0, -8], size: [5.5, 1.5, 2], name: "リサイクルトレー回収", description: "各ブースの試食にご利用いただいたリサイクルトレーは、重ねずにリサイクルトレー回収ブースにお持ちください！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth97-1.webp?height=100&width=100", image2: "/images/booth97-2.webp?height=100&width=100" },

// 下段（8ブース）
{ id: 38, position: [-20, 0, -2], size: [3, 1.5, 2], name: "連合会 米穀課", description: "2024年産『パルシステム産直米』は10月より新米のお届けが始まります。欠品など商品の不足が続いておりましたが、徐々に解消予定となっております。引き続き、『パルシステム産直米』をよろしくお願いいたします。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth38-1.webp?height=100&width=100", image2: "/images/booth38-2.webp?height=100&width=100" },
{ id: 37, position: [-16, 0, -2], size: [3, 1.5, 2], name: "㈱パル・ミート", description: "パル・ミート山形事業所にて製造しているポークウインナーをご提供いたします。原料には国産の冷蔵豚肉を使用し、発色剤を使用しない「無えんせき」で製造しています。炒め物やスープなど様々な料理によく合います。※豚脂には冷凍原料を使用しています。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth37-1.webp?height=100&width=100", image2: "/images/booth37-2.webp?height=100&width=100" },
{ id: 36, position: [-12, 0, -2], size: [3, 1.5, 2], name: "㈱ニチレイフレッシュ", description: "国産若鶏の甘辛ささみカツは、フライ人気NO.1商品です。若鶏ササミをふんわりと衣付けして揚げた後、特製の甘辛たれにつけ込みました。4～6枚入りです。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth36-1.webp?height=100&width=100", image2: "/images/booth36-2.webp?height=100&width=100" },
{ id: 35, position: [-8, 0, -2], size: [2, 1.5, 2], name: "大洋香料㈱・ハチ食品㈱", description: "使いやすいフレークタイプのクリームシチューのルウ。シチュー以外に、ドリア・パスタソースや煮物等にも活用できます。", hasLink: true, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth35-1.webp?height=100&width=100", image2: "/images/booth35-2.webp?height=100&width=100" },
{ id: 94, position: [0, 0, -2], size: [5.5, 1.5, 2], name: "ゴミ分別ブース", description: "会場で出たゴミは、ゴミ分別ブースへお持ちください。会場内のゴミ箱はゴミ分別ブース一か所になっています。地球にやさしい商品展示会にするために、ゴミの分別にご協力をお願いいたします。", link: "https://forms.gle/h5DLVLqZLLykifCJ8", hasLink: false, image: "/images/booth94-1.webp?height=100&width=100", image2: "/images/booth94-2.webp?height=100&width=100" },
{ id: 40, position: [10, 0, -2], size: [3, 1.5, 2], name: "仲間づくりブース", description: "パルシステムをはじめたい！というお友だちといっしょにご来場のみなさまは、こちらのブースにお越しください！当日限定のご加入特典を準備してお待ちしております！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth40-1.webp?height=100&width=100", image2: "/images/booth40-2.webp?height=100&width=100" },
{ id: 95, position: [15, 0, -2], size: [6, 1.5, 4], name: "ステージ", description: "毎年恒例のステージイベントを開催！〇✕クイズに挑戦して賞品をゲットしよう！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth95-1.webp?height=100&width=100", image2: "/images/booth95-2.webp?height=100&width=100" },
{ id: 41, position: [20, 0, -2], size: [3, 1.5, 2], name: "群馬産直協議会「めぐるんま」", description: "群馬産直協議会「めぐるんま」の3産地（野菜くらぶ、くらぶち草の会、利根川生産者グループ）の産直野菜がお手頃価格で購入できるブースです!", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth41-1.webp?height=100&width=100", image2: "/images/booth41-2.webp?height=100&width=100" },

// 右列（4ブース）
{ id: 44, position: [25, 0, -28], size: [2, 1.5, 2], name: "総合案内", description: "「商品展示会2024」に関する案内ブースです。お困りのことやご質問などございましたら、こちらのブースにお越しください。", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth44-1.webp?height=100&width=100", image2: "/images/booth44-2.webp?height=100&width=100" },
{ id: 43, position: [25, 0, -20], size: [2, 1.5, 2], name: "商品アンテナ倶楽部ブース", description: "商品アンテナ倶楽部ブースでは、メーカーブースツアーを実施します!ご希望の方は、10:45~/13:45~、の時間帯でブースにお越しください！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth43-1.webp?height=100&width=100", image2: "/images/booth43-2.webp?height=100&width=100" },
{ id: 42, position: [25, 0, -16], size: [2, 1.5, 2], name: "共済ブース", description: "共済ブースでは、お子さまが「コーすけぬりえ」で遊べます!co-op共済にご興味がある方はぜひブースに遊びに来てね!アンケートへのご回答でお楽しみ抽選にチャレンジできるよ♪", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth42-1.webp?height=100&width=100", image2: "/images/booth42-2.webp?height=100&width=100" },
{ id: 96, position: [25, 0, -6], size: [2, 1.5, 2], name: "東毛酪農ブース", description: "パルシステム群馬でもおなじみの「東毛酪農のびん牛乳」が購入できるブースです。いつもよりお得な価格で購入できるのでぜひブースにお越しください！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth96-1.webp?height=100&width=100", image2: "/images/booth96-2.webp?height=100&width=100" },
{ id: 39, position: [19, 0, -34], size: [2, 1.5, 2], name: "商品開発チーム", description: "商品開発チームブースでは、開発協力商品である「地球にやさしい手でつかう洗濯石けん」の紹介や、サンプルの配布、魚つりゲームなどを実施します！ぜひ遊びに来てくださいね！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth39-1.webp?height=100&width=100", image2: "/images/booth39-2.webp?height=100&width=100" },

// フードドライブ・トイレ・授乳室
{ id: 45, position: [25, 0, 1], size: [2, 1.5, 2], name: "フードドライブブース", description: "ご持参いただいたフードドライブにご寄付いただく食品などは、こちらのブースでお預かりしております。ご寄付いただいた食品は今後のフードドライブ寄贈式などでフードバンク事業者に寄贈いたします。", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth45-1.webp?height=100&width=100", image2: "/images/booth45-2.webp?height=100&width=100" },
{ id: 46, position: [-20, 0, 1], size: [2, 1.5, 2], name: "授乳室", description: "授乳室です。ご利用ください！", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth46-1.webp?height=100&width=100", image2: "/images/booth46-2.webp?height=100&width=100" },
{ id: 101, position: [-25, 0, 1], size: [7, 1.5, 2], name: "女性用トイレ", description: "女性用トイレです。", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth101-1.webp?height=100&width=100", image2: "/images/booth101-2.webp?height=100&width=100" },
{ id: 102, position: [-12, 0, 1], size: [8, 1.5, 2], name: "男性用トイレ", description: "男性用トイレです。", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth102-1.webp?height=100&width=100", image2: "/images/booth102-2.webp?height=100&width=100" },

// お仕事ブース
{ id: 47, position: [30, 0, 17], size: [7, 1.5, 7], name: "お仕事体験コーナー", description: "パルシステムのお仕事体験ができるよ！パルシステムの配達員になりきって、パパやママに商品を届けてみよう", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth47-1.webp?height=100&width=100", image2: "/images/booth47-2.webp?height=100&width=100" },

// ブース詳細を表示するためのオブジェクト
{ id: 200, position: [0, 0, 17], size: [40, 0.3, 7], name: "展示会マップ詳細", description: "商品展示会2024 3Dイベントマップの詳細は上記をチェック!", hasLink: false, link: "https://forms.gle/h5DLVLqZLLykifCJ8", image: "/images/booth200-1.webp?height=100&width=100", image2: "/images/booth200-2.webp?height=100&width=100" },

]

export default function Component() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [imageScale, setImageScale] = useState<number>(1.0); // 画像のスケール
  
  // ローディング状態とエラーメッセージのためのステートを追加
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false)  // マップを表示するかの状態


  useEffect(() => {
    if (!mountRef.current || !showMap) return // showMapがtrueの時だけ3Dマップを初期化
  
// テキストを作るための関数を追加
function createTextSprite(message, fontSize = 18, color = 'White') {
  const canvas = document.createElement('canvas'); // キャンバスを作成
  const context = canvas.getContext('2d'); // 2D描画用のコンテキストを取得

  // テキストの設定
  context.font = `${fontSize}px Arial`; // フォントサイズを直接指定
  context.fillStyle = color; // テキストの色を直接指定
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
    const texture = loader.load('images/map/background_new.webp', () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
      rt.fromEquirectangularTexture(renderer, texture)
      scene.background = rt.texture
    })

    // ライティング
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1)
    directionalLight.position.set(50, 200, 100)
    directionalLight.castShadow = true
    scene.add(directionalLight) 

    // スポットライトの追加（特定のブースを強調する場合）
    const spotLight = new THREE.SpotLight(0xffffff, 1.7);
    spotLight.position.set(15, 15, -2);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    // ターゲットオブジェクトを作成してターゲットを設定
    const spotLight2 = new THREE.SpotLight(0xffffff, 7.0); // 強度を上げる
    spotLight2.position.set(-30, 11, 1); // スポットライトの位置
      
    const targetObject = new THREE.Object3D();
    targetObject.position.set(-36, 5, -5); // 照らす位置
    scene.add(targetObject);
    spotLight2.target = targetObject;
    
    spotLight2.angle = Math.PI / 4;
    spotLight2.penumbra = 0.8;
    spotLight2.castShadow = true;
    spotLight2.shadow.mapSize.width = 1024;
    spotLight2.shadow.mapSize.height = 1024;
    spotLight2.distance = 50; // 距離を設定
    spotLight2.decay = 2; // 減衰を調整
    spotLight2.shadow.camera.near = 1; // シャドウカメラの設定
    spotLight2.shadow.camera.far = 200;
    
    scene.add(spotLight2);
    
    // ターゲットオブジェクトを作成してターゲットを設定
          const spotLight3 = new THREE.SpotLight(0xffffff, 7.0); // 強度を上げる
          spotLight3.position.set(-36, 11, 1); // スポットライトの位置
            
          const targetObject2 = new THREE.Object3D();
          targetObject2.position.set(-36, 5, -5); // 照らす位置
          scene.add(targetObject2);
          spotLight3.target = targetObject2;
          
          spotLight3.angle = Math.PI / 4;
          spotLight3.penumbra = 0.8;
          spotLight3.castShadow = true;
          spotLight3.shadow.mapSize.width = 1024;
          spotLight3.shadow.mapSize.height = 1024;
          spotLight3.distance = 50; // 距離を設定
          spotLight3.decay = 2; // 減衰を調整
          spotLight3.shadow.camera.near = 1; // シャドウカメラの設定
          spotLight3.shadow.camera.far = 200;
          
          scene.add(spotLight3);    

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
    
    //関係者以外立ち入り禁止のエリアを作成
    const blackAreaGeometry = new THREE.PlaneGeometry(8, 6);
    const blackAreaMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.5
    });
    const blackArea = new THREE.Mesh(blackAreaGeometry, blackAreaMaterial);
    blackArea.rotation.x = -Math.PI / 2;
    blackArea.position.set(-26, 0.01, -3);
    scene.add(blackArea);
    
    //ビエント入口
    const orangeAreaGeometry = new THREE.PlaneGeometry(5, 3);
    const orangeAreaMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF9900,
    transparent: true,
    opacity: 0.5
    });
    const orangeArea = new THREE.Mesh(orangeAreaGeometry, orangeAreaMaterial);
    orangeArea.rotation.x = -Math.PI / 2;
    orangeArea.position.set(15.4, 0.01, 8);
    scene.add(orangeArea);

    //ビエント出口1
    const orange2AreaGeometry = new THREE.PlaneGeometry(3, 3);
    const orange2AreaMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF9900,
    transparent: true,
    opacity: 0.5
    });
    const orange2Area = new THREE.Mesh(orange2AreaGeometry, orange2AreaMaterial);
    orange2Area.rotation.x = -Math.PI / 2;
    orange2Area.position.set(-3.3, 0.01, 8);
    scene.add(orange2Area);

    //ビエント出口2
    const orange3AreaGeometry = new THREE.PlaneGeometry(3, 3);
    const orange3AreaMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF9900,
    transparent: true,
    opacity: 0.5
    });
    const orange3Area = new THREE.Mesh(orange3AreaGeometry, orange3AreaMaterial);
    orange3Area.rotation.x = -Math.PI / 2;
    orange3Area.position.set(5.5, 0.01, 8);
    scene.add(orange3Area);

    // ローディングマネージャーの設定
    const loadingManager = new THREE.LoadingManager()
    loadingManager.onLoad = () => {
      console.log("Model loaded successfully.");
      setIsLoading(false);  // ここでエラーが出ているか確認
    };
    
    loadingManager.onError = (url) => {
      console.log(`Failed to load ${url}`);
      setError(`Failed to load ${url}`);  // ここでエラーが出ているか確認
    };

   // GLBモデルのロードと配置
    const gltfLoader = new GLTFLoader(loadingManager)
    gltfLoader.load("/images/glb/konsenkun.glb",  // パスが正しいか確認
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(8, 8, 8);
        model.position.set(-36, 4, -5);
    
        // モデルのマテリアルを明るくする
        model.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.material.emissive = new THREE.Color(0x333333);
            node.material.emissiveIntensity = 0.9;
          }
        });
    
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('An error happened during GLTF load:', error);
        setError('Failed to load GLB model');
      }
    );
    

    // ブース
    const defaultBoothMaterial = new THREE.MeshPhongMaterial({
      color: 0xFF9900,  // デフォルトの色
      specular: 0xFFFFFF,  // 反射光を白に
      shininess: 100,  // 光沢を強調
      emissive: 0x333333,  // 自ら放つ光
      emissiveIntensity: 1.5  // 発光の強さを設定
    });    
    const pinkBoothMaterial = new THREE.MeshPhongMaterial({
       color: 0xFFC0CB ,  
       specular: 0xFFFFFF,  // 反射光を白に
       shininess: 100,  // 光沢を強調
       emissive: 0x333333,  // 自ら放つ光
       emissiveIntensity: 1.5  // 発光の強さを設定
     }); 
    const greenBoothMaterial = new THREE.MeshPhongMaterial({
      color: 0x90EE90,  
      specular: 0xFFFFFF,  // 反射光を白に
      shininess: 100,  // 光沢を強調
      emissive: 0x333333,  // 自ら放つ光
      emissiveIntensity: 1.5  // 発光の強さを設定
    });
    const stageBoothMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,  // デフォルトの色
      specular: 0xFFFFFF,  // 反射光を白に
      shininess: 100,  // 光沢を強調
      emissive: 0x333333,  // 自ら放つ光
      emissiveIntensity: 1.5  // 発光の強さを設定
    }); 
    const redBoothMaterial = new THREE.MeshPhongMaterial({
     color: 0xFF0000,  
     specular: 0xFFFFFF,  // 反射光を白に
     shininess: 100,  // 光沢を強調
     emissive: 0x333333,  // 自ら放つ光
     emissiveIntensity: 1.5  // 発光の強さを設定
   }); 
    const blueBoothMaterial = new THREE.MeshPhongMaterial({
      color: 0x4EA8F9,  
      specular: 0xFFFFFF,  // 反射光を白に
      shininess: 100,  // 光沢を強調
      emissive: 0x333333,  // 自ら放つ光
      emissiveIntensity: 1.5  // 発光の強さを設定
    }); 
    const lightblueBoothMaterial = new THREE.MeshPhongMaterial({
      color: 0x00FFFF,  
      specular: 0xFFFFFF,  // 反射光を白に
      shininess: 100,  // 光沢を強調
      emissive: 0x333333,  // 自ら放つ光
      emissiveIntensity: 1.5  // 発光の強さを設定
    }); 
    const boothObjects: THREE.Mesh[] = [];

    // boothsをループする
    booths.forEach((booth) => {
      const boothGeometry = new THREE.BoxGeometry(booth.size[0], booth.size[1], booth.size[2]);
    
      // デフォルトのブースマテリアルを設定
      let boothMaterial = defaultBoothMaterial;
      if ([97, 90, 91, 92, 93, 94].includes(booth.id)) {
        boothMaterial = pinkBoothMaterial;
      } else if ([6, 13, 39, 40, 41, 42, 43, 44, 45, 46, 47, 96].includes(booth.id)) {
        boothMaterial = lightblueBoothMaterial;
      } else if ([1, 2, 10, 27].includes(booth.id)) {
        boothMaterial = greenBoothMaterial;
      } else if ([95, 200].includes(booth.id)) {
        boothMaterial = stageBoothMaterial; 
      } else if (booth.id === 101) {
        boothMaterial = redBoothMaterial;
      } else if (booth.id === 102) {
        boothMaterial = blueBoothMaterial;
      }
    
      // ブースメッシュを作成
      const boothMesh = new THREE.Mesh(boothGeometry, boothMaterial);
      boothMesh.position.set(...booth.position);
      boothMesh.castShadow = true;
      boothMesh.receiveShadow = true;
      boothMesh.userData = { id: booth.id };
    
      
      // idが200のブースには特別な処理をせず、通常のマテリアルを適用
      if (booth.id === 200) {
      // 通常のブースメッシュを追加
       scene.add(boothMesh);
       boothObjects.push(boothMesh);
       } else {
      // idが200でないブースは通常のブースメッシュを追加
      scene.add(boothMesh);
      boothObjects.push(boothMesh);
      }
    
// ここにテキストスプライトを追加します
const textSprite = createTextSprite(
  booth.name, // ブース名
  booth.id === 200 ? 33 : 18, // idが200の場合はフォントサイズ24、それ以外は18
  booth.id === 200 ? 'red' : 'White' // idが200の場合は色を赤、それ以外は白
);
textSprite.position.set(booth.position[0], booth.position[1] + booth.size[1] + 2, booth.position[2]); // ブースの上に配置
scene.add(textSprite); // シーンにテキストスプライトを追加
    });
    

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

    // 南南壁（狭い出口付き）
    const southWallGeometry3 = new THREE.BoxGeometry(24, wallHeight, wallThickness);
    const southWall3 = new THREE.Mesh(southWallGeometry3, wallMaterial);
    southWall3.position.set(-17, wallHeight / 2, 7);
    scene.add(southWall3);
    const southWallGeometry4 = new THREE.BoxGeometry(5, wallHeight, wallThickness);
    const southWall4 = new THREE.Mesh(southWallGeometry4, wallMaterial);
    southWall4.position.set(1, wallHeight / 2, 7);
    scene.add(southWall4);
    const southWallGeometry5 = new THREE.BoxGeometry(6, wallHeight, wallThickness);
    const southWall5 = new THREE.Mesh(southWallGeometry5, wallMaterial);
    southWall5.position.set(10, wallHeight / 2, 7);
    scene.add(southWall5);
    const southWallGeometry6 = new THREE.BoxGeometry(16, wallHeight, wallThickness);
    const southWall6 = new THREE.Mesh(southWallGeometry6, wallMaterial);
    southWall6.position.set(26, wallHeight / 2, 7);
    scene.add(southWall6);

    // 東壁（入口付き）
    const eastWallGeometry1 = new THREE.BoxGeometry(wallThickness, wallHeight, 10)
    const eastWall1 = new THREE.Mesh(eastWallGeometry1, wallMaterial)
    eastWall1.position.set(27, wallHeight / 2, -31)
    scene.add(eastWall1)

    const eastWallGeometry2 = new THREE.BoxGeometry(wallThickness, wallHeight, 22)
    const eastWall2 = new THREE.Mesh(eastWallGeometry2, wallMaterial)
    eastWall2.position.set(27, wallHeight / 2, -10.5)
    scene.add(eastWall2)

    // 東東壁
    const eastWallGeometry3 = new THREE.BoxGeometry(wallThickness, wallHeight, 44);
    const eastWall3 = new THREE.Mesh(eastWallGeometry3, wallMaterial);
    eastWall3.position.set(34, wallHeight / 2, -15);
    scene.add(eastWall3);

    // 仕切り
    const eastWallGeometry4 = new THREE.BoxGeometry(wallThickness, wallHeight,6.5);
    const eastWall4 = new THREE.Mesh(eastWallGeometry4, wallMaterial);
    eastWall4.position.set(9, wallHeight / 2, 3.5);
    scene.add(eastWall4);

    // 西壁
    const westWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 36)
    const westWall = new THREE.Mesh(westWallGeometry, wallMaterial)
    westWall.position.set(-30, wallHeight / 2, -18)
    scene.add(westWall)

    // 矢印を追加
    // 通常の矢印を作成する関数
  function createThickArrow(position, direction, length, color, shaftRadius = 0.2, headRadius = 0.4, headLength = 1) {
    const arrowDir = new THREE.Vector3(...direction).normalize(); // 矢印の方向
    const arrowPos = new THREE.Vector3(...position); // 矢印の位置

  // 矢印の軸部分を作成
  const shaftGeometry = new THREE.CylinderGeometry(shaftRadius, shaftRadius, length, 8);
  const shaftMaterial = new THREE.MeshBasicMaterial({ color });
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);

  // 矢印の先端部分を作成
  const headGeometry = new THREE.ConeGeometry(headRadius, headLength, 8);
  const headMaterial = new THREE.MeshBasicMaterial({ color });
  const head = new THREE.Mesh(headGeometry, headMaterial);

  // 矢印の軸を回転させて方向に合わせる
  shaft.rotation.z = Math.PI / 2; // X軸方向に回転
  head.rotation.z = Math.PI / 2; // X軸方向に回転

  // 矢印の位置を調整
  shaft.position.set(arrowPos.x, arrowPos.y, arrowPos.z);
  shaft.position.add(arrowDir.clone().multiplyScalar(length / 2)); // 矢印の半分の位置に移動
  head.position.set(arrowPos.x, arrowPos.y, arrowPos.z);
  head.position.add(arrowDir.clone().multiplyScalar(length)); // 先端の位置に移動

  // 矢印の方向に回転させる
  shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), arrowDir); // 矢印の方向に軸を回転
  head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), arrowDir); // 矢印の方向に先端を回転

  // シーンに追加
  scene.add(shaft);
  scene.add(head);
}

  // 両端に矢印の先端を持つ矢印を作成する関数
  function createDoubleEndedArrow(position, direction, length, color, shaftRadius = 0.2, headRadius = 0.4, headLength = 1) {
  const arrowDir = new THREE.Vector3(...direction).normalize(); // 矢印の方向
  const arrowPos = new THREE.Vector3(...position); // 矢印の位置

  // 矢印の軸部分を作成
  const shaftGeometry = new THREE.CylinderGeometry(shaftRadius, shaftRadius, length, 8);
  const shaftMaterial = new THREE.MeshBasicMaterial({ color });
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);

  // 矢印の先端部分（両端）
  const headGeometry = new THREE.ConeGeometry(headRadius, headLength, 8);
  const headMaterial = new THREE.MeshBasicMaterial({ color });
  const head1 = new THREE.Mesh(headGeometry, headMaterial);
  const head2 = new THREE.Mesh(headGeometry, headMaterial);

  // 矢印の軸を回転させて方向に合わせる
  shaft.rotation.z = Math.PI / 2; // X軸方向に回転

  // 矢印の位置を調整（軸の中心に配置）
  shaft.position.set(arrowPos.x, arrowPos.y, arrowPos.z);

  // 両端に矢印の先端を追加
  head1.position.set(arrowPos.x, arrowPos.y, arrowPos.z);
  head1.position.add(arrowDir.clone().multiplyScalar(length / 2 + headLength / 2)); // 片側の先端の位置に移動
  head2.position.set(arrowPos.x, arrowPos.y, arrowPos.z);
  head2.position.add(arrowDir.clone().multiplyScalar(-length / 2 - headLength / 2)); // もう片側の先端の位置に移動

  // 矢印の方向に回転させる
  shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), arrowDir); // 矢印の方向に軸を回転
  head1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), arrowDir); // 片側の矢印の方向に先端を回転
  head2.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), arrowDir); // もう片側の矢印の方向に回転

  // シーンに追加
  scene.add(shaft);
  scene.add(head1);
  scene.add(head2);
}

// 矢印を表示する座標リストを定義
const arrowPositions = [
  // 入場ベクトル
  { position: [22, 0, 4], direction: [2, 0, 0], length: 3, color: 0x0000FF }, 
  { position: [27, 0, -25], direction: [-2, 0, 0], length: 3, color: 0x0000FF }, 
  { position: [30, 0, -5], direction: [0, 0, -1], length: 3, color: 0x0000FF }, 
  { position: [30, 0, -15], direction: [0, 0, -1], length: 3, color: 0x0000FF }, 
  { position: [15.5, 0, 8], direction: [0, 0, -1], length: 3, color: 0x0000FF },
   
  // 再入場ベクトル
  { position: [5.5, 0, -1], direction: [0, 0, 1], length: 2, color: 0x00FF00, doubleEnded: true }, // 両端に矢印
  { position: [5.5, 0, 6], direction: [0, 0, 1], length: 2, color: 0x00FF00, doubleEnded: true },

  // 退場ベクトル
  { position: [0, 0, 4], direction: [-1, 0, 1], length: 3.5, color: 0xFF0000 }, 
];

// 矢印の描画
arrowPositions.forEach((arrow) => {
  const { position, direction, length, color, doubleEnded } = arrow;

  if (doubleEnded) {
    // 両端が矢印の場合
    createDoubleEndedArrow(position, direction, length, color, 0.3, 0.6, 1.5);
  } else {
    // 通常の矢印
    createThickArrow(position, direction, length, color, 0.3, 0.6, 1.5);
  }
});
    
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

    // id97を囲む壁を追加
    const booth97 = booths.find(booth => booth.id === 97)
    if (booth97) {
      addWallsAroundBooth(booth97, ['north', 'east', 'west'])
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

    // ロゴのテクスチャをロード
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/images/map/logo1.png");

      // ロゴのジオメトリを作成
    const aspect = 300 / 115; // 画像のアスペクト比
    const scale = 10; // スケールファクター
    const geometry = new THREE.PlaneGeometry(scale * aspect, scale);
    const material = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true, side: THREE.DoubleSide });
    const logo = new THREE.Mesh(geometry, material);
    logo.position.set(-40, 10, -40); // ロゴの位置を調整
    scene.add(logo);

    // ブースを作成する関数
  function createBooth(booth: Booth) {
    const geometry = new THREE.BoxGeometry(booth.size[0], booth.size[1], booth.size[2])
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xFF9900 }), // 右
      new THREE.MeshPhongMaterial({ color: 0xFF9900 }), // 左
      new THREE.MeshPhongMaterial({ color: 0xFF9900 }), // 上
      new THREE.MeshPhongMaterial({ color: 0xFF9900 }), // 下
      new THREE.MeshPhongMaterial({ color: 0xFF9900 }), // 前
      new THREE.MeshPhongMaterial({ color: 0xFF9900 })  // 後
    ]

    const mesh = new THREE.Mesh(geometry, materials)
    mesh.position.set(...booth.position)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData = { id: booth.id }

    if (booth.id === 200) {
      // id:200のブースの天面に画像を適用
      textureLoader.load('/images/map/eventmap_info.webp', 
        (texture) => {
          materials[2] = new THREE.MeshPhongMaterial({ map: texture })
          mesh.material = materials
        },
        undefined,
        (err) => {
          console.error('テクスチャのロードに失敗しました', err)
        }
      )
    }

    return mesh
  }


    // カメラの位置
    camera.position.set(0, 25, 35)
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
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(boothObjects);
    
      if (intersects.length > 0) {
        const selectedBoothId = intersects[0].object.userData.id;
        const booth = booths.find(b => b.id === selectedBoothId);
        if (booth) {
          setSelectedBooth(booth);
          setImageScale(1.5); // 大きく表示するサイズ
        }
      } else {
        setSelectedBooth(null);
        setImageScale(1.0); // 通常サイズに戻す
      }
    }
    

    window.addEventListener('click', onMouseClick)

  // アニメーションループ
  const clock = new THREE.Clock()
  function animate() {
    requestAnimationFrame(animate)
  const deltaTime = clock.getDelta()

  // ロゴの回転
  logo.rotation.y += 0.5 * deltaTime
  
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

    
       // クリーンアップ関数
       return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    }, [showMap]);
  
    return (
      <div>
        {!showMap ? (
          <Instructions onShowMap={() => setShowMap(true)} /> // showMapがfalseならInstructionsを表示
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      
            {isLoading && <p>マップを読み込んでいます...</p>}
            {error && <p>エラー: {error}</p>}
      
            {selectedBooth && (
  <div style={{
    position: 'absolute',
    top: '16px',
    left: '14px',
    background: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    maxWidth: selectedBooth.id === 200 ? '600px' : '240px', // id:200なら幅を広く
    zIndex: 10,  // モーダルを前面に
  }}>
    <img src={selectedBooth.image} alt={selectedBooth.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
    <img src={selectedBooth.image2} alt={`${selectedBooth.name} - 追加画像`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
    <h3>{selectedBooth.name}</h3>
    <p>{selectedBooth.description}</p>

    {/* リンクが必要な場合のみリンクを表示 */}
    {selectedBooth.hasLink && (
      <a href={selectedBooth.link} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#ff6f61',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none',
        marginTop: '10px',
      }}>
        注文する
      </a>
    )}
  </div>
      )}
      
            {/* リンクボタン */}
            {selectedBooth && (
  <div style={{
    position: 'absolute',
    top: '16px',
    left: '14px',
    background: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    maxWidth: selectedBooth.id === 200 ? '600px' : '240px', // Adjusted width based on booth id
    zIndex: 10,
  }}>
    <img src={selectedBooth.image} alt={selectedBooth.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
    <img src={selectedBooth.image2} alt={`${selectedBooth.name} - 追加画像`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
    <h3>{selectedBooth.name}</h3>
    <p>{selectedBooth.description}</p>

    {selectedBooth.hasLink && (
      <a href={selectedBooth.link} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#ff6f61',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none',
        marginTop: '10px',
      }}>
        注文する
      </a>
    )}
  </div>
)}

{/* リンクボタンの設置 */}
{!selectedBooth && (
  <>
    <a href="https://www.palsystem-gunma.coop/posts/?id=2024expo-makerinfo" target="_blank" style={{
      position: 'absolute',
      bottom: '80px',
      right: '10px',
      padding: '6px 12px',
      backgroundColor: '#FF69B4',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '15px',
      fontSize: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      zIndex: 20,
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      すべてのメーカーブース詳細はこちら
    </a>

    <a href="https://forms.gle/PhDiqVmncdAo14rKA" target="_blank" style={{
      position: 'absolute',
      bottom: '45px',
      right: '10px',
      padding: '6px 12px',
      backgroundColor: '#32CD32',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '15px',
      fontSize: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      zIndex: 20,
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      商品展示会アンケートはこちらから
    </a>

    <a href="https://forms.gle/h5DLVLqZLLykifCJ8" target="_blank" style={{
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      padding: '6px 12px',
      backgroundColor: '#ff4d4d',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '15px',
      fontSize: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      zIndex: 20,
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      商品の注文はこちらからもできます！
    </a>
  </>
)}
          </div>
        )}
      </div>
    );
    
    
    
  }
  
function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

