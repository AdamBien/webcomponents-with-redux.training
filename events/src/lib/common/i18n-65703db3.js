const fetchPromises = new Map();
const jsonPromises = new Map();

const fetchJsonOnce = async url => {
	if (!fetchPromises.get(url)) {
		fetchPromises.set(url, fetch(url));
	}
	const response = await fetchPromises.get(url);

	if (!jsonPromises.get(url)) {
		jsonPromises.set(url, response.json());
	}

	return jsonPromises.get(url);
};

const features = new Map();

const getFeature = name => {
	return features.get(name);
};

const OpenUI5Support = getFeature("OpenUI5Support");

const supportedLocales = ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"];

const resources = new Map();
const cldrData = {};
const cldrUrls = {};

// externally configurable mapping function for resolving (localeId -> URL)
// default implementation - ui5 CDN
let cldrMappingFn = locale => `https://ui5.sap.com/1.60.2/resources/sap/ui/core/cldr/${locale}.json`;

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
};

const calcLocale = (language, region, script) => {
	// normalize language and handle special cases
	language = (language && M_ISO639_OLD_TO_NEW[language]) || language;
	// Special case 1: in an SAP context, the inclusive language code "no" always means Norwegian Bokmal ("nb")
	if (language === "no") {
		language = "nb";
	}
	// Special case 2: for Chinese, derive a default region from the script (this behavior is inherited from Java)
	if (language === "zh" && !region) {
		if (script === "Hans") {
			region = "CN";
		} else if (script === "Hant") {
			region = "TW";
		}
	}

	// try language + region
	let localeId = `${language}_${region}`;
	if (!supportedLocales.includes(localeId)) {
		// fallback to language only
		localeId = language;
	}
	if (!supportedLocales.includes(localeId)) {
		// fallback to english
		localeId = "en";
	}

	return localeId;
};


const resolveMissingMappings = () => {
	if (!cldrMappingFn) {
		return;
	}

	const missingLocales = supportedLocales.filter(locale => !cldrData[locale] && !cldrUrls[locale]);
	missingLocales.forEach(locale => {
		cldrUrls[locale] = cldrMappingFn(locale);
	});
};

const registerModuleContent = (moduleName, content) => {
	resources.set(moduleName, content);
};

const getModuleContent = moduleName => {
	const moduleContent = resources.get(moduleName);
	if (moduleContent) {
		return moduleContent;
	}

	const missingModule = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
	if (missingModule) {
		throw new Error(`CLDR data for locale ${missingModule[1]} is not loaded!`);
	}

	throw new Error(`Unknown module ${moduleName}`);
};

const fetchCldr = async (language, region, script) => {
	resolveMissingMappings();
	const localeId = calcLocale(language, region, script);

	let cldrObj = cldrData[localeId];
	const url = cldrUrls[localeId];

	if (!cldrObj && OpenUI5Support) {
		cldrObj = OpenUI5Support.getLocaleDataObject();
	}

	if (cldrObj) {
		// inlined from build or fetched independently
		registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrObj);
	} else if (url) {
		// fetch it
		const cldrContent = await fetchJsonOnce(url);
		registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrContent);
	}
};

const registerCldr = (locale, url) => {
	cldrUrls[locale] = url;
};

const setCldrData = (locale, data) => {
	cldrData[locale] = data;
};

const themeURLs = new Map();
const themeStyles = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();

/**
 * Used to provide CSS Vars for a specific theme for a specific package.
 * The CSS Vars can be passed directly as a string (containing them), as an object with a "_" property(containing them in the "_" property), or as a URL.
 * This URL must point to a JSON file, containing a "_" property.
 *
 * Example usage:
 *  1) Pass the CSS Vars as a string directly.
 *  registerThemeProperties("my-package", "my_theme", ":root{--var1: red;}");
 *  2) Pass the CSS Vars as an object directly
 *  registerThemeProperties("my-package", "my_theme", {"_": ":root{--var1: red;}"});
 *  3) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - can be one of three options: a string, an object with a "_" property or a URL to a JSON file with a "_" property
 */
