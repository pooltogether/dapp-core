function isWindowDefined() {
  return typeof window !== 'undefined'
}

function isNavigatorDefined() {
  return typeof navigator !== 'undefined'
}

/**
 * Determine the browser.
 * This function returns one of Brave, Chrome, Firefox, Safari, Opera
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */
const getBrowser = function (userAgent) {
  let browser = 'unknown'

  if (/chrome/i.test(userAgent)) {
    browser = 'Chrome'
  } else if (/safari/i.test(userAgent)) {
    browser = 'Safari'
  } else if (/firefox/i.test(userAgent)) {
    browser = 'Firefox'
  }

  return browser
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', or 'unknown'.
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */
const getMobileOperatingSystem = function (userAgent) {
  let os = 'unknown'

  if (/android/i.test(userAgent)) {
    os = 'Android'
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    os = 'iOS'
  }

  return os
}

/**
 * Determine if Web3 is available.
 *
 * @returns {Bool}
 */
const getWeb3Installed = function () {
  let isInstalled = false

  if (isWindowDefined() && (window.web3 || window.ethereum)) {
    isInstalled = true
  }

  return isInstalled
}

/**
 * Lets you know if they've given you permission to their web3 wallet.
 *
 * @returns {Bool}
 */
const getWeb3Permission = async function () {
  let hasPermission = false

  if (isWindowDefined() && window.ethereum) {
    let isUnlocked,
      // isEnabled,
      isApproved

    if (window.ethereum._metamask) {
      isUnlocked = await window.ethereum._metamask.isUnlocked()
      // isEnabled = await window.ethereum._metamask.isEnabled()
      isApproved = await window.ethereum._metamask.isApproved()
    }

    // // hack due to a MetaMask bug that shows up when you Quit Chrome and re-open Chrome
    // // right back to the tab using MetaMask
    // if ((isUnlocked && isApproved) && !defined(this.props.address)) {
    //   window.location.reload(true)
    // }

    // hasPermission = isUnlocked && isEnabled && isApproved
    hasPermission = isUnlocked && isApproved
  }

  return hasPermission
}

export async function getSystemInfo () {
  let osInfo = {}

  if (isNavigatorDefined() || isWindowDefined()) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const hasWeb3Permission = (await getWeb3Permission()) === true

    osInfo = {
      mobileOS: getMobileOperatingSystem(userAgent), // Android or iOS
      browser: getBrowser(userAgent),
      hasWeb3Available: getWeb3Installed(),
      hasWeb3Permission
    }
  }

  return osInfo
}
