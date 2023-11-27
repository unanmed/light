import { GameUi, UiController } from './ui';
import * as DEVICE from '../../device';

export const mainCard = new UiController(true);
mainCard.register(new GameUi('lightCard', DEVICE.Light));
mainCard.on('add', ui => {
    console.log(ui.num);
});
