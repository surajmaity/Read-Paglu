document.addEventListener('DOMContentLoaded', function() {
  const bionicToggle = document.getElementById('bionicToggle');
  const statusMessage = document.getElementById('statusMessage');

  // Update status message
  function updateStatusMessage(isEnabled) {
    statusMessage.textContent = isEnabled ? 'Extension is enabled' : 'Extension is disabled';
    statusMessage.className = 'status ' + (isEnabled ? 'enabled' : 'disabled');
  }

  // Bionic Reading Functions
  function bionicRead() {
    const enCodeHTML = s => s.replace(/[\u00A0-\u9999<>\&]/g, w => '&#' + w.charCodeAt(0) + ';');
    let body = document.body;

    if(/weibo/.test(location.hostname)) {
      const wbMainEl = document.querySelector('.WB_main');
      if(wbMainEl) body = wbMainEl;
      const customStyleEl = document.querySelector('#custom_style');
      if(customStyleEl) customStyleEl.removeAttribute('id');
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'bionic-reading-style';
    styleEl.innerHTML = 'bbb{font-weight:bold;}';

    const excludeTagNames = [
      'script', 'style', 'xmp',
      'input', 'textarea',
      'pre', 'code',
      'h1', 'h2', 'h3', 'h4',
      'b', 'strong'
    ].map(a => a.toUpperCase());

    const gather = el => {
      let textEls = [];
      el.childNodes.forEach(el => {
        if(el.isEnB) return;
        if(el.nodeType === 3) {
          textEls.push(el);
        } else if(el.childNodes) {
          if(excludeTagNames.includes(el.tagName)) return;
          textEls = textEls.concat(gather(el));
        }
      });
      return textEls;
    };

    const engRegexi = /[a-z][a-z0-9]+/i;
    const engRegexig = /[a-z][a-z0-9]+/ig;
    
    const replaceTextByEl = el => {
      const text = el.data;
      if(!engRegexi.test(text)) return;

      const spanEl = document.createElement('span');
      spanEl.isEnB = true;
      spanEl.dataset.bionic = 'true';
      spanEl.innerHTML = enCodeHTML(text).replace(engRegexig, word => {
        let halfLength;
        if(/ing$/.test(word)) {
          halfLength = word.length - 3;
        } else if(word.length < 5) {
          halfLength = Math.floor(word.length/2);
        } else {
          halfLength = Math.ceil(word.length/2);
        }
        return '<bbb>' + word.substr(0, halfLength) + '</bbb>' + word.substr(halfLength);
      });
      
      if (el.parentNode) {
        el.parentNode.replaceChild(spanEl, el);
      }
    };

    const bionic = () => {
      if (!document.getElementById('bionic-reading-style')) {
        document.head.appendChild(styleEl);
      }
      const textEls = gather(body);
      textEls.forEach(replaceTextByEl);
    };

    const lazy = (func, ms = 0) => {
      return () => {
        clearTimeout(func.T);
        func.T = setTimeout(func, ms);
      };
    };

    lazy(bionic)();

    if(window.ResizeObserver) {
      if (!window.bionicResizeObserver) {
        window.bionicResizeObserver = new ResizeObserver(lazy(bionic, 100));
        window.bionicResizeObserver.observe(body);
      }
    } else {
      const {open, send} = XMLHttpRequest.prototype;
      XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', lazy(bionic));
        return open.apply(this, arguments);
      };
      document.addEventListener('click', lazy(bionic));
      window.addEventListener('load', lazy(bionic));
      document.addEventListener("DOMContentLoaded", lazy(bionic));
    }
  }

  function removeBionicRead() {
    const style = document.getElementById('bionic-reading-style');
    if (style) {
      style.remove();
    }

    const bionicSpans = document.querySelectorAll('span[data-bionic="true"]');
    bionicSpans.forEach(span => {
      const textNode = document.createTextNode(span.textContent);
      if (span.parentNode) {
        span.parentNode.replaceChild(textNode, span);
      }
    });

    if (window.bionicResizeObserver) {
      window.bionicResizeObserver.disconnect();
      delete window.bionicResizeObserver;
    }
  }

  // Inject script into current tab
  async function injectScript(funcToInject) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) return;

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: funcToInject
      });
    } catch (error) {
      console.error('Script injection failed:', error);
    }
  }

  // Load saved state
  chrome.storage.sync.get(['bionicEnabled'], function(result) {
    const isEnabled = result.bionicEnabled || false;
    bionicToggle.checked = isEnabled;
    updateStatusMessage(isEnabled);
    
    if (isEnabled) {
      injectScript(bionicRead);
    }
  });

  // Handle bionic reading toggle
  bionicToggle.addEventListener('change', function() {
    const isEnabled = bionicToggle.checked;
    chrome.storage.sync.set({ bionicEnabled: isEnabled });
    updateStatusMessage(isEnabled);
    
    if (isEnabled) {
      injectScript(bionicRead);
    } else {
      injectScript(removeBionicRead);
    }
  });
});