const registerThemeProperties = (packageName, themeName, style) => {
	if (style._) {
		// JSON object like ({"_": ":root"})
		themeStyles.set(`${packageName}_${themeName}`, style._);
	} else if (style.includes(":root")) {
		// pure string
		themeStyles.set(`${packageName}_${themeName}`, style);
	} else {
		// url for fetching
		themeURLs.set(`${packageName}_${themeName}`, style);
	}
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
};

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style) {
		return style;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme - falling back to sap_fiori_3. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return themeStyles.get(`${packageName}_sap_fiori_3`);
	}

	const data = await fetchThemeProperties(packageName, themeName);
	themeStyles.set(`${packageName}_${themeName}`, data._);
	return data._;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
	}
	return fetchJsonOnce(url);
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

var detectNavigatorLanguage = () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;

	return rawLocale || "en";
};

var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

var oToken = Object.create(null);
var fnMerge = function () {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && fnIsPlainObject(src) ? src : {};
                    }
                    target[name] = fnMerge(deep, arguments[1], clone, copy);
                } else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

var fnMerge$1 = function () {
    var args = [
        true,
        false
    ];
    args.push.apply(args, arguments);
    return fnMerge.apply(null, args);
};

let initialized = false;

let initialConfig = {
	animationMode: "full",
	theme: "sap_fiori_3",
	rtl: null,
	language: null,
	calendarType: null,
	noConflict: false, // no URL
	formatSettings: {},
};

const getTheme = () => {
	initConfiguration();
	return initialConfig.theme;
};

const getRTL = () => {
	initConfiguration();
	return initialConfig.rtl;
};

const getLanguage = () => {
	initConfiguration();
	return initialConfig.language;
};

const getNoConflict = () => {
	initConfiguration();
	return initialConfig.noConflict;
};

const getCalendarType = () => {
	initConfiguration();
	return initialConfig.calendarType;
};

const getFormatSettings = () => {
	initConfiguration();
	return initialConfig.formatSettings;
};

const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

const parseConfigurationScript = () => {
	const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

	let configJSON;

	if (configScript) {
		try {
			configJSON = JSON.parse(configScript.innerHTML);
		} catch (err) {
			console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
		}

		if (configJSON) {
			initialConfig = fnMerge$1(initialConfig, configJSON);
		}
	}
};

const parseURLParameters = () => {
	const params = new URLSearchParams(window.location.search);

	params.forEach((value, key) => {
		if (!key.startsWith("sap-ui")) {
			return;
		}

		const lowerCaseValue = value.toLowerCase();

		const param = key.split("sap-ui-")[1];

		if (booleanMapping.has(value)) {
			value = booleanMapping.get(lowerCaseValue);
		}

		initialConfig[param] = value;
	});
};

const applyOpenUI5Configuration = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
		return;
	}

	const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
	initialConfig = fnMerge$1(initialConfig, OpenUI5Config);
};


const initConfiguration = () => {
	if (initialized) {
		return;
	}

	// 1. Lowest priority - configuration script
	parseConfigurationScript();

	// 2. URL parameters overwrite configuration script parameters
	parseURLParameters();

	// 3. If OpenUI5 is detected, it has the highest priority
	applyOpenUI5Configuration();

	initialized = true;
};

let language;

const getLanguage$1 = () => {
	if (language === undefined) {
		language = getLanguage();
	}
	return language;
};

const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;

class Locale {
	constructor(sLocaleId) {
		const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
		if (aResult === null) {
			throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
		}
		this.sLocaleId = sLocaleId;
		this.sLanguage = aResult[1] || null;
		this.sScript = aResult[2] || null;
		this.sRegion = aResult[3] || null;
		this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
		this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
		this.sPrivateUse = aResult[6] || null;
		if (this.sLanguage) {
			this.sLanguage = this.sLanguage.toLowerCase();
		}
		if (this.sScript) {
			this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
				return s.toUpperCase();
			});
		}
		if (this.sRegion) {
			this.sRegion = this.sRegion.toUpperCase();
		}
	}

	getLanguage() {
		return this.sLanguage;
	}

	getScript() {
		return this.sScript;
	}

	getRegion() {
		return this.sRegion;
	}

	getVariant() {
		return this.sVariant;
	}

	getVariantSubtags() {
		return this.sVariant ? this.sVariant.split("-") : [];
	}

	getExtension() {
		return this.sExtension;
	}

	getExtensionSubtags() {
		return this.sExtension ? this.sExtension.slice(2).split("-") : [];
	}

	getPrivateUse() {
		return this.sPrivateUse;
	}

	getPrivateUseSubtags() {
		return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
	}

	hasPrivateUseSubtag(sSubtag) {
		return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
	}

	toString() {
		const r = [this.sLanguage];

		if (this.sScript) {
			r.push(this.sScript);
		}
		if (this.sRegion) {
			r.push(this.sRegion);
		}
		if (this.sVariant) {
			r.push(this.sVariant);
		}
		if (this.sExtension) {
			r.push(this.sExtension);
		}
		if (this.sPrivateUse) {
			r.push(this.sPrivateUse);
		}
		return r.join("-");
	}
}

