document.addEventListener("DOMContentLoaded", function() {
    const wordMappings = {
        "enabled": "enabled-text",
        "Enabled": "enabled-text",
        "disabled": "disabled-text",
        "Disabled": "disabled-text",
        "Off": "disabled-text",
        "On": "enabled-text",
        "no value": "no-text",
        "no": "no-text",
        "available": "available-text"
    };

    function replaceWordsWithSpan(node) {
        const text = node.textContent;
        // Улучшенное регулярное выражение:
        const regex = new RegExp(`\\b(?:enabled|Enabled|disabled|Disabled|Off|On|no value|no|available)\\b`, 'gi');

        const newContent = text.replace(regex, match => {
            const span = document.createElement('span');
            span.className = wordMappings[match];
            span.textContent = match;
            return span.outerHTML;
        });

        const parentNode = node.parentNode;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newContent;
        while (tempDiv.firstChild) {
            parentNode.insertBefore(tempDiv.firstChild, node);
        }
        parentNode.removeChild(node);
    }

    function traverseNodesForWords(node) {
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName !== 'TH') {
                    traverseNodesForWords(child);
                }
            } else if (child.nodeType === Node.TEXT_NODE) {
                replaceWordsWithSpan(child);
            }
        });
    }

    traverseNodesForWords(document.body);
});