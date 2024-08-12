const axios = require('axios');

async function init(line) {
    /*
    난카이선 계통 https://www.nankaiapp.com/lines/nankai/trains
    고야선 계통 https://www.nankaiapp.com/lines/koya/trains
    */
    var stns, terminals, names;
    if (line == 'nankai') {  //난카이 본선 계통
        stns = [{name:"난바 (難波)",id:1},{name:"신이마미야 (新今宮)",id:2},{name:"텐가차야 (天下茶屋)",id:3},
            {name:"키시노사토타마데 (岸里玉出)",id:4},{name:"코하마 (粉浜)",id:5},{name:"스미요시타이샤 (住吉大社)",id:6},{name:"스미노에 (住ノ江)",id:7},{name:"시치도 (七道)",id:8},{name:"사카이 (堺)",id:9},{name:"미나토 (湊)",id:10},{name:"이시즈가와 (石津川)",id:11},{name:"스와노모리 (諏訪ノ森)",id:12},{name:"하마데라코엔 (浜寺公園)",id:13},
            {name:"하고로모 (羽衣)",id:14},{name:"타카이시 (高石)",id:15},{name:"키타스케마츠 (北助松)",id:16},{name:"마츠노하마 (松ノ浜)",id:17},{name:"이즈미오츠 (泉大津)",id:18},{name:"타다오카 (忠岡)",id:19},{name:"하루키 (春木)",id:20},{name:"이즈미오미야 (和泉大宮)",id:21},{name:"키시와다 (岸和田)",id:22},{name:"타코지조 (蛸地蔵)",id:23},{name:"카이즈카 (貝塚)",id:24},{name:"니시키노하마 (二色浜)",id:25},{name:"츠루하라 (鶴原)",id:26},{name:"이하라노사토 (井原里)",id:27},
            {name:"이즈미사노 (泉佐野)",id:28},{name:"하구라자키 (羽倉崎)",id:29},{name:"요시미노사토 (吉見ノ里)",id:30},{name:"오카다우라 (岡田浦)",id:31},{name:"타루이 (樽井)",id:32},{name:"오자키 (尾崎)",id:33},{name:"톳토리노쇼 (鳥取ノ荘)",id:34},{name:"하코츠쿠리 (箱作)",id:35},{name:"탄노와 (淡輪)",id:36},
            {name:"미사키코엔 (みさき公園)",id:37},{name:"쿄시 (孝子)",id:38},{name:"와카야마다이가쿠마에 (和歌山大学前)",id:39},{name:"키노카와 (紀ノ川)",id:40},
            {name:"와카야마시 (和歌山市)",id:41},{name:"와카야마항 (和歌山港)",id:42},
            {name:"하고로모 (羽衣)",id:61},{name:"캬라바시 (伽羅橋)",id:62},{name:"타카시노하마 (高師浜)",id:63}, //운행 중단, 선로 분리되어 있음 
            {name:"(공항선 분기점)",id:75},{name:"린쿠타운 (りんくうタウン)",id:76},{name:"간사이공항 (関西空港)",id:77},
            {name:"타나가와 (多奈川)",id:81},{name:"후케항 (深日港)",id:82},{name:"후케초 (深日町)",id:83},{name:"미사키코엔 (みさき公園)",id:84},
            {name:"(카다선 분기점)",id:87},{name:"히가시마츠에 (東松江)",id:88},{name:"나카마츠에 (中松江)",id:89},{name:"하치만마에 (八幡前)",id:90},{name:"니시노쇼 (西ノ庄)",id:91},{name:"니리가하마 (二里ヶ浜)",id:92},{name:"이소노우라 (磯ノ浦)",id:93},{name:"카다 (加太)",id:94}];
        terminals = {"1":"なんば","3":"新今宮","5":"天下茶屋","6":"岸里玉出","7":"粉浜","8":"住吉大社","9":"住之江","10":"七道","11":"堺","12":"湊","13":"石津川","14":"諏訪ノ森","15":"浜寺公園","16":"羽衣","17":"高石","18":"北助松","19":"松ノ浜","20":"泉大津","21":"忠岡","22":"春木","23":"和泉大宮","24":"岸和田","25":"蛸地蔵","26":"貝塚","27":"二色浜","28":"鶴原","29":"井原里","30":"泉佐野","31":"羽倉崎","32":"吉見ノ里","33":"岡田浦","34":"樽井","35":"尾崎","36":"鳥取ノ荘","37":"箱作","38":"淡輪","39":"みさき公園","40":"孝子","41":"和歌山大学前","42":"紀ノ川","43":"和歌山市","46":"和歌山港","49":"りんくうタウン","50":"関西空港","53":"梶取","54":"東松江","55":"中松江","56":"八幡前","57":"西ノ庄","58":"二里ヶ浜","59":"磯ノ浦","60":"加太","63":"深日町","64":"深日港","65":"多奈川","68":"伽羅橋","69":"高師浜","72":"汐見橋","73":"芦原町","74":"木津川","75":"津守","76":"西天下茶屋","80":"―"};
        names = {"1":"ﾗﾋﾟｰﾄα","2":"ﾗﾋﾟｰﾄα","3":"ﾗﾋﾟｰﾄβ","4":"サザン","5":"サザン","6":"サザン","7":"急行","8":"急行","9":"急行","10":"急行","11":"空港急行","12":"空港急行","13":"区急","14":"区急","15":"準急","16":"準急","17":"準急","18":"普通","19":"普通","20":"普通","21":"普通","22":"普通","23":"普通","24":"회송","25":"회송","26":"회송","27":"회송","28":"회송","29":"회송","30":"회송","31":"회송","32":"회송"};
    } else if (line == 'koya') {  //고야선 계통

    } else if (line == 'senboku') {  //센보쿠 고속철도 (난카이로 합병 예정)

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