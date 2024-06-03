
function isChromeBrowser() {
    const isChromiumBased = !!window.chrome;
    const isGoogleChrome = isChromiumBased && (navigator.vendor === 'Google Inc.' || navigator.vendor === 'Google LLC');
  
    return isGoogleChrome;
  }
  
export function isNonAppleAndChrome() {
    // Check if the device is not an Apple device
    const isNotApple = !(/(iPad|iPhone|iPod|Macintosh)/i.test(navigator.userAgent));
  
    // Check if the browser is Chrome
    const isChrome = isChromeBrowser();
  
    // Return true if both conditions are met
    return isNotApple && isChrome;
}
