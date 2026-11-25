const paths = {
 bean:'<ellipse cx="12" cy="12" rx="7" ry="9" transform="rotate(38 12 12)"/><path d="M17 5c0 8-10 6-10 14"/>',
 home:'<path d="m3 10 9-7 9 7v10H4V10m5 10v-6h6v6"/>',
 cup:'<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zm13 1h2a3 3 0 0 1 0 6h-2M3 22h17M8 2v3m5-3v3"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 book:'<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="11" r="3"/><path d="M9 17h6"/>',
 star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 spark:'<path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10z"/>',
 pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2"/>',
 bag:'<path d="M5 7h14l2 14H3L5 7zm4 2V6a3 3 0 0 1 6 0v3"/>',
 car:'<path d="m4 11 2-6h12l2 6M3 11h18v7H3zm2 7v3m14-3v3M6 14h2m8 0h2"/>',
 previous:'<path d="m15 5-7 7 7 7"/>',next:'<path d="m9 5 7 7-7 7"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',
 mic:'<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8"/>'
};
const faIcons={bean:'fa-seedling',home:'fa-house',cup:'fa-mug-hot',clock:'fa-clock',book:'fa-passport',star:'fa-star',spark:'fa-wand-magic-sparkles',pin:'fa-location-dot',bag:'fa-bag-shopping',car:'fa-car-side',previous:'fa-chevron-left',next:'fa-chevron-right',plus:'fa-plus',close:'fa-xmark',mic:'fa-microphone'};
const icon = name => '<i class="icon fa-solid '+faIcons[name]+'" aria-hidden="true"></i>';
function firstName(){return state.profileName.split(/\s+/)[0];}
function profileInitial(){return Array.from(firstName())[0].toLocaleUpperCase();}
const $ = selector => document.querySelector(selector);
const main = $('#content'), modal = $('#modal');
const nav = [['home','Home','home'],['order','Order','cup'],['queue','Queue','clock'],['passport','Passport','book'],['roasties','Roasties','star'],['ai','AI','spark']];
const products = [
 ['cappuccino','Cappuccino','Espresso',300,'Espresso, steamed milk and a cloud of foam','Finished with cocoa'],
 ['flat','Flat White','Espresso',320,'Double ristretto, steamed milk and silky microfoam','Colombia · Anaerobic'],
 ['filter','Filter of the Day','Filter',280,'Yirgacheffe G1, washed and bright','Ethiopia · Washed'],
 ['cold','Cold Brew','Cold',320,'House blend, steeped for 24 hours','200 ml'],
 ['cookie','Chocolate Chunk Cookie','Bakery',180,'Soft-centred cookie with dark chocolate and sea salt','Dark chocolate · Sea salt'],
 ['croissant','Almond Croissant','Bakery',220,'Baked in-house and served warm','Contains almonds'],
 ['toast','Avocado Toast','Kitchen',380,'Sourdough, smashed avocado, chilli and lime','Vegetarian']
].map(([id,name,category,price,description,detail])=>({id,name,category,price,description,detail}));
const beans = [
 ['Anaerobic Natural Gesha','Huila, Colombia','Anaerobic','Rose, jasmine, peach','Sep 22','Priya',29,49],
 ['Yirgacheffe G1','Gedeo Zone, Ethiopia','Washed','Bergamot, lemon zest, florals','Sep 18','Raman',61,46],
 ['AA Kiambu','Kiambu, Kenya','Washed','Blackcurrant, tomato, bright acidity','Sep 12','Priya',60,58],
 ['Yellow Bourbon','Minas Gerais, Brazil','Natural','Dark chocolate, hazelnut, caramel','Sep 5','Akash',35,67],
 ['SHG Antigua','Antigua, Guatemala','Honey','Brown sugar, apple, mild spice','Aug 28','Raman',23,43],
 ['Gayo Peaberry','Aceh, Indonesia','Wet hulled','Earth, dark fruit, cedar','Aug 20','Akash',79,51],
 ['Mandheling','Sumatra, Indonesia','Wet hulled','Cocoa, clove, tobacco','Aug 12','Raman',84,61]
];
const questionBank = [
 ['What is a coffee bean?',['A cherry seed','A root','A leaf'],0],
 ['Which country is Yirgacheffe from?',['Brazil','Ethiopia','Indonesia'],1],
 ['How is Roastique’s cold brew made?',['Steam for 10 minutes','Pull an espresso shot','Steep for 24 hours'],2],
 ['Which drink pairs ristretto with steamed milk?',['Flat White','Cold Brew','Filter Coffee'],0],
 ['What does a washed process remove before drying?',['The roasted aroma','Fruit and mucilage','The brewing water'],1],
 ['Which origin on the menu is from Colombia?',['Gayo Peaberry','Anaerobic Natural Gesha','AA Kiambu'],1],
 ['What does a flat white contain?',['Espresso and steamed milk','Tea and lemon','Coffee and tonic'],0],
 ['Which tool grinds coffee beans?',['A tamper','A kettle','A burr grinder'],2],
 ['Where is the Antigua coffee origin?',['Kenya','Guatemala','Brazil'],1],
 ['What is crema?',['Foam on top of espresso','A type of bean','Milk added to filter coffee'],0]
];
const fresh = {cart:[], profileName:'Arjun', mobile:'', email:'', vehicle:{plate:'DL 9C AB 1234', model:'Sedan', color:'White'}, mode:'Pickup',points:2840,earned:4120,redeemed:1280,orders:24,queue:null,valet:0,tip:null,today:'',history:[
 ['Flat White + Croissant','Sep 22 · Pickup order',120],['Redeemed free coffee','Sep 19 · Dine in',-280],['Coffee Trivia','Sep 18 · Challenge',75],['Cold Brew + Avo Toast','Sep 18 · Dine in',200],['Filter Coffee','Sep 12 · Dine in',80]
]};
let state;
try {state={...structuredClone(fresh),...JSON.parse(localStorage.getItem('roastique-preview-v1')||'{}')};} catch {state=structuredClone(fresh);}
let category='All', activeBean=0, mapOpen=false, trivia=null, alertTimer, carouselTimer, checkoutMode=false, listening=false;
let picks=['flat','croissant'];
const messages=[{role:'assistant',get text(){return 'How are you feeling, '+firstName()+'? Tell me what you’re in the mood for and I’ll suggest something from the menu.';}}];
const money = amount => '₹'+amount.toLocaleString('en-IN');
const number = amount => amount.toLocaleString('en-IN');
const day = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',dateStyle:'short'}).format(new Date());
function dailyQuestions(){
 const date=new Intl.DateTimeFormat('en-GB',{day:'numeric',timeZone:'Asia/Kolkata'}).format(new Date());
 return Number(date)%2 ? questionBank.slice(0,5) : questionBank.slice(5);
}
const escaped = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const item = id => products.find(p=>p.id===id);
const count = () => state.cart.reduce((sum,line)=>sum+line.qty,0);
const total = () => state.cart.reduce((sum,line)=>sum+item(line.id).price*line.qty,0);
function save(){try{localStorage.setItem('roastique-preview-v1',JSON.stringify(state));}catch{} updateBag();}
function updateBag(){
 const quantity=count(), badge=$('#bag-count');
 badge.hidden=!quantity;
 badge.textContent=quantity;
 $('.bag').ariaLabel='Open order bag'+(quantity?' ('+quantity+')':'');
 const showDock=quantity>0&&route!=='cart';
 $('#cart-dock').hidden=!showDock;
 $('#cart-dock-count').textContent=quantity+(quantity===1?' item':' items');
 $('#cart-dock-total').textContent=money(total());
 document.body.classList.toggle('has-cart',showDock);
}
function notice(message){clearTimeout(alertTimer);$('#notice').textContent=message;alertTimer=setTimeout(()=>{$('#notice').textContent='';},3800);}
const heading = (title, subtitle) => '<div class="page-head"><h1>'+title+'</h1><p>'+subtitle+'</p></div>';
const button = (label,action,style='',value='') => '<button type="button" class="btn '+style+'" data-action="'+action+'" data-value="'+value+'">'+label+'</button>';
const link = (label,url,style='') => '<a class="btn '+style+'" href="#'+url+'">'+label+'</a>';
const image = p => '<img src="assets/'+(p.id==='cappuccino'?'hero':p.id)+'.jpg" alt="'+p.name+'" loading="lazy">';
function productCard(p,featured=false){
 return '<article class="product'+(featured?' featured-product':'')+'"><button class="product-image" data-action="product" data-value="'+p.id+'" aria-label="View '+p.name+'">'+image(p)+'</button><div class="product-body"><h3>'+p.name+'</h3><p>'+(featured?p.detail:p.description)+'</p><div class="product-foot"><strong>'+money(p.price)+'</strong><button class="icon-button add-button" data-action="add" data-value="'+p.id+'" aria-label="Add '+p.name+'">'+icon('plus')+'</button></div></div></article>';
}
const stat = (amount,label) => '<div><strong>'+amount+'</strong>'+label+'</div>';
const homeMoods = [
 ['Comforting','flat','croissant'],
 ['Refreshing','cold','croissant'],
 ['Hungry','toast','filter']
];
let homeMood = 0, homeOrigin = 1;
const visitArea = {label:'Golf Course Road, DLF Phase 1, Gurugram',lat:28.48,lng:77.10};
const directionsUrl='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(visitArea.label);
let distanceStatus='Golf Course Road', locating=false, visitEstimate=null, locationPermissionChecked=false;
function visitDistanceMarkup(){
 if(!visitEstimate)return escaped(distanceStatus);
 const {distance,minutes}=visitEstimate;
 return '<strong class="visit-estimate">'+distance+' kms away <span aria-hidden="true">|</span> '+minutes+' min'+(minutes===1?'':'s')+' drive</strong><small>Estimated to the café area</small>';
}
function visitCard(){
 return '<section class="visit-row directions-row" aria-labelledby="visit-title"><span class="visit-pin">'+icon('pin')+'</span><div class="visit-copy"><h2 id="visit-title">Plan your visit</h2><p id="distance-status" role="status">'+visitDistanceMarkup()+'</p></div>'+
 '<div class="visit-actions">'+button(locating?'Checking…':'Check distance','check-distance','ghost'+(visitEstimate?' location-complete':''))+
 '<a class="btn" href="'+directionsUrl+'" target="_blank" rel="noopener noreferrer">Directions</a></div></section>';
}
function areaDistance(latitude,longitude){
 const radians=degrees=>degrees*Math.PI/180;
 const latDelta=radians(visitArea.lat-latitude),lngDelta=radians(visitArea.lng-longitude);
 const a=Math.sin(latDelta/2)**2+Math.cos(radians(latitude))*Math.cos(radians(visitArea.lat))*Math.sin(lngDelta/2)**2;
 return 12742*Math.asin(Math.sqrt(Math.min(1,a)));
}
function checkDistance(){
 if(locating||visitEstimate)return;
 const update=(message,pending=false)=>{
  distanceStatus=message;locating=pending;
  const status=$('#distance-status'), control=$('[data-action=check-distance]');
  if(!status||!control)return;
  status.innerHTML=visitDistanceMarkup();
  control.textContent=pending?'Checking…':'Check distance';
  control.setAttribute('aria-disabled',String(pending));
  const restoreFocus=visitEstimate&&document.activeElement===control;
  control.classList.toggle('location-complete',Boolean(visitEstimate));
  if(restoreFocus)control.nextElementSibling.focus();
 };
 if(!navigator.geolocation){update('Location unavailable. See route in Maps.');return;}
 update('Waiting for your location…',true);
 navigator.geolocation.getCurrentPosition(({coords})=>{
  const km=areaDistance(coords.latitude,coords.longitude);
  // Preview estimate uses straight-line distance and a 25 km/h average.
  visitEstimate={distance:km.toLocaleString('en-IN',{maximumFractionDigits:1}),minutes:Math.max(1,Math.round(km/25*60))};
  update('');
 },()=>update('Location unavailable. See route in Maps.'),{timeout:10000,maximumAge:60000});
}
async function checkSavedLocationPermission(){
 if(locationPermissionChecked||!navigator.permissions)return;
 locationPermissionChecked=true;
 try{
  const permission=await navigator.permissions.query({name:'geolocation'});
  if(permission.state==='granted')checkDistance();
 }catch{
  // The manual distance button remains available without the Permissions API.
 }
}
function homeMoodPicks(){
 return homeMoods[homeMood].slice(1).map(id=>{
  const p=item(id);
  return '<div class="row">'+image(p)+'<div><strong>'+p.name+'</strong><span class="muted">'+money(p.price)+'</span></div>'+button('Add','add','soft',id)+'</div>';
 }).join('');
}
function homeOriginNotes(){
 const [name,place,process,notes]=beans[homeOrigin];
 return '<h3>'+name+'</h3><p class="muted">'+place+' · '+process+'</p><p>'+notes+'</p>';
}
function carouselControls(trackId,label){
 return '<div class="carousel-controls" role="group" aria-label="'+label+' carousel controls">'+
 '<button class="icon-button" data-action="carousel-scroll" data-value="-1" aria-controls="'+trackId+'" aria-label="Previous '+label+'" disabled>'+icon('previous')+'</button>'+
 '<button class="icon-button" data-action="carousel-scroll" data-value="1" aria-controls="'+trackId+'" aria-label="Next '+label+'">'+icon('next')+'</button></div>';
}
function homeDiscover(){
 return '<section class="home-menu" aria-labelledby="home-menu-title"><div class="section-head"><h2 id="home-menu-title">Explore the menu</h2></div>'+
 '<div class="category-grid" id="home-category-track" aria-label="Menu categories">'+
 [['Espresso','flat'],['Filter','filter'],['Cold','cold'],['Kitchen','toast'],['Bakery','croissant']].map(([label,id])=>
 '<button class="category-card" data-action="browse-category" data-value="'+label+'"><img src="assets/'+id+'.jpg" alt="" loading="lazy"><span>'+label+'</span></button>').join('')+
 '</div>'+carouselControls('home-category-track','menu category')+'</section><div class="home-discover">'+
 '<section class="panel" aria-labelledby="home-mood-title"><h2 id="home-mood-title">What are you in the mood for?</h2><div class="chips" aria-label="Choose a mood">'+homeMoods.map(([name],i)=>
 '<button class="chip" aria-pressed="'+(homeMood===i)+'" data-action="home-mood" data-value="'+i+'">'+name+'</button>').join('')+
 '</div><div id="home-mood-picks" aria-live="polite">'+homeMoodPicks()+'</div></section>'+
 '<section class="panel home-origin" aria-labelledby="home-origin-title"><h2 id="home-origin-title">From the Coffee Passport</h2><div class="chips" aria-label="Choose an origin">'+[[1,'Ethiopia'],[0,'Colombia'],[2,'Kenya']].map(([i,name])=>
 '<button class="chip" aria-pressed="'+(homeOrigin===i)+'" data-action="home-origin" data-value="'+i+'">'+name+'</button>').join('')+
 '</div><div id="home-origin-notes" aria-live="polite">'+homeOriginNotes()+'</div><div class="buttons">'+button('Explore this origin','open-home-origin','ghost')+'</div></section></div>';
}
function home(){
 const date=new Intl.DateTimeFormat('en-IN',{weekday:'long',day:'numeric',month:'long',timeZone:'Asia/Kolkata'}).format(new Date());
 return '<div class="home-greeting"><div><p>'+date+'</p><h1>Good coffee, '+escaped(firstName())+'.</h1></div></div>'+
 '<section class="status-pair" aria-label="Your Roastique status"><a href="#roasties"><span>Roasties</span><strong>'+number(state.points)+'</strong><small>Rewards balance</small></a><a href="#queue"><span>Café status</span><strong>'+(state.queue?'#'+state.queue.position:'9')+'</strong><small>'+(state.queue?'Your queue spot':'Seats available')+'</small></a></section>'+
 '<section class="hero"><div class="hero-copy"><span>Today at Roastique</span><h2>First, coffee.<br>Then, whatever.</h2><p>Slow brews, warm bakes and your table waiting.</p><div class="buttons">'+link('Explore menu','order','white')+link('Find my coffee','ai','ghost')+'</div></div></section>'+ 
 '<section aria-labelledby="featured-title"><div class="section-head"><h2 id="featured-title">Made for today</h2><a href="#order">See all</a></div><div class="featured-track" id="featured-track" tabindex="0" aria-label="Featured menu items">'+['filter','croissant','cold','flat','toast','cappuccino'].map(id=>productCard(item(id),true)).join('')+'</div>'+carouselControls('featured-track','featured item')+'</section>'+visitCard()+
 '<section class="visit-row nearby" aria-labelledby="pre-order-title"><span class="visit-pin">'+icon('pin')+'</span><div class="visit-copy"><h2 id="pre-order-title">Pre-order for pickup</h2><p>Pickup from Golf Course Road</p></div><div class="visit-actions">'+button('Pre-order','pre-order','soft')+'</div></section>'+
 '<section class="grid quick" aria-label="Café services"><button class="tile" data-action="trivia">'+icon('star')+'<h3>Daily Coffee Trivia</h3><span class="muted">'+(state.today===day()?'Played today':'Earn up to 75 Roasties')+'</span></button><a class="tile" href="#roasties">'+icon('bean')+'<h3>'+number(state.points)+' Roasties</h3><span class="muted">View your loyalty wallet</span></a><a class="tile" href="#valet">'+icon('car')+'<h3>Valet</h3><span class="muted">'+['Car parked safely','Collecting car','Car on the way','Ready at exit'][state.valet]+'</span></a></section>'+homeDiscover();
}
function order(){
 return heading('Order','Golf Course Road · Ready in 8–12 min')+
 '<div class="chips" aria-label="Order type">'+['Pickup','Dine in'].map(mode=>'<button class="chip" aria-pressed="'+(state.mode===mode)+'" data-action="mode" data-value="'+mode+'">'+mode+'</button>').join('')+'</div>'+
 '<div class="tab-row"><div class="chips" id="order-category-tabs" aria-label="Menu categories">'+['All','Espresso','Filter','Cold','Kitchen','Bakery'].map(name=>'<button class="chip" aria-pressed="'+(category===name)+'" data-action="category" data-value="'+name+'">'+name+'</button>').join('')+'</div>'+carouselControls('order-category-tabs','menu category')+'</div>'+
 '<div class="grid">'+products.filter(p=>category==='All'||p.category===category).map(p=>productCard(p)).join('')+'</div>'+
 (count()?'<div class="total"><span>'+count()+' items · '+money(total())+'</span>'+button('View order','bag')+'</div>':'');
}
function queue(){
 const q=state.queue;
 return heading('Virtual Queue','Golf Course Road · Demo seating status')+
 '<div class="split"><section class="panel cream"><h2>'+(q?.arrived?'Arrival confirmed':q?.position===1?'Your table is ready':q?'You’re in the queue':'Find a table')+'</h2>'+
 (q?'<div class="stats">'+stat(q.position,'Your position')+stat(q.position===1?'Now':(q.position-1)*4+' min','Estimated wait')+stat(q.position-1,'Guests ahead')+'</div>':'<p>9 seats available. Join the list and stay nearby while we prepare your table.</p>')+
 '<div class="buttons">'+(q?(q.arrived?'':button('I’ve arrived','arrive'))+button('Leave queue','leave','ghost'):button('Join the queue','join'))+'</div></section>'+
 '<section class="panel"><h3>While you wait</h3><p>Browse the menu to see what’s brewing today.</p><div class="buttons">'+link('Explore the menu','order','soft')+(q&&q.position>1&&!q.arrived?button('Simulate queue update','advance','ghost'):'')+'</div></section></div>';
}
function passport(){
 const b=beans[activeBean];
 return heading('Coffee Passport','The origins you’ve tasted at Roastique.')+
 '<div class="split"><section class="panel '+(mapOpen?'':'dark')+'"><h2>'+(mapOpen?'Explore your origins':'Your bean journey')+'</h2>'+
 (mapOpen?'<div class="map"><img src="assets/world.svg" alt="World map">'+beans.map((bean,i)=>'<button class="map-pin" style="left:'+bean[6]+'%;top:'+bean[7]+'%" aria-pressed="'+(i===activeBean)+'" aria-label="'+bean[1]+'" data-action="bean" data-value="'+i+'"><span>'+(i+1)+'</span></button>').join('')+'</div><h3>'+b[0]+'</h3><p>'+b[1]+' · '+b[2]+'</p><p>'+b[3]+'</p><p class="subtle">Tasted '+b[4]+' · Brewed by '+b[5]+'</p>':'<div class="stats">'+stat(7,'Beans')+stat(3,'Continents')+stat(6,'Countries')+'</div>')+
 '<div class="buttons">'+button(mapOpen?'Back to passport':'Explore the map','map',mapOpen?'ghost':'light')+'</div></section><section class="panel"><h3>All beans</h3>'+beans.map((bean,i)=>'<div class="row"><div><strong>'+bean[0]+'</strong><span class="muted">'+bean[1]+' · '+bean[4]+'</span></div>'+button('Notes','bean','soft',i)+'</div>').join('')+'</section></div>';
}
const rewards=[['Free Coffee',280],['Free Pastry',220],['Café Discount',500]];
function roasties(){
 return heading('Roasties','Your loyalty wallet')+
 '<div class="split"><div><section class="panel dark"><p>Available balance</p><h2>'+number(state.points)+' pts</h2><div class="stats">'+stat(number(state.earned),'Lifetime earned')+stat(number(state.redeemed),'Redeemed')+stat(state.orders,'Orders')+'</div></section><section class="panel"><h3>Redeem Roasties</h3><p class="muted">Sample rewards for this preview.</p>'+rewards.map(([name,cost],i)=>'<div class="row"><div><strong>'+name+'</strong><span class="muted">'+cost+' pts</span></div>'+button('Redeem','reward','soft',i)+'</div>').join('')+'</section></div>'+
 '<section class="panel"><h3>Recent activity</h3>'+state.history.map(([name,detail,delta])=>'<div class="row"><div><strong>'+name+'</strong><span class="muted">'+detail+'</span></div><strong>'+(delta>=0?'+':'−')+number(Math.abs(delta))+'</strong></div>').join('')+'</section></div>';
}
const valetSteps=['Parked safely','Collecting car','On the way','Ready at exit'];
function valet(){
 const title=heading('Valet','Car retrieval · Golf Course Road Phase 1');
 const {plate,model,color}=state.vehicle;
 if(!plate)return title+'<section class="panel cream"><h2>Add your vehicle</h2><p>Save a registration number in your profile to use the valet preview.</p><div class="buttons">'+link('Add vehicle','profile')+'</div></section>';
 const description=[color,model,valetSteps[state.valet]].filter(Boolean).map(escaped).join(' · ');
 return title+'<div class="split"><section class="panel cream"><h2>'+icon('car')+' '+escaped(plate)+'</h2><p>'+description+'</p><ol class="steps">'+valetSteps.map((step,i)=>'<li class="'+(i===state.valet?'current':i<state.valet?'done':'')+'"'+(i===state.valet?' aria-current="step"':'')+'><span>'+(i<state.valet?'&#10003;':i+1)+'</span>'+step+'</li>').join('')+'</ol>'+ 
 (state.valet<3?button(['Request my car','Simulate car on the way','Simulate arrival'][state.valet],'valet'):state.tip===null?button('Choose a tip','tip'):'<p>'+ (state.tip?'Demo tip saved · '+money(state.tip):'Pickup complete')+'</p>')+
 '</section><section class="panel"><h3>'+ (state.valet?'Your valet is Rohan':'Retrieval time')+'</h3><p>'+['About 4 minutes after you request your car.','Estimated arrival in 4 minutes.','Estimated arrival in 2 minutes.','Meet your valet at the main exit.'][state.valet]+'</p></section></div>';
}
function ai(){
 return heading('AI Sommelier','Mood-based picks from the Roastique menu')+
 '<div class="split"><section class="panel"><div class="chat" aria-live="polite">'+messages.map(m=>'<p class="message '+m.role+'">'+escaped(m.text)+'</p>').join('')+'</div><form class="chat-form" data-form="chat"><label>Tell us your mood<input name="mood" maxlength="250" required placeholder="Something warm and comforting…"></label><button type="button" class="icon-button" data-action="voice" aria-label="Use microphone">'+icon('mic')+'</button><button class="btn">Send</button></form><p class="subtle">Preview suggestions use the café menu. Voice input depends on browser support.</p><div class="chips">'+['Warm and comforting','Cold and refreshing','Something to eat'].map(m=>'<button class="chip" data-action="mood" data-value="'+m+'">'+m+'</button>').join('')+'</div></section>'+
 '<section class="panel"><h3>Recommended for you</h3>'+picks.map(id=>{const p=item(id);return '<div class="row">'+image(p)+'<div><strong>'+p.name+'</strong><span class="muted">'+money(p.price)+'</span></div>'+button('Add','add','soft',id)+'</div>';}).join('')+'</section></div>';
}
function profile(){
 return heading('Your profile','Make Roastique yours.')+
 '<div class="split"><section class="panel"><div class="profile-identity"><img class="avatar avatar-photo" src="assets/profile.png" alt="Arjun"><div><h2>'+escaped(state.profileName)+'</h2><p class="muted">Roastique member</p></div></div>'+
 `<form class="profile-form" data-form="profile">
 <p class="subtle profile-note">Only your display name is required. Profile details stay in this browser.</p>
 <fieldset class="profile-section">
  <legend>Account details</legend>
  <div class="profile-fields">
   <label>Display name<input id="profile-name" name="name" type="text" autocomplete="name" maxlength="48" required value="${escaped(state.profileName)}"></label>
   <label>Mobile number<input name="mobile" type="tel" autocomplete="tel" maxlength="24" placeholder="+91 98765 43210" value="${escaped(state.mobile)}"></label>
   <label>Email address<input name="email" type="email" autocomplete="email" maxlength="254" value="${escaped(state.email)}"></label>
  </div>
 </fieldset>
 <fieldset class="profile-section">
  <legend>Vehicle for valet</legend>
  <p class="subtle">Add your registration number so the valet can identify your car.</p>
  <div class="profile-fields">
   <label>Registration number<input name="plate" type="text" autocomplete="off" autocapitalize="characters" maxlength="20" placeholder="DL 9C AB 1234" value="${escaped(state.vehicle.plate)}"></label>
   <label>Make or model<input name="model" type="text" maxlength="40" placeholder="e.g. Honda City" value="${escaped(state.vehicle.model)}"></label>
   <label>Vehicle colour<input name="color" type="text" maxlength="24" placeholder="e.g. White" value="${escaped(state.vehicle.color)}"></label>
  </div>
 </fieldset>
 <fieldset class="profile-section"><legend>Order preference</legend><div class="options">${['Pickup','Dine in'].map(mode=>'<label><input type="radio" name="mode" value="'+mode+'"'+(mode===state.mode?' checked':'')+'>'+mode+'</label>').join('')}</div></fieldset>
 <button class="btn" type="submit">Save profile</button></form></section>`+
 '<section class="panel dark"><h2>'+number(state.points)+' Roasties</h2><p>'+number(state.orders)+' orders</p><div class="buttons">'+link('View Roasties','roasties','light')+'</div></section></div>';
}
const pages={home,order,queue,passport,roasties,ai,valet,cart,profile};
let route='home';
function render(focus=false){
 clearInterval(carouselTimer);
 route=location.hash.slice(1)||'home';
 if(!Object.hasOwn(pages,route)) route='home';
 $('#navigation').innerHTML=nav.map(([id,label,symbol])=>'<a class="nav-link" href="#'+id+'"'+(route===id?' aria-current="page"':'')+'>'+icon(symbol)+label+'</a>').join('');
 const profileLink=$('.avatar-link');
 if(route==='profile')profileLink.setAttribute('aria-current','page');
 else profileLink.removeAttribute('aria-current');
 $('#back-button').hidden=route==='home';
 $('.mobile-brand').hidden=route!=='home';
 main.classList.remove('page-ready');
 main.dataset.route=route;
 main.innerHTML=pages[route]();
 requestAnimationFrame(()=>main.classList.add('page-ready'));
 updateBag();
 if(route==='home')checkSavedLocationPermission();
 document.querySelectorAll('.featured-track,.category-grid,#order-category-tabs').forEach(track=>{
  const controls=document.querySelectorAll('[data-action="carousel-scroll"][aria-controls="'+track.id+'"]');
  const [previous,next]=controls;
  const sync=()=>{
   previous.disabled=track.scrollLeft<=2;
   next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2;
  };
  track.addEventListener('scroll',sync,{passive:true});
  sync();
 });
 if(route==='home'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const track=$('#featured-track');
  carouselTimer=setInterval(()=>{
   if(!track||document.hidden)return;
   const stride=track.firstElementChild.offsetWidth+parseFloat(getComputedStyle(track).columnGap||0);
   const end=track.scrollLeft+track.clientWidth>=track.scrollWidth-4;
   track.scrollTo({left:end?0:track.scrollLeft+stride,behavior:'smooth'});
  },3400);
 }
 if(focus){window.scrollTo(0,0);main.focus({preventScroll:true});}
}
function dialog(title,body){
 modal.innerHTML='<div class="dialog-head"><h2 id="dialog-title">'+title+'</h2><button class="icon-button" data-action="close" aria-label="Close dialog">'+icon('close')+'</button></div>'+body;
 $('.shell').classList.add('modal-open');
 if(!modal.open)modal.show();
}
function addLine(id,options=''){
 const existing=state.cart.find(line=>line.id===id&&line.options===options);
 if(existing) existing.qty++; else state.cart.push({id,options,qty:1});
 save();render();notice(item(id).name+' added to your order');
}
function customize(id){
 const p=item(id);
 if(['Bakery','Kitchen'].includes(p.category)){addLine(id);return;}
 const fields=[['Milk',id==='flat'?['Whole','Oat','Almond','No milk']:['No milk','Whole','Oat','Almond']],['Strength',['Standard','Strong','Light']],['Temperature',id==='cold'?['Iced','Hot','65°C']:['Hot','65°C','Iced']],['Vessel',state.mode==='Pickup'?['Takeaway','Ceramic','Glass']:['Ceramic','Glass','Takeaway']]];
 dialog(p.name,'<p class="muted">'+p.description+'</p><form data-form="customize" data-id="'+id+'">'+fields.map(([label,choices])=>'<fieldset><legend>'+label+'</legend><div class="options">'+choices.map((choice,i)=>'<label><input type="radio" name="'+label+'" value="'+choice+'" '+(!i?'checked':'')+'>'+choice+'</label>').join('')+'</div></fieldset>').join('')+'<button class="btn wide">Add to order · '+money(p.price)+'</button></form>');
}
function showProduct(id){
 const p=item(id);
 dialog(p.name,'<div class="product-detail">'+image(p)+'<div class="product-detail-copy"><p class="muted">'+p.category+' · '+p.detail+'</p><p>'+p.description+'</p><div class="product-detail-meta"><span>Prepared fresh</span><strong>'+money(p.price)+'</strong></div>'+button(['Bakery','Kitchen'].includes(p.category)?'Add to cart':'Choose options','add','wide',p.id)+'</div></div>');
}
function cart(){
 const title=heading('Your cart',state.mode+' · Golf Course Road');
 if(!count()){
  return title+'<section class="panel cream cart-empty"><h2>You missed me.</h2><p>Your cart is empty. Start with a house favourite.</p></section>'+
   '<section class="cart-favourites" aria-labelledby="cart-favourites-title"><div class="section-head"><h2 id="cart-favourites-title">Roastique favourites</h2>'+link('Browse menu','order','ghost')+'</div>'+
   '<div class="grid">'+['flat','cookie'].map(id=>productCard(item(id),true)).join('')+'</div></section>';
 }
 return title+'<section class="panel cart-panel"><div class="cart-lines">'+state.cart.map((line,i)=>{const p=item(line.id);return '<div class="cart-line">'+image(p)+'<div class="cart-line-copy"><strong>'+p.name+'</strong><span>'+escaped(line.options||p.detail)+'</span><b>'+money(p.price*line.qty)+'</b></div><div class="quantity-stepper" aria-label="Quantity for '+p.name+'"><button data-action="decrease" data-value="'+i+'" aria-label="Decrease '+p.name+'">−</button><span>'+line.qty+'</span><button data-action="increase" data-value="'+i+'" aria-label="Increase '+p.name+'">+</button></div></div>';}).join('')+'</div><div class="order-summary"><h3>Order summary</h3><div><span>Subtotal</span><strong>'+money(total())+'</strong></div><div><span>Packaging</span><strong>₹0</strong></div><div class="summary-total"><span>Total</span><strong>'+money(total())+'</strong></div></div>'+button('Review order · '+money(total()),'checkout','wide')+'</section>';
}
function bag(){
 checkoutMode=false;
 if(modal.open)modal.close();
 if(route!=='cart')location.hash='cart';
}
function checkout(){
 if(!count())return;
 checkoutMode=true;
 dialog('Review order','<p>'+state.mode+' at Golf Course Road.</p><div class="total"><span>'+count()+' items</span>'+money(total())+'</div><p class="subtle">This preview simulates order placement. No payment is collected.</p><div class="buttons">'+button('Place demo order · '+money(total()),'place','wide')+'</div>');
}
function place(){
 if(!checkoutMode||!count())return;
 checkoutMode=false;
 const earned=Math.floor(total()/5), orderNumber='R'+(state.orders+101);
 state.orders++;state.points+=earned;state.earned+=earned;state.cart=[];
 state.history.unshift(['Order '+orderNumber,'Today · '+state.mode,earned]);
 save();render();dialog('Order placed','<p>Demo order <strong>'+orderNumber+'</strong> is in. Estimated prep time is 8–12 minutes.</p><p class="subtle">You earned '+earned+' Roasties.</p>');
}
function recommend(text){
 const value=text.trim();if(!value)return;
 const cold=/cold|iced|refresh|hot day|summer/i.test(value);
 const food=/food|eat|hungry|lunch|breakfast|toast|savou?ry/i.test(value);
 const black=/black|filter|bright|no milk/i.test(value);
 picks=food?['toast','filter']:cold?['cold','croissant']:black?['filter','croissant']:['flat','croissant'];
 const copy=food?'Try the avocado toast with a bright Yirgacheffe filter coffee.':cold?'Try our 24-hour cold brew with a warm almond croissant.':black?'Try the washed Yirgacheffe filter coffee. Its bergamot notes pair well with the almond croissant.':'A silky flat white and a warm almond croissant make a comforting pair.';
 messages.push({role:'user',text:value},{role:'assistant',text:copy});render();$('input[name=mood]').focus();
}
function showQuiz(){
 if(state.today===day()){dialog('Daily Coffee Trivia','<p>You’ve played today. A new challenge opens tomorrow.</p>');return;}
 const [question,answers,correct]=trivia.questions[trivia.index];
 dialog('Daily Coffee Trivia','<p class="muted">Question '+(trivia.index+1)+' of '+trivia.questions.length+' · 15 pts per correct answer</p><h3 style="margin:14px 0">'+question+'</h3><div class="stack">'+answers.map((answer,i)=>'<button class="btn soft answer '+(trivia.selected!==null?(i===correct?'correct':i===trivia.selected?'incorrect':''):'')+'" data-action="answer" data-value="'+i+'" '+(trivia.selected!==null?'disabled':'')+'>'+answer+'</button>').join('')+'</div>'+
 (trivia.selected!==null?'<p class="subtle">'+(trivia.selected===correct?'Correct.':'Correct answer: '+answers[correct]+'.')+'</p><div class="buttons">'+button(trivia.index===trivia.questions.length-1?'See results':'Next question','next')+'</div>':''));
}
function nextQuiz(){
 if(!trivia||trivia.selected===null)return;
 if(trivia.index<trivia.questions.length-1){trivia.index++;trivia.selected=null;showQuiz();return;}
 const earned=trivia.score*15;
 state.today=day();state.earned+=earned;state.points+=earned;state.history.unshift(['Daily Coffee Trivia','Today · Challenge',earned]);
 trivia=null;save();render();dialog('Challenge complete','<p>You earned <strong>'+earned+' Roasties</strong> out of 75.</p><p class="subtle">Come back tomorrow for the next daily round.</p>');
}
function voice(){
 if(listening)return;
 const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Recognition){notice('Voice input is unavailable here. Type your mood instead.');return;}
 const speech=new Recognition();speech.lang='en-IN';
 speech.onresult=event=>{const input=$('input[name=mood]');if(input)input.value=event.results[0][0].transcript;};
 speech.onerror=()=>notice('Couldn’t capture your voice. Try typing your mood.');
 speech.onend=()=>{listening=false;};
 try{speech.start();listening=true;notice('Listening…');}catch{notice('Voice input is unavailable here.');}
}
const launchMessages=[
 ['Come for the coffee.','Stay for the plot.'],
 ['A little espresso.','A lot to look forward to.'],
 ['Some days need a plan.','Some just need a pour-over.'],
 ['Here’s to good beans','and better company.'],
 ['Decisions can wait.','Your coffee can’t.'],
 ['Strong coffee.','Soft landing.'],
 ['Take a breath.','Then take a sip.'],
 ['Today’s small pleasure','comes in a cup.'],
 ['Good mornings','are made, not found.'],
 ['The first sip deserves','a moment of silence.'],
 ['A seat, a sip,','a change of pace.'],
 ['Coffee first.','Calendar second.']
];
function nextLaunchMessage(){
 let index=0;
 try{
  const stored=Number(localStorage.getItem('roastique-launch-message'));
  if(Number.isInteger(stored)&&stored>=0&&stored<launchMessages.length)index=stored;
  localStorage.setItem('roastique-launch-message',String((index+1)%launchMessages.length));
 }catch{
  index=Math.floor(Math.random()*launchMessages.length);
 }
 const [first,second]=launchMessages[index];
 $('.launch-message').replaceChildren(first,document.createElement('br'),second);
}
const launch=$('#launch-screen');
let launchTimer;
function dismissLaunch(){
 if(launch.hidden)return;
 clearTimeout(launchTimer);
 const restoreFocus=launch.contains(document.activeElement);
 launch.hidden=true;
 document.body.classList.remove('launching');
 document.querySelectorAll('.shell,.skip,.cart-dock').forEach(node=>{node.inert=false;});
 if(restoreFocus)main.focus({preventScroll:true});
}
function showLaunch(){
 if(route!=='home')return;
 nextLaunchMessage();
 document.querySelectorAll('.shell,.skip,.cart-dock').forEach(node=>{node.inert=true;});
 launch.hidden=false;
 document.body.classList.add('launching');
 launchTimer=setTimeout(dismissLaunch,matchMedia('(prefers-reduced-motion: reduce)').matches?850:2350);
}
const actions={
 close:()=>modal.close(), back:()=>{location.hash='home';}, bag, checkout, place,
 'dismiss-launch':dismissLaunch,
 reset:()=>dialog('Reset preview?','<p>Reset your demo bag, queue, Roasties and valet progress.</p><div class="buttons">'+button('Cancel','close','ghost')+button('Reset preview','confirm-reset')+'</div>'),
 'confirm-reset':()=>{state=structuredClone(fresh);trivia=null;category='All';mapOpen=false;activeBean=0;homeMood=0;homeOrigin=1;picks=['flat','croissant'];messages.splice(1);modal.close();save();render();notice('Preview reset.');},
 add:customize, product:showProduct,
 'check-distance':checkDistance,
 'pre-order':()=>{state.mode='Pickup';category='All';save();location.hash='order';},
 'browse-category':value=>{category=value;location.hash='order';},
 'home-mood':value=>{
  homeMood=Number(value);
  document.querySelectorAll('[data-action="home-mood"]').forEach(chip=>chip.setAttribute('aria-pressed',String(chip.dataset.value===value)));
  $('#home-mood-picks').innerHTML=homeMoodPicks();
 },
 'home-origin':value=>{
  homeOrigin=Number(value);
  document.querySelectorAll('[data-action="home-origin"]').forEach(chip=>chip.setAttribute('aria-pressed',String(chip.dataset.value===value)));
  $('#home-origin-notes').innerHTML=homeOriginNotes();
 },
 'open-home-origin':()=>{activeBean=homeOrigin;mapOpen=true;location.hash='passport';},
 'carousel-scroll':(direction,control)=>{
  const track=document.getElementById(control.getAttribute('aria-controls'));
  const stride=track.firstElementChild.offsetWidth+parseFloat(getComputedStyle(track).columnGap);
  track.scrollBy({left:stride*Number(direction),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 },
 decrease:i=>{if(--state.cart[i].qty===0)state.cart.splice(i,1);save();render();},
 increase:i=>{state.cart[i].qty++;save();render();},
 category:value=>{category=value;render();document.querySelector('[data-action="category"][aria-pressed="true"]').focus();},
 mode:value=>{state.mode=value;save();render();document.querySelector('[data-action="mode"][aria-pressed="true"]').focus();},
 join:()=>{state.queue={position:4,arrived:false};save();render();notice('You joined the demo queue.');},
 advance:()=>{state.queue.position=Math.max(1,state.queue.position-1);save();render();notice(state.queue.position===1?'Your demo table is ready.':'Queue position updated.');},
 arrive:()=>{state.queue.arrived=true;save();render();notice('Arrival confirmed.');},
 leave:()=>dialog('Leave the queue?','<p>You’ll release your current position.</p><div class="buttons">'+button('Keep my spot','close','ghost')+button('Leave queue','confirm-leave')+'</div>'),
 'confirm-leave':()=>{state.queue=null;modal.close();save();render();notice('You left the queue.');},
 map:()=>{mapOpen=!mapOpen;render();$('[data-action=map]').focus();},
 bean:i=>{mapOpen=true;activeBean=Number(i);render();$('.map-pin[aria-pressed=true]').focus();},
 reward:i=>{const [name,cost]=rewards[i];dialog(name,'<p>'+ (state.points<cost?'You need '+cost+' Roasties for this reward.':'Use '+cost+' Roasties to redeem this sample reward?')+'</p>'+(state.points>=cost?'<div class="buttons">'+button('Confirm redemption','confirm-reward','',i)+'</div>':''));},
 'confirm-reward':i=>{const [name,cost]=rewards[i];if(state.points<cost)return;state.points-=cost;state.redeemed+=cost;state.history.unshift(['Redeemed '+name,'Today · Reward',-cost]);modal.close();save();render();notice(name+' redeemed in the demo.');},
 valet:()=>{state.valet=Math.min(3,state.valet+1);save();render();notice(valetSteps[state.valet]);},
 tip:()=>dialog('Thank your valet','<p>Choose a sample tip.</p><div class="buttons">'+[0,50,100,200].map(value=>button(value?money(value):'Skip tip','save-tip','soft',value)).join('')+'</div>'),
 'save-tip':value=>{state.tip=Number(value);modal.close();save();render();notice('Demo pickup complete.');},
 trivia:()=>{if(trivia?.day!==day())trivia={day:day(),questions:dailyQuestions(),index:0,score:0,selected:null};showQuiz();},
 answer:i=>{if(trivia?.selected!==null)return;trivia.selected=Number(i);if(trivia.selected===trivia.questions[trivia.index][2])trivia.score++;showQuiz();$('[data-action=next]').focus();},
 next:nextQuiz, mood:recommend, voice
};
document.addEventListener('click',event=>{
 const target=event.target.closest('[data-action]');
 if(target)actions[target.dataset.action]?.(target.dataset.value,target);
});
document.addEventListener('input',event=>{if(event.target.matches('.profile-form input'))event.target.setCustomValidity('');});
document.addEventListener('submit',event=>{
 const form=event.target, type=form.dataset.form;
 if(!type)return;
 event.preventDefault();
 const values=new FormData(form);
 if(type==='profile'){
  const name=String(values.get('name')).trim().replace(/\s+/g,' ');
  const mobile=String(values.get('mobile')).trim();
  const plate=String(values.get('plate')).trim().replace(/\s+/g,' ').toUpperCase();
  const fields=form.elements;
  if(!name){fields.name.setCustomValidity('Enter a display name.');fields.name.reportValidity();return;}
  if(mobile&&(!/^\+?[0-9 ()-]+$/.test(mobile)||!/^\d{7,15}$/.test(mobile.replace(/\D/g,'')))){
   fields.mobile.setCustomValidity('Enter a valid mobile number, including country code if needed.');
   fields.mobile.reportValidity();
   return;
  }
  if(plate.replace(/[ -]/g,'')!==state.vehicle.plate.replace(/[ -]/g,'')){state.valet=0;state.tip=null;}
  state.profileName=name;
  state.mobile=mobile;
  state.email=String(values.get('email')).trim();
  state.vehicle={plate,model:String(values.get('model')).trim(),color:String(values.get('color')).trim()};
  state.mode=values.get('mode');
  save();render();
  $('[data-form=profile] button[type=submit]').focus();
  notice('Profile saved.');
 }
 if(type==='chat')recommend(String(values.get('mood')));
 if(type==='customize'){modal.close();addLine(form.dataset.id,[...values.values()].join(' · '));}
});
window.addEventListener('hashchange',()=>{if(location.hash!=='#content'){if(modal.open)modal.close();render(true);}});
modal.addEventListener('close',()=>$('.shell').classList.remove('modal-open'));
document.querySelectorAll('[data-icon]').forEach(node=>{node.innerHTML=icon(node.dataset.icon);});
render();
