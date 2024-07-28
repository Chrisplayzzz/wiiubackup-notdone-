(function(exports) {
var Wood = exports.Wood || {};
exports.Wood = Wood;
Wood.AnalyticsUtil = (function() {
    /**
     * isWiiU
     * [memo] wiiuSystemSetting
     * @private
     * @property isWiiU
     * @type {Boolean}
     */
    var isWiiU = (typeof wiiuSystemSetting !== 'undefined') ? true : false;
    
    var localStorage = exports.localStorage;
    var sessionStorage = exports.sessionStorage;
    
    return {
        isWiiU: isWiiU,
        /**
         * Return if referrer is top
         * @method isReferrerTop
         * @return {Boolean} isReferrerTop
         */
        isReferrerTop: function () {
            var ret = false;
            // SEE refs #9631
            var url = $.url();
            var beacon_str = url.fparam('beacon') || url.param('beacon');
            var hasDirectory = beacon_str ? /directory/.test(beacon_str) : false;
            // URLのbeaconパラメータにdirectoryがあるとき
            // トップから遷移したとみなす #10829
            if ((url.param('seq') !== 'appJump') && hasDirectory) {
              ret = true;
            }
            return ret;
        },
        /**
         * Get Hashed PID (md5(secret_key::char(128) + hex(pid)::char(8))::char(32))
         * [memo] wiiuNNA.principalId, wiiuNNA.principalIdHashKey, jQuery().crypt(http://www.itsyndicate.ca/jquery/)
         * @method getHashedPID
         * @return {String} Hashed PID
         */
        getHashedPID: function () {
            if (!isWiiU) {
                return localStorage.getItem('pid') || '00000000000000000000000000000000';
            }
            var dec = parseInt(wiiuNNA.principalId, 10);
            var hex = isNaN(dec) ? '0' : dec.toString(16);
            hex = ['00000000', hex].join('');
            hex = hex.substr(hex.length - 8);
            var plain = [wiiuNNA.principalIdHashKey, hex].join('');
            var ret = jQuery().crypt({method:'md5', source:plain});
            return ret;
        },
        /**
         * Get Region Type
         * [memo] this.getRegion()
         * @method getRegionType
         * @return {String} Region Type
         */
        getRegionType: function () {
            var region = this.getRegion();
            var ret =
            (
            (region === 'JPN') ? 'jp' :
            (region === 'USA') ? 'us' :
            (region === 'EUR') ? 'eu' :
            (region === 'CHN') ? 'unknown' :
            (region === 'KOR') ? 'unknown' :
            (region === 'TWN') ? 'unknown' :
            'unknown'
            );
            return ret;
        },
        /**
         * Get Default Currency
         * [memo] this.getRegion()
         * @method getDefaultCurrency
         * @return {String} Currency
         */
        getDefaultCurrency: function () {
            var region = this.getRegion();
            var ret =
            (
            (region === 'JPN') ? 'JPY' :
            (region === 'USA') ? 'USD' :
            (region === 'EUR') ? 'EUR' :
            'JPY'
            );
            return ret;
        },
        /**
         * Get Gender
         * [memo] wiiuNNA.gender
         * @method getGender
         * @return {String} Gender
         */
        getGender: function () {
            if (isWiiU) {
                return wiiuNNA.gender;
            }
            return localStorage.getItem('gender') || 'unknown';
        },
        /**
         * Get Age
         * [memo] wiiuNNA.birthday
         * @method getAge
         * @return {Number} Age
         */
        getAge: function () {
            if (!isWiiU) {
                return parseInt(localStorage.getItem('age'), 10) || 30;
            }
            var today = new Date();
            today = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
            var birth = new Date(wiiuNNA.birthday);
            birth = birth.getFullYear() * 10000 + (birth.getMonth() + 1) * 100 + birth.getDate();
            var age = Math.floor((today - birth) / 10000);
            return age;
        },
        /**
         * Get Region
         * [memo] wiiuSystemSetting.getRegion()
         * @method getRegion
         * @return {String} Region
         */
        getRegion: function () {
            if (isWiiU) {
                var region = wiiuSystemSetting.getRegion();
                var ret = (region.error) ? 'unknown' : region.code;
                return ret;
            }
            
            // 非Wii Uでは適当なリージョンを返す
            var country = this.getCountry();
            if (country === 'JP'){
                return 'JPN';
            }
            if (
                country === 'US' ||
                country === 'CA' ||
                country === "MX" ||
                country === "BR") {
                return 'USA';
            }
            return 'EUR';
        },
        /**
         * Get Country
         * [memo] wiiuSystemSetting.getCountry()
         * @method getCountry
         * @return {String} Country
         */
        getCountry: function () {
            if (isWiiU) {
                var country = wiiuSystemSetting.getCountry();
                var ret = (country.error) ? 'unknown' : country.code;
                return ret;
            }
            return sessionStorage.getItem('country') || 'unknown';
        },
        /**
         * Get Languages
         * [memo] wiiuSystemSetting.getLanguage()
         * @method getLanguage
         * @return {String} Language
         */
        getLanguage: function () {
            if (isWiiU) {
                var language = wiiuSystemSetting.getLanguage();
                var ret = (language.error) ? 'unknown' : language.code;
                return ret;
            }
            return localStorage.getItem('lang') || 'unknown';
        }
    };
})();
})(window);