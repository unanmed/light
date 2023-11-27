import { Light } from './light';
import { DataSet } from './set';
import * as DEVICE from '../../device';
import { GameUi } from '../view/ui';

export function init() {
    console.log(1);

    const lightSet = new DataSet<Light>('light');
    const light = new Light('100200003083');
    lightSet.use('lightCard');
    lightSet.add(light);
}
