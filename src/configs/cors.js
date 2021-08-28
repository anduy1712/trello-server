import { whitelist } from '../utilities/constants';

export const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200
};