const convertToLocaleOrNull = lang => {
	try {
		if (lang && typeof lang === "string") {
			return new Locale(lang);
		}
	} catch (e) {
		// ignore
	}
};

/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = lang => {
	if (lang) {
		return convertToLocaleOrNull(lang);
	}

	if (getLanguage$1()) {
		return new Locale(getLanguage$1());
	}

	return convertToLocaleOrNull(detectNavigatorLanguage());
};

const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;

/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
	"he": "iw",
	"yi": "ji",
	"id": "in",
	"sr": "sh",
};

/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or "en" if no locale provided.
 */
const normalizeLocale = locale => {
	let m;

	if (!locale) {
		return "en";
	}

	if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) {/* eslint-disable-line */
		let language = m[1].toLowerCase();
		let region = m[3] ? m[3].toUpperCase() : undefined;
		const script = m[2] ? m[2].toLowerCase() : undefined;
		const variants = m[4] ? m[4].slice(1) : undefined;
		const isPrivate = m[6];

		language = M_ISO639_NEW_TO_OLD[language] || language;

		// recognize and convert special SAP supportability locales (overwrites m[]!)
		if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
			(variants && (m = SAPSupportabilityLocales.exec(variants)))) {/* eslint-disable-line */
			return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
		}

		// Chinese: when no region but a script is specified, use default region for each script
		if (language === "zh" && !region) {
			if (script === "hans") {
				region = "CN";
			} else if (script === "hant") {
				region = "TW";
			}
		}

		return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
	}
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = locale => {
	if (!locale) {
		return "en";
	}

	if (locale === "zh_HK") {
		return "zh_TW";
	}

	// if there are multiple segments (separated by underscores), remove the last one
	const p = locale.lastIndexOf("_");
	if (p >= 0) {
		return locale.slice(0, p);
	}

	// for any language but 'en', fallback to 'en' first before falling back to the 'raw' language (empty string)
	return locale !== "en" ? "en" : "";
};

const bundleData = new Map();
const bundleURLs = new Map();

/**
 * Sets a map with texts and ID the are related to.
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} data an object with string locales as keys and text translataions as values
 * @public
 */
const setI18nBundleData = (packageName, data) => {
	bundleData.set(packageName, data);
};

const getI18nBundleData = packageName => {
	return bundleData.get(packageName);
};

/**
 * Registers a map of locale/url information, to be used by the <code>fetchI18nBundle</code> method.
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} bundle an object with string locales as keys and the URLs of where the corresponding locale can be fetched from, f.e {"en": "path/en.json", ...}
 * @public
 */
const registerI18nBundle = (packageName, bundle) => {
	bundleURLs.set(packageName, bundle);
};

/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async packageName => {
	const bundlesForPackage = bundleURLs.get(packageName);

	if (!bundlesForPackage) {
		console.warn(`Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
		` You need to import ${packageName}/dist/Assets.js with a build tool that supports JSON imports.`); /* eslint-disable-line */
		return;
	}

	const language = getLocale().getLanguage();

	let localeId = normalizeLocale(language);
	while (!bundlesForPackage[localeId]) {
		localeId = nextFallbackLocale(localeId);
	}

	const bundleURL = bundlesForPackage[localeId];

	if (typeof bundleURL === "object") { // inlined from build
		setI18nBundleData(packageName, bundleURL);
		return bundleURL;
	}

	const data = await fetchJsonOnce(bundleURL);
	setI18nBundleData(packageName, data);
};

export { registerThemeProperties as a, registerI18nBundle as b, getThemeProperties as c, getRegisteredPackages as d, getTheme as e, getNoConflict as f, getFeature as g, getCalendarType as h, getLocale as i, getLanguage$1 as j, getModuleContent as k, getRTL as l, fnMerge$1 as m, detectNavigatorLanguage as n, getI18nBundleData as o, fetchI18nBundle as p, getFormatSettings as q, registerCldr as r, setCldrData as s, fetchCldr as t };
