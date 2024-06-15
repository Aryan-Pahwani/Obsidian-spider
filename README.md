# An Easy Way to write blogs, etc. Using Obsidian Notes.
## Installing KATEX;
In your project file,
```
npm install katex
```

That's it! Everything else is handled within the script.

## Setting up:

1. Drag the obsidian-spider.js script into your folder.
2. Add in this bit to your \<head> tag.
<script src="obsidian-spider.js"></script>

3. Add in this bit to the \<body> tag.
 ```HTML
  <script>
    spider('OBSIDIAN_FILE_PATH');
  </script>
 ```
4. Set OBSIDIAN_FILE_PATH to the relative path from the obsidian-spider.js file to your obsidian .md file. Obsidian stores it's files as .md markdown files. Which we'll use to generate our website.

## Styling Reference
---------------------------
| Name        |   CSS     |
|-------------|-----------|
| Headers | h1.spider     |
| Horizontal rule | hr.spider |
| Bolds | b.spider  |
| Italics | i.spider |
| Strikethroughs | s.spider | 
| Highlights | mark.spider |
| Comments | text.spider-comments |
| Internal Links | a.spider-links-internal |
| External Links | a.spider-links-external | 
| Images | img.spider |
| Quotes | text.spider-quotes |
| Tags | text.spider-tags |
| Unordered Lists | li.spider-unordered |
| Ordered Lists | li.spider-ordered |
| Task Lists | spider-tasklist |
---------------------------
