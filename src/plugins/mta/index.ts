import { IConfigRes } from '../index.d';
import MtaH5 from 'mta-h5-analysis';

const getMtaH5 = (res: IConfigRes) => {
    // tslint:disable-next-line:no-unused-expression
    res.data && res.data.mta && MtaH5.init(res.data.mta);

    return MtaH5;
};

export default getMtaH5;
