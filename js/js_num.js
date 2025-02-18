  document.addEventListener("DOMContentLoaded", function() {
const numberMappings = {
    "0": "disabled-int",
    "1": "enabled-int"
};

function replaceNumbersWithSpan(node) {
    const text = node.textContent;
    const regex = new RegExp(`(?:^|\\s)\\b(${Object.keys(numberMappings).join('|')})\\b(?:$|\\s)`, 'g');
    const newContent = text.replace(regex, (match, p1) => {
        const span = document.createElement('span');
        span.className = numberMappings[p1];
        span.textContent = p1;
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

function traverseNodesForNumbers(node) {
    node.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            traverseNodesForNumbers(child);
        } else if (child.nodeType === Node.TEXT_NODE) {
            replaceNumbersWithSpan(child);
        }
    });
}

traverseNodesForNumbers(document.body);
});