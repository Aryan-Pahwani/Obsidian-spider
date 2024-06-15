window.onload = function() {
    var katex_script = document.createElement('script');

    katex_script.setAttribute('src','https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.js');
    katex_script.setAttribute('integrity', 'sha384-IolEJdmwZJpJkyCvXBnmGt8wXcP3nvRjxBjPv7/PWW7oODJhZ+qiY1sDpwgjcKLT');
    katex_script.setAttribute('crossorigin', 'anonymous')

    document.head.appendChild(katex_script);
    
    var katex_style_sheet = document.createElement('link')
    katex_style_sheet.setAttribute('rel', 'stylesheet')
    katex_style_sheet.setAttribute('href', 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.css');
    katex_style_sheet.setAttribute('integrity', 'sha384-K1E1xaIzoWihlXfiT5fcmLNabsnrl+dqc0errnRwtMX14tKRA9cCYNDGnXiHEZMs');
    katex_style_sheet.setAttribute('crossorigin', 'anonymous')

    document.head.appendChild(katex_style_sheet);
    }

function spider(markdownFilePath) {
    fetch(markdownFilePath)
        .then(response => response.text())
            .then(text => {
            // Do something with your text
                var newDiv = document.createElement('div');
                newDiv.id = 'spider-content-container';
                newDiv.innerHTML = markdown(text);
                document.body.appendChild(newDiv);
            })
        .catch(error => console.error('Error fetching the file:', error));
}

// Simple Markdown parser
function markdown(mdText) {
    
    // LATEX INTEGRATION //
    // $$ Display LaTeX $$ //
        mdText = mdText.replace(/(\$\$)([\s\S]*?)\1/g, (match, _, content) => {
            return katex.renderToString(content, {
                throwOnError: false,
                displayMode: true
            });
        }); 
        
    // $ Inline LaTeX $
    mdText = mdText.replace(/(\$)([\s\S]*?)\1/g, (match, _, content) => {
        return katex.renderToString(content, {
            throwOnError: false
        });
    });



    // Line Breaks
    mdText = mdText.replace(/\n/g, '\n');

    // H1-H6 # Headers
    mdText = mdText.replace(/^(#+)\s+(.*)$/gm, (match, hashes, content) => {
        const level = Math.min(hashes.length, 6); // Limit to H1-H6
        return `<h${level} class="spider">${content}</h${level}>`;
    });


    // Horizontal Rule
    mdText = mdText.replace(/^(?:(?=[_*-])...)$/gm, (match) => {
        return `<hr>`;
    });

    // **bolds**
    mdText = mdText.replace(/(\*\*|\_\_)([\s\S]*?)\1/g, (match, _, content) => {
        return `<b class="spider">${content}</b>`;
    });

    // *italics*
    mdText = mdText.replace(/(\*|\_)([\s\S]*?)\1/g, (match, _, content) => {
        return `<i class="spider">${content}</i>`;
    });

    // ~~Strikethrough~~
    mdText = mdText.replace(/(~~)([\s\S]*?)\1/g, (match, _, content) => {
        return `<s class="spider">${content}</s>`;
    });

    // ==Highlights==
    mdText = mdText.replace(/(==)([\s\S]*?)\1/g, (match, _, content) => {
        return `<mark class="spider">${content}</mark>`;
    });

    // %% Comments %%
    mdText = mdText.replace(/(%%)([\s\S]*?)\1/g, (match, _, content) => {
        return `<text class="spider">${content}</text>`;
    });

    // [[Internal Links]]
    mdText = mdText.replace(/\[\[([\S]*)\]\]/g, (match, content) => {
        return `<a href="${content}" class="spider">${content}</a>`;
    });

    // [[External Links]]
    mdText = mdText.replace(/(?<!!)\[([\S\s]*)\]\((\S*)\)/g, (match, content, link) => {
        return `<a href="${link}" class="spider">${content}</a>`;
    });

    // Images
    mdText = mdText.replace(/(?<=!)\[([\S\s]*)\]\((\S*)\)/g, (match, alt, source) => {
        return `<img src="${source} class="spider"" alt=${alt}>`;
    });
    
    // Quotes
    mdText = mdText.replace(/^\>\s+(.*)$/gm, (match, content) => {
        return `<text class="spider">${content}</text>`;
    });

    // Tags
    mdText = mdText.replace(/#(\w+)/g, (match, content) => {
        return `<text class="spider-tags">${content}</text>`;
    });

    // unordered list
    mdText = mdText.replace(/^([\s]*)\-\s(?!\[.\])(.*)/gm, (match, whitespace, content) => {
        return `<li class="spider-unordered" style="list-style-type: none;white-space: pre-wrap;">${whitespace}• ${content}</li>`;
    });

    // ordered list
    mdText = mdText.replace(/^([\s]*)(\d)\.\s(?!\[.\])(.*)/gm, (match, whitespace, index, content) => {
        return `<li  class="spider-ordered" style="list-style-type: none;white-space: pre-wrap;">${whitespace}${index}. ${content}</li>`;
    });
    
    // Task lists
    mdText = mdText.replace(/(.*)\-\s\[(.)\]+(.*)/gm, (match, whitespace, completion, content) => {
        if(completion!=" "){
            return `<li class="spider-tasklist" style="list-style-type: none;white-space: pre-wrap;">${whitespace}<input checked type="checkbox">${content}</li>`;
        }
        else {
            return `<li class="spider-tasklist" style="list-style-type: none;white-space: pre-wrap;">${whitespace}<input type="checkbox">${content}</li>`;
        }
    });
    
    // Return the resulting HTML
    return `<div id="spider-textbox"><text>${mdText}</text></div>`;
}
