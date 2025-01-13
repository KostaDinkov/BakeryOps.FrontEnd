import { md5 } from '@mui/x-license/encoding/md5';
import { LicenseInfo } from '@mui/x-license';
// import { LICENSE_SCOPES } from '@mui/x-license-pro/utils/licenseScope';
// import { LICENSING_MODELS } from '@mui/x-license/utils/licensingModel';

let orderNumber = '';
let expiryTimestamp = Date.now(); // Expiry is based on when the package was created, ignored if perpetual license
let scope = 'premium'; // 'pro' or 'premium'
let licensingModel = 'perpetual'; // 'perpetual', 'subscription'
let licenseInfo = `O=${orderNumber},E=${expiryTimestamp},S=${scope},LM=${licensingModel},KV=2`;

export const setMuiLicense =()=>{
    LicenseInfo.setLicenseKey(md5(btoa(licenseInfo)) + btoa(licenseInfo));
    console.log(licenseInfo)
}
