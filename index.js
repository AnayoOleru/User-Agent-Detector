function getDebugInfo() {
    const infoSections = [];
    const parser = new UAParser();
    const userOs = parser.getOS();
    const userDevice = parser.getDevice();
    const userBrowser = parser.getBrowser();
    const debugContainer = document.getElementById("debug-container");
  
    if (userOs && userOs.name && userOs.version) {
      infoSections.push({ name: 'OS', value: userOs.name + ' ' + userOs.version});
    }
  
    if (userBrowser && userBrowser.name && userBrowser.version) {
      infoSections.push({ name: 'Browser', value: userBrowser.name + ' ' + userBrowser.version});
    }
  
    if (userDevice && userDevice.vendor && userDevice.model) {
      infoSections.push({ name: 'Device', value: userBrowser.vendor + ' ' + userBrowser.model});
    } else {
      infoSections.push({ name: 'Device', value: 'N/A'});
    }
  
    if (window) {
      if (window.screen) {
        infoSections.push({ name: 'Screen resolution', value: window.screen.width + 'x' + window.screen.height});
        infoSections.push({ name: 'Available screen space', value: window.screen.availWidth + 'x' + window.screen.availHeight});
      }
  
      infoSections.push({ name: 'Browser window size', value: window.innerWidth + 'x' + window.innerHeight});
      infoSections.push({ name: 'Device pixel ratio', value: window.devicePixelRatio });
    }
  
    //Old-school JS without jQuery or another framework, just for fun
    while (debugContainer.hasChildNodes()) {
      debugContainer.removeChild(debugContainer.lastChild);
    }
  
    for (const i = 0; i < infoSections.length; i++) {
      const debugInfo = document.createElement("div");
      debugInfo.setAttribute("class", "debug-info");
      const debugName = document.createElement("div");
      debugName.setAttribute("class", "debug-name");
      debugName.appendChild(document.createTextNode(infoSections[i].name));
      const debugValue = document.createElement("div");
      debugValue.setAttribute("class", "debug-value");
      debugValue.appendChild(document.createTextNode(infoSections[i].value)); 
      debugInfo.appendChild(debugName);
      debugInfo.appendChild(debugValue);
      debugContainer.appendChild(debugInfo);
    }
  }
  
  window.addEventListener("resize", function () {
    // This will fire each time the window is resized
    // Usually a good idea to wrap this in a debounce method, like http://underscorejs.org/#debounce
    getDebugInfo();
  }, false);
  
  window.addEventListener("orientationchange", function () {
    getDebugInfo();
  }, false);
  
  getDebugInfo();
