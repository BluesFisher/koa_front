import { IConfigRes, ITrconf } from '../index.d';
import router from '@/router';

const __TIMESTART: ITrconf = {
    proj: '',
    url: ''
};

router.afterEach((to, from) => {
    let st = 0;
    if (from.name || !performance.timing.domainLookupStart) {
        st = Date.now();
    } else {
        st = performance.timing.domainLookupStart;
    }
    __TIMESTART[to.path] = st;
});

const TimeReport = (res: IConfigRes) => {
    const TRCONf: ITrconf = res.timeReport || { proj: '', url: '' };

    return () => {
        const st = __TIMESTART[location.pathname] || '';
        if (!st) {
            return;
        }
        const et = Date.now();
        const uri = `${location.protocol}//${location.host}${location.pathname}`;
        const t = et - st;
        const b = new Image();
        b.src = `${TRCONf.url}?proj=${TRCONf.proj}&uri=${uri}&action=initPage&ispage=1&time=${t}&start=${st}&endtime=${et}`;
    };
};

export default TimeReport;
