const axios = require('axios');

async function init(line) {
    /*
    난카이선 계통 https://www.nankaiapp.com/lines/nankai/trains
    고야선 계통 https://www.nankaiapp.com/lines/koya/trains
    */
    var stns, terminals, names;
    if (line == 'nankai') {  //난카이 본선 계통
        stns = [
			{name:"난바 (難波)",id:1},{name:"신이마미야 (新今宮)",id:2},{name:"텐가차야 (天下茶屋)",id:3},
            {name:"키시노사토타마데 (岸里玉出)",id:4},{name:"코하마 (粉浜)",id:5},{name:"스미요시타이샤 (住吉大社)",id:6},{name:"스미노에 (住ノ江)",id:7},{name:"시치도 (七道)",id:8},{name:"사카이 (堺)",id:9},{name:"미나토 (湊)",id:10},{name:"이시즈가와 (石津川)",id:11},{name:"스와노모리 (諏訪ノ森)",id:12},{name:"하마데라코엔 (浜寺公園)",id:13},
            {name:"하고로모 (羽衣)",id:14},{name:"타카이시 (高石)",id:15},{name:"키타스케마츠 (北助松)",id:16},{name:"마츠노하마 (松ノ浜)",id:17},{name:"이즈미오츠 (泉大津)",id:18},{name:"타다오카 (忠岡)",id:19},{name:"하루키 (春木)",id:20},{name:"이즈미오미야 (和泉大宮)",id:21},{name:"키시와다 (岸和田)",id:22},{name:"타코지조 (蛸地蔵)",id:23},{name:"카이즈카 (貝塚)",id:24},{name:"니시키노하마 (二色浜)",id:25},{name:"츠루하라 (鶴原)",id:26},{name:"이하라노사토 (井原里)",id:27},
            {name:"이즈미사노 (泉佐野)",id:28},{name:"하구라자키 (羽倉崎)",id:29},{name:"요시미노사토 (吉見ノ里)",id:30},{name:"오카다우라 (岡田浦)",id:31},{name:"타루이 (樽井)",id:32},{name:"오자키 (尾崎)",id:33},{name:"톳토리노쇼 (鳥取ノ荘)",id:34},{name:"하코츠쿠리 (箱作)",id:35},{name:"탄노와 (淡輪)",id:36},
            {name:"미사키코엔 (みさき公園)",id:37},{name:"쿄시 (孝子)",id:38},{name:"와카야마다이가쿠마에 (和歌山大学前)",id:39},{name:"키노카와 (紀ノ川)",id:40},
            {name:"와카야마시 (和歌山市)",id:41},{name:"와카야마항 (和歌山港)",id:42},
            {name:"하고로모 (羽衣)",id:61},{name:"캬라바시 (伽羅橋)",id:62},{name:"타카시노하마 (高師浜)",id:63}, //운행 중단, 선로 분리되어 있음 
            {name:"(공항선 분기점)",id:75},{name:"린쿠타운 (りんくうタウン)",id:76},{name:"간사이공항 (関西空港)",id:77},
            {name:"타나가와 (多奈川)",id:81},{name:"후케항 (深日港)",id:82},{name:"후케초 (深日町)",id:83},{name:"미사키코엔 (みさき公園)",id:84},
            {name:"(카다선 분기점)",id:87},{name:"히가시마츠에 (東松江)",id:88},{name:"나카마츠에 (中松江)",id:89},{name:"하치만마에 (八幡前)",id:90},{name:"니시노쇼 (西ノ庄)",id:91},{name:"니리가하마 (二里ヶ浜)",id:92},{name:"이소노우라 (磯ノ浦)",id:93},{name:"카다 (加太)",id:94}
		];
        terminals = {"1":"なんば","3":"新今宮","5":"天下茶屋","6":"岸里玉出","7":"粉浜","8":"住吉大社","9":"住之江","10":"七道","11":"堺","12":"湊","13":"石津川","14":"諏訪ノ森","15":"浜寺公園","16":"羽衣","17":"高石","18":"北助松","19":"松ノ浜","20":"泉大津","21":"忠岡","22":"春木","23":"和泉大宮","24":"岸和田","25":"蛸地蔵","26":"貝塚","27":"二色浜","28":"鶴原","29":"井原里","30":"泉佐野","31":"羽倉崎","32":"吉見ノ里","33":"岡田浦","34":"樽井","35":"尾崎","36":"鳥取ノ荘","37":"箱作","38":"淡輪","39":"みさき公園","40":"孝子","41":"和歌山大学前","42":"紀ノ川","43":"和歌山市","46":"和歌山港","49":"りんくうタウン","50":"関西空港","53":"梶取","54":"東松江","55":"中松江","56":"八幡前","57":"西ノ庄","58":"二里ヶ浜","59":"磯ノ浦","60":"加太","63":"深日町","64":"深日港","65":"多奈川","68":"伽羅橋","69":"高師浜","72":"汐見橋","73":"芦原町","74":"木津川","75":"津守","76":"西天下茶屋","80":"―"};
        names = {"1":"ﾗﾋﾟｰﾄα","2":"ﾗﾋﾟｰﾄα","3":"ﾗﾋﾟｰﾄβ","4":"サザン","5":"サザン","6":"サザン","7":"急行","8":"急行","9":"急行","10":"急行","11":"空港急行","12":"空港急行","13":"区急","14":"区急","15":"準急","16":"準急","17":"準急","18":"普通","19":"普通","20":"普通","21":"普通","22":"普通","23":"普通","24":"회송","25":"회송","26":"회송","27":"회송","28":"회송","29":"회송","30":"회송","31":"회송","32":"회송"};
    } else if (line == 'koya') {  //고야선 계통
		stns = [
			{name:"난바 (難波)",id:95},{name:"이마미야에비스 (今宮戎)",id:96},{name:"신이마미야 (新今宮)",id:97},{name:"하기노차야 (萩ノ茶屋)",id:98},{name:"텐가차야 (天下茶屋)",id:99},
            {name:"키시노사토타마데 (岸里玉出)",id:100},{name:"테즈카야마 (帝塚山)",id:101},{name:"스미요시히가시 (住吉東)",id:102},{name:"사와노초 (沢ノ町)",id:103},{name:"아비코마에 (我孫子前)",id:104},{name:"아사카야마 (浅香山)",id:105},{name:"사카이히가시 (堺東)",id:106},{name:"미쿠니가오카 (三国ヶ丘)",id:107},{name:"모즈하치만 (百舌鳥八幡)",id:108},
            {name:"나카모즈 (中百舌鳥)",id:109},{name:"시라사기 (白鷺)",id:110},{name:"하츠시바 (初芝)",id:111},{name:"하기하라텐진 (萩原天神)",id:112},{name:"키타노다 (北野田)",id:113},{name:"사야마 (狭山)",id:114},{name:"오사카사야마시 (大阪狭山市)",id:115},{name:"콘고 (金剛)",id:116},{name:"타키다니 (滝谷)",id:117},{name:"치요다 (千代田)",id:118},{name:"카와치나가노 (河内長野)",id:119},{name:"밋카이치초 (三日市町)",id:120},{name:"미카노다이 (美加の台)",id:121},{name:"치하야구치 (千早口)",id:122},{name:"아마미 (天見)",id:123},{name:"키미토게 (紀見峠)",id:124},{name:"린칸덴엔토시 (林間田園都市)",id:125},{name:"미유키츠지 (御幸辻)",id:126},{name:"하시모토 (橋本)",id:127},{name:"키이시미즈 (紀伊清水)",id:128},{name:"카무로 (学文路)",id:129},{name:"쿠도야마 (九度山)",id:130},{name:"고야시타 (高野下)",id:131},{name:"시모코사와 (下古沢)",id:132},{name:"카미코사와 (上古沢)",id:133},{name:"키이호소카와 (紀伊細川)",id:134},{name:"키이카미야 (紀伊神谷)",id:135},{name:"고쿠라쿠바시 (極楽橋)",id:136},
            {name:"시오미바시 (汐見橋)",id:137},{name:"아시하라초 (芦原町)",id:138},{name:"키즈가와 (木津川)",id:139},{name:"츠모리 (津守)",id:140},{name:"니시텐가차야 (西天下茶屋)",id:141},{name:"키시노사토타마데 (岸里玉出)",id:142}
        ];
        terminals = {"1":"なんば","2":"今宮戎","3":"新今宮","4":"萩ノ茶屋","5":"天下茶屋","6":"岸里玉出","7":"帝塚山","8":"住吉東","9":"沢ノ町","10":"我孫子前","11":"浅香山","12":"堺東","13":"三国ヶ丘","14":"百舌鳥八幡","15":"中百舌鳥","16":"白鷺","17":"初芝","18":"萩原天神","19":"北野田","20":"狭山","21":"大阪狭山市","22":"金剛","23":"滝谷","24":"千代田","25":"千代田信号場","26":"河内長野","27":"三日市町","28":"美加の台","29":"千早口","30":"天見","31":"紀見峠","32":"林間田園都市","33":"御幸辻","34":"小原田信号場","35":"橋本","36":"紀伊清水","37":"学文路","38":"九度山","39":"高野下","40":"下古沢","41":"上古沢","42":"紀伊細川","43":"紀伊神谷","44":"極楽橋","52":"高野山","62":"深井","63":"泉ケ丘","64":"栂・美木多","65":"光明池","66":"和泉中央","72":"汐見橋","73":"芦原町","74":"木津川","75":"津守","76":"西天下茶屋","80":"―"};
        names = {"1":"こうや","2":"こうや","3":"りんかん","4":"天空","5":"泉北ﾗｲﾅｰ","6":"特急","8":"快急","11":"急行","12":"急行","13":"急行","14":"急行","18":"各停","19":"各停","24":"회송","25":"회송","26":"회송","31":"準急","32":"準急","33":"準急","34":"準急","41":"区急","42":"区急","43":"区急","44":"区急","45":"区急","46":"区急","51":"各停","52":"各停","53":"各停","54":"各停","55":"各停","56":"各停","57":"各停","58":"各停","59":"各停","71":"鋼索線","81":"鋼索線","82":"鋼索線"};
    } else if (line == 'senboku') {  //센보쿠 고속철도 (난카이로 합병 예정)
		stns = [{name:"나카모즈 (中百舌鳥)",id:151},{name:"후카이 (深井)",id:152},{name:"이즈미가오카 (泉ヶ丘)",id:153},{name:"토가·미키타 (栂・美木多)",id:154},{name:"코묘이케 (光明池)",id:155},{name:"이즈미츄오 (和泉中央)",id:156}];
        terminals = {"1":"なんば","2":"今宮戎","3":"新今宮","4":"萩ノ茶屋","5":"天下茶屋","6":"岸里玉出","7":"帝塚山","8":"住吉東","9":"沢ノ町","10":"我孫子前","11":"浅香山","12":"堺東","13":"三国ヶ丘","14":"百舌鳥八幡","15":"中百舌鳥","16":"白鷺","17":"初芝","18":"萩原天神","19":"北野田","20":"狭山","21":"大阪狭山市","22":"金剛","23":"滝谷","24":"千代田","25":"千代田信号場","26":"河内長野","27":"三日市町","28":"美加の台","29":"千早口","30":"天見","31":"紀見峠","32":"林間田園都市","33":"御幸辻","34":"小原田信号場","35":"橋本","36":"紀伊清水","37":"学文路","38":"九度山","39":"高野下","40":"下古沢","41":"上古沢","42":"紀伊細川","43":"紀伊神谷","44":"極楽橋","52":"高野山","62":"深井","63":"泉ケ丘","64":"栂・美木多","65":"光明池","66":"和泉中央","72":"汐見橋","73":"芦原町","74":"木津川","75":"津守","76":"西天下茶屋","80":"―"};
        names = {"1":"こうや","2":"こうや","3":"りんかん","4":"天空","5":"泉北ﾗｲﾅｰ","6":"特急","8":"快急","11":"急行","12":"急行","13":"急行","14":"急行","18":"各停","19":"各停","24":"회송","25":"회송","26":"회송","31":"準急","32":"準急","33":"準急","34":"準急","41":"区急","42":"区急","43":"区急","44":"区急","45":"区急","46":"区急","51":"各停","52":"各停","53":"各停","54":"各停","55":"各停","56":"各停","57":"各停","58":"各停","59":"各停","71":"鋼索線","81":"鋼索線","82":"鋼索線"};
    }
    process.env.TZ = 'Asia/Seoul';
    var ts = Date.now();
    var url = 'https://external-data.nankaiapp.com/tid/trains.json?' + ts; //모든 노선의 열차 정보가 다 나옴
    var response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        }
    });
    //console.log(response.data);
    var data = [];
    response.data.trains.forEach((e, i) => {
        if ((line == 'nankai' && e.line_id != 1) ||
            (line != 'nankai' && e.line_id == 1)) return;
        var sts = '도착';
        if (e.next_station_id != null) {
            sts = '접근'; //하행인 경우 출발
        }
        data[i] = {
            trainNo: e.train_number,
            sts: sts,
            stnId: e.station_id,
            updn: e.direction == 'up' ? 'up' : 'dn',
            type: e.train_kind_id,
            delay: e.delay,
            terminal: terminals[e.destination_station_id],
        };
    });

    var result = [];
    stns.forEach((e, i) => {
        result[i] = {
            stn: e.name,
            up: [],
            dn: []
        };
        data.forEach((e) => {
            if (e.stnId == stns[i].id) result[i][e.updn].push(e);
        });
    });

    return result;
}

module.exports = init;