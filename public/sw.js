if(!self.define){let a,e={};const s=(s,i)=>(s=new URL(s+".js",i).href,e[s]||new Promise((e=>{if("document"in self){const a=document.createElement("script");a.src=s,a.onload=e,document.head.appendChild(a)}else a=s,importScripts(s),e()})).then((()=>{let a=e[s];if(!a)throw new Error(`Module ${s} didn’t register its module`);return a})));self.define=(i,n)=>{const r=a||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let c={};const b=a=>s(a,r),d={module:{uri:r},exports:c,require:b};e[r]=Promise.all(i.map((a=>d[a]||b(a)))).then((a=>(n(...a),c)))}}define(["./workbox-4754cb34"],(function(a){"use strict";importScripts(),self.skipWaiting(),a.clientsClaim(),a.precacheAndRoute([{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/chunks/3a17f596-bb02f84a2c958e14.js",revision:"bb02f84a2c958e14"},{url:"/_next/static/chunks/484.da50829333201e55.js",revision:"da50829333201e55"},{url:"/_next/static/chunks/6eb5140f-16e0e978c82cd615.js",revision:"16e0e978c82cd615"},{url:"/_next/static/chunks/709.e04b3301a1eba8ef.js",revision:"e04b3301a1eba8ef"},{url:"/_next/static/chunks/7eacfa21-15a8e75c9b274026.js",revision:"15a8e75c9b274026"},{url:"/_next/static/chunks/85d7bc83-a00f033d03d19765.js",revision:"a00f033d03d19765"},{url:"/_next/static/chunks/989-9bc6b57d866e299c.js",revision:"9bc6b57d866e299c"},{url:"/_next/static/chunks/framework-a4ddb9b21624b39b.js",revision:"a4ddb9b21624b39b"},{url:"/_next/static/chunks/main-88d1b792b3c7bb19.js",revision:"88d1b792b3c7bb19"},{url:"/_next/static/chunks/pages/%5Bcategory%5D/%5Bsub%5D-28226e567eb9abdd.js",revision:"28226e567eb9abdd"},{url:"/_next/static/chunks/pages/404-3218dd227c9b8e96.js",revision:"3218dd227c9b8e96"},{url:"/_next/static/chunks/pages/_app-94843c121423ecb5.js",revision:"94843c121423ecb5"},{url:"/_next/static/chunks/pages/_error-bb091f187c2001db.js",revision:"bb091f187c2001db"},{url:"/_next/static/chunks/pages/blog-01f432e086be89bd.js",revision:"01f432e086be89bd"},{url:"/_next/static/chunks/pages/blog/%5B...blogid%5D-e94d9e95dfc14fd5.js",revision:"e94d9e95dfc14fd5"},{url:"/_next/static/chunks/pages/book/%5Bbook_id%5D-612123da7f8d7f79.js",revision:"612123da7f8d7f79"},{url:"/_next/static/chunks/pages/index-d2bad384fb2f575b.js",revision:"d2bad384fb2f575b"},{url:"/_next/static/chunks/pages/protected-53f25606e49f2095.js",revision:"53f25606e49f2095"},{url:"/_next/static/chunks/pages/shlok/%5B...slug%5D-c5c19c35750a2e3e.js",revision:"c5c19c35750a2e3e"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-ea28696b697ed16b.js",revision:"ea28696b697ed16b"},{url:"/_next/static/css/2f20ba5d6c5ac190.css",revision:"2f20ba5d6c5ac190"},{url:"/_next/static/css/4ff48998cd635d03.css",revision:"4ff48998cd635d03"},{url:"/_next/static/css/68743a55beae8126.css",revision:"68743a55beae8126"},{url:"/_next/static/css/74c9dc484d05743c.css",revision:"74c9dc484d05743c"},{url:"/_next/static/css/96030106a1e475b4.css",revision:"96030106a1e475b4"},{url:"/_next/static/css/c75d9356280f52ed.css",revision:"c75d9356280f52ed"},{url:"/_next/static/css/d3b0b11e2c25bf00.css",revision:"d3b0b11e2c25bf00"},{url:"/_next/static/eZgEvI3bpPLhICekntC6T/_buildManifest.js",revision:"087abb254c112a911d44f3b0f0102d15"},{url:"/_next/static/eZgEvI3bpPLhICekntC6T/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/banners/bhagavad_gita.jpg",revision:"1fc23a321c52b9188fac4b534d956cee"},{url:"/banners/hanuman_chalisa.webp",revision:"d46b647e63854db8b7ab81acdfda30df"},{url:"/banners/krishna_ki_chetavani.jpg",revision:"813d644e46a6885840effb7436e24c22"},{url:"/banners/mahabharat.png",revision:"556bc3766dc23204fd05a681b2569c1e"},{url:"/banners/purana.jpg",revision:"7a456ee242a03ad9cf85e8ab91adf222"},{url:"/banners/ramayana.jpg",revision:"aef2893274956bc911b1890528321063"},{url:"/banners/ramcharitmanas.jpg",revision:"948fe4c0cbad96c6b36a85af9b183a8a"},{url:"/banners/shiv_tandav_strotam.jpg",revision:"2ac58051cba2edb6fb1ff9d7201b3ee3"},{url:"/banners/upanishad.jpg",revision:"f97f66435c2ecf655caf624cca354a0a"},{url:"/banners/veda.jpg",revision:"aa74b49e4a0e2810c9e24bffe6777cce"},{url:"/book/covers.jpg",revision:"d43df0d1769a4dba27d5edf6411097ae"},{url:"/book/covers_left.png",revision:"897443586efb40daf7cfe5054dff82c2"},{url:"/book/covers_middle.png",revision:"e568a5ea89ca42dc212bb6d6d0aec7a3"},{url:"/book/covers_right.png",revision:"50d049e00eb33f3a8fd1a431f0352a24"},{url:"/book/page_temp.png",revision:"f81e0ea5d9a06c039d524553f826cfcd"},{url:"/book/page_temp_2.png",revision:"cb05d8a06f26a3631fd86da22375dfd1"},{url:"/book/pages.jpg",revision:"8905ee2db2ba8bf735ca6e9934184dd7"},{url:"/book/pages.png",revision:"fba0f51c4fa06d690b5fa0d0fa08c971"},{url:"/book/pages1.png",revision:"b7122ee28c62ea8244eae7c78d5f73cb"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/ShivTandav01.jpg",revision:"79411c428d46761dbb3e57d347eed3e7"},{url:"/images/decex_black.png",revision:"ccc512f8044226bdba3a91a35320c689"},{url:"/js/pdf.worker.min.mjs",revision:"f48f65814071581c0eab3cd601ca69b6"},{url:"/logos/brand_logo_192.png",revision:"6a39eee90604e0e2321efd5aebe12f13"},{url:"/logos/brand_logo_512.png",revision:"329d2800db56c6c7e3ff941baf29d714"},{url:"/manifest.json",revision:"efb93e054b36cbb3bf696be3cfc0d230"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/protected.jpg",revision:"d6248517e7db94692c0e7e22aedfb251"},{url:"/self.jpg",revision:"712886c740371ac7285f8a7374b099db"},{url:"/shloka/hanuman-chalisa/shloka1.jpg",revision:"7374505ad95f5883edc51a811ab71750"},{url:"/shloka/hanuman-chalisa/shloka10.jpg",revision:"6fdefd37711c841c6c10eb954d748f24"},{url:"/shloka/hanuman-chalisa/shloka11.jpg",revision:"5967834612fdedb5467558fd85094c06"},{url:"/shloka/hanuman-chalisa/shloka12.jpg",revision:"c96877e736a34e45f7b708591afb43c7"},{url:"/shloka/hanuman-chalisa/shloka13.jpg",revision:"0e8d83219c0b88246c8074e2846412b7"},{url:"/shloka/hanuman-chalisa/shloka14.jpg",revision:"862cf7a314acee786ea0ac7914bb3736"},{url:"/shloka/hanuman-chalisa/shloka15.jpg",revision:"00f7f2a5d4cf723130ead73c77447b7b"},{url:"/shloka/hanuman-chalisa/shloka16.jpg",revision:"20a1812ad2780ba18ceb5545019967b6"},{url:"/shloka/hanuman-chalisa/shloka17.jpg",revision:"879d1d8a23c7104ff9c412d04a772c04"},{url:"/shloka/hanuman-chalisa/shloka18.jpg",revision:"6a5b69a6f24382ec0ca220d3dbe27217"},{url:"/shloka/hanuman-chalisa/shloka19.jpg",revision:"37693b8b5514407f1a2bf64a634ba6f8"},{url:"/shloka/hanuman-chalisa/shloka2.jpeg",revision:"fb6429a427b9cc2e6b3bda0c20c010be"},{url:"/shloka/hanuman-chalisa/shloka20.jpeg",revision:"3aa6dc63b29ed2bfee486f5637e87280"},{url:"/shloka/hanuman-chalisa/shloka21.jpg",revision:"0dc3b8c933fdf183bf1909c1e8fe5548"},{url:"/shloka/hanuman-chalisa/shloka3.jpg",revision:"7bfe8a5d808c78462ca064591868533e"},{url:"/shloka/hanuman-chalisa/shloka4.jpg",revision:"0fa20c78f983f90f7ac593ea56964b28"},{url:"/shloka/hanuman-chalisa/shloka5.jpg",revision:"bc46c6916160019a4afd859d9ddbb4d3"},{url:"/shloka/hanuman-chalisa/shloka6.jpg",revision:"750d6eb8a74d782e3e91d5d85d5799e1"},{url:"/shloka/hanuman-chalisa/shloka7.jpg",revision:"265c517b50fe888862267385081f3ada"},{url:"/shloka/hanuman-chalisa/shloka8.jpg",revision:"83ceee7ae02834bbe834ac715e1b4d26"},{url:"/shloka/hanuman-chalisa/shloka9.jpg",revision:"129ad1048c0c8dab8f14d441d3b3dbda"},{url:"/shloka/krishna-chetavni/shloka1.jpg",revision:"98d20677849a7ce340d905be36a39d2b"},{url:"/shloka/krishna-chetavni/shloka10.jpg",revision:"f2278ff67da682ce7d2d6390dde30471"},{url:"/shloka/krishna-chetavni/shloka11.jpg",revision:"26a66d00c1c650ca5d52006b52e5c9be"},{url:"/shloka/krishna-chetavni/shloka12.jpg",revision:"9d167c6e1cd05a54dce2e9d686fa341a"},{url:"/shloka/krishna-chetavni/shloka13.jpg",revision:"ea387dbd7f974d7edb9893cdaaf3eca6"},{url:"/shloka/krishna-chetavni/shloka14.jpg",revision:"d66dfc08ed0e4e28081f3cc36ddc95e4"},{url:"/shloka/krishna-chetavni/shloka15.jpg",revision:"da247f1352cbe0709ee83a73cb41950e"},{url:"/shloka/krishna-chetavni/shloka16.jpg",revision:"5c325c88c3e966c5fb36a810bd37ba43"},{url:"/shloka/krishna-chetavni/shloka17.jpg",revision:"9c001a453d05ca69ccdd8c3ae5349237"},{url:"/shloka/krishna-chetavni/shloka2.jpg",revision:"4d8efeec49df7b7e70571c196c034539"},{url:"/shloka/krishna-chetavni/shloka3.jpg",revision:"1c80ed5cde3fbf7bbd8acce5d04278ae"},{url:"/shloka/krishna-chetavni/shloka4.jpg",revision:"6cceb014babc08c9fbd1d9801b5148a7"},{url:"/shloka/krishna-chetavni/shloka5.jpg",revision:"d4d885fdf0421a7eba533a6e935a486e"},{url:"/shloka/krishna-chetavni/shloka6.jpg",revision:"08a8d9bfdb3717e9ea9ad4fc6a7a4445"},{url:"/shloka/krishna-chetavni/shloka7.webp",revision:"f2b7c351c5e7003545f7a5241e0714ae"},{url:"/shloka/krishna-chetavni/shloka8.jpg",revision:"72cbaccbd2a6e44e1deba68eb7502598"},{url:"/shloka/krishna-chetavni/shloka9.jpg",revision:"3c2630032acd165d5709857948a08707"},{url:"/shloka/shiv-tandav-strota/shloka1.jpg",revision:"5dddcd138ddf88d77b21148f4cd3fde7"},{url:"/shloka/shiv-tandav-strota/shloka10.avif",revision:"27034b71ee569a04dcf41ce18975a1e1"},{url:"/shloka/shiv-tandav-strota/shloka11.jpg",revision:"bc67066e62647bd16709be024fe980d4"},{url:"/shloka/shiv-tandav-strota/shloka12.png",revision:"de4c496659b333748007ceabc4056b09"},{url:"/shloka/shiv-tandav-strota/shloka13.png",revision:"9e1379f2cd7c3c3ba5c7e82eaf429819"},{url:"/shloka/shiv-tandav-strota/shloka14.jpg",revision:"4b6f8cf2d5f0c0fb62a2c3565d58109a"},{url:"/shloka/shiv-tandav-strota/shloka2.webp",revision:"a28b1427da734d7885b4218342f262f9"},{url:"/shloka/shiv-tandav-strota/shloka3.webp",revision:"7d5d12bbb54c6e5b8c1910f384fe6ef9"},{url:"/shloka/shiv-tandav-strota/shloka4.jpg",revision:"87792877f68ce9d8b22798eb3fadb2f8"},{url:"/shloka/shiv-tandav-strota/shloka5.webp",revision:"2208b2d72707357e76bd1dc9f1af14b1"},{url:"/shloka/shiv-tandav-strota/shloka6.jpg",revision:"d4533fdf0723d2fefb86792a5160a8a4"},{url:"/shloka/shiv-tandav-strota/shloka7.jpg",revision:"efe930c5c54e2b89faea679d1f736292"},{url:"/shloka/shiv-tandav-strota/shloka8.png",revision:"d795085cacb3081af24b7613f5a40a77"},{url:"/shloka/shiv-tandav-strota/shloka9.jpg",revision:"3c8d17782d473bfc4072c84e6c87cdb0"},{url:"/testing.jpg",revision:"feaa05a5a343afc696166d224d94ba69"},{url:"/testingHero.jpg",revision:"070e25755ac4e7a788a7d66736caaa24"},{url:"/thumbnails/Others/AdiShankaracharya.jpg",revision:"17fc4e0ed6b963d6fc169ed9bba9b488"},{url:"/thumbnails/Others/Agastya_Sanhita.jpg",revision:"b3d020f8d9c849edfb35f81188a15b0d"},{url:"/thumbnails/Others/Ashtavakra_Gita.jpg",revision:"067e1661b537e02b892537465758a8f4"},{url:"/thumbnails/Others/Bhrigu_Samhita.png",revision:"c302aee72ee94b2c0c3a4afff0eb65c9"},{url:"/thumbnails/Others/Brahma_Samhita.jpg",revision:"1c80ed5cde3fbf7bbd8acce5d04278ae"},{url:"/thumbnails/Others/Chanakya_Chant.webp",revision:"592f55b1b2f3796d58cedefad2f5481e"},{url:"/thumbnails/Others/Chanakya_Niti.avif",revision:"e75bd69152451a30cd013e6224f97fb0"},{url:"/thumbnails/Others/Dhanurveda_Samhita.avif",revision:"56c6552d818c72985e7b73bfffa202de"},{url:"/thumbnails/Others/Durga_Saptashati_Patha.avif",revision:"05c237d7ed19f52a83a02c78b850bf7c"},{url:"/thumbnails/Others/Gajendra_Moksha.jpg",revision:"012a10ed4cd4e573cb5eecb4f906c106"},{url:"/thumbnails/Others/Gita_Mahatmya.jpg",revision:"f66a14103509b42f5111771a6120d43b"},{url:"/thumbnails/Others/Guru_granth_sahib.jpg",revision:"d1d1606d06446cac6743379b2eb841e3"},{url:"/thumbnails/Others/Kakbhushundi_Ramayana.jpg",revision:"7b9d72e9b4da243f09ba4f00c8d45499"},{url:"/thumbnails/Others/Mimamsa.jpg",revision:"26ed72ff50e6d2d5bd395340ee562d6c"},{url:"/thumbnails/Others/Niti_Shatakam.webp",revision:"acc352db3ff82993b0380dd0edbe5ea1"},{url:"/thumbnails/Others/Nyaya_Shastra.avif",revision:"1cd29315622f731d70cd334222e5c566"},{url:"/thumbnails/Others/Pandava_Gita.jpg",revision:"87b760df24dc2902c7c1c8b24a257d7b"},{url:"/thumbnails/Others/Patanjali_Yoga.jpg",revision:"7950af69051bf57b49410fca785b96a0"},{url:"/thumbnails/Others/Rudrashtadhyayi.jpg",revision:"a4f8d512260e858be6c9d947ed929692"},{url:"/thumbnails/Others/Samkhya_Darshan.jpg",revision:"a8de88b33310c70ab8aa94ffd32f2d82"},{url:"/thumbnails/Others/Sciences_in_Vedas.png",revision:"47ae8db0593eeb252bdee05940944adf"},{url:"/thumbnails/Others/Shri_Narayan_Kavach.jpg",revision:"d4d885fdf0421a7eba533a6e935a486e"},{url:"/thumbnails/Others/Shri_Ram_Raksha_Stotra.jpg",revision:"b5e85e76b43f342cd1903e30ea88efc1"},{url:"/thumbnails/Others/Sunderkaand.webp",revision:"b243b951766fd3a69278e8acb4ff5d86"},{url:"/thumbnails/Others/Surya_Siddhanta.webp",revision:"5d7ee5dd98bc46cd12dc63aada93d05f"},{url:"/thumbnails/Others/Sushruta_Samhita.jpeg",revision:"d833257cd38507608e6491dc614ba252"},{url:"/thumbnails/Others/Vedant_Darshan.jpg",revision:"50c95efa90a30ed951891119c047be01"},{url:"/thumbnails/Others/Vidur_Niti.jpg",revision:"74e2c14e58b480cd61f53425671f1cfa"},{url:"/thumbnails/Others/Vinay_Patrika.png",revision:"9e984cd2a17531b89e7912a167842d18"},{url:"/thumbnails/Others/Vivekachudamani.jpeg",revision:"9cbf0e1784107423a952564b13ae91af"},{url:"/thumbnails/Others/Vrata_Parichaya.avif",revision:"9d934ebb3df8533c92123dafe145592a"},{url:"/thumbnails/Others/Yatharta_Gita.png",revision:"45dc8461568fd822b84fce500969ddc9"},{url:"/thumbnails/Others/Yoga_Vasistha_Ramayana.jpg",revision:"351b74f2ed261091a9a603b678f94631"},{url:"/thumbnails/Others/adbhut_ramayan.jpg",revision:"5adeb9eab88b87295675ef10a3446372"},{url:"/thumbnails/Others/adhyatma_ramayana.jpg",revision:"ff6c78c0bbd70a2dfd3592f2e5831251"},{url:"/thumbnails/Others/adinath_purana.jpg",revision:"502ffd91932d0ebcf33998b22677efb0"},{url:"/thumbnails/Others/aditya_hridyam.jpg",revision:"77a51f48eb3836ba30b0fb167e92a337"},{url:"/thumbnails/Others/antyakarm_shradha.jpg",revision:"4d8efeec49df7b7e70571c196c034539"},{url:"/thumbnails/Others/bhavishya_malika.jpg",revision:"8805a10d7fe20d69afec83282eda3a0a"},{url:"/thumbnails/Others/dohavali.webp",revision:"f3a10644107ab558b544e1c2465c89e2"},{url:"/thumbnails/Others/gayatri_mantra.webp",revision:"f9ca9ee342d760be6b686acf1ce41c67"},{url:"/thumbnails/Others/gita_sanghraha.jpeg",revision:"8a7041ca30b0f34515322bf8d0639f75"},{url:"/thumbnails/Others/gitavali.webp",revision:"257127de7f1388be545f1ac794efddeb"},{url:"/thumbnails/Others/harivansh_purana.jpg",revision:"6774f606d59d0f169de21fc4995d1c77"},{url:"/thumbnails/Others/jivancharya.jpg",revision:"f3462cc141f89f847b88cb5e8b2d6e93"},{url:"/thumbnails/Others/mahamrityunjai.avif",revision:"fa336e90ea53f80960d0dd0a0f3bb738"},{url:"/thumbnails/Others/manglacharan.jpg",revision:"1420451658538c56ea554eb877635e2f"},{url:"/thumbnails/Others/muhurt_chintamadi.avif",revision:"7025450afb42db04899770d68893e7ef"},{url:"/thumbnails/Others/nitya_karm_puja.jpeg",revision:"3b5ddeaba8cfa408c4473f8a6c3534f1"},{url:"/thumbnails/Others/panchdev.webp",revision:"c1d69dca56c513f968a72848257d8f06"},{url:"/thumbnails/Others/raghavayadaviyam.jpg",revision:"b46782fd6c02a0e2de679c7d1ec4c471"},{url:"/thumbnails/Others/ramayana.jpg",revision:"6cceb014babc08c9fbd1d9801b5148a7"},{url:"/thumbnails/Others/ravana_samhita.jpg",revision:"94a94e81681aedca696b77ae7d170de1"},{url:"/thumbnails/Others/sadhak_sanjivni.png",revision:"4e5e2972381e9aee9e0247ae0d5c30e0"},{url:"/thumbnails/Others/saral_gita_saar.avif",revision:"4db13b3fb9720d6062f4c9bc5b689796"},{url:"/thumbnails/Others/shani_chalisha.jpg",revision:"a41f803e0fe8d48b5b5ce37ee03dc249"},{url:"/thumbnails/Others/shree_bhaktmal.jpg",revision:"4eb79d5031b0ad1533eb894835c4a36b"},{url:"/thumbnails/Others/shringar_shatkam.webp",revision:"cf6fbf6c7ab06fc393a337e96660d4d3"},{url:"/thumbnails/Others/solah_sanskar.avif",revision:"153668bc1ae97eef4df86f49a43fe311"},{url:"/thumbnails/Others/strotaratnavali.jpeg",revision:"56fcd0db67bb3d96092ebb6733df7bbc"},{url:"/thumbnails/Others/vedic_sukt_sangraha.avif",revision:"f24fffcbf23f2f3a1f9a8697505d56fa"},{url:"/thumbnails/Others/vividchikitsak.avif",revision:"8e8f84a8b884d39d840b265a977a3967"},{url:"/thumbnails/Others/yogachintamani.avif",revision:"5678ba9732e13db0493c838f4b1ac1c1"},{url:"/thumbnails/Purana/agni_purana.png",revision:"ea4cfab862857816da4f6a0d817a831a"},{url:"/thumbnails/Purana/bhagwata_purana.webp",revision:"4a1b28759509440ff326fb22ce725708"},{url:"/thumbnails/Purana/bhavishya_purana.avif",revision:"83b7abb7c503ac26b2bf457ed6e6556d"},{url:"/thumbnails/Purana/bhrama_vaivrat_purana.jpg",revision:"ecbc7fb33fbe4a6ae2fec1d1fcc668f7"},{url:"/thumbnails/Purana/brahma_purana.avif",revision:"28c631ad703d49bff84ff6a2af9eabed"},{url:"/thumbnails/Purana/devi_bhagwat_purana.avif",revision:"2e9c696bdf2475b811669afb9fb2bede"},{url:"/thumbnails/Purana/ganesha_purana.jpg",revision:"a7bcb70aa3af78a6198e5dd39dd852f7"},{url:"/thumbnails/Purana/garuda_purana.webp",revision:"fdf659993c8dbfd5098d8aa7101ed77f"},{url:"/thumbnails/Purana/kalika_purana.jpg",revision:"21912132d7c0573af4fc6e2a943a0b87"},{url:"/thumbnails/Purana/kalki_purana.jpg",revision:"a5703c1fbcaa64654dcc22123db11d17"},{url:"/thumbnails/Purana/kurma_purana.jpg",revision:"ccf0cd8618ee31d71608ea66f6c956a1"},{url:"/thumbnails/Purana/linga_purana.avif",revision:"07605e790cbe0225e6715d7ec68559b4"},{url:"/thumbnails/Purana/markandeya_purana.jpg",revision:"6609ade3d0f67cc01c965b1725c2a0e9"},{url:"/thumbnails/Purana/matsya_purana.jpg",revision:"6831df1aae1ef646ce16896cc5f82b00"},{url:"/thumbnails/Purana/naradiya_purana.jpg",revision:"1c4d1b81ecac69678ac4660910c65f41"},{url:"/thumbnails/Purana/narasimha_purana.jpg",revision:"08a8d9bfdb3717e9ea9ad4fc6a7a4445"},{url:"/thumbnails/Purana/padma_purana.webp",revision:"f2b7c351c5e7003545f7a5241e0714ae"},{url:"/thumbnails/Purana/shiv_purana.jpg",revision:"37ddf5e690934eb8045177b1eab215b4"},{url:"/thumbnails/Purana/skhand_purana.jpg",revision:"8ba2c45e2fdd63fbaaec8a617c03bb4b"},{url:"/thumbnails/Purana/vamana_purana.jpg",revision:"53b4897b888fcc6a2e87048089758e56"},{url:"/thumbnails/Purana/varaha_purana.jpg",revision:"c0b0c68a1f394cf396ae12d2e0b6c678"},{url:"/thumbnails/Purana/vayu_purana.webp",revision:"1ce8dd2dd0cd7a3f22049a7bd715f8de"},{url:"/thumbnails/Purana/vishnu_purana.jpg",revision:"72cbaccbd2a6e44e1deba68eb7502598"},{url:"/thumbnails/Upanishad/108_upanishad.jpg",revision:"55f230746a00c656e1b49dc96fb9eee2"},{url:"/thumbnails/Upanishad/aitareya_upanishad.jpg",revision:"e86ec89cc1231ad0e841f61d652a778f"},{url:"/thumbnails/Upanishad/brihadaranyaka_upanishad.jpeg",revision:"6bc080214c9d3f1aaf8615aff2707c39"},{url:"/thumbnails/Upanishad/chandogya_upanishad.avif",revision:"035a08ec5ef5add97efa8542dc809d54"},{url:"/thumbnails/Upanishad/isavasya_upanishad.jpg",revision:"c7c948a6617feb602d1d792f657645b8"},{url:"/thumbnails/Upanishad/isha_upanishad.jpg",revision:"b6722a246eda2dfd0ba11270f0f92a70"},{url:"/thumbnails/Upanishad/kaivalya_upanishad.webp",revision:"92648342cb408c1edc0267d223bb85cf"},{url:"/thumbnails/Upanishad/kathopanishad.jpg",revision:"a244da7493d9c64d5a801914c6af1737"},{url:"/thumbnails/Upanishad/kena_upanishad.jpg",revision:"77c86b91e7084d915f91ac194e8101bb"},{url:"/thumbnails/Upanishad/mandukya_upanishad.jpg",revision:"a2d7079e9c955ec54dbe624b92eab603"},{url:"/thumbnails/Upanishad/mundaka_upanishad.jpg",revision:"dcc42a0e98e99b71e70c0190af9e5642"},{url:"/thumbnails/Upanishad/nirvard_upanishad.webp",revision:"2c64ff1b07ba22cb87d0b2bcaaa70430"},{url:"/thumbnails/Upanishad/prashna_upanishad.jpg",revision:"b4c034ebe9b327ad8a681bee1b5c9197"},{url:"/thumbnails/Upanishad/taittiriya_upanishad.avif",revision:"1e38a555585de98fbeb17f0fe07ea690"},{url:"/thumbnails/Vedas/atharv_veda.avif",revision:"fe50fa051212762fadc2b2190010473e"},{url:"/thumbnails/Vedas/rig_veda.jpg",revision:"06bee12c39e4bd8cbdd7bfdd11000aa1"},{url:"/thumbnails/Vedas/sam_veda.jpg",revision:"522121b449d9451992ef74a5b462a4ca"},{url:"/thumbnails/Vedas/yajur_veda.jpg",revision:"c2c2110cd6aeac1f18b20ddbb0942fa2"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),a.cleanupOutdatedCaches(),a.registerRoute("/",new a.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:a,response:e,event:s,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),a.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new a.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),a.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new a.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),a.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new a.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),a.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new a.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new a.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\/_next\/image\?url=.+$/i,new a.StaleWhileRevalidate({cacheName:"next-image",plugins:[new a.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:mp3|wav|ogg)$/i,new a.CacheFirst({cacheName:"static-audio-assets",plugins:[new a.RangeRequestsPlugin,new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:mp4)$/i,new a.CacheFirst({cacheName:"static-video-assets",plugins:[new a.RangeRequestsPlugin,new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:js)$/i,new a.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:css|less)$/i,new a.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new a.StaleWhileRevalidate({cacheName:"next-data",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:json|xml|csv)$/i,new a.NetworkFirst({cacheName:"static-data-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute((({url:a})=>{if(!(self.origin===a.origin))return!1;const e=a.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new a.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),a.registerRoute((({url:a})=>{if(!(self.origin===a.origin))return!1;return!a.pathname.startsWith("/api/")}),new a.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute((({url:a})=>!(self.origin===a.origin)),new a.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
